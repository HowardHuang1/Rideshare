import React from 'react';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react'
import { BrowserRouter as Router, Link, Route, Switch, useNavigate } from 'react-router-dom';
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
    FormErrorMessage,
    Divider
  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
  
  export const theme = extendTheme(
    {
      colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    },

  )
function Login ({updateUsername}){

  const history = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  async function loginUser(values) {
    if (!!errors){
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: values.username,
        password: values.password,
      });
      
      // Handle the response data
      console.log(response.data); // true, false, or null
      if (response.data === true) {
        updateUsername(values.username);
        window.USERNAME = values.username;
        history('/profile');
      } else 
      {
        setError('password', { type: 'custom', message: 'Incorrect Password or username' });
      } 
  
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }
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
                md: 'lg',
              }}
              style={{
                textAlign: 'center',
                padding: "0px" ,
              }}
            >
              Log in to your account
            </Heading>
              <Text color="muted">Don't have an account?</Text>
              <Link to="/signup">
              <Button variant="link" colorScheme="red">
                Sign up
              </Button>
              </Link>
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
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" type="username" 
                {...register("username", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
              <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" 
                {...register("password", {
                  required: "This is required",
                  minLength: { value: 4, message: "Minimum length should be 4" }
            })}/>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
              </FormControl>
            </Stack>
            <Divider/>
            <Stack spacing="6">
              <Button variant="primary" type='submit' className="myButton"
              style={{
                background: "#E53e3e",
                margin: "10px"
              }}
              >Sign in</Button>
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

