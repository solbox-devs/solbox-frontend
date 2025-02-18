"use client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

const TopBar = () => {
  return (
    <Box w="97%" mx="auto" bg="#262D33" p={3} borderRadius={10}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm">Saturday, November 18</Text>
          <Text fontSize="lg" fontWeight={400}>
            Good after noon, Usman
          </Text>
        </Box>
        <HStack>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search something..."
                borderRadius="20px"
                bg="#FFFFFF1A"
                outline="none"
                border="none"
                color="white"
                _focus={{
                  ring: "none",
                  outline: "none",
                  border: "none",
                }}
              />
            </InputGroup>
          </Box>
          <Box>
            <Button
              borderRadius="30px"
              variant="primary"
              leftIcon={<FaWallet color="white" />}
            >
              Your Wallet
            </Button>
          </Box>
          <Box>
            <Button
              borderRadius="30px"
              variant="secondary"
              leftIcon={<IoPersonCircleSharp color="white" />}
            >
              Gojo Satoru
            </Button>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopBar;
