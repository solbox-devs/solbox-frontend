"use client";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminTopBar from "@/components/Admin/AdminTopbar";
import SidebarDrawer from "@/components/common/SidebarDrawer";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    //  maxW={{ base: "100%", md: "80%", lg: "1400px" }}
    <Flex mt={2}>
      <Box display={{ base: "none", md: "block" }}>
        <AdminSidebar onClose={onClose} />
      </Box>
      <SidebarDrawer isOpen={isOpen} onClose={onClose} />
      <Box w="100%">
        <AdminTopBar onOpen={onOpen} />
        <Box m={5}>
          <main>{children}</main>
        </Box>
      </Box>
    </Flex>
  );
}
