import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaBuysellads } from "react-icons/fa";

const PackagePurchase = () => {
  return (
    <Box>
      <Box>
        <Text fontSize="xl" fontWeight={500} color="#FFFFFF" my={5}>
          Packages
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {Array(3)
            .fill(null)
            .map((item, idx) => {
              return (
                <Box p={3} borderRadius="md" bg="#262D33" key={idx} mb={5}>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box
                      h={10}
                      w={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="#FFFFFF1A"
                      boxShadow="md"
                      borderRadius="md"
                    >
                      <BsFillRocketTakeoffFill fontSize={20} />
                    </Box>
                    <Box fontSize="sm" p={2} borderRadius="3xl" bg="#FFFFFF1A">
                      Stater Plan
                    </Box>
                  </Flex>
                  <Box mt={2}>
                    <Text fontSize="2xl" fontWeight={500}>
                      0.5 SOL
                    </Text>
                    <Text fontSize="sm" fontWeight={400} color="#FAFAFA" mb={5}>
                      Upto 3 direct connections (3*3 matrix referral)
                    </Text>
                  </Box>
                  <Button
                    borderRadius="3xl"
                    bg="transparent"
                    border="2px solid #FAFAFA"
                    color="#FAFAFA"
                    fontWeight="normal"
                    w="100%"
                    mt={2}
                    _hover={{
                      background: "transparent",
                    }}
                    leftIcon={<FaBuysellads />}
                  >
                    User Current Plan
                  </Button>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
      <Box my={5} bg="#262D33" p={4} borderRadius="xl" minH="70vh">
        <Text fontSize="md" fontWeight={500} my={2}>
          Package Description
        </Text>
        <Text fontSize="sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dignissimos ab esse praesentium reiciendis magnam facilis autem illo
          assumenda sapiente nulla suscipit nisi, vitae porro provident rem
          accusamus cum sed placeat sit sequi et repellat deleniti eum. Eveniet
          qui dolorem illo iure id quaerat consectetur ad. Tempore
          necessitatibus odit modi!
        </Text>
      </Box>
    </Box>
  );
};

export default PackagePurchase;
