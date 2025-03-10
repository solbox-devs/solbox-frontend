import { BN } from "@project-serum/anchor";
import {
  type Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import apiClient from "./apiClient";

class PackageService {
  async getAvailablePackages() {
    try {
      const response = await apiClient.get("/packages/available");
      return response.data;
    } catch (error) {
      console.error("Error fetching available packages:", error);
      throw error;
    }
  }

  async getUserPackage(userId?: string) {
    console.log("userid", userId)
    try {
      const endpoint = userId ? `/packages/${userId}` : "/packages";
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching user package:", error);
      throw error;
    }
  }

  async getReferralUplinks(userId: string) {
    try {
      const response = await apiClient.get(`/packages/uplinks/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching referral uplinks:", error);
      throw error;
    }
  }

  async createCommissionTransaction(
    connection: Connection,
    senderPublicKey: PublicKey,
    amount: number,
    referrals: Array<{ walletAddress: string; commission: number }>
  ) {
    try {
      const transaction = new Transaction();

      // Add platform fee transfer (10%)
      const platformFee = amount * 0.1;
      const platformWallet = new PublicKey(
        process.env.NEXT_PUBLIC_PLATFORM_WALLET_ADDRESS!
      );

      transaction.add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: platformWallet,
          lamports: platformFee * LAMPORTS_PER_SOL,
        })
      );

      // Add commission transfers
      for (const referral of referrals) {
        const referrerWallet = new PublicKey(referral.walletAddress);
        const commissionAmount = amount * (referral.commission / 100);

        transaction.add(
          SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: referrerWallet,
            lamports: commissionAmount * LAMPORTS_PER_SOL,
          })
        );
      }

      return transaction;
    } catch (error) {
      console.error("Error creating commission transaction:", error);
      throw error;
    }
  }

  async recordPackagePurchase(transactionData: {
    signature: string;
    packageId: number;
    packagePrice: number;
    userId: string;
    referrals: Array<{
      walletAddress: string;
      commission: number;
      credit: number;
    }>;
    transactionType: any;
  }) {
    try {
      const response = await apiClient.post(
        "/packages/record-purchase",
        transactionData
      );
      return response.data;
    } catch (error) {
      console.error("Error recording package purchase:", error);
      throw error;
    }
  }

  async getPackagePurchaseHistory(userId?: string) {
    try {
      const endpoint = userId
        ? `/packages/history/${userId}`
        : "/packages/history";
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching package purchase history:", error);
      throw error;
    }
  }

  async getCommissionStructure() {
    try {
      const response = await apiClient.get("/packages/commission-structure");
      return response.data;
    } catch (error) {
      console.error("Error fetching commission structure:", error);
      throw error;
    }
  }

  calculateCommissions(packagePrice: number, referrals: Array<any>) {
    return referrals.map((ref) => {
      const totalCommission = (packagePrice * ref.commission) / 100;
      const commission = Number((totalCommission * 0.8).toFixed(6));
      const credit = Number((totalCommission - commission).toFixed(6));
      return {
        walletAddress: ref.walletAddress,
        commission: new BN(commission * LAMPORTS_PER_SOL),
        credit: new BN(credit * LAMPORTS_PER_SOL),
      };
    });
  }
}

const packageService = new PackageService();
export default packageService;
