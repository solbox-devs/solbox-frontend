"use client";
import {
  Box,
  Button,
  Flex,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BsArrowUpRight } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
const Information = () => {
  const informationCardData = [
    {
      id: 1,
      icon: <IoWalletSharp fontSize={20} />,
      title: "SOL Balance",
      amount: "23.45 SOL",
      subtitle: null,
      btnText: null,
    },
    {
      id: 2,
      icon: <SiGoogledocs fontSize={20} />,
      title: "Active Package",
      amount: null,
      subtitle: "Package : 2",
      btnText: "Upgrade",
    },
    {
      id: 3,
      icon: <SiGoogledocs fontSize={20} />,
      title: "My Organization",
      amount: null,
      subtitle: "People : 13",
      btnText: "My Referrals",
    },
    {
      id: 3,
      icon: <FaDonate fontSize={20} />,
      title: "My Organization",
      amount: "$5,890",
      subtitle: "Earnings",
      btnText: "46.9%",
    },
  ];

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        {informationCardData.map((info, idx) => {
          return (
            <Box p={2} borderRadius="md" bg="#262D33" key={idx}>
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
                  {info?.icon}
                </Box>
                {info.btnText !== null && (
                  <Box>
                    <Button
                      bg="#4ADE80"
                      borderRadius="2xl"
                      leftIcon={<BsArrowUpRight />}
                      size="sm"
                      fontWeight="normal"
                    >
                      {info.btnText}
                    </Button>
                  </Box>
                )}
              </Flex>
              <Box mt={4}>
                <Text color="#FFFFFF99" fontSize="md">
                  {info?.title}
                </Text>
                {info?.amount === null ? (
                  <Box mt={4}>
                    <Text fontSize="sm" color="#FFFFFF99">
                      {info.subtitle}
                    </Text>
                    <Progress
                      mt={1}
                      borderRadius="md"
                      colorScheme="green"
                      size="sm"
                      value={40}
                    />
                  </Box>
                ) : (
                  <Box mt={4}>
                    <Text fontSize="sm" color="#FFFFFF99">
                      {info.subtitle}
                    </Text>
                    <Text fontSize="2xl" fontWeight={400}>
                      {info.amount}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Information;
