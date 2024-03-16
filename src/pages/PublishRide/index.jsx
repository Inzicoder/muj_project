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
  ListItem,
  List,
} from '@chakra-ui/react';
import axios from 'axios';
import { GoogleApiWrapper } from 'google-maps-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import FadeInUp from '../../components/Animation/FadeInUp';

function PublishRide() {
  const navigate = useNavigate();
  const UID = localStorage.getItem('UID');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [nop, setNop] = useState('');
  const [doj, setDoj] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setmsg] = useState('Please fill the following details');
  const [service, setService] = useState(null);
  const [dropPredictions, setDropPredictions] = useState('');
  const [destPredictions, setDestPredictions] = useState('');
  const [dropLocationLatLng, setDropLocationLatLng] = useState({
    lat: 0,
    lng: 0,
  });
  const [destLatLng, setDestLatLng] = useState({
    lat: 0,
    lng: 0,
  });

  const handleFromChange = e => {
    setFrom(e.target.value);
    const value = e.target.value

    if (service) {
      service.getPlacePredictions({ input: value }, results => {
        console.log(results, 'results');
        setDropPredictions(results || []);
      });
    }
  };

  const dropLocationHandler = location => {
    setFrom(location.description);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { placeId: location.place_id },
      async (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          setDropLocationLatLng({ lat: lat, lng: lng });
        }
      }
    );
    setDropPredictions([]);
  };



  const handleToChange = e => {
    setTo(e.target.value);
    if (service) {
      service.getPlacePredictions({ input: e.target.value }, results => {
        console.log(results, 'results');
        setDestPredictions(results || []);
      });
    }
  };

  const destLocationHandler = location => {
    setTo(location.description);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { placeId: location.place_id },
      async (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          setDestLatLng({ lat: lat, lng: lng });
        }
      }
    );
    setDestPredictions([]);
  };

  const handleNopChange = e => setNop(e.target.value);
  const handleDojChange = e => setDoj(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);

  useEffect(() => {
    // try {
    //   fetch('/user/dashboard/', {
    //     method: 'GET',
    //     headers: {
    //       token: localStorage.getItem('tokenID'),
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //   }).then(response => {
    //     response.json().then(response => {
    //       // setFName(response.fname);
    //       // setLName(response.lname);
    //       // setEmail(response.email);
    //       // setPhone(response.phone);
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    if (window.google) {
      setService(new window.google.maps.places.AutocompleteService());
    }
  }, []);
  const navigato_UDB = () => {
    // navigate('/user/dashboard'); change path here
    navigate(`/live/track/${dropLocationLatLng.lat}/${dropLocationLatLng.lng}/${destLatLng.lat}/${destLatLng.lng}`);
  };
  const handleSubmit = async event => {
    event.preventDefault();

    const formData = {
      PublisherID: '123456',
      from: from,
      to: to,
      doj: doj,
      no_of_pass: nop,
      price: price,
    };
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
      console.log(error, 'error in publish ride');
      setmsg(error?.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          'Request failed with status code:',
          error.response.status
        );
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
                      value={from}
                      onChange={handleFromChange}
                    />
                    {dropPredictions.length > 0 && (
                      <Box
                        as="ul"
                        pos="absolute"
                        mt="2"
                        w="full"
                        maxW="26rem"
                        bg="white"
                        border="1px"
                        borderColor="gray.300"
                        rounded="lg"
                        shadow="lg"
                        divideY="1px"
                        divideColor="gray.300"
                      >
                        <List>
                          {dropPredictions.map(prediction => (
                            <ListItem
                              key={prediction.place_id}
                              px="4"
                              py="2"
                              _hover={{
                                bg: 'gray.100',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease-in-out',
                              }}
                              onClick={() => dropLocationHandler(prediction)}
                              display="flex"
                              alignItems="center"
                              borderBottom="1px"
                              borderBottomColor="gray.200"
                              zIndex={99}
                            >
                              <Text color="gray.800" isTruncated>
                                {prediction.description}
                              </Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    <FormLabel>To</FormLabel>
                    <Input
                      value={to}
                      placeholder={'Enter a drop point'}
                      id="to"
                      type="text"
                      onChange={handleToChange}
                    />

                    {destPredictions.length > 0 && (
                      <Box
                        as="ul"
                        pos="absolute"
                        mt="2"
                        w="full"
                        maxW="26rem"
                        bg="white"
                        border="1px"
                        borderColor="gray.300"
                        rounded="lg"
                        shadow="lg"
                        divideY="1px"
                        divideColor="gray.300"
                      >
                        <List>
                          {destPredictions.map(prediction => (
                            <ListItem
                              key={prediction.place_id}
                              px="4"
                              py="2"
                              _hover={{
                                bg: 'gray.100',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease-in-out',
                              }}
                              onClick={() => destLocationHandler(prediction)}
                              display="flex"
                              alignItems="center"
                              borderBottom="1px"
                              borderBottomColor="gray.200"
                              zIndex={99}
                            >
                              <Text color="gray.800" isTruncated>
                                {prediction.description}
                              </Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

              

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
      <br />
      <br />
    </ChakraProvider>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdc7TPydN4945Q-91KC7ndiczXdkqaPKo',
})(PublishRide);
