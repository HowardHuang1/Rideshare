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
                // boxSize='150px'
                htmlHeight='150px'
                htmlWidth='320px'
                objectFit='cover'
                // maxW={{ base: '100%', sm: '200px' }}
                src='data:image/jpeg;base64,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'
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