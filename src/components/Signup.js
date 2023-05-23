import React from 'react';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'



import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
  
  export const theme = extendTheme(
    {
      colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    },

  )
const SignUp = () => (
    <ChakraProvider theme={theme}>
    <Container
      maxW="lg"
      py={{
        base: '12',
        md: '24',
      }}
      px={{
        base: '0',
        sm: '8',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">

          <Stack
            spacing={{
              base: '2',
              md: '3',
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'sm',
              }}
            >
              Sign up for an account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Have an Account?</Text>
              <Button variant="link" colorScheme="red">
                Log in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: '0',
            sm: '8',
          }}
          px={{
            base: '4',
            sm: '10',
          }}
          bg={{
            base: 'transparent',
            sm: 'bg-surface',
          }}
          boxShadow={{
            base: 'none',
            sm: 'md',
          }}
          borderRadius={{
            base: 'none',
            sm: 'xl',
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Input id="firstname" type="firstname" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input id="lastname" type="lastname" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input id="confirmPassword" type="confirmPassword" />
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button variant="primary">Sign up</Button>

            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </ChakraProvider>
  )
  export default SignUp;