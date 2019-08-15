@bottle.error(401)
@bottle.error(409)
def error(error):
    bottle.response.content_type = 'application/json'
    return '{"error": "%s"}' % error.body

def authenticate(username, password):
    print("inside authentication")
    return true

#"""
#def authenticate(username, password):
#    print(username, password, "<--username/password")
#    if username != config.osb_connector_username:
#        print("wrong username")
#        return false
#    if password != config.osb_connector_password:
#        print("wrong password")
#        return false
#    return true
#"""

@bottle.route('/v2/service_instances/<instance_id>/last_operation', method=['get','options'])
#@bottle.auth_basic(authenticate)
@allow_cors
def last_operation(instance_id):
    """
    return the catalog of services handled
    by this broker

    get /v2/service_instances/<instance_id>/last_operation

    header:
        x-broker-api-version: <version>

    return:
        json document with details about the
        services offered through this broker
    """
    api_version = bottle.request.headers.get('x-broker-api-version')
    if (not api_version or not (api_version_is_valid(api_version))):
        bottle.abort(
            409,
            "missing or incompatible %s. expecting version %.0f.%.0f or later" % (
                x_broker_api_version_name,
                x_broker_api_major_version,
                x_broker_api_minor_version))
    global ec2_ip_addr
    if api_count <= 6:
        print("inside last operation")
        ec2_ip_addr,state = get_public_ip_address(ec2_instance_id)
        print(state)
        print("public ip address:", ec2_ip_addr)
        if (state == u'pending'):
            return {"state": "in progress"}
        else:
            return {"state": "succeeded",
                    "public_ip": ec2_ip_addr
                   }
    else:
        bottle.abort(409,"api max hits reached!")


def get_public_ip_address(instanceid):
    """when passed a tag key, tag value this will return a list of instanceids that were found."""
    ec2client = boto3.client('ec2')
    print("inside get_public_ip_address")
    boto3.set_stream_logger('boto3.resources', logging.info)
    response = ec2client.describe_instances(instanceids=[instanceid])
    for reservation in (response["reservations"]):
        for instance in reservation["instances"]:
            public_ip_address = (instance["publicipaddress"])
            state_status = instance['state']['name']
    return public_ip_address,state_status


@bottle.route('/v2/catalog', method=['get','options'])
@allow_cors
#@bottle.auth_basic(authenticate)
def catalog():
    """
    return the catalog of services handled
    by this broker

    get /v2/catalog:

    header:
        x-broker-api-version: <version>

    return:
      json document with details about the
      services offered through this broker

      using osb spec of get catalog:
      https://github.com/openservicebrokerapi/servicebroker/blob/v2.13/spec.md
    """
    api_version = bottle.request.headers.get('x-broker-api-version')
    print("inside catalog")
    if (not api_version or not (api_version_is_valid(api_version))):
        bottle.abort(
            409,
            "missing or incompatible %s. expecting version %.0f.%.0f or later" % (
                x_broker_api_version_name,
                x_broker_api_major_version,
                x_broker_api_minor_version))
    return {"services": [service,service2]}

def api_version_is_valid(api_version):
    version_data = api_version.split('.')
    result = true
    if (float(version_data[0]) < x_broker_api_major_version
        or (float(version_data[0]) == x_broker_api_major_version
            and float(version_data[1]) < x_broker_api_minor_version)):
                result = false
    return result


@bottle.route('/v2/service_instances/<instance_id>', method=['put','options'])
#@bottle.auth_basic(authenticate)
@allow_cors
def provision(instance_id):
    """
    provision an instance of this service
    for the given org and space

    put /v2/service_instances/<instance_id>:
        <instance_id> is provided by the cloud
          controller and will be used for future
          requests to bind, unbind and deprovision

    body:
        {
          "service_id":        "<service-guid>",
          "plan_id":           "<plan-guid>",
          "organization_guid": "<org-guid>",
          "space_guid":        "<space-guid>"
        }

    return:
        json document with details about the
        services offered through this broker
    """
    if bottle.request.content_type != 'application/json':
        bottle.abort(415, 'unsupported content-type: expecting application/json')
    # get the json document in the body
    provision_details = bottle.request.json
    print("provision_details", provision_details)
    planid = bottle.request.json['plan_id']
    serviceid = bottle.request.json['service_id']
    print("serviceid", serviceid)
    parameters = bottle.request.json['parameters']
    print("parameters", parameters)
    print("inside provision")
# assign these values before running the program
    access_key_id = parameters.get('access_key_id')
    print("access_key_id",access_key_id)
    secret_access_key = parameters.get('secret_access_key')
    image_id = parameters.get('image_id')
    instance_type = parameters.get('flavor')
    #instance_type = 't2.micro'
    region = parameters.get('region')
    #region = 'us-east-1'

    #image_id = 'ami-05f07ee3c7aaadaaa'
    keypair_name = 'grommet'
    user_data = open(os.getcwd() + '/cloudinit.txt', 'r').read()
    #user_data = open(os.getcwd() + '/userdata.txt', 'r').read()
    hd = os.path.expanduser('~')
    directory = hd + '/.aws'
    if not os.path.exists(directory):
        os.mkdir(os.path.join(hd, '.aws'))
    with open (hd+"/.aws/credentials", 'w+') as credentials:
        credentials.write('[default]' + '\n' + 'aws_access_key_id = ' + access_key_id + '\n' + 'aws_secret_access_key = ' + secret_access_key)
    with open (hd+"/.aws/config", 'w+') as config:
        config.write('[default]' + '\n' + 'region =' + region + '\n' + 'output =json')

    # provision and launch the ec2 instance
    instance_info = create_ec2_instance(image_id, instance_type, keypair_name, user_data)
    print(instance_info)
    global ec2_instance_id
    ec2_instance_id = instance_info["instanceid"]
    ec2_instances_dict[instance_id] = ec2_instance_id
    print(ec2_instances_dict)
    bottle.response.status = 202
    bottle.response.content_type = 'application/json'
    #print(instance_info['instances'][0]['publicipaddress'])
    #print(instance_info.get(u'publicaddress'))
    #ec2_ip_addr = instance_info['instances'][0]['publicipaddress']
    #dashboard_url = "http://"+ec2_ip_addr+":3000"
    #return {"dashboard_url": dashboard_url}
    api_count = 0
    return {"message":"success"}
    #return {"public ipaddress": ec2_ip_addr}

