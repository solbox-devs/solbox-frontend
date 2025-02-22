"use client";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";

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
            <Menu>
              <MenuButton
                borderRadius="2xl"
                as={Button}
                leftIcon={<RiProfileFill />}
                rightIcon={<ChevronDownIcon />}
              >
                Profile
              </MenuButton>
              <MenuList>
                <Link href="/dashboard/profile" passHref>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem>Create a Copy</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default TopBar;
