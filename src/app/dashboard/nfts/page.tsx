import NftsTable from "@/components/nfts/nftsTable";
import { Box, Text } from "@chakra-ui/react";

const NFTHomePage = () => {
  return (
    <Box m={4}>
      <Text fontSize="xl" fontWeight={500}>
        Trending
      </Text>
      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Text fontSize="md" fontWeight={500} my={4}>
          Top NFTs
        </Text>
        <NftsTable />
      </Box>
    </Box>
  );
};

export default NFTHomePage;
