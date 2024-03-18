import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Navbar from '../../components/User/Navbar';
import RideCard from '../../components/User/RideCard';
import LoadingCard from '../../components/layouts/LoadingCard';
import {
  ChakraProvider,
  Text,
  theme,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
  Heading,
  useColorModeValue,
  HStack,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const RidesSearch = () => {
  const navigate = useNavigate();
  const [allRides, setAllRides] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [doj, setDoj] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setmsg] = useState('Please fill the following details');
  const [loading, setLoad] = useState(false);
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


  useEffect(() => {
    if (window.google) {
      setService(new window.google.maps.places.AutocompleteService());
    }
  }, []);

  const handleFromChange = e => {
    setFrom(e.target.value);
    const value = e.target.value;

    console.log(service, 'service');

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

  const handleDojChange = e => setDoj(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);
  const handleSubmit = async event => {
    event.preventDefault();

    setLoad(true);
    await axios
      .get(`https://muj-backend.onrender.com/rides/${from}/${to}/${price}`)
      .then(response => {
        console.log(response, 'response of search');
        setLoad(false);
        if (response.data.success) {
          setAllRides(response.data.rides)
          // setmsg('Scroll to view rides');

          // navigate(
          //   `/live/track/${dropLocationLatLng.lat}/${dropLocationLatLng.lng}/${destLatLng.lat}/${destLatLng.lng}`
          // );
        } else {
          setmsg("Couldn't find rides");
        }
      })
      .catch(error => {
        setLoad(false);
        console.log(error, 'error');
        if (error?.response?.data) {
          console.log(error.response.data);
          setmsg(error.response.data.message);
        }
      });
  };



  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={2} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}> Search Rides</Heading>
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
                  value={from}
                  placeholder={'Enter a pick-up point'}
                  id="from"
                  type="text"
                  value={from}
                  onChange={handleFromChange}
                />
                {dropPredictions.length > 0 && (
                  <Box
                    position="relative"
                    zIndex={1} // Ensure that this dropdown is above the other
                  >
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
                          >
                            <Text color="gray.800" isTruncated>
                              {prediction.description}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
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
                  <Box position="relative" zIndex={1}>
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
                          >
                            <Text color="gray.800" isTruncated>
                              {prediction.description}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                )}

                <br />

                <FormLabel>Date of Journey</FormLabel>
                <Input
                  placeholder={'Date of Journey'}
                  id="doj"
                  type="date"
                  onChange={handleDojChange}
                />

                <br />

                <FormLabel>Price per head</FormLabel>
                <Input
                  placeholder={'Price per head'}
                  id="price"
                  type="text"
                  onChange={handlePriceChange}
                />
              </FormControl>
              <br />
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  my={'1rem'}
                  type="submit"
                >
                  Search Ride
                </Button>
              </Stack>
              <Stack alignItems={'center'}>
                <Text fontSize={'md'} color="red">
                  {msg}
                </Text>
              </Stack>
            </form>
            <Stack spacing={10}></Stack>
          </Stack>
        </Box>
      </Stack>
      <Box align={'center'}>
        {loading === true ? <LoadingCard /> : null}
        {allRides.map(res =>
          res.publisher_id !== parseInt(localStorage.getItem('UID')) ? (
            <RideCard
              key={res._id}
              uid={parseInt(localStorage.getItem('UID'))}
              to={res.to}
              from={res.from}
              doj={res.doj}
              nop={res.no_of_pass}
              price={res.price}
              rideID={res._id}
              publisher={res.PublisherID}
              dropLocationLatLng={dropLocationLatLng}
              destLatLng={destLatLng}
            />
          ) : null
        )}
      </Box>
      <br />
      <br />
    </ChakraProvider>
  );
};
// add ur api key
export default GoogleApiWrapper({
  apiKey: '',
})(RidesSearch);
