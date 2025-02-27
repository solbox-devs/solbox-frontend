/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
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
import { GiHamburgerMenu } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";
import authService from "../../services/authService";
import SolanaWalletButton from "../core/SolanaWalletButton";

interface TopBarProps {
  onOpen: () => void;
}

const TopBar = ({ onOpen }: TopBarProps) => {
  // const userDetails: any = authService.getUser();
  // const parsedUserDetails = JSON.parse(userDetails);

  const userDetails: any = authService.getUser();
  let parsedUserDetails = null;

  try {
    if (userDetails) {
      parsedUserDetails =
        typeof userDetails === "string" ? JSON.parse(userDetails) : userDetails;
    }
  } catch (error) {
    console.error("Failed to parse user details:", error);
  }

  return (
    <Box w="97%" mx="auto" bg="#262D33" p={3} borderRadius={10}>
      <Flex
        justify="space-between"
        // align="center"
        flexDir={{ base: "column", md: "row" }}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Text fontSize="sm">Saturday, November 18</Text>
            <Text fontSize="lg" fontWeight={400}>
              Good after noon, {parsedUserDetails?.username}
            </Text>
          </Box>
          <Box
            cursor="pointer"
            display={{ base: "block", md: "none" }}
            onClick={() => onOpen()}
          >
            <GiHamburgerMenu fontSize="30px" color="white" />
          </Box>
        </Flex>
        <Flex alignItems="center" gap={4}>
          <Box display={{ base: "none", md: "block" }}>
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
            {/* <Button
              borderRadius="30px"
              variant="primary"
              leftIcon={<FaWallet color="white" />}
            >
              Your Wallet
            </Button> */}

            <SolanaWalletButton />
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default TopBar;
