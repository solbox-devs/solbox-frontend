"use client";
import EarningHistory from "@/components/dashboard/EarningHistory";
import Information from "@/components/dashboard/Information";
import UsersTable from "@/components/dashboard/UsersTable";
import authService from "@/services/authService";
import packageService from "@/services/packageService";
import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  List,
  ListItem,
  ListIcon,
  Icon,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { CheckIcon } from "@chakra-ui/icons"; // For the checkmark icon

const PACKAGES = {
  basic: {
    price: 0.01,
    matrixType: "1x3",
    name: "Basic Package",
    maxDirectReferrals: 3,
    features: [
      "Advanced Budgeting and Savings",
      "Custom Financial Recommendations",
      "Real-Time Spending Alerts",
    ],
  },
  standard: {
    price: 0.02,
    matrixType: "1x5",
    name: "Standard Package",
    maxDirectReferrals: 5,
    features: [
      "Advanced Budgeting and Savings",
      "Custom Financial Recommendations",
      "Real-Time Spending Alerts",
    ],
  },
  premium: {
    price: 0.04,
    matrixType: "1x10",
    name: "Premium Package",
    maxDirectReferrals: 10,
    features: [
      "Advanced Budgeting and Savings",
      "Custom Financial Recommendations",
      "Real-Time Spending Alerts",
    ],
  },
};

const AdminMainPage = () => {
  const [user, setUser] = useState({});
  const [solBalance, setSolBalance] = useState(null);
  const [activePackage, setActivePackage] = useState(null); // Store the active package key (e.g., "basic")
  const { publicKey } = useWallet();

  // Fetch user details
  const fetchUser = useCallback(async () => {
    const userDetails: any = authService.getUser();
    const parsedDetails = JSON.parse(userDetails);
    const res = await authService.getUserById({ id: parsedDetails?._id });
    setUser(res?.user);
  }, []);

  // Fetch user package details to determine the active package
  const getUserPackageDetails = useCallback(async () => {
    const userDetails: any = authService.getUser();
    const parsedDetails = JSON.parse(userDetails);
    const res = await packageService.getUserPackage(parsedDetails?._id);
    if (res && res.packageDetails) {
      setActivePackage(res.packageDetails.type); // Assuming response returns a key like "basic", "standard", or "premium"
    }
    console.log("Package response:", res);
  }, []);

  useEffect(() => {
    fetchUser();
    getUserPackageDetails();
  }, [fetchUser, getUserPackageDetails]);

  // Fetch SOL balance
  useEffect(() => {
    const getSolBalance = async () => {
      if (!publicKey) {
        setSolBalance(null);
        return;
      }
      try {
        const connection = new Connection(
          "https://burned-quiet-panorama.solana-devnet.quiknode.pro/f374066129211f77edd4b85776034c91787c99c3",
          "confirmed"
        );
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
        setSolBalance(balanceInSol);
      } catch (error) {
        console.error("Error fetching SOL balance:", error);
        setSolBalance(null);
      }
    };
    getSolBalance();
  }, [publicKey]);

  return (
    <Box my={5}>
      <Text fontWeight={500} fontSize={{ base: "md", md: "lg" }}>
        Dashboard
      </Text>
      <Box my={2}>
        <Information user={user} solBalance={solBalance} />
      </Box>

      <SimpleGrid
        my={4}
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={4}
        gridTemplateColumns={{ base: "1fr", lg: "2fr 1fr" }}
      >
        <Box>
          <Box my={2}>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Copy Referral Code
              </Text>
              <Box borderRadius="md" p={2} bg="#262D33">
                <Flex alignItems="center" gap={10} justify="space-between">
                  <Text fontSize={{ base: "xs", md: "md" }} color="gray.100">
                    https://solbox.com/signup?code=13ncn833
                  </Text>
                  <Button
                    variant="secondary"
                    borderRadius="3xl"
                    leftIcon={<CopyIcon />}
                    size="sm"
                  >
                    Copy link
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
          <EarningHistory />
          <Box my={4}>
            <Text fontSize="md" fontWeight={500} mb={1}>
              Referral Table
            </Text>
            <UsersTable />
          </Box>
        </Box>
        <Box h="100vh">
          <Box w="full" p={4} bg="#262D33" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Your Current Package
            </Text>
            {activePackage ? (
              <Box
                p={4}
                bg="#FFFFFF1A"
                borderRadius="md"
                boxShadow="md"
                color="#FFFFFF"
              >
                <Flex alignItems="center" justifyContent="space-between" mb={2}>
                  <Box
                    h={10}
                    w={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="#262D33"
                    borderRadius="md"
                  >
                    <Icon
                      as={BsFillRocketTakeoffFill}
                      fontSize={20}
                      color="#808080"
                    />
                  </Box>
                </Flex>
                <Box my={6} mb={8}>
                  <Text fontSize="2xl" fontWeight={500}>
                    {PACKAGES[activePackage].price} SOL
                  </Text>
                  <Text fontSize="sm" fontWeight={400} color="#FAFAFA" mb={4}>
                    Up to {PACKAGES[activePackage].maxDirectReferrals} direct
                    connections ({PACKAGES[activePackage].matrixType} matrix
                    referral)
                  </Text>
                  {/* <Text fontSize="md" fontWeight="bold" mb={4} mt={8}>
                    What’s Included:
                  </Text>
                  <List spacing={4}>
                    {PACKAGES[activePackage].features.map((feature, idx) => (
                      <ListItem key={idx} display="flex" alignItems="center">
                        <ListIcon as={CheckIcon} color="#38A169" />
                        <Text fontSize="sm" color="#FAFAFA">
                          {feature}
                        </Text>
                      </ListItem>
                    ))}
                  </List> */}
                </Box>
                <Button
                  mt={6}
                  w="full"
                  borderRadius="3xl"
                  bg="#9333EA" // Purple as shown in the image
                  color="#FFFFFF"
                  _hover={{ bg: "#7E22CE" }}
                >
                  Get Started
                </Button>
              </Box>
            ) : (
              // If no active package, show the list of static packages
              Object.keys(PACKAGES).map((key, idx) => {
                const pkg = PACKAGES[key];
                return (
                  <Box p={3} borderRadius="md" bg="#FFFFFF1A" key={idx} mb={5}>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Box
                        h={10}
                        w={10}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="#FFFFFF1A"
                        boxShadow="md"
                        borderRadius="md"
                      >
                        <BsFillRocketTakeoffFill fontSize={20} />
                      </Box>
                      <Box
                        fontSize="sm"
                        p={2}
                        borderRadius="3xl"
                        bg="#FFFFFF1A"
                      >
                        {pkg.name}
                      </Box>
                    </Flex>
                    <Box mt={2}>
                      <Text fontSize="2xl" fontWeight={500}>
                        {pkg.price} SOL
                      </Text>
                      <Text fontSize="sm" fontWeight={400} color="#FAFAFA">
                        Up to {pkg.maxDirectReferrals} direct connections (
                        {pkg.matrixType} matrix)
                      </Text>
                    </Box>
                    <Button
                      borderRadius="3xl"
                      bg="transparent"
                      border="2px solid #FAFAFA"
                      color="#FAFAFA"
                      fontWeight="normal"
                      w="100%"
                      mt={2}
                      _hover={{
                        background: "transparent",
                      }}
                    >
                      Select Plan
                    </Button>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AdminMainPage;
