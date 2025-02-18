import EarningHistory from "@/components/admin/EarningHistory";
import Information from "@/components/admin/Information";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

const AdminMainPage = () => {
  return (
    <Box my={5}>
      <Text fontWeight={500} fontSize={{ base: "md", md: "lg" }}>
        Dashboard
      </Text>
      <Box my={2}>
        <Information />
      </Box>
      <SimpleGrid my={4} columns={{ base: 1, md: 2 }} spacing={4}>
        <Box flex={2}>
          <EarningHistory />
        </Box>
        <Box flex={1}>2</Box>
      </SimpleGrid>
    </Box>
  );
};

export default AdminMainPage;
