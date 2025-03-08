"use client";
import {
  formatFraction,
  formatNumber,
  formatReadableNumber,
} from "@/lib/formatNumber";
import { getCryptoCurrencies } from "@/services/coingecko";
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
interface CryptoCurrency {
  id: string;
  name: string;
  image: string;
  current_price: number;
  atl: number;
  price_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap: number;
  high_24h: number;
  market_cap_rank: number;
  circulating_supply: number;
  total_supply?: number;
}

const CurrenciesTable = () => {
  const [topCurrency, setTopCurrency] = useState<CryptoCurrency[]>([]);

  useEffect(() => {
    const fetchTopCryptocurrencies = async () => {
      const data = await getCryptoCurrencies();
      setTopCurrency(data);
      console.log(data);
    };
    fetchTopCryptocurrencies();
  }, []);

  return (
    <Box w="full" p={4} borderRadius="md">
      {/* Desktop View */}

      <Table variant="simple" display={{ base: "none", md: "block" }}>
        <Thead>
          <Tr borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
            <Th color="#FFFFFF">Coin</Th>
            <Th color="#FFFFFF">Symbol</Th>
            <Th color="#FFFFFF">Price</Th>
            <Th color="#FFFFFF">24h</Th>
            <Th color="#FFFFFF">Market Cap</Th>
            <Th color="#FFFFFF">Supply</Th>
          </Tr>
        </Thead>
        <Tbody>
          {topCurrency?.map((user) => (
            <Tr key={user.id} borderBottom="2px solid #FFFFFF1A">
              <Td>
                <Stack direction="row" align="center">
                  <Avatar size="sm" src={user.image} name={user.name} />
                  <Text color="#FFFFFF">{user.name}</Text>
                </Stack>
              </Td>
              <Td color="#FFFFFF">{user.name}</Td>
              <Td color="#FFFFFF">
                $ {formatReadableNumber(user.current_price)}
              </Td>
              <Td color="#FFFFFF">{user.market_cap_change_percentage_24h}</Td>
              <Td color="#FFFFFF">$ {formatNumber(user.market_cap)}</Td>
              <Td color="#FFFFFF">
                {formatFraction(user.circulating_supply, user?.total_supply)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Mobile View */}
      <Stack spacing={4} display={{ base: "block", md: "none" }}>
        {topCurrency.map((user) => (
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
                  <Avatar size="md" src={user.image} name={user.name} />
                  <Text fontSize="lg" color="#FFFFFF">
                    {user.name}
                  </Text>
                </Stack>
                <Text color="#FFFFFF">
                  <b>Price:</b> $ {formatReadableNumber(user.current_price)}
                </Text>
                <Text color="#FFFFFF">
                  <b>24h Change:</b> {user.market_cap_change_percentage_24h}%
                </Text>
                <Text color="#FFFFFF">
                  <b>Market Cap:</b> $ {formatNumber(user.market_cap)}
                </Text>
                <Text color="#FFFFFF">
                  <b>Supply:</b>{" "}
                  {formatFraction(user.circulating_supply, user?.total_supply)}
                </Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CurrenciesTable;
