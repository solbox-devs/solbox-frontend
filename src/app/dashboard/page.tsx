"use client";
import EarningHistory from "@/components/dashboard/EarningHistory";
import Information from "@/components/dashboard/Information";
import UsersTable from "@/components/dashboard/UsersTable";
import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

const AdminMainPage = () => {
  return (
    <Box my={5}>
      <Text fontWeight={500} fontSize={{ base: "md", md: "lg" }}>
        Dashboard
      </Text>
      <Box my={2}>
        <Information />
      </Box>

      <SimpleGrid
        my={4}
        columns={{ base: 1, md: 1, lg: 2 }}
        spacing={4}
        gridTemplateColumns={{ base: "1fr", lg: "2fr 1fr" }}
      >
        <Box>
          <Box my={2}>
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Copy Referral Code
              </Text>
              <Box borderRadius="md" p={2} bg="#262D33">
                <Flex alignItems="center" gap={10} justify="space-between">
                  <Text fontSize={{ base: "xs", md: "md" }} color="gray.100">
                    https://solbox.com/signup?code=13ncn833
                  </Text>
                  <Button
                    variant="secondary"
                    borderRadius="3xl"
                    leftIcon={<CopyIcon />}
                    size="sm"
                    // fontSize="10px"
                  >
                    Copy link
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Box>
          <EarningHistory />
          <Box my={4}>
            <Text fontSize="md" fontWeight={500} mb={1}>
              Referral Table
            </Text>
            <UsersTable />
          </Box>
        </Box>
        <Box h="100vh">
          <Box w="full" p={4} bg="#262D33" borderRadius="md">
            <Text fontSize="md" fontWeight={500} color="#FFFFFF">
              Packages
            </Text>
            {Array(3)
              .fill(null)
              .map((item, idx) => {
                return (
                  <Box p={3} borderRadius="md" bg="#FFFFFF1A" key={idx} mb={5}>
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
                      <Box
                        fontSize="sm"
                        p={2}
                        borderRadius="3xl"
                        bg="#FFFFFF1A"
                      >
                        Stater Plan
                      </Box>
                    </Flex>
                    <Box mt={2}>
                      <Text fontSize="2xl" fontWeight={500}>
                        0.5 SOL
                      </Text>
                      <Text fontSize="sm" fontWeight={400} color="#FAFAFA">
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
                    >
                      User Current Plan
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default AdminMainPage;
