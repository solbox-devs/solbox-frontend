"use client";

import authService from "@/services/authService";
import referralService from "@/services/referralService";
import { ChevronUpIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

// Define types for the API response
interface Parent {
  username: string;
  walletAddress: string;
  earnings: number;
  package: string;
}

interface Referral {
  username: string;
  walletAddress: string;
  earnings: number;
  package: string;
  createdAt: string;
  referralCount: number;
  level: number;
  commissionFromReferral: number;
  parent: Parent;
}

interface LevelStat {
  level: number;
  count: number;
  earnings: number;
}

interface Summary {
  totalTeamSize: number;
  totalTeamEarnings: number;
  averageEarningsPerReferral: number;
  mostActiveLevel: LevelStat;
}

interface ApiResponse {
  success: boolean;
  data: {
    user: Parent;
    referrals: Referral[];
    totalReferrals: number;
    totalEarnings: number;
    maxLevel: number;
    levelStats: LevelStat[];
    summary: Summary;
  };
}

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const formatSOL = (amount: number) => {
  return `${amount.toFixed(3)} SOL`;
};

const formatUSD = (solAmount: number) => {
  // Assuming 1 SOL = $100 for this example
  const usdAmount = solAmount * 100;
  return `$${usdAmount.toFixed(2)}`;
};

const generateTransactionId = (walletAddress: string) => {
  // Generate a transaction ID based on the wallet address
  const start = walletAddress.substring(0, 3);
  const end = walletAddress.substring(walletAddress.length - 3);
  return `${start} - ${end}`;
};

// Custom Pie Chart Component
function EarningPieChart({ percentage = 16 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = 120;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Center of the circle
    const centerX = size / 2;
    const centerY = size / 2;

    // Outer radius for the progress ring
    const outerRadius = 45;
    const innerRadius = 35;

    // Background circle (dark fill)
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius - 7, 0, Math.PI * 2);
    ctx.fillStyle = "#0F2C3A";
    ctx.fill();

    // Calculate angles for the progress arc
    const startAngle = Math.PI * 1.5; // Start from top (90 degrees in radians)
    const endAngle = startAngle + (Math.PI * 2 * percentage) / 100;

    // Create gradient for the progress arc
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#9D48C7");
    gradient.addColorStop(0.5, "#615FFF");
    gradient.addColorStop(1, "#275165");

    // Draw progress arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw remaining arc (empty space)
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, endAngle, startAngle + Math.PI * 2);
    ctx.arc(
      centerX,
      centerY,
      innerRadius,
      startAngle + Math.PI * 2,
      endAngle,
      true
    );
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fill();
  }, [percentage]);

  return (
    <Box position="relative" width={120} height={120}>
      <canvas ref={canvasRef} style={{ width: "120px", height: "120px" }} />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <ChevronUpIcon color="white" boxSize={3} />
        <Text fontSize="14px" fontWeight="bold" color="white">
          {percentage}%
        </Text>
      </Box>
    </Box>
  );
}

