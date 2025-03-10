"use client";
import networkPinkImg from "@/assets/netwokr_pink.png";
import networkImg from "@/assets/network.png";
import AdminFunctionTable from "@/components/Admin/dashboard/AdminFunctionTable";
import PackagePriceCard from "@/components/Admin/PackagePriceCard";
import PackagePriceEditCard from "@/components/Admin/PackagePriceEditCard";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { IoRocket } from "react-icons/io5";
import { TbPackages } from "react-icons/tb";

const data = [
  {
    id: 1,
    icon: <IoRocket fontSize="20px" />,
    title: "Total Network Size",
    user: "50,000",
    img: networkImg,
  },
  {
    id: 3,
    icon: <IoRocket fontSize="20px" />,
    title: "Total Revenue",
    user: "105 SOL",
    img: networkPinkImg,
  },
  {
    id: 3,
    icon: <TbPackages fontSize="20px" />,
    title: "Total Packages Sold",
    user: "789",
    img: networkImg,
  },
];
const pricePackageData = [
  {
    id: 1,
    icon: <IoRocket fontSize="20px" />,
    title: "0.2 Sol",
    subtitle: "Up to 3 direct connections (3x3 matrix referral)",
    plan: "Stater",
  },
  {
    id: 3,
    icon: <IoRocket fontSize="20px" />,
    title: "1 SOL",
    plan: "Pro",
    subtitle: "Upto 5 direct connections",
  },
  {
    id: 3,
    icon: <TbPackages fontSize="20px" />,
    title: "2 SOL",
    plan: "Elite Plan",
    subtitle: "Upto 10 direct connections (10x10) matrix referrals)",
  },
];

const AdminMainPage = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight={600}>
        Packages Price
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        {data.map((item, idx) => {
          return <PackagePriceCard key={idx} item={item} />;
        })}
      </SimpleGrid>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mt={4}>
        <GridItem colSpan={2} bg="#262D33" borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between" p={2}>
            <Text fontSize="md" fontWeight={500}>
              Corporate Wallet Address
            </Text>
            <Flex alignItems="center" gap={5}>
              <Text>2SeforV..Uwa</Text>
              <FiEdit color="white" fontSize="20px" cursor="pointer" />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem bg="#262D33" p={2} borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between" p={2}>
            <Text fontSize="md" fontWeight={500}>
              Commission Level
            </Text>
            <Flex alignItems="center" gap={5}>
              <Text>15</Text>
              <Box display="flex" alignItems="center" gap={2}>
                <FiEdit color="white" fontSize="20px" cursor="pointer" />
              </Box>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem bg="#262D33" p={2} borderRadius="md">
          <Flex alignItems="center" justifyContent="space-between" p={2}>
            <Text fontSize="md" fontWeight={500}>
              Commission Percent
            </Text>
            <Flex alignItems="center" gap={5}>
              <FiEdit color="white" fontSize="20px" cursor="pointer" />
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
      <Box my={4} bg="#262D33" borderRadius="md">
        <Flex alignItems="center" justifyContent="space-between" p={4}>
          <Text>Admin Function</Text>
          <Box display={{ base: "none", md: "block" }}>
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
        <Box mt={2} w="100%">
          <AdminFunctionTable />
        </Box>
      </Box>
      <Box my={4}>
        <Text>Package Prices</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
          {pricePackageData.map((item, idx) => {
            return <PackagePriceEditCard key={idx} item={item} />;
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AdminMainPage;
