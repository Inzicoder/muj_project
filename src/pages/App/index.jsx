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
          <Flex
            p={8}
            flex={1}
            align={'center'}
            justify={'center'}
            ml={{ base: 0, md: 8 }}
          >
            <Stack spacing={6} w={'full'} maxW={'lg'} textAlign="left">
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text color={'orange.400'} as={'span'}>
                  Travel Buddy
                </Text>
              </Heading>
              <Text
                fontSize={{ base: 'md', lg: 'lg' }}
                color={'gray.500'}
              >
                This platform is an exclusive resource for the people of college. It provides an easy and accessible way to pool vehicles and get co-passengers for the go.
              </Text>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify="left"
              >
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
                  <Button
                    rounded={'full'}
                    variant={'outline'}
                    borderColor={'orange.400'}
                    color={'orange.400'}
                  >
                    Sign-Up
                  </Button>
                </Link>
              </Stack>
            </Stack>

          </Flex>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            mr={{ base: 0, md: 8 }}
          >
            <Image
              alt="MUJ-IMAGE"
              objectFit="contain"
              src={muj_image}
              boxSize={{ base: '150px', md: '600px' }}
              borderRadius={'md'}
            />
          </Flex>
        </Stack>
      </FadeInUp>
    </ChakraProvider>
  );
}

export default App;
