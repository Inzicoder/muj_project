import React from 'react';
import {
  ChakraProvider,
  Text,
  Stack,
  Flex,
  Button,
  Image,
  Link,
  Heading,
  theme,
} from '@chakra-ui/react';
import FadeInUp from '../../components/Animation/FadeInUp';
import Footer from '../../components/layouts/Footer';
import muj_image from '../../assets/muj_img.jpeg';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <FadeInUp>
        <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                {/* <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'blue.400',
                    zIndex: -1,
                  }}
                >
                  Manipal University Jaipur
                </Text> */}
                <br />{' '}
                <Text color={'orange.400'} as={'span'}>
                  Travel Buddy
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                This platform is an exclusive resource for the people of
                college. It provides an easy and accessible way to pool vehicles
                and get co-passengers for the go.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Link href="/user/login">
                  <Button
                    rounded={'full'}
                    bg={'orange.400'}
                    color={'white'}
                    _hover={{
                      bg: 'orange.500',
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button rounded={'full'}>Sign-Up</Button>
                </Link>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={0.9}>
            <Image
              alt="MUJ-IMAGE"
              objectFit="cover"
              src={muj_image}
              style={{
                height:'400px',
                width:'400px'
              }}
           
            />
          </Flex>
        </Stack>
      </FadeInUp>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
