"use client";
import DynamicReferralTree from "@/components/referral/DynamicReferralTree";
import MyReferralsTable from "@/components/referral/MyReferralsTable";
import { CopyIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

const ReferralMainPage = () => {
  return (
    <Box m={5}>
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          My referrals Link
        </Text>
        <Box borderRadius="xl" p={2} bg="#262D33">
          <Flex alignItems="center" gap={10}>
            <Text fontSize="md" color="white">
              https://solbox.com/signup?code=13ncn833
            </Text>
            <Button
              variant="secondary"
              borderRadius="2xl"
              leftIcon={<CopyIcon />}
            >
              Copy link
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box my={5} borderRadius="xl" p={4} bg="#262D33">
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="md" fontWeight="bold">
              My Referrals
            </Text>
            <Text fontSize="xs" color="gray.400">
              You have total 45 user right now
            </Text>
          </Box>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search something..."
                borderRadius="20px"
                bg="#FFFFFF1A"
                outline="none"
                border="none"
                color="white"
                _focus={{
                  ring: "none",
                  outline: "none",
                  border: "none",
                }}
              />
            </InputGroup>
          </Box>
        </Flex>
        <Box mt={4}>
          <MyReferralsTable />
        </Box>
      </Box>
      <Box>
        <Text my={4} fontSize="xl" fontWeight={500}>
          Network Tree
        </Text>
        <DynamicReferralTree />
      </Box>
    </Box>
  );
};

export default ReferralMainPage;
