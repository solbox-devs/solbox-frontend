"use client";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaBan } from "react-icons/fa";

const data = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatar1.png",
    date: "2024-02-22",
    totalReferrals: 10,
    walletAddress: "0x1234...abcd",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatar2.png",
    date: "2024-02-21",
    totalReferrals: 15,
    walletAddress: "0x5678...efgh",
  },
  {
    id: 3,
    name: "Alex Brown",
    avatar: "/avatar3.png",
    date: "2024-02-20",
    totalReferrals: 7,
    walletAddress: "0x9abc...wxyz",
  },
];

const UserOrganization = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="full" p={4} borderRadius="md" bg="#262D33">
      {/* Desktop View */}
      {!isMobile && (
        <TableContainer h="500px" overflowY="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr borderBottom="2px solid #FFFFFF1A">
                <Th color="#FFFFFF" fontSize="10px">
                  User Name
                </Th>
                <Th color="#FFFFFF" fontSize="10px">
                  Date
                </Th>
                <Th color="#FFFFFF" fontSize="10px">
                  Total Referrals
                </Th>
                <Th color="#FFFFFF" fontSize="10px">
                  Wallet Address
                </Th>
                <Th color="#FFFFFF" fontSize="10px">
                  Action
                </Th>
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
                  <Td color="#FFFFFF">{user.totalReferrals}</Td>
                  <Td color="#FFFFFF">{user.walletAddress}</Td>
                  <Td>
                    <Stack direction="row" spacing={2}>
                      <DeleteIcon color="red.500" />
                      <EditIcon color="blue.500" />
                      <FaBan color="gray.500" />
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
                    <b>Total Referrals:</b> {user.totalReferrals}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Wallet Address:</b> {user.walletAddress}
                  </Text>
                  <Stack direction="row" spacing={2} mt={2}>
                    <DeleteIcon color="red.500" />
                    <EditIcon color="blue.500" />
                    <FaBan color="gray.500" />
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

export default UserOrganization;
