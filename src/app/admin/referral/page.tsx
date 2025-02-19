import DynamicReferralTree from "@/components/referral/DynamicReferralTree";
import { Box, Text } from "@chakra-ui/react";

const ReferralMainPage = () => {
  return (
    <Box m={5}>
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
