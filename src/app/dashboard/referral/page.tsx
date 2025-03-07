// "use client";
// import MyReferralsTable from "@/components/referral/MyReferralsTable";
// import ReferralTree from "@/components/referral/ReferralTree";

// import { CopyIcon, SearchIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Text,
// } from "@chakra-ui/react";

// const ReferralMainPage = () => {
//   return (
//     <Box m={5}>
//       <Box>
//         <Text fontSize="xl" fontWeight="bold">
//           My referrals Link
//         </Text>
//         <Box borderRadius="xl" p={2} bg="#262D33">
//           <Flex alignItems="center" gap={10}>
//             <Text fontSize="md" color="white">
//               https://solbox.com/signup?code=13ncn833
//             </Text>
//             <Button
//               variant="secondary"
//               borderRadius="2xl"
//               leftIcon={<CopyIcon />}
//             >
//               Copy link
//             </Button>
//           </Flex>
//         </Box>
//       </Box>
//       <Box my={5} borderRadius="xl" p={4} bg="#262D33">
//         <Flex alignItems="center" justifyContent="space-between">
//           <Box>
//             <Text fontSize="md" fontWeight="bold">
//               My Referrals
//             </Text>
//             <Text fontSize="xs" color="gray.400">
//               You have total 45 user right now
//             </Text>
//           </Box>
//           <Box>
//             <InputGroup>
//               <InputLeftElement pointerEvents="none">
//                 <SearchIcon color="gray.300" />
//               </InputLeftElement>
//               <Input
//                 type="text"
//                 placeholder="Search something..."
//                 borderRadius="20px"
//                 bg="#FFFFFF1A"
//                 outline="none"
//                 border="none"
//                 color="white"
//                 _focus={{
//                   ring: "none",
//                   outline: "none",
//                   border: "none",
//                 }}
//               />
//             </InputGroup>
//           </Box>
//         </Flex>
//         <Box mt={4}>
//           <MyReferralsTable />
//         </Box>
//       </Box>
//       <Box>
//         <Text my={2} fontSize="xl" fontWeight={500}>
//           Network Tree
//         </Text>
//         <ReferralTree />
//       </Box>
//     </Box>
//   );
// };

// export default ReferralMainPage;

"use client";

import { useCallback } from "react";

