import React from 'react';
import Card from '../../layouts/Card';
import { Text } from '@chakra-ui/react';
import { SimpleGrid, Box, Button } from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState, useEffect } from 'react';

const RideCard = props => {
  console.log(props,'dataaaa')
  const rideID = props.rideID;
  const requestStatus = props.requestStatus;
  const [rideDetails, setRideDetails] = useState({});

  const statusColors = {
    pending: 'orange.200',
    accepted: 'green.200',
    rejected: 'red.200',
  };

  useEffect(() => {
    try {
      axios.get(`https://muj-backend.onrender.com/rides/all`).then(response => {
        // console.log(response?.data, 'response');
        setRideDetails(response?.data?.rides);
        // setPublisher(response.data.publisher);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err, 'error in request');
    }
  }, []);

  const callNum = () => {
    const dummyNum = rideDetails.publisher.phone;
    window.open(`tel:+91${dummyNum}`);
  };
  const callEmail = () => {
    const dummyMail = rideDetails.publisher.email;
    window.open(`mailto:${dummyMail}`);
  };



  return (
    <FadeInUp>
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="70vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg: '150px' }}
        bg={'white'}
        position="relative"
      >
<SimpleGrid columns={[1, 2, 2, 2, 4, 6]} spacing="40px">
    <Box>
      <Text fontWeight={600} fontSize="xl">From</Text>
      <Text>{props.from}</Text>
    </Box>
    <Box>
      <Text fontWeight={600} fontSize="xl">To</Text>
      <Text>{props.to}</Text>
    </Box>
    <Box>
      <Text fontWeight={600} fontSize="md">Date of Journey</Text>
      <Text>{props.doj}</Text>
    </Box>
    <Box>
      <Text fontWeight={600}>Price</Text>
      <Text>Rs. {props.price}</Text>
    </Box>
  </SimpleGrid>
      </Card>
    </FadeInUp>
  );
};

export default RideCard;
