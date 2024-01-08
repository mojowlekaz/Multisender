"use client";
import React, { createContext, useRef, useEffect, useState } from "react";
import {
  CheckIfWalletConnected,
  ConnectWallet,
  checkchainId,
  connectingwithContract,
} from "@/utils/api";
import {
  MultiAirdropdispenserABI,
  MultiAirdropdispenserAddress,
} from "@/contexts/constant";
import { ethers } from "ethers";

export const MultisendProviderContext = createContext();

export default function MultisendProvider({ children }) {
  useEffect(() => {
    checkchainId();
    Connectwallet();
    fetchData();
    getnetwork();
    // Approve("0x098bB49E90697d76e3141f5B7f6045090bbB201B", 1000);
    // PerformBatchTransfer("");
  }, []);

  const [walletaddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connectionerror, setConnectionError] = useState(false);
  const [tokenname, setTokenName] = useState("");
  const [usertokenBalance, setUserTokenbalance] = useState("");
  const [fee, setFee] = useState("");
  const [network, setNetwork] = useState("");
  const [approved, setApproval] = useState(false);
  const [transferSuccessful, setTrasferSuccessful] = useState(false);

  async function Connectwallet() {
    try {
      const connectAccount = await ConnectWallet();
      setWalletAddress(connectAccount);
    } catch (error) {
      console.log("error");
      // setMetamaskAlert(true);
    }
  }

  async function connectingwithContract() {
    try {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();
      const contract = new ethers.Contract(
        MultiAirdropdispenserAddress,
        MultiAirdropdispenserABI,
        signer
      );

      return contract;
    } catch (error) {}
  }

  //FECTH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingwithContract();
      console.log("contract is here", contract);

      //GET NETWORK
    } catch (error) {
      console.log(error);
      setError("Please install and Connect to Metamask ");
    }
  };

  async function getTokenName(address) {
    try {
      const contract = await connectingwithContract();
      const getTokenName = await contract.TokenName(address);
      setTokenName(getTokenName);
      console.log("Token name", getTokenName);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  async function getUserTokenbalance(address) {
    try {
      const contract = await connectingwithContract();
      const getUserTokenBalance = await contract.getUserTokenBalance(address);
      setUserTokenbalance(getUserTokenBalance.toString());
      console.log("user balance", getUserTokenBalance);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function getnetwork() {
    try {
      let provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log("Network:", network);
      console.log("Network Name:", network.name);
      setNetwork(network.name.toString());
      console.log("Chain ID:", network.chainId);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  async function calculateFees(recipient) {
    try {
      const contract = await connectingwithContract();
      const getFee = await contract.calculateFee(recipient);
      const getFeeInEther = ethers.formatEther(getFee);
      setFee(getFeeInEther.toString());
      console.log("Fee to use", getFeeInEther);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTokenDecimals(tokenAddress) {
    let provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      tokenAddress,
      ["function decimals() view returns (uint8)"],
      provider
    );

    try {
      const decimals = await contract.decimals();
      return decimals;
    } catch (error) {
      console.error("Error fetching token decimals:", error);
      return null;
    }
  }

  async function Approve(tokenaddress, amount) {
    try {
      let provider = new ethers.BrowserProvider(window.ethereum);
      let signer = await provider.getSigner();
      const contract = new ethers.Contract(
        tokenaddress,
        [
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "allowance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
              },
            ],
            name: "ERC20InsufficientAllowance",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
              },
            ],
            name: "ERC20InsufficientBalance",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "approver",
                type: "address",
              },
            ],
            name: "ERC20InvalidApprover",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "receiver",
                type: "address",
              },
            ],
            name: "ERC20InvalidReceiver",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
            ],
            name: "ERC20InvalidSender",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "ERC20InvalidSpender",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [
              {
                internalType: "uint8",
                name: "",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        signer
      );

      const amountToapprove = ethers.parseEther(amount.toString());
      const getApproval = await contract.approve(
        MultiAirdropdispenserAddress,
        amountToapprove,
        {
          gasLimit: 5000000,
        }
      );
      setApproval(true);
      console.log(getApproval);
    } catch (error) {
      console.log(error);
    }
  }

  async function PerformBatchTransfer(addresses, amounts, decimals) {
    try {
      const contract = await connectingwithContract();
      const multipliedAmounts = amounts.map((amount) => {
        const multipliedValue = ethers.parseUnits(amount, decimals);
        return multipliedValue;
      });

      console.log(multipliedAmounts);
      const transfer = await contract.sendtoMultipleusers(
        addresses,
        multipliedAmounts,
        {
          gasLimit: 5000000,
        }
      );
      setTrasferSuccessful(true);
      console.log(transfer);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MultisendProviderContext.Provider
      value={{
        walletaddress,
        loading,
        error,
        connectionerror,
        Connectwallet,
        tokenname,
        usertokenBalance,
        calculateFees,
        fee,
        network,
        Approve,
        getTokenName,
        getUserTokenbalance,
        approved,
        PerformBatchTransfer,
        transferSuccessful,
        getTokenDecimals,
      }}
    >
      {children}
    </MultisendProviderContext.Provider>
  );
}
