"use client";

import {
  Avatar,
  Box,
  Card,
  CardBody,
  Checkbox,
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
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatar1.png",
    wallet: "0x123...abc",
    level: "Gold",
    commission: "$200",
    referrer: "Alice",
    totalDirects: 15,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/avatar2.png",
    wallet: "0x456...def",
    level: "Platinum",
    commission: "$300",
    referrer: "Bob",
    totalDirects: 20,
  },
  {
    id: 3,
    name: "Alex Brown",
    avatar: "/avatar3.png",
    wallet: "0x789...ghi",
    level: "Silver",
    commission: "$150",
    referrer: "Charlie",
    totalDirects: 10,
  },
];

const MyReferralsTable = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(data.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <Box w="full" p={4} borderRadius="md">
      {/* Desktop View */}
      {!isMobile && (
        <Table variant="simple">
          <Thead>
            <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
              <Th color="#FFFFFF">
                <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
              </Th>
              <Th color="#FFFFFF">Users Name</Th>
              <Th color="#FFFFFF">Wallet Address</Th>
              <Th color="#FFFFFF">Level</Th>
              <Th color="#FFFFFF">Commission</Th>
              <Th color="#FFFFFF">Referrer</Th>
              <Th color="#FFFFFF">Total Directs</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((user) => (
              <Tr key={user.id} borderBottom="2px solid #FFFFFF1A">
                <Td>
                  <Checkbox
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </Td>
                <Td>
                  <Stack direction="row" align="center">
                    <Avatar size="sm" src={user.avatar} name={user.name} />
                    <Text color="#FFFFFF">{user.name}</Text>
                  </Stack>
                </Td>
                <Td color="#FFFFFF">{user.wallet}</Td>
                <Td color="#FFFFFF">{user.level}</Td>
                <Td color="#FFFFFF">{user.commission}</Td>
                <Td color="#FFFFFF">{user.referrer}</Td>
                <Td color="#FFFFFF">{user.totalDirects}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Mobile View (Card Layout) */}
      {isMobile && (
        <Stack spacing={4}>
          <Checkbox
            isChecked={selectAll}
            onChange={handleSelectAll}
            color="#FFFFFF"
          >
            Select All
          </Checkbox>
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
                    <Checkbox
                      isChecked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      colorScheme="blue"
                    />
                    <Avatar size="md" src={user.avatar} name={user.name} />
                    <Text fontSize="lg" color="#FFFFFF">
                      {user.name}
                    </Text>
                  </Stack>
                  <Text color="#FFFFFF">
                    <b>Wallet Address:</b> {user.wallet}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Level:</b> {user.level}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Commission:</b> {user.commission}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Referrer:</b> {user.referrer}
                  </Text>
                  <Text color="#FFFFFF">
                    <b>Total Directs:</b> {user.totalDirects}
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

export default MyReferralsTable;
