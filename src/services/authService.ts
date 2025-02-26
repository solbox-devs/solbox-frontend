/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import apiClient from "./apiClient";

class AuthService {
  async userRegistration(data: {
    username: string;
    referralCode: string;
    walletAddress: any;
  }) {
    try {
      const response = await apiClient.post("/user/register", data);
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

  async userLogin(data: { walletAddress: any }) {
    try {
      const response = await apiClient.post("/user/login", data);
      const { token, user } = response.data;

      // Store in cookies
      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
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
      // Remove token on logout
      Cookies.remove("token");
      Cookies.remove("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
