"use client";

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

const data = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatar1.png",
    date: "2024-02-19",
    referrals: 15,
    profit: "$1200",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatar2.png",
    date: "2024-02-18",
    referrals: 20,
    profit: "$1500",
  },
  {
    id: 3,
    name: "Alex Brown",
    avatar: "/avatar3.png",
    date: "2024-02-17",
    referrals: 10,
    profit: "$800",
  },
];

const UsersTable = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="full" p={4} bg="#262D33" borderRadius="md">
      {/* Desktop View */}
      {!isMobile && (
        <Table variant="simple">
          <Thead>
            <Tr borderBottom="2px solid #FFFFFF1A">
              <Th color="#FFFFFF">Users Name</Th>
              <Th color="#FFFFFF">Date</Th>
              <Th color="#FFFFFF">Total Referrals</Th>
              <Th color="#FFFFFF">Profit</Th>
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
                <Td color="#FFFFFF">{user.referrals}</Td>
                <Td color="#FFFFFF">{user.profit}</Td>
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
                    <b>Total Referrals:</b> {user.referrals}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Profit:</b> {user.profit}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UsersTable;
