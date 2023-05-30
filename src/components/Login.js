import React from 'react';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { useForm } from "react-hook-form";

//TODO: Implement user APi into here.

import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';
  
  export const theme = extendTheme(
    {
      colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    },

  )
function Login (){

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  // async function onSubmit(values) {
  //   const response = await axios.get('http://localhost:8000/login', values.username, values.password  );
  //   console.log("response: ", response);
  // }
  async function loginUser(values) {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: values.username,
        password: values.password,
      });
  
      // Handle the response data
      console.log(response.data); // true, false, or null
  
      // You can perform additional actions based on the response here
  
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
  }
  return (
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Link to="/signup">
              <Button variant="link" colorScheme="red">
                Sign up
              </Button>
              </Link>
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
          <form onSubmit={handleSubmit(loginUser)}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" type="username" 
                {...register("username", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" 
                {...register("password", {
                  required: "This is required",
                  minLength: { value: 4, message: "Minimum length should be 4" }
            })}/>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Button variant="link" colorScheme="red" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" type='submit'>Sign in</Button>

            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
    </ChakraProvider>
  )
}
  export default Login;

