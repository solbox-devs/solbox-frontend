"use client";

import { truncateString } from "@/lib/formatNumber";
import { ArrowUpIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";

const demoData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/40",
    symbol: "ETH",
    contract_address: "0x1234567890abcdef1234567890abcdef12345678",
    asset_platform_id: "Ethereum",
    amount: "1.5 ETH",
    commission: "5%",
    levels: "3",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    symbol: "BTC",
    contract_address: "0xabcdef1234567890abcdef1234567890abcdef12",
    asset_platform_id: "Bitcoin",
    amount: "0.8 BTC",
    commission: "3%",
    levels: "2",
    status: "Pending",
  },
];

const AdminFunctionTable = () => {
  return (
    <Box w="full">
      <TableContainer overflowY="auto" display={{ base: "none", md: "block" }}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
              <Th color="#FFFFFF">Username</Th>
              <Th color="#FFFFFF">Referral Person</Th>
              <Th color="#FFFFFF">Amount</Th>
              <Th color="#FFFFFF">Wallet Address</Th>
              <Th color="#FFFFFF">Commission %</Th>
              <Th color="#FFFFFF">Levels</Th>
              <Th color="#FFFFFF">Status</Th>
              <Th color="#FFFFFF">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {demoData.map((user) => (
              <Tr key={user.id} borderBottom="2px solid #FFFFFF1A">
                <Td>
                  <Link href="/admin/profile" passHref>
                    <Stack direction="row" align="center">
                      <Avatar size="sm" src={user.avatar} name={user.name} />
                      <Text color="#FFFFFF">{user.name}</Text>
                    </Stack>
                  </Link>
                </Td>
                <Td color="#FFFFFF">{user.symbol}</Td>
                <Td color="#FFFFFF">{user.amount}</Td>
                <Td color="#FFFFFF">
                  {truncateString(user.contract_address, 6, 15)}
                </Td>
                <Td color="#FFFFFF">{user.commission}</Td>
                <Td color="#FFFFFF">{user.levels}</Td>
                <Td color="#FFFFFF">{user.status}</Td>
                <Td>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      size="sm"
                      bg="none"
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      color="white"
                    />
                    <IconButton
                      color="white"
                      size="sm"
                      bg="none"
                      icon={<EditIcon />}
                      aria-label="Edit"
                    />
                    <IconButton
                      color="white"
                      size="sm"
                      bg="none"
                      icon={<ArrowUpIcon />}
                      aria-label="Upgrade"
                    />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Mobile View */}
      <Stack spacing={4} display={{ base: "block", md: "none" }}>
        {demoData.map((user) => (
          <Card
            key={user.id}
            p={4}
            boxShadow="md"
            borderRadius="lg"
            bg="#1E2429"
            mb={2}
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
                  <b>Symbol:</b> {user.symbol}
                </Text>
                <Text color="#FFFFFF">
                  <b>Amount:</b> {user.amount}
                </Text>
                <Text color="#FFFFFF">
                  <b>Contract Address:</b>{" "}
                  {truncateString(user.contract_address, 6, 15)}
                </Text>
                <Text color="#FFFFFF">
                  <b>Blockchain:</b> {user.asset_platform_id}
                </Text>
                <Text color="#FFFFFF">
                  <b>Commission:</b> {user.commission}
                </Text>
                <Text color="#FFFFFF">
                  <b>Levels:</b> {user.levels}
                </Text>
                <Text color="#FFFFFF">
                  <b>Status:</b> {user.status}
                </Text>
                <Stack direction="row" spacing={2} mt={2}>
                  <IconButton icon={<DeleteIcon />} aria-label="Delete" />
                  <IconButton icon={<EditIcon />} aria-label="Edit" />
                  <IconButton icon={<ArrowUpIcon />} aria-label="Upgrade" />
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminFunctionTable;
