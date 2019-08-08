import React, { useState } from 'react';
import { Box, Button, Heading, Layer, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';
import axios from 'axios';

//========================================= Deployed Service Detail
const DeployedDetail = props => {
  const { instance, toggleDetails, updateInstances } = props;
  const [canPress, setCanPress] = useState(true);

  const handleDelete = confirmed => {
    if (confirmed) {
      toggleDetails();
      updateInstances('delete', instance);
      axios
        .delete(`${instance.url}/v2/service_instances/${instance.id}`, {
          headers: {
            'X-Broker-API-Version': 2.14
          }
        })
        .then(results => {
          console.log('success deprovisioning');
        })
        .catch(error => {
          alert('The deprovisioning failed');
          console.log('failed deprovisioning');
        })
        .then(() => setCanPress(true));
    }
  };

  let statusColor = 'status-warning';
  if (instance.status === 'loaded') statusColor = 'status-ok';
  if (instance.status === 'failed') statusColor = 'status-error';

  const details = Object.entries(instance.returnedDetails);

  return (
    <Layer full plain onEsc={toggleDetails} animate={false}>
      <Box direction='row' fill>
        <Box
          flex
          background={{ color: 'black', opacity: 'medium' }}
          onClick={toggleDetails}
        />
        <Box
          background={{ color: 'dark-1' }}
          overflow={{ vertical: 'scroll' }}
          width='large'
          pad='small'
        >
          <Box className='deploy-detail-header' direction='row' flex={false}>
            <Box justify='center' flex>
              <Button
                icon={<FormClose size='large' color='accent-1' />}
                onClick={toggleDetails}
              />
            </Box>
            <Box align='center' flex pad={{ top: 'small', right: 'xlarge' }}>
              <Text
                size='xxlarge'
                weight='bold'
                wordBreak='break-all'
                align='center'
              >
                {instance.name}
              </Text>
            </Box>
            <Box flex /> {/* empty box to center title */}
          </Box>
          <Box
            className='deployed-details-content'
            width='large'
            pad='medium'
            flex={false}
          >
            <Box>
              <Box>
                <Heading level='3'>
                  <strong>Status</strong>
                </Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              <Box direction='row' margin={{ top: 'small' }}>
                <Box flex justify='start'>
                  <Text size='large'>Deploying status:</Text>
                </Box>
                <Box flex justify='start' align='start'>
                  <Text size='large' wordBreak='break-all' color={statusColor}>
                    {instance.status}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box>
                <Heading level='3'>
                  <strong>Time Created</strong>
                </Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              <Box direction='row' margin={{ top: 'small' }}>
                <Box flex justify='start'>
                  <Text size='large'>Time and Date: </Text>
                </Box>
                <Box flex justify='start' align='start'>
                  <Text size='large' wordBreak='break-all'>
                    {instance.time}
                  </Text>
                </Box>
              </Box>
            </Box>
            {details.length > 0 && (
              <Box className='deployed-output-box'>
                <Box>
                  <Heading level='3'>
                    <strong>Access Details</strong>
                  </Heading>
                </Box>
                <Box background={{ color: 'accent-1' }} height='2px' />
                {details.map(detail => {
                  const [detailName, detailValue] = detail;
                  if (detailName === 'state') {
                    return;
                  }
                  return (
                    <Box
                      direction='row'
                      margin={{ top: 'small' }}
                      key={detailName}
                    >
                      <Box flex justify='start'>
                        <Text size='large'>{detailName}:</Text>
                      </Box>
                      <Box flex justify='start' align='start'>
                        <Text size='large' wordBreak='break-all'>
                          {detailValue}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
            <Box
              width='medium'
              align='center'
              alignSelf='center'
              margin='medium'
              flex={false}
            >
              <Button
                label='Delete'
                icon={<Subtract />}
                onClick={() => {
                  setCanPress(false);
                  handleDelete(
                    window.confirm(
                      `Are you sure you want to delete ${instance.name} ?`
                    )
                  );
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default DeployedDetail;
