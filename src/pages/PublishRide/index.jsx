import {
  ChakraProvider,
  theme,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function PublishRide() {
  const navigate = useNavigate();
  const UID = localStorage.getItem('UID');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [nop, setNop] = useState('');
  const [doj, setDoj] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setmsg] = useState('Please fill the following details');

  const handleFromChange = e => setFrom(e.target.value);
  const handleToChange = e => setTo(e.target.value);
  const handleNopChange = e => setNop(e.target.value);
  const handleDojChange = e => setDoj(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);
  // {
  //   "PublisherID": "123456", // Publisher UID (string)
  //   "from": "New York",      // Starting location (string)
  //   "to": "Los Angeles",     // Destination (string)
  //   "no_of_pass": 3,         // Number of passengers (integer)
  //   "doj": "2024-03-15",     // Date of journey (string, format: YYYY-MM-DD)
  //   "price": 50              // Price of the ride (number)
  // }

  useEffect(() => {
    try {
      fetch('/user/dashboard/', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('tokenID'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(response => {
        response.json().then(response => {
          // setFName(response.fname);
          // setLName(response.lname);
          // setEmail(response.email);
          // setPhone(response.phone);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const navigato_UDB = async event => {
    navigate('/user/dashboard');
  };
  const handleSubmit = async event => {
    event.preventDefault();

    const formData ={
      PublisherID:"123456",
      from:from,
      to:to,
      doj:doj,
      no_of_pass :nop,
      price: price
    }
    try {
      let dat = await axios.post(
        `https://muj-backend.onrender.com/add/ride`,
        formData
      );
      if (dat.data.success) {
        setmsg('Ride Successfully placed');
        setTimeout(navigato_UDB(), 800);
      } else {
        setmsg("Couldn't place Ride");
        console.log("Couldn't place Ride");
      }
    } catch (error) {
      console.log(error,'error in publish ride');
      setmsg(error?.message)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data.message);
        setmsg(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from server:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up request:', error.message);
      
      }
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <FadeInUp>
        <Flex
          minH={'93vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={1} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}> Publish a Ride</Heading>
          
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="publish_ride">
                    <FormLabel>From</FormLabel>
                    <Input
                      placeholder={'Enter a pick-up point'}
                      id="from"
                      type="text"
                      onChange={handleFromChange}
                    />

                    <FormLabel>To</FormLabel>
                    <Input
                      placeholder={'Enter a drop point'}
                      id="to"
                      type="text"
                      onChange={handleToChange}
                    />

                    <FormLabel>Date of Journey</FormLabel>
                    <Input
                      placeholder={'Date of Journey'}
                      id="doj"
                      type="date"
                      onChange={handleDojChange}
                    />

                    <FormLabel>Number of Co-Passengers</FormLabel>
                    <Input
                      placeholder={'Number of co-passengers'}
                      id="no"
                      type="text"
                      onChange={handleNopChange}
                    />

                    <FormLabel>Price per head</FormLabel>
                    <Input
                      placeholder={'Price per head'}
                      id="price"
                      type="text"
                      onChange={handlePriceChange}
                    />
                  </FormControl>
                  <br />
                  <Text fontSize={'lg'} color={'red.600'}>
                {msg}
              </Text>
                  <Stack spacing={10}>
                    <Button
                      bg={'orange.400'}
                      color={'white'}
                      _hover={{
                        bg: 'orange.500',
                      }}
                      my={'1rem'}
                      type="submit"
                    >
                      Publish Ride
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FadeInUp>
                <br/>
                <br/>
    </ChakraProvider>
  );
}
