import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import { LoanProtocolAddress, LoanProtocolABI } from "@context/constant";
import {
  MultiAirdropdispenserABI,
  MultiAirdropdispenserAddress,
} from "@/contexts/constant";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("error");
  }
};

export async function ConnectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error(
        "Please install Metamask to have full access to the dApp"
      );
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];

    return firstAccount;
  } catch (error) {
    console.error(error);
  }
}

export async function checkchainId() {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  // Check if the chain ID is not 1115 (replace with your desired chain ID)
  if (chainId == 11155111) {
    console.log("Your are on the correct newtwork");
  } else {
    throw new Error("Please connect to the correct blockchain");
  }
}
async function FetchContract(signerOrprovider) {
  new ethers.Contract(
    MultiAirdropdispenserAddress,
    MultiAirdropdispenserABI,
    signerOrprovider
  );
}

export async function connectingwithContract() {
  try {
    let provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();
    const contract = FetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
}
