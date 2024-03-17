import React from 'react';
import Card from '../../layouts/Card';
import { Text, Button, Flex } from '@chakra-ui/react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RideCard = props => {
  const navigate = useNavigate()
  const from = props.from;
  const to = props.to;
  const doj = props.doj;
  const price = props.price;
  const nop = props.nop;
  const rideID = props?.rideID;
  const pid = props.pid;
  const uid = props.uid;
  const publisherDetail = props.publisher;
  const dropLocationLatLng = props.dropLocationLatLng
  const destLatLng = props.destLatLng
  const [msg, setMsg] = useState('Request Ride');
  const [rejectRide,setRejectRide] = useState(false)

  const requestRide = async () => {
    // try {
    //   const d = await axios.post(
    //     `https://muj-travel-buddy.onrender.com/users/${uid}/requests`,
    //     { publisher_id: pid, ride_id: rideID }
    //   );
    //   setMsg('Ride Requested');
    // } catch (err) {
    //   alert(`Error: ${err}`);
    // }

  };

  const handleNavigation =(rideStatus)=>{
    console.log("ride",rideStatus)

   if ( rideStatus === 'accept') {
    navigate(
      `/live/track/${dropLocationLatLng.lat}/${dropLocationLatLng.lng}/${destLatLng.lat}/${destLatLng.lng}`
    );
   }
   else{
    window.location.reload();
   }

         
  }

  return (
    <FadeInUp>

      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        bg={'white'}
        position="relative"
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="80vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg: '150px' }}
      >
        <SimpleGrid columns={[1, 3, 4, 5]} spacing="30px">
          <Box
            w="100%" // Adjusted the width to 80%
            h="40px"
            // bgColor="orange.200"
            textAlign="center"
            borderRadius="50px"
          >
            <Text fontWeight="700" fontSize="xl">
              From
            </Text>
            <Text fontWeight="400" fontSize="md">
              {from}
            </Text>
          </Box>
          <Box w="100%" textAlign="center" borderRadius="50px">
            <Text fontWeight="700" fontSize="xl">
              To
            </Text>
            <Text fontWeight="400" fontSize="md">
              {to}
            </Text>
          </Box>

          <Box textAlign="center">
            <Text fontWeight="bold">Date of Journey:</Text>
            <Text>{doj}</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="2xl"> Seats</Text>
            <Text fontSize="md">{nop} Seats</Text>
          </Box>
          <Box textAlign="center">
            <Text fontWeight="bold">Price</Text>
            <Text>Rs. {price}</Text>
          </Box>
        </SimpleGrid>

        <Flex
          // align="center"
          justify="space-between"
          bg="gray.50"
          direction="row"
          width="300px"
        >
          <Box onClick={()=>handleNavigation('accept')}>
            <Text
              as="button" // Render the Text component as a button
              bg="green.500" // Set background color for the "Accept Ride" button
              color="white" // Set text color for the "Accept Ride" button
              px="4" // Add horizontal padding to the button
              py="1" // Add vertical padding to the button
              borderRadius="md" // Apply border radius for rounded corners
              cursor="pointer" // Show pointer cursor on hover
            >
              Accept Ride
            </Text>
          </Box>

          <Box onClick={() => handleNavigation('reject')}>
            <Text
              as="button" // Render the Text component as a button
              bg="red.500" // Set background color for the "Reject Ride" button
              color="white" // Set text color for the "Reject Ride" button
              px="4" // Add horizontal padding to the button
              py="1" // Add vertical padding to the button
              borderRadius="md" // Apply border radius for rounded corners
              cursor="pointer" // Show pointer cursor on hover
            >
              Reject Ride
            </Text>
          </Box>
        </Flex>
      </Card>

    </FadeInUp>
  );
};

export default RideCard;
