"use client";

import { getCryptoCurrencies } from "@/services/coingecko";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";

const data = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatar1.png",
    date: "2024-02-22",
    level: "Gold",
    commission: "$200",
    amount: "$500",
    package: "Pro",
    transactionId: "TXN12345",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatar2.png",
    date: "2024-02-21",
    level: "Platinum",
    commission: "$300",
    amount: "$700",
    package: "Elite",
    transactionId: "TXN67890",
  },
  {
    id: 3,
    name: "Alex Brown",
    avatar: "/avatar3.png",
    date: "2024-02-20",
    level: "Silver",
    commission: "$150",
    amount: "$400",
    package: "Basic",
    transactionId: "TXN11223",
  },
];

const CurrenciesTable = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchTopCryptocurrencies = async () => {
      const data = await getCryptoCurrencies();
      console.log(data);
    };
    fetchTopCryptocurrencies();

  }, []);

  return (
    <Box w="full" p={4} borderRadius="md">
      {/* Desktop View */}
      {!isMobile && (
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
            {data.map((user) => (
              <Tr key={user.id} borderBottom="2px solid #FFFFFF1A">
                <Td>
                  <Stack direction="row" align="center">
                    <Avatar size="sm" src={user.avatar} name={user.name} />
                    <Text color="#FFFFFF">{user.name}</Text>
                  </Stack>
                </Td>
                <Td color="#FFFFFF">{user.date}</Td>
                <Td color="#FFFFFF">{user.level}</Td>
                <Td color="#FFFFFF">{user.commission}</Td>
                <Td color="#FFFFFF">{user.amount}</Td>
                <Td color="#FFFFFF">{user.package}</Td>
                <Td color="#FFFFFF">{user.transactionId}</Td>
                <Td>
                  <Stack direction="row" spacing={2}>
                    <DeleteIcon />
                    <EditIcon />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Mobile View (Card Layout) */}
      {isMobile && (
        <Stack spacing={4}>
          {data.map((user) => (
            <Card
              key={user.id}
              p={4}
              boxShadow="md"
              borderRadius="lg"
              bg="#1E2429"
            >
              <CardBody>
                <Stack spacing={2}>
                  <Stack direction="row" align="center">
                    <Avatar size="md" src={user.avatar} name={user.name} />
                    <Text fontSize="lg" color="#FFFFFF">
                      {user.name}
                    </Text>
                  </Stack>
                  <Text color="#FFFFFF">
                    <b>Date:</b> {user.date}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Level:</b> {user.level}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Commission:</b> {user.commission}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Amount:</b> {user.amount}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Package:</b> {user.package}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Transaction ID:</b> {user.transactionId}
                  </Text>
                  <Stack direction="row" spacing={2} mt={2}>
                    <DeleteIcon />
                    <EditIcon />
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CurrenciesTable;
