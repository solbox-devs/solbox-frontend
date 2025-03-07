"use client";

import authService from "@/services/authService";
import referralService from "@/services/referralService";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UsersTable = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserAllReferrals = async () => {
    try {
      setLoading(true);
      const userDetails: any = authService.getUser();
      const parsedDetails = JSON.parse(userDetails);
      const res = await referralService.getAllReferrals(
        parsedDetails?.walletAddress
      );
      setReferrals(res?.data?.referrals || []);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      setReferrals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAllReferrals();
  }, []);

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box w="full" p={4} bg="#262D33" borderRadius="md">
      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <Spinner size="lg" color="#FFFFFF" />
          <Text color="#FFFFFF" ml={2}>
            Loading referrals...
          </Text>
        </Box>
      ) : referrals.length === 0 ? (
        <Text color="#FFFFFF" textAlign="center" py={4}>
          No referrals found
        </Text>
      ) : (
        <>
          {/* Desktop View */}
          <Box display={{ base: "none", md: "block" }}>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr borderBottom="2px solid #FFFFFF1A">
                  <Th color="#FFFFFF">Users Name</Th>
                  <Th color="#FFFFFF">Date</Th>
                  <Th color="#FFFFFF">Level</Th>
                  <Th color="#FFFFFF">Commission</Th>
                </Tr>
              </Thead>
              <Tbody>
                {referrals.map((referral: any) => (
                  <Tr key={referral._id} borderBottom="2px solid #FFFFFF1A">
                    <Td>
                      <Stack direction="row" align="center">
                        <Avatar size="sm" name={referral.username} />
                        <Text color="#FFFFFF">{referral.username}</Text>
                      </Stack>
                    </Td>
                    <Td color="#FFFFFF">{formatDate(referral.createdAt)}</Td>
                    <Td color="#FFFFFF">{referral?.level}</Td>
                    <Td color="#FFFFFF">
                      {referral?.commissionFromReferral?.toFixed(4)} SOL
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Mobile View (Card Layout) */}
          <Stack spacing={4} display={{ base: "block", md: "none" }}>
            {referrals.map((referral: any) => (
              <Card
                key={referral._id}
                p={4}
                boxShadow="md"
                borderRadius="lg"
                bg="#1E2429"
                my={2}
              >
                <CardBody>
                  <Stack spacing={2}>
                    <Stack direction="row" align="center">
                      <Avatar size="md" name={referral.username} />
                      <Text fontSize="lg" color="#FFFFFF">
                        {referral.username}
                      </Text>
                    </Stack>
                    <Text color="#FFFFFF">
                      <b>Date:</b> {formatDate(referral.createdAt)}
                    </Text>
                    <Text color="#FFFFFF">
                      <b>Total Referrals:</b> {referral.referralCount}
                    </Text>
                    <Text color="#FFFFFF">
                      <b>Profit:</b> {referral.earnings} SOL
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default UsersTable;
