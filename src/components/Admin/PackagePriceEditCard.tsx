import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

const PackagePriceEditCard = ({ item }: any) => {
  return (
    <Box p={2} bg="#262D33" borderRadius="md">
      <Flex alignItems="center" justifyContent="space-between">
        <Box
          h={10}
          w={10}
          bg="#FFFFFF1A"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {item?.icon}
        </Box>
        <Button
          size="sm"
          borderRadius="3xl"
          bg="#FFFFFF1A"
          color="white"
          _hover={{ background: "#FFFFFF1A" }}
        >
          {item.plan}
        </Button>
      </Flex>
      <Text fontSize="2xl" fontWeight={600} my={2}>
        {item.title}
      </Text>
      <Text fontSize="sm" color="gray.50" fontWeight={300}>
        {item.subtitle}
      </Text>
      <Box mt={2}>
        <Button
          size="sm"
          borderRadius="2xl"
          variant="primary"
          leftIcon={<FaEdit />}
        >
          {" "}
          Edit Price Plan
        </Button>
      </Box>
    </Box>
  );
};

export default PackagePriceEditCard;
