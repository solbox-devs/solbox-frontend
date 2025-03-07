// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */

// "use client";

// import {
//   Alert,
//   AlertDescription,
//   AlertIcon,
//   AlertTitle,
//   Box,
//   Button,
//   Flex,
//   SimpleGrid,
//   Spinner,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
// import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
// import {
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   Transaction,
// } from "@solana/web3.js";
// import { useCallback, useEffect, useState } from "react";
// import { BsFillRocketTakeoffFill } from "react-icons/bs";
// import { FaBuysellads } from "react-icons/fa";
// import IDL from "../../../constants/idl.json";
// import authService from "../../../services/authService";
// import PackageService from "../../../services/packageService";

// // import bs58 from "bs58";
// import { binary_to_base58 } from "base58-js";

// const PROGRAM_ID = new PublicKey(
//   "FqMQ5TF8M5pEWGzbj7gDx3ezJVniebaSHBmA4MexUN51"
// );

// const NETWORK = {
//   network:
//     "https://burned-quiet-panorama.solana-devnet.quiknode.pro/f374066129211f77edd4b85776034c91787c99c3",
//   lp_wallet: "t2dxm8K1KXQeSigReW4v9JhtVHxyLsv7u6AUTQKg3Pm",
//   founder_wallet: "J5pRE4j36548BaGYYUQmNA6AWv55dW2xXMjYqsaABfd6",
// };

// const waitForTransactionConfirmation = async (
//   tx: string,
//   connection: Connection,
//   counter: number,
//   setCounter: (val: number) => void,
//   setLoadingMsg: (msg: string) => void
// ) => {
//   const latestBlockHash = await connection.getLatestBlockhash();
//   const confirmation = await connection.confirmTransaction({
//     signature: tx,
//     blockhash: latestBlockHash.blockhash,
//     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
//   });

//   for (let i = 0; i <= 30; i++) {
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     setCounter(i);
//     setLoadingMsg(`Confirming transaction (${i}/30)`);
//   }

//   return !confirmation.value.err;
// };

// const PackagePurchase = () => {
//   const { connected, publicKey } = useWallet();
//   const wallet = useAnchorWallet();
//   const toast = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingMsg, setLoadingMsg] = useState("Transaction processing");
//   const [txCounter, setTxCounter] = useState(0);
//   const [error, setError] = useState<string | null>(null);
//   const [userPackage, setUserPackage] = useState<any>(null);

//   const userDetails: any = authService.getUser();
//   const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;

//   // Get user's current package
//   useEffect(() => {
//     const fetchUserPackage = async () => {
//       if (!parsedUserDetails?._id) return;

//       try {
//         const response = await PackageService.getUserPackage(
//           parsedUserDetails._id
//         );

//         if (response.success && response.hasPackage) {
//           setUserPackage(response.packageDetails);
//         }
//       } catch (error) {
//         console.error("Error fetching user package:", error);
//       }
//     };

//     fetchUserPackage();
//   }, [parsedUserDetails?._id]);

//   const packages = [
//     {
//       id: 1,
//       price: 0.01,
//       name: "Basic Plan",
//       connections: "Up to 3 direct connections",
//       matrixType: "1x3",
//     },
//     {
//       id: 2,
//       price: 0.02,
//       name: "Standard Plan",
//       connections: "Up to 5 direct connections",
//       matrixType: "1x5",
//     },
//     {
//       id: 3,
//       price: 0.04,
//       name: "Premium Plan",
//       connections: "Up to 10 direct connections",
//       matrixType: "1x10",
//     },
//   ];

//   const callPurchasePackage = useCallback(
//     async (package_id: number, package_price: number) => {
//       if (!connected || !publicKey || !wallet || !parsedUserDetails?._id) {
//         toast({
//           title: "Wallet not connected",
//           description: "Please connect your wallet and log in first",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//         return;
//       }

//       setIsLoading(true);
//       setError(null);
//       setLoadingMsg("Fetching referral uplinks...");

//       try {
//         const referralResponse = await PackageService.getReferralUplinks(
//           parsedUserDetails._id
//         );

//         if (!referralResponse.success) {
//           throw new Error(
//             referralResponse.message || "Failed to get referral uplinks"
//           );
//         }

//         const referrals = referralResponse.referrals || [];
//         const net_package_price = package_price;

//         // Calculate commissions
//         const commissionData = referrals.map(
//           (ref: { commission: number; walletAddress: any }) => {
//             const totalCommission = (net_package_price * ref.commission) / 100;
//             return {
//               walletAddress: new PublicKey(ref.walletAddress),
//               commission: new BN(
//                 Math.floor(totalCommission * LAMPORTS_PER_SOL)
//               ),
//             };
//           }
//         );

//         setLoadingMsg("Initializing transaction...");
//         const connection = new Connection(NETWORK.network, {
//           commitment: "confirmed",
//           confirmTransactionInitialTimeout: 120000,
//         });

//         const provider = new AnchorProvider(connection, wallet as any, {
//           preflightCommitment: "confirmed",
//         });

