import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider,Box, theme } from '@chakra-ui/react';
import MyRide from '../../components/User/MyRide';
import LoadingCard from '../../components/layouts/LoadingCard';

const MyRides = () => {
  const [allRides, setAllRides] = useState([]);
  const UID = localStorage.getItem('UID');
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    try {
      setLoad(true);
      axios.get(`https://muj-backend.onrender.com/rides/all`).then(response => {
        console.log(response,'response')
        setLoad(false);  
        setAllRides(response.data.rides);
      });
    } catch (err) {
      console.log(err,'error in fetching rides');
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar/>

      <Box align={'center'}>
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Ongoing Rides
      </Text>

      {(loading===true)?
      <LoadingCard/>
      :null}

      {allRides.map(res => {
        return (
          <MyRide
          UID={parseInt(localStorage.getItem('UID'))}
          key={res._id}
          from={res.from}
          to={res.to}
          doj={res.doj}
          price={res.price}
          rideID={res._id}
          nop={res.no_of_pass}
          />
          );
        })
        }
        {
          (allRides.length===0)?
        <p>Oops! Looks like you have not published any rides.</p>:null
        }

        </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
    </ChakraProvider>
  );
};

export default MyRides;
