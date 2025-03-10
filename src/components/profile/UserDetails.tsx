import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";

const UserDetails = () => {
  return (
    <Box>
      <Text fontSize="md" fontWeight={500}>
        User Details
      </Text>
      <Box>
        {/* <Flex justify="center" alignItems="center" flexDir="column" my={2}>
          <Image src={ProfilePic.src} alt="user pic" h={20} height={20} />
          <Text fontSize="md" fontWeight={500}>
            Emma Smith
          </Text>
          <Text fontSize="sm" fontWeight={300} color="#FFFFFFA1">
            eammasmith12@gmail.com
          </Text>
        </Flex> */}
        <Box my={4} p={2} borderRadius="xl" bg="#363D43">
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem border="none">
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={500}>
                  Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <Divider variant="primaryDivider" />
              <AccordionPanel pb={4}>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    No of First lines
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    2
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Total Downloads
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    5
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Packages
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    Elite Plan
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Total Commission Earned
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    20%
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Sponsor User
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    Y1TC5
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Referral ID
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    87984CTE8
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Wallet Address
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    asdklfaksdfjkl
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    User Name
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    William Smith
                  </Text>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetails;
