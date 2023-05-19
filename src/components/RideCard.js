import React from 'react';
import { Card, Text, Image, Stack, Heading, Button, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

function RideCard() {
    return(
        <ChakraProvider>
            <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='src/Uber.jpeg'
                alt='Uber Image'
            />
        
            <Stack>
                <CardBody>
                <Heading size='md'>UberX</Heading>
        
                <Text py='2'>
                    7:09 | 7 min away
                </Text>
                <Text py='0'>
                    Newer cars with extra legroom. Capacity of 4.
                </Text>
                </CardBody>
        
                <CardFooter>
                <Button variant='solid' colorScheme='red'>
                    Book Ride
                </Button>
                </CardFooter>
            </Stack>
            </Card>
        </ChakraProvider>
    );
}

export default RideCard;