export default function EarningsDashboard() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [currencyType, setCurrencyType] = useState<"SOL" | "USD">("SOL");
  const [earningsData, setEarningsData] = useState<ApiResponse | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const getAllEarningsAndReferral = async () => {
    try {
      setLoading(true);
      const userDetails: any = authService.getUser();
      const parsedDetails = JSON.parse(userDetails);

      const res = await referralService.getAllReferrals(
        parsedDetails?.walletAddress
      );

      if (res.success) {
        setEarningsData(res as ApiResponse);

        // Process referrals data for the table
        const processedData = res.data.referrals.map((referral: Referral) => ({
          id: referral.walletAddress,
          name: referral.username,
          avatar: `/placeholder.svg?height=32&width=32`,
          date: formatDate(referral.createdAt),
          level: referral.level.toString(),
          commission: formatSOL(referral.commissionFromReferral),
          amount: formatUSD(referral.commissionFromReferral),
          package:
            referral.package.charAt(0).toUpperCase() +
            referral.package.slice(1), // Capitalize first letter
          transactionId: generateTransactionId(referral.walletAddress),
        }));

        setTableData(processedData);
      } else {
        toast({
          title: "Error fetching data",
          description: "Could not fetch earnings data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // Set default data if API fails
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching earnings data:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching your earnings data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      // Set default data if API fails
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEarningsAndReferral();
  }, []);

  // Calculate progress percentage based on earnings or use default
  const progressPercentage = earningsData
    ? Math.min(Math.round((earningsData.data.totalEarnings / 0.05) * 100), 100)
    : 16;

  // Format user's balance based on selected currency
  const userBalance =
    earningsData && currencyType === "SOL"
      ? `${earningsData.data.user.earnings.toFixed(3)} SOL`
      : "$1000 000, 00"; // Default value as in the design

  return (
    <Box bg="#121212" color="white" minH="100vh" p={4}>
      <Heading as="h1" fontSize="xl" fontWeight={500} mb={5}>
        Earnings Page
      </Heading>

      {/* Balance Card */}
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="120px">
            <Spinner size="xl" color="#9D48C7" thickness="4px" />
          </Flex>
        ) : (
          <Flex alignItems="center" gap={5}>
            <Box>
              <EarningPieChart percentage={progressPercentage} />
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight={300} color="gray.400">
                My Balance
              </Text>
              <Text fontSize="2xl" fontWeight={500}>
                {userBalance}
              </Text>
              <Flex
                fontSize="sm"
                fontWeight={300}
                color="gray.400"
                alignItems="center"
              >
                Show Amount Balance in
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="link"
                    color="#9D48C7"
                    px={1}
                    fontSize="sm"
                  >
                    {currencyType}
                  </MenuButton>
                  <MenuList bg="#1E2429">
                    <MenuItem
                      bg="#1E2429"
                      _hover={{ bg: "#2D3748" }}
                      onClick={() => setCurrencyType("SOL")}
                    >
                      SOL
                    </MenuItem>
                    <MenuItem
                      bg="#1E2429"
                      _hover={{ bg: "#2D3748" }}
                      onClick={() => setCurrencyType("USD")}
                    >
                      USD
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </Flex>
        )}
      </Box>

      {/* Earnings Table */}
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Text fontSize="md" fontWeight={500} my={4}>
          Total earnings per user
        </Text>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="200px">
            <Spinner size="xl" color="#9D48C7" thickness="4px" />
          </Flex>
        ) : tableData.length > 0 ? (
          <>
            <Table variant="simple">
              <Thead>
                <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
                  <Th color="#FFFFFF">Name</Th>
                  <Th color="#FFFFFF">Date</Th>
                  <Th color="#FFFFFF">Level</Th>
                  <Th color="#FFFFFF">Commission</Th>
                  <Th color="#FFFFFF">Amount</Th>
                  <Th color="#FFFFFF">Package</Th>
                  <Th color="#FFFFFF">Wallet Address</Th>
                  {/* <Th color="#FFFFFF">Action</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row) => (
                  <Tr key={row.id} borderBottom="2px solid #FFFFFF1A">
                    <Td>
                      <Stack direction="row" align="center">
                        <Avatar size="sm" src={row.avatar} name={row.name} />
                        <Text color="#FFFFFF">{row.name}</Text>
                      </Stack>
                    </Td>
                    <Td color="#FFFFFF">{row.date}</Td>
                    <Td color="#FFFFFF">{row.level}</Td>
                    <Td color="#FFFFFF">{row.commission}</Td>
                    <Td color="#FFFFFF">{row.amount}</Td>
                    <Td color="#FFFFFF">{row.package}</Td>
                    <Td color="#FFFFFF">
                      <Link
                        href="#"
                        color="#FFFFFF"
                        textDecoration="none"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {row.transactionId}
                      </Link>
                    </Td>
                    {/* <Td>
                      <Stack direction="row" spacing={2}>
                        <DeleteIcon cursor="pointer" />
                        <EditIcon cursor="pointer" />
                      </Stack>
                    </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {/* Desktop View */}
            {/* {!isMobile && (
              <Table variant="simple">
                <Thead>
                  <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
                    <Th color="#FFFFFF">Name</Th>
                    <Th color="#FFFFFF">Date</Th>
                    <Th color="#FFFFFF">Level</Th>
                    <Th color="#FFFFFF">Commission</Th>
                    <Th color="#FFFFFF">Amount</Th>
                    <Th color="#FFFFFF">Package</Th>
                    <Th color="#FFFFFF">Transaction ID</Th>
                    <Th color="#FFFFFF">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableData.map((row) => (
                    <Tr key={row.id} borderBottom="2px solid #FFFFFF1A">
                      <Td>
                        <Stack direction="row" align="center">
                          <Avatar size="sm" src={row.avatar} name={row.name} />
                          <Text color="#FFFFFF">{row.name}</Text>
                        </Stack>
                      </Td>
                      <Td color="#FFFFFF">{row.date}</Td>
                      <Td color="#FFFFFF">{row.level}</Td>
                      <Td color="#FFFFFF">{row.commission}</Td>
                      <Td color="#FFFFFF">{row.amount}</Td>
                      <Td color="#FFFFFF">{row.package}</Td>
                      <Td color="#FFFFFF">
                        <Link
                          href="#"
                          color="#FFFFFF"
                          textDecoration="none"
                          _hover={{ textDecoration: "underline" }}
                        >
                          {row.transactionId}
                        </Link>
                      </Td>
                      <Td>
                        <Stack direction="row" spacing={2}>
                          <DeleteIcon cursor="pointer" />
                          <EditIcon cursor="pointer" />
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )} */}

            {/* Mobile View (Card Layout) */}
            {/* {isMobile && (
              <Stack spacing={4}>
                {tableData.map((row) => (
                  <Card
                    key={row.id}
                    p={4}
                    boxShadow="md"
                    borderRadius="lg"
                    bg="#1E2429"
                  >
                    <CardBody>
                      <Stack spacing={2}>
                        <Stack direction="row" align="center">
                          <Avatar size="md" src={row.avatar} name={row.name} />
                          <Text fontSize="lg" color="#FFFFFF">
                            {row.name}
                          </Text>
                        </Stack>
                        <Text color="#FFFFFF">
                          <b>Date:</b> {row.date}
                        </Text>
                        <Text color="#FFFFFF">
                          <b>Level:</b> {row.level}
                        </Text>
                        <Text color="#FFFFFF">
                          <b>Commission:</b> {row.commission}
                        </Text>
                        <Text color="#FFFFFF">
                          <b>Amount:</b> {row.amount}
                        </Text>
                        <Text color="#FFFFFF">
                          <b>Package:</b> {row.package}
                        </Text>
                        <Text color="#FFFFFF">
                          <b>Transaction ID:</b> {row.transactionId}
                        </Text>
                        <Stack direction="row" spacing={2} mt={2}>
                          <DeleteIcon cursor="pointer" />
                          <EditIcon cursor="pointer" />
                        </Stack>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            )} */}
          </>
        ) : (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.400">
              No referrals found
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
