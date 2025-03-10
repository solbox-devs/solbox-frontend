"use client";
import UserDetails from "@/components/profile/UserDetails";
import UserOrganization from "@/components/profile/UserOrganization";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { MdAppBlocking, MdUpgrade } from "react-icons/md";

const ProfilePage = () => {
  return (
    <Box>
      <SimpleGrid
        my={4}
        columns={{ base: 1, md: 2 }}
        spacing={4}
        gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}
      >
        <Box>
          <UserDetails />
          <Flex alignItems="center" gap={4}>
            <Button
              variant="primary"
              leftIcon={<MdAppBlocking />}
              borderRadius="3xl"
            >
              Block list
            </Button>
            <Button
              variant="primary"
              leftIcon={<MdUpgrade />}
              borderRadius="3xl"
            >
              Upgrade Package
            </Button>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight={500} mb={4}>
            User Organization
          </Text>
          <UserOrganization />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfilePage;
