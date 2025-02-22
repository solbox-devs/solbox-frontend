import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/Topbar";
import { Box, Flex } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    //  maxW={{ base: "100%", md: "80%", lg: "1400px" }}
    <Flex mt={2}>
      <Sidebar />
      <Box w="100%">
        <TopBar />
        <Box m={5}>
          <main>{children}</main>
        </Box>
      </Box>
    </Flex>
  );
}
