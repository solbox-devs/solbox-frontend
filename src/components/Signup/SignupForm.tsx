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
  useToast,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  // const searchParams: any = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const getShortAddress = (address: string) => {
    if (!address) return "Connect Wallet";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // useEffect(() => {
  //   const refParam = searchParams.get("ref");
  //   if (refParam) {
  //     setValue("referralCode", refParam);
  //   }
  // }, [searchParams, setValue]);

  useEffect(() => {
    if (publicKey) {
      const fullAddress = publicKey.toBase58();
      setValue("walletConnected", fullAddress);
    } else {
      setValue("walletConnected", "");
    }
  }, [publicKey, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const {
      username,
      referralCode: referrerUsername,
      walletConnected: walletAddress,
    } = data;

    try {
      const res = await authService.userRegistration({
        username,
        referrerUsername,
        walletAddress,
      });

      if (res?.success) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        status: "error",
        title: error?.response?.data?.message,
        duration: 2000,
        position: "bottom",
      });
    } finally {
      setIsSubmitting(false);
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
                placeholder="Enter referral username"
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
              Don't have a referral id? Use default Id
            </Text>
          </Checkbox>

          <Button
            type="submit"
            variant="primary"
            width="full"
            isLoading={isSubmitting}
            loadingText="Signing Up"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;
