import ProfilePic from "@/assets/profile.png";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

const UserDetails = () => {
  return (
    <Box>
      <Text fontSize="md" fontWeight={500}>
        User Details
      </Text>
      <Box>
        <Flex justify="center" alignItems="center" flexDir="column" my={2}>
          <Image src={ProfilePic.src} alt="user pic" h={20} height={20} />
          <Text fontSize="md" fontWeight={500}>
            Emma Smith
          </Text>
          <Text fontSize="sm" fontWeight={300} color="#FFFFFFA1">
            eammasmith12@gmail.com
          </Text>
        </Flex>
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
                    Referral ID
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    56456456
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Wallet Address
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    klasdhfochni5
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Email
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    test@gmail.com
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Address
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    New York City, USA
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Language
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    English
                  </Text>
                </Flex>
                <Flex alignItems="center" justify="space-between" my={2}>
                  <Text textAlign="left" fontSize="sm" color="#FFFFFFA1">
                    Last Login Date
                  </Text>
                  <Text textAlign="right" fontSize="sm">
                    25 OCT, 2024
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
