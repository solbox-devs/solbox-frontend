"use client";

import { truncateString } from "@/lib/formatNumber";
import {
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
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
    date: "2024-03-10",
    address_blocked: "0x1234567890abcdef1234567890abcdef12345678",
    reason: "Fraudulent Activity",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    date: "2024-02-25",
    address_blocked: "0xabcdef1234567890abcdef1234567890abcdef12",
    reason: "Scam Report",
    status: "Pending",
  },
];

const BlacklistPage = () => {
  return (
    <Box w="full" bg="#262D33" borderRadius="md">
      <Flex alignItems="center" justifyContent="space-between" p={4} mb={4}>
        <Text color="white">Blacklisted Address</Text>
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
              _focus={{ ring: "none", outline: "none", border: "none" }}
            />
          </InputGroup>
        </Box>
      </Flex>
      <TableContainer overflowY="auto" display={{ base: "none", md: "block" }}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
              <Th color="#FFFFFF">Name</Th>
              <Th color="#FFFFFF">Date</Th>
              <Th color="#FFFFFF">Address Blocked</Th>
              <Th color="#FFFFFF">Reason</Th>
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
                <Td color="#FFFFFF">{user.date}</Td>
                <Td color="#FFFFFF">
                  {truncateString(user.address_blocked, 6, 15)}
                </Td>
                <Td color="#FFFFFF">{user.reason}</Td>
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
                      size="sm"
                      bg="none"
                      icon={<EditIcon />}
                      aria-label="Edit"
                      color="white"
                    />
                    <IconButton
                      size="sm"
                      bg="none"
                      icon={<ArrowUpIcon />}
                      aria-label="Upgrade"
                      color="white"
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
                  <b>Date:</b> {user.date}
                </Text>
                <Text color="#FFFFFF">
                  <b>Address Blocked:</b>{" "}
                  {truncateString(user.address_blocked, 6, 15)}
                </Text>
                <Text color="#FFFFFF">
                  <b>Reason:</b> {user.reason}
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

export default BlacklistPage;
