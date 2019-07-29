import React from 'react';
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { FormClose, Subtract } from 'grommet-icons';
import axios from 'axios';

//========================================= Broker Details
const BrokerDetail = props => {
  const { broker, toggleDetails, updateBrokers } = props;

  const handleDelete = name => {
    updateBrokers('delete', broker);
    toggleDetails();
  };

  let statusColor = 'status-warning';
  if (broker.status === 'loaded') statusColor = 'status-ok';
  if (broker.status === 'failed') statusColor = 'status-error';

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
            <Box align='center' flex pad={{ top: 'small' }}>
              <Text size='xxlarge' weight='bold' wordBreak='break-all'>
                {broker.name}
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
            <Box className='deployed-description-box'>
              <Box>
                <Heading level='3'>
                  <strong>Description</strong>
                </Heading>
              </Box>
              <Box background={{ color: 'accent-1' }} height='2px' />
              <Box direction='row' margin={{ top: 'small' }}>
                <Box flex justify='start'>
                  <Text size='large'>Description: </Text>
                </Box>
                <Box flex justify='start' align='start'>
                  <Text size='large' wordBreak='break-all'>
                    {broker.description}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Heading level='3'>
                <strong>Status</strong>
              </Heading>
            </Box>
            <Box background={{ color: 'accent-1' }} height='2px' />
            <Box direction='row' margin={{ top: 'small' }}>
              <Box flex justify='start'>
                <Text size='large'>Broker status:</Text>
              </Box>
              <Box flex justify='start' align='start'>
                <Text size='large' wordBreak='break-all' color={statusColor}>
                  {broker.status}
                </Text>
              </Box>
            </Box>
            {broker.inputs.length > 0 && (
              <Box className='broker-parameters-box'>
                <Box>
                  <Heading level='3'>
                    <strong>Inputs</strong>
                  </Heading>
                </Box>
                <Box background={{ color: 'accent-1' }} height='2px' />
                {broker.inputs.map(detail => {
                  const detailName = Object.keys(detail)[0];
                  const detailValue = detail[detailName];
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
          </Box>
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
              onClick={() => handleDelete()}
            />
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default BrokerDetail;