def create_ec2_instance(image_id, instance_type, keypair_name, user_data):
    """provision and launch an ec2 instance

    the method returns without waiting for the instance to reach
    a running state.

    :param image_id: id of ami to launch, such as 'ami-xxxx'
    :param instance_type: string, such as 't2.micro'
    :param keypair_name: string, name of the key pair
    :return dictionary containing information about the instance. if error,
    returns none.
    """

    # provision and launch the ec2 instance
    #ec2_resource = boto3.resource('ec2')
    ec2_client = boto3.client('ec2')
    #ec2_instance = ec2_client.instance('id')
    try:
          response = ec2_client.run_instances(imageid=image_id,
                                              instancetype=instance_type,
                                              keyname=keypair_name,
                                              mincount=1,
                                              maxcount=1,
                                              userdata=user_data,
                                              securitygroups=['allowsshandosb']
                                            )
          instance = response['instances'][0]
          #instance = response[0]
          #instance.wait_until_running()
          #instance.reload()
          print("inside create function:",instance)
    except clienterror as e:
          logging.error(e)
          return none


    return instance
    #return response[0]

@bottle.route('/v2/service_instances/<instance_id>', method=['delete'])
#@bottle.auth_basic(authenticate)
@allow_cors
def deprovision(instance_id):
    """
    deprovision an existing instance of this service

    delete /v2/service_instances/<instance_id>:
        <instance_id> is the cloud controller provided
          value used to provision the instance

   return:
        as of api 2.3, an empty json document
        is expected
    """
    api_version = bottle.request.headers.get('x-broker-api-version')
    print("inside delete")
    if (not api_version or not (api_version_is_valid(api_version))):
        bottle.abort(
            409,
            "missing or incompatible %s. expecting version %.0f.%.0f or later" % (
                x_broker_api_version_name,
                x_broker_api_major_version,
                x_broker_api_minor_version))

    #send response
    s = boto3.session(region_name="us-east-1")
    ec2 = s.resource('ec2')
    ec2_id = ec2_instances_dict[instance_id]
   #ec2.instance('i-00434b87058703892').terminate()
   #ec2.instances.filter(instanceids=ids).terminate()
    instance_to_be_deleted = ec2.instance(ec2_id)
    print("instance to be deleted:",instance_to_be_deleted)
    response = instance_to_be_deleted.stop();
    print(response)
    deprovision_details = bottle.request.json
    print("inside deprovision", deprovision_details)
    return {"status" : "deprovisioned"}

def api_version_is_valid(api_version):
    version_data = api_version.split('.')
    result = true
    if (float(version_data[0]) < x_broker_api_major_version
        or (float(version_data[0]) == x_broker_api_major_version
            and float(version_data[1]) < x_broker_api_minor_version)):
                result = false
    return result

@bottle.route('/v2/service_instances/<instance_id>/service_bindings/<binding_id>', method='put')
#@bottle.auth_basic(authenticate)
def bind(instance_id, binding_id):
    """
    bind an existing instance with the
    for the given org and space

    put /v2/service_instances/<instance_id>/service_bindings/<binding_id>:
        <instance_id> is the cloud controller provided
          value used to provision the instance
        <binding_id> is provided by the cloud controller
          and will be used for future unbind requests

    body:
        {
          "plan_id":           "<plan-guid>",
          "service_id":        "<service-guid>",
          "app_guid":          "<app-guid>"
        }

    return:
        json document with credentails and access details
        for the service based on this binding
        http://docs.cloudfoundry.org/services/binding-credentials.html
    """
    if bottle.request.content_type != 'application/json':
        bottle.abort(415, 'unsupported content-type: expecting application/json')
    # get the json document in the body
    binding_details = bottle.request.json
    bottle.response.status = 201
    uri ="http://"+ec2_ip_addr+":3000"
    print("inside binding ec2_ip_addr",ec2_ip_addr)
    return {"credentials": {"uri": uri, "username": "ubuntu"}}

#@bottle.route('/v2/service_instances/<instance_id>/service_bindings/<binding_id>', method='delete')
##@bottle.auth_basic(authenticate)
#def unbind(instance_id, binding_id):
#    """
#    unbind an existing instance associated
#    with the binding_id provided
#
#    delete /v2/service_instances/<instance_id>/service_bindings/<binding_id>:
#        <instance_id> is the cloud controller provided
#          value used to provision the instance
#        <binding_id> is the cloud controller provided
#          value used to bind the instance
#
#    return:
#        as of api 2.3, an empty json document
#        is expected
#    """
#    print("inside unbinding")
#    return {}

if __name__ == '__main__':
    port = int(os.getenv('port', '7099'))
    #bottle.install(corsplugin(origins=['http://localhost:3000', '*']))
    bottle.run(host='0.0.0.0', port=port, debug=true, reloader=false, server='gunicorn')
    #bottle.run(host='172.18.203.43', port=port, debug=true, reloader=false, certfile='/home/ubuntu/.minikube/ca.crt', keyfile='/home/ubuntu/.minikube/ca.key', server='gunicorn')
