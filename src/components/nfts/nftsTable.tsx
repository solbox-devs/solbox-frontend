"use client";

import { truncateString } from "@/lib/formatNumber";
import { getNFTCollections } from "@/services/coingecko";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NftsTable = () => {
  const [topNft, setTopNFT] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopNfts = async () => {
      const data = await getNFTCollections();
      console.log(data);
      setTopNFT(data);
    };
    fetchTopNfts();
  }, []);

  return (
    <Box p={4} borderRadius="md" w="100%">
      {/* Desktop View */}

      <Table
        variant="simple"
        size={{ base: "sm", md: "md" }}
        display={{ base: "none", md: "block" }}
        w="100%"
      >
        <Thead>
          <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
            <Th color="#FFFFFF">NFT</Th>
            <Th color="#FFFFFF"> Symbol</Th>
            <Th color="#FFFFFF">Contract Address</Th>
            <Th color="#FFFFFF">Blockchain</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topNft.map((user) => (
            <Tr key={user.id} borderBottom="2px solid #FFFFFF1A">
              <Td>
                <Stack direction="row" align="center">
                  <Avatar size="sm" src={user.avatar} name={user.name} />
                  <Text color="#FFFFFF">{user.name}</Text>
                </Stack>
              </Td>
              <Td color="#FFFFFF">{user.symbol}</Td>
              <Td color="#FFFFFF">
                {truncateString(user.contract_address, 6, 15)}
              </Td>
              <Td color="#FFFFFF">{user.asset_platform_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Mobile View */}
      <Stack spacing={4} display={{ base: "block", md: "none" }}>
        {topNft.map((user) => (
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
                  <b>Contract Address:</b>{" "}
                  {truncateString(user.contract_address, 6, 15)}
                </Text>
                <Text color="#FFFFFF">
                  <b>Blockchain:</b> {user.asset_platform_id}
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
    </Box>
  );
};

export default NftsTable;
