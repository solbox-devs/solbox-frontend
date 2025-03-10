"use client";

import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTasks } from "react-icons/fa";
import { MdDashboardCustomize, MdLiveHelp } from "react-icons/md";
import { RiLogoutBoxLine, RiSettingsLine } from "react-icons/ri";
import { VscReferences } from "react-icons/vsc";
// Define TypeScript Props
interface SidebarItemProps {
  label: string;
  icon: React.ElementType;
  to: string;
  onClose: () => void;
}

const AdminSidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      {/* Sidebar for Desktop */}
      <Flex
        direction="column"
        bg="#262D33"
        w="190px"
        minH="100vh"
        h="100%"
        p={2}
        color="white"
        boxShadow="lg"
        borderRadius="lg"
      >
        {/* Logo Section */}
        <Box mb="5">
          <Flex align="center" mb="2">
            <Text fontSize="lg" fontWeight="500" ml="2">
              LOGO
            </Text>
          </Flex>
          <Divider my={3} />
        </Box>

        {/* Menu Section */}
        <VStack align="start" spacing={3}>
          <SidebarItem
            label="Dashboard"
            icon={MdDashboardCustomize}
            to="/admin"
            onClose={onClose}
          />
          <SidebarItem
            label="Black list"
            icon={FaTasks}
            to="/admin/blacklist"
            onClose={onClose}
          />
          <SidebarItem
            label="Wallet"
            icon={VscReferences}
            to="/admin/wallet"
            onClose={onClose}
          />
        </VStack>

        {/* Logout Button */}
        <Box mt="auto">
          <Text
            fontSize="md"
            textTransform="uppercase"
            fontWeight={500}
            color="Setting"
          >
            Settings
          </Text>
          <SidebarItem
            label="Support"
            icon={MdLiveHelp}
            to="/claimGame"
            onClose={onClose}
          />
          <SidebarItem
            label="Setting"
            icon={RiSettingsLine}
            to="/claimGame"
            onClose={onClose}
          />
          <Button
            mt={1}
            leftIcon={<RiLogoutBoxLine />}
            size="sm"
            variant="primary"
          >
            Log out
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export const SidebarItem = ({ label, icon, to, onClose }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link href={to} passHref>
      <Box
        // border={isActive ? "1px solid #FFFFFF52" : "none"}
        display="flex"
        alignItems="center"
        py={2}
        w="170px"
        bg={
          isActive
            ? "linear-gradient(100deg, #FFFFFF00, #FFFFFF52)"
            : "transparent"
        }
        // bgGradient="linear(to-r, #7928CA, #FF0080"
        transition="all 0.3s ease-in-out"
        cursor="pointer"
        onClick={onClose}
      >
        <Icon
          as={icon}
          fontSize="20px"
          mr="6px"
          color={isActive ? "white" : "#A3A3A3"}
        />
        <Text fontSize="sm" color="#A3A3A3">
          {label}
        </Text>
      </Box>
    </Link>
  );
};

export default AdminSidebar;
