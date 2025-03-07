/* eslint-disable import/no-anonymous-default-export */

import apiClient from "./apiClient";

class AuthService {
  async getAllReferrals(walletAddress: string) {
    try {
      const response = await apiClient.get(`referrals/all/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.error("failed:", error);
      throw error;
    }
  }

  async getDirectReferrals(walletAddress: string) {
    try {
      const response = await apiClient.get(`referrals/direct/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.error("failed:", error);
      throw error;
    }
  }

  async getEarningsHistory(walletAddress: string) {
    try {
      const response = await apiClient.get(`referrals/earnings-history/${walletAddress}`);
      return response.data;
    } catch (error) {
      console.error("failed:", error);
      throw error;
    }
  }

 
}

export default new AuthService();
