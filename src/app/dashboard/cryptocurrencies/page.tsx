import CurrenciesTable from "@/components/cryptocurrencies/CurrenciesTable";
import { Box, Text } from "@chakra-ui/react";

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
