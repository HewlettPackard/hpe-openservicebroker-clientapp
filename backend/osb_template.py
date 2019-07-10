from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

X_BROKER_API_VERSION_NAME = 'X-Broker-API-Version'
X_BROKER_API_MAJOR_VERSION = 2
X_BROKER_API_MINOR_VERSION = 14

@app.route('/')
def index():
    return '<h1>Welcome to the OSB project page. Please login!</h1>'

@app.route('/login', methods=['POST'])
def login():
    req_data=request.get_json()
    print(req_data['username'], req_data['password'])
    return jsonify(success=True)

@app.route('/register', methods=['POST'])
def register():
    req_data=request.get_json()
    service_name=req_data['sname']
    url=req_data['url']
    username=req_data['uname']
    password=req_data['pwd']
    return jsonify(success=True,ServiceName=service_name,URL=url,Username=username,Password=password)

@app.route('/v2/catalog')
def catalog():
    api_version = request.headers['X-Broker-API-Version']
    if(not api_version or not api_version_isvalid(api_version)):
        print('inside if block',api_version)
        return f"Missing or incompatible {X_BROKER_API_VERSION_NAME}. Expecting version {X_BROKER_API_MAJOR_VERSION}.{X_BROKER_API_MINOR_VERSION}", 409
    else:
        print('inside else block')
        with open("services.json") as file:
            data=file.read()
            return data

def api_version_isvalid(api_version):
    version = api_version.split('.')
    flag = True 
    if((float(version[0]) < X_BROKER_API_MAJOR_VERSION) or ((float(version[0]) == X_BROKER_API_MAJOR_VERSION) and (float(version[1]) < X_BROKER_API_MINOR_VERSION))):
        print('inside IF')
        flag = False
    return flag

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)