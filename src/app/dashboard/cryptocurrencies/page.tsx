import CurrenciesTable from "@/components/cryptocurrencies/CurrenciesTable";
import { getCryptoCurrencies } from "@/services/coingecko";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const TopCryptocurrenciesPage = () => {

  return (
    <Box m={4}>
      <Text fontSize="xl" fontWeight={500}>
        Trending
      </Text>
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Text fontSize="md" fontWeight={500} my={4}>
          Top Cryptocurrencies
        </Text>
        <CurrenciesTable />
      </Box>
    </Box>
  );
};

export default TopCryptocurrenciesPage;
