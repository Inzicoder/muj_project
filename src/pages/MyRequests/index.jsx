import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Box, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/MyRequests';
import LoadingCard from '../../components/layouts/LoadingCard';

const MyRequestRides = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [noRequest, setNoRequests] = useState(false);
  const UID = parseInt(localStorage.getItem('UID'));
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    fetchRideData();
  }, []);

  const fetchRideData = async () => {
    setLoad(true);
    await axios
      .get(`https://muj-backend.onrender.com/user/show/${UID}`)
      .then(response => {
        console.log(response.data, 'response of rides');
        setLoad(false);
        if (response.data.success) {
          setMyRequests(response?.data?.rides);
        } else {
          setMyRequests([]);
        }
      })
      .catch(error => {
        console.log(error, 'error in fetching data ');
        setNoRequests(true);
        if (error.response.data) {
          console.log(error.response.data, 'erorr');
        }
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />

      {!noRequest ? (
        <Box align={'center'}>
          <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
            My Requests Status
          </Text>
          {loading === true ? <LoadingCard /> : null}
          {myRequests?.map(res => (
            <RideCard
              key={`${res._id}-${res.PublisherID}`}
              uid={parseInt(localStorage.getItem('UID'))}
              rideID={res._id}
              pid={res.PublisherID}
              // requestStatus={res.request_status}
            />
          ))}
          {myRequests.length === 0 ? (
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <img
            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D"
            alt="Nothing"
            style={{
              height: '300px',
            }}
          />
          <span
            style={{
              marginTop: '10px',
              color: 'red',
              fontSize: '2xl',
            }}
          >
            No rides found for you
          </span>
        </Box>
          ) : null}
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <img
            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D"
            alt="Nothing"
            style={{
              height: '300px',
            }}
          />
          <span
            style={{
              marginTop: '10px',
              color: 'red',
              fontSize: '2xl',
            }}
          >
            No rides found for you
          </span>
        </Box>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
    </ChakraProvider>
  );
};

export default MyRequestRides;


