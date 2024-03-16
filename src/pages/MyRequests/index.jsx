import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Box, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/MyRequests';
import LoadingCard from '../../components/layouts/LoadingCard';

const MyRequestRides = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [noRequest, setNoRequests] = useState(null);
  const UID = parseInt(localStorage.getItem('UID'));
  const [loading, setLoad] = useState(false);
  console.log(UID, 'UID');

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
            <p>You have not requested for any rides.</p>
          ) : null}
        </Box>
      ) : (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '200px',
            color: 'red',
          }}
        >
          {' '}
          No rides found for you {UID}.
        </span>
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
