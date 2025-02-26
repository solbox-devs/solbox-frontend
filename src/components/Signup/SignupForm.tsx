"use client";

import authService from "@/services/authService";
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
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      walletConnected: "",
    },
  });

  const { publicKey } = useWallet();
  const router = useRouter();

  const getShortAddress = (address: string) => {
    if (!address) return "Connect Wallet";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (publicKey) {
      const fullAddress = publicKey.toBase58();
      setValue("walletConnected", fullAddress);
    } else {
      setValue("walletConnected", "");
    }
  }, [publicKey, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    const { username, referralCode, walletConnected: walletAddress } = data;

    const res = await authService.userRegistration({
      username,
      referralCode,
      walletAddress,
    });
    if (res?.success) {
      router.push("/dashboard");
    }
  };

  const walletConnected = watch("walletConnected");

  return (
    <Box w="350px" h="500px" bg="#262D33" borderRadius="md" p={4}>
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

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaWallet} color="gray.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Wallet address"
                value={getShortAddress(walletConnected)}
                {...register("walletConnected")}
                variant="primary"
                isReadOnly
              />
            </InputGroup>
          </FormControl>

          <Checkbox {...register("noReferral")} colorScheme="pink">
            <Text fontSize="sm" color="#F1F5F9">
              Don&apos;t have a referral id? Use default Id
            </Text>
          </Checkbox>

          <Button type="submit" variant="primary" width="full">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;
