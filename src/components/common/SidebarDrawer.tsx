import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { MdDashboardCustomize, MdLiveHelp } from "react-icons/md";
import { RiLogoutBoxLine, RiSettingsLine } from "react-icons/ri";
import { VscReferences } from "react-icons/vsc";
import { SidebarItem } from "./Sidebar";

interface SidebarDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

const SidebarDrawer = ({ onClose, isOpen }: SidebarDrawerProps) => {
  return (
    <Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#262D33">
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            {/* Menu Section */}
            <VStack align="start" spacing={3}>
              <SidebarItem
                label="Dashboard"
                icon={MdDashboardCustomize}
                to="/dashboard"
                onClose={onClose}
              />
              <SidebarItem
                label="Referrals Page"
                icon={FaTasks}
                to="/dashboard/referral"
                onClose={onClose}
              />
              <SidebarItem
                label="Earnings Page"
                icon={VscReferences}
                to="/dashboard/earnings"
                onClose={onClose}
              />
              <SidebarItem
                label="Package Purchase"
                icon={VscReferences}
                to="/dashboard/purchase"
                onClose={onClose}
              />
            </VStack>
            <DrawerFooter>
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
                  w="150px"
                >
                  Log out
                </Button>
              </Box>
            </DrawerFooter>
            {/* Logout Button */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SidebarDrawer;