//         const program = new Program(IDL as any, PROGRAM_ID, provider);
//         const lpWallet = new PublicKey(NETWORK.lp_wallet);
//         const founder = new PublicKey(NETWORK.founder_wallet);

//         // Prepare commission amounts for the program
//         const commissions = commissionData.map(
//           (data: { commission: any }) => data.commission
//         );

//         // Create the transaction instruction
//         const instruction = await program.methods
//           .purchasePackage(
//             new BN(net_package_price * LAMPORTS_PER_SOL),
//             commissions
//           )
//           .accounts({
//             user: publicKey,
//             lpWallet: lpWallet,
//             founder: founder,
//             systemProgram: web3.SystemProgram.programId,
//           })
//           .instruction();

//         // Create the transaction
//         const transaction = new Transaction().add(instruction);
//         transaction.feePayer = publicKey;
//         transaction.recentBlockhash = (
//           await connection.getRecentBlockhash()
//         ).blockhash;

//         // Request the wallet to sign the transaction
//         setLoadingMsg("Please confirm the transaction...");
//         const signedTransaction = await wallet.signTransaction(transaction);

//         // Serialize the signed transaction to a byte array
//         const serializedTransaction = signedTransaction.serialize();
//         console.log(serializedTransaction);

//         // Encode the serialized transaction to a base-58 string
//         const base58Transaction = binary_to_base58(serializedTransaction);

//         // At this point, you have the base-58 encoded transaction string
//         // You can send this string to your backend or broadcast it to the network
//         console.log("Base-58 Encoded Transaction:", base58Transaction);

//         const request = {
//           method: "sendTransaction",
//           params: [
//             base58Transaction,
//             {
//               skipPreflight: false,
//               preflightCommitment: "confirmed",
//               network: "devnet",
//             },
//           ],
//         };

//         // console.log("sending rpc request...");
//         // const result = await connection.sendEncodedTransaction(
//         //   base58Transaction,
//         //   {
//         //     skipPreflight: false,
//         //     preflightCommitment: "confirmed",
//         //   }
//         // );
//         // console.log("Transaction result:", result);

//         // Optionally, send the transaction directly to the network
//         setLoadingMsg("Sending transaction to the network...");
//         const txId = await connection.sendRawTransaction(
//           serializedTransaction,
//           {
//             skipPreflight: false,
//             preflightCommitment: "confirmed",
//           }
//         );

//         // Confirm the transaction
//         setLoadingMsg("Confirming transaction...");
//         const confirmation = await connection.confirmTransaction(
//           txId,
//           "confirmed"
//         );

//         if (confirmation.value.err) {
//           throw new Error(
//             "Transaction failed: " + confirmation.value.err.toString()
//           );
//         }

//         // Record the purchase with commission details
//         setLoadingMsg("Recording purchase...");
//         const recordResponse = await PackageService.recordPackagePurchase({
//           signature: txId,
//           packageId: package_id,
//           packagePrice: net_package_price,
//           userId: parsedUserDetails._id,
//           referrals: commissionData.map(
//             (data: { walletAddress: any; commission: any }) => ({
//               walletAddress: data.walletAddress,
//               commission: Number(data.commission) / LAMPORTS_PER_SOL,
//             })
//           ),
//         });

//         if (!recordResponse.success) {
//           console.warn("Failed to record purchase:", recordResponse.message);
//         }

//         // Update user's package
//         const packageResponse = await PackageService.getUserPackage(
//           parsedUserDetails._id
//         );
//         if (packageResponse.success && packageResponse.hasPackage) {
//           setUserPackage(packageResponse.packageDetails);
//         }

//         toast({
//           title: "Purchase Successful",
//           description:
//             "Package purchased and commissions distributed successfully!",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//       } catch (error: any) {
//         console.error("Error purchasing package:", error);
//         setError(error.message || "An error occurred during purchase");
//         toast({
//           title: "Transaction Failed",
//           description: error.message || "An error occurred during purchase",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       } finally {
//         setIsLoading(false);
//         setLoadingMsg("Transaction processing");
//         setTxCounter(0);
//       }
//     },
//     [wallet, connected, publicKey, parsedUserDetails, txCounter, toast]
//   );

//   const getPackageStatus = (packageId: number) => {
//     if (!userPackage) return "Not Purchased";

//     if (userPackage.type === packageId.toString()) {
//       return "Active";
//     }

//     // Check if user has a higher package
//     const currentIndex = packages.findIndex(
//       (pkg) => pkg.id.toString() === userPackage.type
//     );
//     const thisIndex = packages.findIndex((pkg) => pkg.id === packageId);

//     if (currentIndex > thisIndex) {
//       return "Upgraded";
//     }

//     return "Available Upgrade";
//   };

//   return (
//     <Box>
//       <Box>
//         <Text fontSize="xl" fontWeight={500} color="#FFFFFF" my={5}>
//           Packages
//         </Text>

