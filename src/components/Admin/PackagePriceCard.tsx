import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { GoArrowUpRight } from "react-icons/go";

const PackagePriceCard = ({ item }: any) => {
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
          bg="#4ADE80"
          leftIcon={<GoArrowUpRight />}
        >
          46.9%
        </Button>
      </Flex>
      <Text fontSize="2xl" fontWeight={600} my={2}>
        {item.title}
      </Text>
      <Text fontSize="sm" color="gray.50" fontWeight={300}>
        Lorem ipsum dolor sit amet.
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mt={2}>
        <Box>
          <Text fontSize="3xl" fontWeight={500}>
            {item.user}
          </Text>
          <Text fontSize="sm">This Month</Text>
        </Box>
        <Box>
          <Image src={item.img.src} alt="image" />
        </Box>
      </Flex>
    </Box>
  );
};

export default PackagePriceCard;
