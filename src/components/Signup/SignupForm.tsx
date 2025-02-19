"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaKey, FaUserAlt, FaWallet } from "react-icons/fa";

type FormData = {
  username: string;
  referralCode: string;
  walletConnected: string;
  noReferral: boolean;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <Box w="350px" h="400px" bg="#262D33" borderRadius="md" p={4}>
      <Box textAlign="center" my={5} mb={4}>
        <Text fontSize="xs" color="#9D48C7">
          Welcome Back!
        </Text>
        <Text fontSize="xl" color="white" fontWeight={500}>
          Sign up to SOLBOX
        </Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* Username */}
          <FormControl isInvalid={!!errors.username}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserAlt} color="gray.500" />
              </InputLeftElement>
              <Input
                variant="primary"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
            </InputGroup>
          </FormControl>

          {/* Referral Code */}
          <FormControl>
            {" "}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaKey} color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Enter referral code"
                {...register("referralCode")}
                variant="primary"
              />
            </InputGroup>
          </FormControl>

          {/* Wallet Connected */}
          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaWallet} color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Wallet Address"
                {...register("walletConnected")}
                variant="primary"
              />
            </InputGroup>
          </FormControl>

          {/* Checkbox */}
          <Checkbox {...register("noReferral")} colorScheme="pink">
            <Text fontSize="sm" color="#F1F5F9">
              Dont have a referral id? Use default Id
            </Text>
          </Checkbox>

          {/* Sign Up Button */}
          <Button type="submit" variant="primary" width="full">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;