//         {error && (
//           <Alert status="error" mb={4} borderRadius="md">
//             <AlertIcon />
//             <AlertTitle>Error!</AlertTitle>
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {isLoading && (
//           <Box p={4} mb={4} borderRadius="md" bg="#262D33" textAlign="center">
//             <Spinner size="md" mb={2} />
//             <Text>{loadingMsg}</Text>
//             <Box w="100%" bg="#FFFFFF1A" h="8px" borderRadius="full" mt={2}>
//               <Box
//                 w={`${(txCounter / 30) * 100}%`}
//                 bg="blue.500"
//                 h="8px"
//                 borderRadius="full"
//               />
//             </Box>
//           </Box>
//         )}

//         <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
//           {packages.map((pkg) => {
//             const status = getPackageStatus(pkg.id);
//             const isActive = status === "Active";
//             const isUpgraded = status === "Upgraded";
//             const isDisabled =
//               isActive || isUpgraded || isLoading || !connected || !publicKey;

//             return (
//               <Box
//                 p={4}
//                 borderRadius="md"
//                 bg="#262D33"
//                 key={pkg.id}
//                 mb={5}
//                 border={isActive ? "2px solid #4CAF50" : "none"}
//               >
//                 <Flex alignItems="center" justifyContent="space-between">
//                   <Box
//                     h={10}
//                     w={10}
//                     display="flex"
//                     alignItems="center"
//                     justifyContent="center"
//                     bg="#FFFFFF1A"
//                     boxShadow="md"
//                     borderRadius="md"
//                   >
//                     <BsFillRocketTakeoffFill fontSize={20} />
//                   </Box>
//                   <Box
//                     fontSize="sm"
//                     p={2}
//                     borderRadius="3xl"
//                     bg={isActive ? "#4CAF501A" : "#FFFFFF1A"}
//                     color={isActive ? "#4CAF50" : "inherit"}
//                   >
//                     {pkg.name}
//                   </Box>
//                 </Flex>

//                 <Box mt={3}>
//                   <Text fontSize="2xl" fontWeight={500}>
//                     {pkg.price} SOL
//                   </Text>
//                   <Text fontSize="sm" fontWeight={400} color="#FAFAFA" mb={2}>
//                     {pkg.connections} ({pkg.matrixType} matrix)
//                   </Text>

//                   <Text
//                     fontSize="xs"
//                     fontWeight={500}
//                     color={
//                       isActive ? "#4CAF50" : isUpgraded ? "#9E9E9E" : "#FAFAFA"
//                     }
//                     mb={3}
//                   >
//                     Status: {status}
//                   </Text>
//                 </Box>

//                 <Button
//                   borderRadius="3xl"
//                   bg={isActive ? "#4CAF50" : "transparent"}
//                   border={isActive ? "none" : "2px solid #FAFAFA"}
//                   color={isActive ? "white" : "#FAFAFA"}
//                   fontWeight="normal"
//                   w="100%"
//                   mt={2}
//                   _hover={{
//                     background: isActive ? "#45a049" : "rgba(255,255,255,0.1)",
//                   }}
//                   leftIcon={<FaBuysellads />}
//                   onClick={() => callPurchasePackage(pkg.id, pkg.price)}
//                   isLoading={isLoading}
//                   isDisabled={isDisabled}
//                 >
//                   {isActive
//                     ? "Active"
//                     : isUpgraded
//                     ? "Upgraded"
//                     : isLoading
//                     ? loadingMsg
//                     : "Buy Package"}
//                 </Button>
//               </Box>
//             );
//           })}
//         </SimpleGrid>
//       </Box>

//       <Box my={5} bg="#262D33" p={4} borderRadius="xl">
//         <Text fontSize="md" fontWeight={500} my={2}>
//           Package Description
//         </Text>

//         {userPackage ? (
//           <Box>
//             <Text fontSize="lg" fontWeight={600} mb={2}>
//               Your Active Package:{" "}
//               {userPackage.type.charAt(0).toUpperCase() +
//                 userPackage.type.slice(1)}
//             </Text>

//             <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
//               <Box p={3} bg="#FFFFFF0A" borderRadius="md">
//                 <Text fontSize="sm" fontWeight={500}>
//                   Matrix Type
//                 </Text>
//                 <Text fontSize="md">{userPackage.matrixType}</Text>
//               </Box>

//               <Box p={3} bg="#FFFFFF0A" borderRadius="md">
//                 <Text fontSize="sm" fontWeight={500}>
//                   Max Direct Referrals
//                 </Text>
//                 <Text fontSize="md">{userPackage.maxDirectReferrals}</Text>
//               </Box>

//               <Box p={3} bg="#FFFFFF0A" borderRadius="md">
//                 <Text fontSize="sm" fontWeight={500}>
//                   Package Cost
//                 </Text>
//                 <Text fontSize="md">{userPackage.cost} SOL</Text>
//               </Box>
//             </SimpleGrid>

//             <Text fontSize="sm" mb={4}>
//               With your {userPackage.type} package, you can have up to{" "}
//               {userPackage.maxDirectReferrals} direct referrals in your{" "}
//               {userPackage.matrixType} matrix structure. This allows you to earn
//               commissions from your referrals and their downlines across 15
//               levels.
//             </Text>
//           </Box>
//         ) : (
//           <Text fontSize="sm">
//             Our packages offer different matrix structures and referral
//             capabilities. The Basic Plan (0.2 SOL) provides a 1x3 matrix with up
//             to 3 direct referrals. The Standard Plan (1 SOL) upgrades you to a
//             1x5 matrix with 5 direct referrals. For maximum earnings, the
//             Premium Plan (2 SOL) offers a 1x10 matrix with enhanced commission
//             rates. Purchase a package to start building your referral network
//             and earning commissions. When your referrals purchase packages,
//             you&apos;ll earn commissions across 15 levels of your matrix
//             structure.
//           </Text>
//         )}

//         <Box mt={4} p={3} bg="#FFFFFF0A" borderRadius="md">
//           <Text fontSize="md" fontWeight={500} mb={2}>
//             How the Matrix System Works
//           </Text>
//           <Text fontSize="sm">
//             Our matrix referral system distributes 90% of each package purchase
//             to referrers across 15 levels. When you refer someone directly, you
//             also receive a 5% direct referral bonus. The matrix structure (1x3,
//             1x5, or 1x10) determines how many direct referrals you can have.
//             Once your direct slots are filled, new referrals will spill over to
//             your downline, helping everyone in your team grow. Upgrade your
//             package to increase your earning potential and matrix capacity!
//           </Text>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default PackagePurchase;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AnchorProvider, BN, Program, web3 } from "@project-serum/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaBuysellads } from "react-icons/fa";
import IDL from "../../../constants/idl.json";
import authService from "../../../services/authService";
import PackageService from "../../../services/packageService";
import { binary_to_base58 } from "base58-js";

const PROGRAM_ID = new PublicKey(
  "9MW3vjq3uTa2fxafJQVnGvndz1cQSp9FTCaCs9vdH2Hm"
);

const NETWORK = {
  network:
    "https://burned-quiet-panorama.solana-devnet.quiknode.pro/f374066129211f77edd4b85776034c91787c99c3",
  founder_wallet: "J5pRE4j36548BaGYYUQmNA6AWv55dW2xXMjYqsaABfd6",
};

const waitForTransactionConfirmation = async (
  tx: string,
  connection: Connection,
  counter: number,
  setCounter: (val: number) => void,
  setLoadingMsg: (msg: string) => void
) => {
  const latestBlockHash = await connection.getLatestBlockhash();
  const confirmation = await connection.confirmTransaction({
    signature: tx,
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
  });

  for (let i = 0; i <= 30; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCounter(i);
    setLoadingMsg(`Confirming transaction (${i}/30)`);
  }

  return !confirmation.value.err;
};

const PackagePurchase = () => {
  const { connected, publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Transaction processing");
  const [txCounter, setTxCounter] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [userPackage, setUserPackage] = useState<any>(null);

  const userDetails: any = authService.getUser();
  const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;

  useEffect(() => {
    const fetchUserPackage = async () => {
      if (!parsedUserDetails?._id) return;

      try {
        setIsLoading(true);
        const response = await PackageService.getUserPackage(
          parsedUserDetails._id
        );

        if (response.success && response.hasPackage) {
          setUserPackage(response.packageDetails);
        } else {
          setUserPackage(null);
        }
      } catch (error) {
        console.error("Error fetching user package:", error);
        setError("Failed to fetch package details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPackage();
  }, [parsedUserDetails?._id]);

  const packages = [
    {
      id: 1,
      price: 0.01,
      name: "Basic Plan",
      connections: "Up to 3 direct connections",
      matrixType: "1x3",
      package: "basic",
    },
    {
      id: 2,
      price: 0.02,
      name: "Standard Plan",
      connections: "Up to 5 direct connections",
      matrixType: "1x5",
      package: "standard",
    },
    {
      id: 3,
      price: 0.04,
      name: "Premium Plan",
      connections: "Up to 10 direct connections",
      matrixType: "1x10",
      package: "premium",
    },
  ];

  const callPurchasePackage = useCallback(
    async (package_id: number, package_price: number) => {
      if (!connected || !publicKey || !wallet || !parsedUserDetails?._id) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet and log in first",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);
      setError(null);
      setLoadingMsg("Fetching referral uplinks...");

      try {
        const referralResponse = await PackageService.getReferralUplinks(
          parsedUserDetails._id
        );

        if (!referralResponse.success) {
          throw new Error(
            referralResponse.message || "Failed to get referral uplinks"
          );
        }

        const referrals = referralResponse.referrals || [];

        let net_package_price = package_price;
        let transactionType = "PACKAGE_PURCHASE";
        if (userPackage) {
          const currentPackage = packages.find(
            (pkg) => pkg.package === userPackage.type
          );
          if (currentPackage) {
            net_package_price = package_price - currentPackage.price;
            if (net_package_price < 0) net_package_price = 0;
            transactionType = "UPGRADE_PACKAGE";
          }
        }

        const commissionData = referrals.map(
          (ref: { commission: number; walletAddress: any }) => {
            const totalCommission = (net_package_price * ref.commission) / 100;
            return {
              walletAddress: ref.walletAddress,
              commission: new BN(
                Math.floor(totalCommission * LAMPORTS_PER_SOL)
              ),
            };
          }
        );

        setLoadingMsg("Initializing transaction...");
        const connection = new Connection(NETWORK.network, {
          commitment: "confirmed",
          confirmTransactionInitialTimeout: 120000,
        });

        const provider = new AnchorProvider(connection, wallet as any, {
          preflightCommitment: "confirmed",
        });

        const program = new Program(IDL as any, PROGRAM_ID, provider);
        const founder = new PublicKey(NETWORK.founder_wallet);

        const commissions = commissionData.map(
          (data: { commission: any }) => data.commission
        );

        const instruction = await program.methods
          .purchasePackage(
            new BN(net_package_price * LAMPORTS_PER_SOL),
            commissions
          )
          .accounts({
            user: publicKey,
            founder: founder,
            systemProgram: web3.SystemProgram.programId,
          })
          .remainingAccounts(
            referrals.map((ref: { walletAddress: any }) => ({
              pubkey: new PublicKey(ref.walletAddress),
              isSigner: false,
              isWritable: true,
            }))
          )
          .instruction();

        const transaction = new Transaction().add(instruction);
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (
          await connection.getRecentBlockhash()
        ).blockhash;

        setLoadingMsg("Please confirm the transaction...");
        const signedTransaction = await wallet.signTransaction(transaction);

        const serializedTransaction = signedTransaction.serialize();
        console.log(serializedTransaction);

        const base58Transaction = binary_to_base58(serializedTransaction);

        console.log("Base-58 Encoded Transaction:", base58Transaction);

        const request = {
          method: "sendTransaction",
          params: [
            base58Transaction,
            {
              skipPreflight: false,
              preflightCommitment: "confirmed",
              network: "devnet",
            },
          ],
        };

        console.log("sending rpc request...");
        const result = await connection._rpcRequest(
          request.method,
          request.params
        );
        console.log(result);

        const txId = result.result;

        // Optionally, send the transaction directly to the network
        // setLoadingMsg("Sending transaction to the network...");
        // const txId = await connection.sendRawTransaction(
        //   serializedTransaction,
        //   {
        //     skipPreflight: false,
        //     preflightCommitment: "confirmed",
        //   }
        // );

        // Confirm the transaction
        setLoadingMsg("Confirming transaction...");
        const confirmation = await connection.confirmTransaction(
          txId,
          "confirmed"
        );

        if (confirmation.value.err) {
          throw new Error(
            "Transaction failed: " + confirmation.value.err.toString()
          );
        }

        // Record the purchase with commission details
        setLoadingMsg("Recording purchase...");
        const recordResponse = await PackageService.recordPackagePurchase({
          signature: txId,
          packageId: package_id,
          packagePrice: net_package_price,
          userId: parsedUserDetails._id,
          referrals: commissionData.map(
            (data: { walletAddress: any; commission: any }) => ({
              walletAddress: data.walletAddress,
              commission: Number(data.commission) / LAMPORTS_PER_SOL,
            })
          ),
        });
        console.log("Transaction result:", result);

        // // Optionally, send the transaction directly to the network
        // setLoadingMsg("Sending transaction to the network...");
        // const txId = await connection.sendRawTransaction(serializedTransaction, {
        //   skipPreflight: false,
        //   preflightCommitment: "confirmed",
        // });

        // // Confirm the transaction
        // setLoadingMsg("Confirming transaction...");
        // const confirmation = await connection.confirmTransaction(txId, "confirmed");

        // if (confirmation.value.err) {
        //   throw new Error("Transaction failed: " + confirmation.value.err.toString());
        // }

        // // Record the purchase with commission details
        // setLoadingMsg("Recording purchase...");
        // const recordResponse = await PackageService.recordPackagePurchase({
        //   signature: txId,
        //   packageId: package_id,
        //   packagePrice: net_package_price,
        //   userId: parsedUserDetails._id,
        //   referrals: commissionData.map(
        //     (data: { walletAddress: any; commission: any }) => ({
        //       walletAddress: data.walletAddress,
        //       commission: Number(data.commission) / LAMPORTS_PER_SOL,
        //     })
        //   ),
        // });

        // if (!recordResponse.success) {
        //   console.warn("Failed to record purchase:", recordResponse.message);
        // }

        // // Update user's package
        // const packageResponse = await PackageService.getUserPackage(
        //   parsedUserDetails._id
        // );
        // console.log("Transaction result:", result);

        setLoadingMsg("Sending transaction to the network...");
        const txId = await connection.sendRawTransaction(
          serializedTransaction,
          {
            skipPreflight: false,
            preflightCommitment: "confirmed",
          }
        );

        setLoadingMsg("Confirming transaction...");
        const confirmation = await connection.confirmTransaction(
          txId,
          "confirmed"
        );

        if (confirmation.value.err) {
          throw new Error(
            "Transaction failed: " + confirmation.value.err.toString()
          );
        }

        setLoadingMsg("Recording purchase...");
        const recordResponse = await PackageService.recordPackagePurchase({
          signature: txId,
          packageId: package_id,
          packagePrice: net_package_price,
          userId: parsedUserDetails._id,
          referrals: commissionData.map(
            (data: { walletAddress: any; commission: any }) => ({
              walletAddress: data.walletAddress,
              commission: Number(data.commission) / LAMPORTS_PER_SOL,
            })
          ),
          transactionType: transactionType === "UPGRADE_PACKAGE" ? true : false,
        });

        if (!recordResponse.success) {
          console.warn("Failed to record purchase:", recordResponse.message);
        }

        const packageResponse = await PackageService.getUserPackage(
          parsedUserDetails._id
        );
        if (packageResponse.success && packageResponse.hasPackage) {
          setUserPackage(packageResponse.packageDetails);
        }

        toast({
          title: "Purchase Successful",
          description: `Package ${
            transactionType === "PUCHASE_PACKAGE" ? "purchased" : "upgraded"
          } and commissions distributed successfully! ${
            net_package_price !== package_price
              ? `Paid ${net_package_price} SOL (difference from previous package).`
              : ""
          }`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        console.error("Error purchasing package:", error);
        setError(error.message || "An error occurred during purchase");
        toast({
          title: "Transaction Failed",
          description: error.message || "An error occurred during purchase",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
        setLoadingMsg("Transaction processing");
        setTxCounter(0);
      }
    },
    [
      wallet,
      connected,
      publicKey,
      parsedUserDetails,
      txCounter,
      toast,
      userPackage,
    ]
  );

  const callPurchasePackage2 = useCallback(
    async (package_id: number, package_price: number) => {
      if (!connected || !publicKey || !wallet || !parsedUserDetails?._id) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet and log in first",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);
      setError(null);
      setLoadingMsg("Fetching referral uplinks...");

      try {
        const referralResponse = await PackageService.getReferralUplinks(
          parsedUserDetails._id
        );

        if (!referralResponse.success) {
          throw new Error(
            referralResponse.message || "Failed to get referral uplinks"
          );
        }

        const referrals = referralResponse.referrals || [];
        const net_package_price = package_price;

        console.log("referrals", referrals);

        // Calculate commissions
        const commissionData = referrals.map(
          (ref: { commission: number; walletAddress: any }) => {
            // const totalCommission = (ref.commission) / 100;
            return {
              walletAddress: ref.walletAddress,
              commission: new BN(ref.commission),
            };
          }
        );

        setLoadingMsg("Initializing transaction...");
        const connection = new Connection(NETWORK.network, {
          commitment: "confirmed",
          confirmTransactionInitialTimeout: 120000,
        });

        const provider = new AnchorProvider(connection, wallet as any, {
          preflightCommitment: "confirmed",
        });

        const program = new Program(IDL as any, PROGRAM_ID, provider);
        const founder = new PublicKey(NETWORK.founder_wallet);

        // Prepare commission amounts for the program
        const commissions = commissionData.map(
          (data: { commission: any }) => data.commission
        );

        console.log(referrals, commissions);

        // Create the transaction instruction
        const instruction = await program.methods
          .purchasePackage(
            new BN(net_package_price * LAMPORTS_PER_SOL),
            commissions
          )
          .accounts({
            user: publicKey,
            founder: founder,
            systemProgram: web3.SystemProgram.programId,
          })
          // .remainingAccounts(
          //   referrals.map((ref: { walletAddress: any }) => ({
          //     pubkey: new PublicKey(ref.walletAddress),
          //     isSigner: false,
          //     isWritable: true,
          //   }))
          // )
          .rpc()
          .catch(async (error) => {
            console.log("error", await error.getLogs());
          });

        console.log("instruction", instruction);

        // Create the transaction
        // const transaction = new Transaction().add(instruction);
        // transaction.feePayer = publicKey;
        // transaction.recentBlockhash = (
        //   await connection.getRecentBlockhash()
        // ).blockhash;

        // // Request the wallet to sign the transaction
        // setLoadingMsg("Please confirm the transaction...");
        // const signedTransaction = await wallet.signTransaction(transaction);

        // // Serialize the signed transaction to a byte array
        // const serializedTransaction = signedTransaction.serialize();
        // console.log(serializedTransaction);

        // // Encode the serialized transaction to a base-58 string
        // const base58Transaction = binary_to_base58(serializedTransaction);

        // // At this point, you have the base-58 encoded transaction string
        // // You can send this string to your backend or broadcast it to the network
        // console.log("Base-58 Encoded Transaction:", base58Transaction);

        // const request = {
        //   method: "sendTransaction",
        //   params: [
        //     base58Transaction,
        //     {
        //       skipPreflight: false,
        //       preflightCommitment: "confirmed",
        //       network: "devnet",
        //     },
        //   ],
        // };

        // console.log("sending rpc request...");
        // const result = await connection._rpcRequest(
        //   request.method,
        //   request.params
        // );
        // console.log(result);

        const txId = instruction;

        // Optionally, send the transaction directly to the network
        // setLoadingMsg("Sending transaction to the network...");
        // const txId = await connection.sendRawTransaction(
        //   serializedTransaction,
        //   {
        //     skipPreflight: false,
        //     preflightCommitment: "confirmed",
        //   }
        // );

        // Confirm the transaction
        setLoadingMsg("Confirming transaction...");
        const confirmation = await connection.confirmTransaction(
          txId,
          "confirmed"
        );

        if (confirmation.value.err) {
          throw new Error(
            "Transaction failed: " + confirmation.value.err.toString()
          );
        }

        // Record the purchase with commission details
        // setLoadingMsg("Recording purchase...");
        // const recordResponse = await PackageService.recordPackagePurchase({
        //   signature: txId,
        //   packageId: package_id,
        //   packagePrice: net_package_price,
        //   userId: parsedUserDetails._id,
        //   referrals: commissionData.map(
        //     (data: { walletAddress: any; commission: any }) => ({
        //       walletAddress: data.walletAddress,
        //       commission: Number(data.commission) / LAMPORTS_PER_SOL,
        //     })
        //   ),
        // });
        // console.log("Transaction result:", result);

        // // Optionally, send the transaction directly to the network
        // setLoadingMsg("Sending transaction to the network...");
        // const txId = await connection.sendRawTransaction(serializedTransaction, {
        //   skipPreflight: false,
        //   preflightCommitment: "confirmed",
        // });

        // // Confirm the transaction
        // setLoadingMsg("Confirming transaction...");
        // const confirmation = await connection.confirmTransaction(txId, "confirmed");

        // if (confirmation.value.err) {
        //   throw new Error("Transaction failed: " + confirmation.value.err.toString());
        // }

        // // Record the purchase with commission details
        // setLoadingMsg("Recording purchase...");
        // const recordResponse = await PackageService.recordPackagePurchase({
        //   signature: txId,
        //   packageId: package_id,
        //   packagePrice: net_package_price,
        //   userId: parsedUserDetails._id,
        //   referrals: commissionData.map(
        //     (data: { walletAddress: any; commission: any }) => ({
        //       walletAddress: data.walletAddress,
        //       commission: Number(data.commission) / LAMPORTS_PER_SOL,
        //     })
        //   ),
        // });

        // if (!recordResponse.success) {
        //   console.warn("Failed to record purchase:", recordResponse.message);
        // }

        // // Update user's package
        // const packageResponse = await PackageService.getUserPackage(
        //   parsedUserDetails._id
        // );
        // if (packageResponse.success && packageResponse.hasPackage) {
        //   setUserPackage(packageResponse.packageDetails);
        // }

        toast({
          title: "Purchase Successful",
          description:
            "Package purchased and commissions distributed successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        console.log("Error purchasing package:", error.getLogs());
        setError(error.message || "An error occurred during purchase");
        toast({
          title: "Transaction Failed",
          description: error.message || "An error occurred during purchase",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
        setLoadingMsg("Transaction processing");
        setTxCounter(0);
      }
    },
    [wallet, connected, publicKey, parsedUserDetails, txCounter, toast]
  );

  const getPackageStatus = (packageId: number) => {
    if (!userPackage) return "Not Purchased";

    const packageType = userPackage.type;
    if (packageType === name) {
      return "Active";
    }

    const currentIndex = packages.findIndex(
      (pkg) => pkg.package === packageType
    );
    const thisIndex = packages.findIndex((pkg) => pkg.package === name);

    if (currentIndex > thisIndex) {
      return "Upgraded";
    }

    return "Available Upgrade";
  };

  const getButtonText = (status: string, name: string) => {
    if (status === "Not Purchased") return "PURCHASE_PACKAGE";
    if (status === "Active") return "Active";
    if (status === "Upgraded") return "Upgraded";
    if (status === "Available Upgrade") return "UPGRADE_PACKAGE";
    return "Buy Package";
  };

  return (
    <Box>
      <Box>
        <Text fontSize="xl" fontWeight={500} color="#FFFFFF" my={5}>
          Packages
        </Text>

        {error && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <Box p={4} mb={4} borderRadius="md" bg="#262D33" textAlign="center">
            <Spinner size="md" mb={2} />
            <Text>{loadingMsg}</Text>
            <Box w="100%" bg="#FFFFFF1A" h="8px" borderRadius="full" mt={2}>
              <Box
                w={`${(txCounter / 30) * 100}%`}
                bg="blue.500"
                h="8px"
                borderRadius="full"
              />
            </Box>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {packages.map((pkg) => {
            const status = getPackageStatus(pkg.package);
            const isActive = status === "Active";
            const isUpgraded = status === "Upgraded";
            const isDisabled =
              isActive || isUpgraded || isLoading || !connected || !publicKey;

            return (
              <Box
                p={4}
                borderRadius="md"
                bg="#262D33"
                key={pkg.id}
                mb={5}
                // border={isActive ? "2px solid #4CAF50" : "none"}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Box
                    h={10}
                    w={10}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="#FFFFFF1A"
                    boxShadow="md"
                    borderRadius="md"
                  >
                    <BsFillRocketTakeoffFill fontSize={20} />
                  </Box>
                  <Box
                    fontSize="sm"
                    p={2}
                    borderRadius="3xl"
                    bg={isActive ? "#4CAF501A" : "#FFFFFF1A"}
                    color={isActive ? "#4CAF50" : "inherit"}
                  >
                    {pkg.name}
                  </Box>
                </Flex>

                <Box mt={3}>
                  <Text fontSize="2xl" fontWeight={500}>
                    {pkg.price} SOL
                  </Text>
                  <Text fontSize="sm" fontWeight={400} color="#FAFAFA" mb={2}>
                    {pkg.connections} ({pkg.matrixType} matrix)
                  </Text>

                  <Text
                    fontSize="xs"
                    fontWeight={500}
                    color={
                      isActive ? "#4CAF50" : isUpgraded ? "#9E9E9E" : "#FAFAFA"
                    }
                    mb={3}
                  >
                    Status: {status}
                  </Text>
                </Box>

                <Button
                  borderRadius="3xl"
                  bg={isActive ? "#4CAF50" : "transparent"}
                  border={isActive ? "none" : "2px solid #FAFAFA"}
                  color={isActive ? "white" : "#FAFAFA"}
                  fontWeight="normal"
                  w="100%"
                  mt={2}
                  _hover={{
                    background: isActive ? "#45a049" : "rgba(255,255,255,0.1)",
                  }}
                  leftIcon={<FaBuysellads />}
                  onClick={() => callPurchasePackage2(pkg.id, pkg.price)}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                >
                  {getButtonText(status, pkg.package)}
                </Button>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      <Box my={5} bg="#262D33" p={4} borderRadius="xl">
        <Text fontSize="md" fontWeight={500} my={2}>
          Package Description
        </Text>

        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <Spinner size="md" color="#FFFFFF" />
            <Text color="#FFFFFF" ml={2}>
              Loading package details...
            </Text>
          </Box>
        ) : userPackage ? (
          <Box>
            <Text fontSize="lg" fontWeight={600} mb={2}>
              Your Active Package:{" "}
              {userPackage.type.charAt(0).toUpperCase() +
                userPackage.type.slice(1)}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
              <Box p={3} bg="#FFFFFF0A" borderRadius="md">
                <Text fontSize="sm" fontWeight={500}>
                  Matrix Type
                </Text>
                <Text fontSize="md">{userPackage.matrixType}</Text>
              </Box>

              <Box p={3} bg="#FFFFFF0A" borderRadius="md">
                <Text fontSize="sm" fontWeight={500}>
                  Max Direct Referrals
                </Text>
                <Text fontSize="md">{userPackage.maxDirectReferrals}</Text>
              </Box>

              <Box p={3} bg="#FFFFFF0A" borderRadius="md">
                <Text fontSize="sm" fontWeight={500}>
                  Package Cost
                </Text>
                <Text fontSize="md">{userPackage.cost} SOL</Text>
              </Box>
            </SimpleGrid>

            <Text fontSize="sm" mb={4}>
              With your {userPackage.type} package, you can have up to{" "}
              {userPackage.maxDirectReferrals} direct referrals in your{" "}
              {userPackage.matrixType} matrix structure. This allows you to earn
              commissions from your referrals and their downlines across 15
              levels.
            </Text>
          </Box>
        ) : (
          <Text fontSize="sm">
            Our packages offer different matrix structures and referral
            capabilities. The Basic Plan (0.01 SOL) provides a 1x3 matrix with
            up to 3 direct referrals. The Standard Plan (0.02 SOL) upgrades you
            to a 1x5 matrix with 5 direct referrals. For maximum earnings, the
            Premium Plan (0.04 SOL) offers a 1x10 matrix with enhanced
            commission rates. Purchase a package to start building your referral
            network and earning commissions. When your referrals purchase
            packages, you'll earn commissions across 15 levels of your matrix
            structure.
          </Text>
        )}

        <Box mt={4} p={3} bg="#FFFFFF0A" borderRadius="md">
          <Text fontSize="md" fontWeight={500} mb={2}>
            How the Matrix System Works
          </Text>
          <Text fontSize="sm">
            Our matrix referral system distributes 90% of each package purchase
            to referrers across 15 levels. When you refer someone directly, you
            also receive a 5% direct referral bonus. The matrix structure (1x3,
            1x5, or 1x10) determines how many direct referrals you can have.
            Once your direct slots are filled, new referrals will spill over to
            your downline, helping everyone in your team grow. Upgrade your
            package to increase your earning potential and matrix capacity!
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PackagePurchase;
