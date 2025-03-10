/* eslint-disable import/no-anonymous-default-export */

import Cookies from "js-cookie";
import apiClient from "./apiClient";

class AuthService {
  async userRegistration(data: {
    username: string;
    referrerUsername: string;
    walletAddress: any;
  }) {
    try {
      const response = await apiClient.post("/users/user/register", data);
      const { token, user } = response.data;

      // Store in cookies instead of localStorage
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  async getUserById(data: { id: any }) {
    try {
      const response = await apiClient.get(`/users/user/${data?.id}`);

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async getUserByWalletAddress(data: { walletAddress: any }) {
    try {
      const response = await apiClient.get(`/users/user/${data?.walletAddress}`);

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }
  async userLogin(data: { walletAddress: any }) {
    try {
      const response = await apiClient.post("/users/user/login", data);
      const { token, user } = response.data;

      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
      });

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  userLogout() {
    try {
      Cookies.remove("token");
      Cookies.remove("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  getUser() {
    return Cookies.get("user");
  }
}

export default new AuthService();
