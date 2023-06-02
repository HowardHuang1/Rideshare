import React from 'react';
import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Link, Route, Switch, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useForm } from "react-hook-form";
//Note: do not send a request if confirm password doesn't match password
//200 is the good status



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
    FormErrorMessage,
  } from '@chakra-ui/react'
  import { ChakraProvider } from '@chakra-ui/react'
  
  export const theme = extendTheme(
    {
      colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
    },

  )
const SignUp = ({updateUsername}) => {
  const history = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  async function registerUser(values) {
    
    // if (!!errors){
      if (values.password != values.confirmPassword){
        setError('password', { type: 'custom', message: 'Passwords must match' });
        setError('confirmPassword', { type: 'custom', message: 'Passwords must match' }); 
      }
      else 
        try {
          const response = await axios.post('http://localhost:8000/create-user', {
            username: values.username,
            password: values.password,
            fullName: values.fullName,
            email:    values.email,
          })
          
          // Handle the response data
          console.log(response.data); // true, false, or null

          if (response.data === true) {
            updateUsername(response.data);
            history('/profile');
          } else 
          {
            setError('username', { type: 'custom', message: 'user already exists' });
          } 
      
        } catch (error) {
          // Handle any errors that occurred during the request
          console.error(error);
        }
    // }
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
              Sign up for an account
            </Heading>
            {/* <HStack spacing="1" justify="center"> */}
              <Text color="muted">Have an Account?</Text>
              <Link to="/login">
                <Button variant="link" colorScheme="red">
                  Log in
                </Button>
              </Link>
            {/* </HStack> */}
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
        <form onSubmit={handleSubmit(registerUser)}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl  isInvalid={errors.fullName}>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input id="fullName" type="fullName" 
                {...register("fullName", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
                <FormErrorMessage>
                    {errors.fullName && errors.fullName.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl  isInvalid={errors.username}>
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
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" 
                {...register("email", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
          <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password" >Password</FormLabel>
                <Input id="password" type="password" 
                {...register("password", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
          <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel> 
                <Input id="confirmPassword" type="password" 
                {...register("confirmPassword", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" }
          })}/>
          <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button variant="primary" type="submit">Sign up</Button>
            </Stack>
          </Stack>
        </form>
        </Box>
      </Stack>
    </Container>
    </ChakraProvider>
  )
}
  export default SignUp;