import authService from "@/services/authService";
import referralService from "@/services/referralService";
import { CopyIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReferralTree from "@/components/referral/ReferralTree";

// Define interfaces for the API response
interface Parent {
  username: string;
  walletAddress: string;
  earnings: number;
  package: string;
}

interface Referral {
  username: string;
  walletAddress: string;
  earnings: number;
  package: string;
  createdAt: string;
  referralCount: number;
  level: number;
  commissionFromReferral: number;
  parent: Parent;
  totalDirects?: number; // Added for display purposes
}

interface ApiResponse {
  success: boolean;
  data: {
    user: Parent;
    referrals: Referral[];
    totalReferrals: number;
    maxLevel: number;
    levelStats: any[];
    summary: any;
  };
}

interface ProcessedReferral {
  username: string;
  walletAddress: string;
  level: number;
  commission: number;
  referrer: string;
  totalDirects: number;
  createdAt: string;
}

const ReferralMainPage = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [referralData, setReferralData] = useState<ApiResponse | null>(null);
  const [processedReferrals, setProcessedReferrals] = useState<
    ProcessedReferral[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [referralLink, setReferralLink] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  console.log("router", router);

  const getAllReferrals = async (page = 1) => {
    try {
      setLoading(true);
      const userDetails: any = authService.getUser();
      const parsedDetails = JSON.parse(userDetails);

      const res = await referralService.getAllReferrals(
        parsedDetails?.walletAddress
      );

      if (res.success) {
        setReferralData(res as ApiResponse);

        // Process referrals to include parent information
        const processed = res.data.referrals.map((referral: any) => ({
          username: referral.username,
          walletAddress: referral.walletAddress,
          level: referral.level,
          commission: referral.commissionFromReferral,
          referrer: referral.parent.username,
          totalDirects: referral.referralCount || 0,
          createdAt: referral.createdAt,
        }));

        setProcessedReferrals(processed);

        setTotalPages(Math.ceil(res.data.totalReferrals / 10));

        setReferralLink(
          `${window?.location?.origin}/signup?ref=${res?.data?.user?.username}`
        );
      } else {
        toast({
          title: "Error fetching data",
          description: "Could not fetch referral data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching referral data:", error);
      toast({
        title: "Error",
        description: "An error occurred while fetching your referral data",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const memoizedGetAllReferrals = useCallback(getAllReferrals, []);

  useEffect(() => {
    memoizedGetAllReferrals(currentPage);
  }, [currentPage, memoizedGetAllReferrals]);

  useEffect(() => {
    if (referralData) {
      const filtered = referralData.data.referrals
        .filter(
          (referral) =>
            referral.username
              .toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            referral.walletAddress
              .toLowerCase()
              .includes(searchTerm?.toLowerCase()) ||
            referral.parent.username
              .toLowerCase()
              .includes(searchTerm?.toLowerCase())
        )
        .map((referral) => ({
          username: referral.username,
          walletAddress: referral.walletAddress,
          level: referral.level,
          commission: referral.commissionFromReferral,
          referrer: referral.parent.username,
          totalDirects: referral.referralCount || 0,
          createdAt: referral.createdAt,
        }));

      setProcessedReferrals(filtered);
    }
  }, [searchTerm, referralData]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied",
      description: "Referral link copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const generatePagination = () => {
    if (totalPages <= 1) return [1];

    const current = currentPage;
    let pages = [];

    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (current <= 4) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (current >= totalPages - 3) {
        pages = [
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          current - 1,
          current,
          current + 1,
          "...",
          totalPages,
        ];
      }
    }
    return pages;
  };

  return (
    <Box m={5}>
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          My Referrals Link
        </Text>
        <Box borderRadius="xl" p={2} bg="#262D33">
          <Flex alignItems="center" gap={10}>
            <Text fontSize="md" color="white">
              {referralLink}
            </Text>
            <Button
              variant="secondary"
              borderRadius="2xl"
              leftIcon={<CopyIcon />}
              onClick={handleCopyLink}
            >
              Copy Link
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
              {loading
                ? "Loading..."
                : `You have total ${
                    referralData?.data.totalReferrals || 0
                  } user${
                    referralData?.data.totalReferrals !== 1 ? "s" : ""
                  } right now`}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                _focus={{
                  ring: "none",
                  outline: "none",
                  border: "none",
                }}
              />
            </InputGroup>
          </Box>
        </Flex>

        <Box mt={4} overflowX="auto">
          {loading ? (
            <Flex justifyContent="center" alignItems="center" height="200px">
              <Spinner size="xl" color="#9D48C7" thickness="4px" />
            </Flex>
          ) : (
            <>
              <Table variant="simple">
                <Thead borderBottom="2px solid #FFFFFF1A" bg="#FFFFFF1A">
                  <Tr>
                    <Th color="white">User Name</Th>
                    <Th color="white">Wallet Address</Th>
                    <Th color="white">Level</Th>
                    <Th color="white">Commission</Th>
                    <Th color="white">Referrer</Th>
                    <Th color="white">Total Directs</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {processedReferrals.map((referral) => (
                    <Tr
                      key={referral.walletAddress}
                      borderBottom="2px solid #FFFFFF1A"
                    >
                      <Td>
                        <Flex align="center" gap={2}>
                          <Box
                            width="32px"
                            height="32px"
                            borderRadius="full"
                            overflow="hidden"
                          >
                            <Avatar
                              size="sm"
                              src={referral.username}
                              name={referral.username}
                            />
                          </Box>
                          <Text color="white">{referral.username}</Text>
                        </Flex>
                      </Td>
                      <Td color="white">
                        {`${referral.walletAddress.substring(
                          0,
                          6
                        )}...${referral.walletAddress.substring(
                          referral.walletAddress.length - 4
                        )}`}
                      </Td>
                      <Td color="white">{referral.level}</Td>
                      <Td color="white">
                        {referral.commission.toFixed(3)} SOL
                      </Td>
                      <Td color="white">{referral.referrer}</Td>
                      <Td color="white">{referral.totalDirects} Users</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <Flex justify="center" mt={4} gap={1}>
                  <IconButton
                    aria-label="Previous page"
                    icon={<ChevronLeftIcon />}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isDisabled={currentPage === 1}
                    variant="ghost"
                    size="sm"
                  />

                  {generatePagination().map((page, index) => (
                    <Button
                      key={index}
                      variant={currentPage === page ? "solid" : "ghost"}
                      onClick={() =>
                        typeof page === "number" && setCurrentPage(page)
                      }
                      size="sm"
                      bg={currentPage === page ? "#615FFF" : "transparent"}
                      _hover={{
                        bg: currentPage === page ? "#615FFF" : "whiteAlpha.200",
                      }}
                    >
                      {page}
                    </Button>
                  ))}

                  <IconButton
                    aria-label="Next page"
                    icon={<ChevronRightIcon />}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    isDisabled={currentPage === totalPages}
                    variant="ghost"
                    size="sm"
                  />
                </Flex>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box>
        <Text my={2} fontSize="xl" fontWeight={500}>
          Network Tree
        </Text>
        <ReferralTree />
      </Box>
    </Box>
  );
};

export default ReferralMainPage;
