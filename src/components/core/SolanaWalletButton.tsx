"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import authService from "@/services/authService";
import { useRouter } from "next/navigation";
import * as web3 from "@solana/web3.js";

const WalletBtn = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  }
);

const SolanaWalletButton = () => {
  const [balance, setBalance] = useState<number | null>(0);
  const [wasConnected, setWasConnected] = useState(false);
  const { wallet, connect, connecting, connected, publicKey } = useWallet();
  const router = useRouter();
  const { connection } = useConnection();

  const handleConnect = async () => {
    try {
      if (!wallet) {
        return;
      }
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    if (wasConnected && !connected && !publicKey) {
      console.log("Wallet disconnection detected");
      authService.userLogout();
      router.push("/connect-wallet");
    }

    if (connected && publicKey) {
      setWasConnected(true);
    }
  }, [connected, publicKey, wasConnected, router]);

  const buttonStyles = {
    padding: "10px 20px",
    borderRadius: "50px",
    border: "none",
    background: "#6200EE",
    color: "white",
    cursor: connecting ? "not-allowed" : "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s ease",
  };

  const getShortAddress = () => {
    if (!publicKey) return "Connect Wallet";
    const address = publicKey.toString();
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getInfo = async () => {
    if (connection && publicKey) {
      const info: any = await connection.getAccountInfo(publicKey);
      setBalance(info?.lamports / web3?.LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    getInfo();
  }, [connection, publicKey]);

  return (
    <WalletBtn
      style={buttonStyles}
      onClick={() => !publicKey && handleConnect()}
      disabled={connecting}
    >
      {connecting ? "Connecting..." : getShortAddress()}
    </WalletBtn>
  );
};

export default SolanaWalletButton;
