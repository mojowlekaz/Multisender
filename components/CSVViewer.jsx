"use client";
import { useState, useContext, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ApprovalModal from "./ApprovalModal";
import SendToken from "./SendToken";
import { MultisendProviderContext } from "@/contexts/MultisendProvider";

const CSVViewer = ({ Oncontinue, step }) => {
  const {
    walletaddress,
    Connectwallet,
    getTokenName,
    tokenname,
    getUserTokenbalance,
  } = useContext(MultisendProviderContext);

  const [csvContent, setCSVContent] = useState("");
  const [inputdata, setInputData] = useState("");
  const [fileImported, setFileImported] = useState(false);
  const [walletAddress, setwalletAddress] = useState("");
  const [tokenAddress, settokenAddress] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    getTokenName(tokenAddress);
    getUserTokenbalance(tokenAddress);
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      setCSVContent(content);
      setFileImported(true);
    };

    reader.readAsText(file);
  };

  const handleinputdata = (e) => {
    const value = e.target.value;
    setInputData(value);
  };
  const handletokenadddress = (e) => {
    const value = e.target.value;
    settokenAddress(value);
  };

  const generateLineNumbers = () => {
    const lineCount = (fileImported ? csvContent : inputdata).split(
      "\n"
    ).length;
    return Array.from({ length: lineCount }, (_, index) => index + 1);
  };

  const lineNumbers = generateLineNumbers();

  const handleContinue = () => {
    const lines = (csvContent || inputdata).split("\n");

    // Initialize arrays to store wallet addresses and amounts
    const walletAddresses = [];
    const amounts = [];

    const areValidEntries = lines.every((line) => {
      // Remove any extra spaces and double quotes
      const cleanedLine = line.replace(/['"]+/g, "").trim();

      // Split the cleaned line into wallet address and amount
      const [walletAddress, amount] = cleanedLine
        .split(",")
        .map((item) => item.trim());

      if (
        walletAddress.length === 42 &&
        !isNaN(parseInt(amount)) &&
        parseInt(amount) > 0
      ) {
        // Store the wallet address and amount in arrays
        walletAddresses.push(walletAddress);
        amounts.push(amount);

        return true;
      } else {
        return false;
      }
    });

    if (areValidEntries) {
      console.log("All wallet addresses and amounts are valid. Continue...");

      // Do something with walletAddresses and amounts arrays, like set them to state
      setwalletAddress(walletAddresses);
      setAmount(amounts);

      Oncontinue();
    } else {
      console.error("Some wallet addresses or amounts are invalid.");
      setValidationError("Some wallet addresses or amounts are invalid.");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div className="justify-center px-5  flex flex-col py-10">
          <p className="text-gray-200 font-bold text-[17px]">Token Address</p>
          <div className="relative">
            <input
              value={tokenAddress}
              onChange={handletokenadddress}
              className="w-full bd rounded-[10px] h-[50px] pl-10 pr-3 outline-none bg-transparent text-gray-600"
              placeholder="Select your Token"
            />
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <br />
          <p className="text-gray-200 font-bold text-[17px]">
            List of Addresses in CSV
          </p>
          <div
            style={{ padding: "20px" }}
            className="w-full rounded-lg flex gap-3 bg-transparent border bd"
          >
            <div
              style={{ overflow: "auto", maxHeight: "100px" }}
              className="line-numbers"
            >
              {lineNumbers.map((number, index) => (
                <div
                  style={{ color: "#445d90" }}
                  key={index}
                  className="line-number  text-gray-300"
                >
                  {number}
                </div>
              ))}
            </div>
            <textarea
              style={{ resize: "none", overflow: "auto", maxHeight: "100px" }}
              className="text-gray-500 rounded-lg w-full focus:border-none focus:outline-none border-none bg-transparent"
              value={fileImported ? csvContent : inputdata}
              onChange={handleinputdata}
              rows={10}
              cols={50}
              spellCheck="false"
            />
          </div>
          <br />
          <label className="relative overflow-hidden">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv"
              className="absolute inset-0 z-10 w-full h-[30px] p-4 opacity-0 cursor-pointer"
            />
            <div className="relative z-0 flex items-center justify-center w-[200px] h-[40px] bg-gray-500 text-white rounded-md">
              Upload CSV
            </div>
          </label>
          {validationError ? (
            <p className="text-red-900 text-[15px]"> {validationError}</p>
          ) : (
            ""
          )}
          <br />
          {walletAddress.length > 20 ? (
            <button
              disabled
              className="w-full cursor-not-allowed  rounded-[5px] bg-gray-500   h-[40px] justify-center items-center flex"
            >
              <p className="text-white text-[15px] font-medium">Continue</p>
            </button>
          ) : (csvContent.length > 0 || inputdata.length > 0) &&
            tokenname.length > 0 &&
            walletaddress.length > 20 ? (
            <button
              onClick={() => handleContinue()}
              className="w-full  rounded-[5px] bg-gray-500  h-[40px] justify-center items-center flex"
            >
              <p className="text-white text-[15px] font-medium">Continue</p>
            </button>
          ) : (
            <button
              className="w-full rounded-[5px] bg-gray-300 h-[40px] justify-center items-center flex cursor-not-allowed"
              disabled
            >
              <p className="text-white text-[15px] font-medium">Continue</p>
            </button>
          )}
        </div>
      ) : step === 2 ? (
        <ApprovalModal
          csvContent={csvContent}
          inputdata={inputdata}
          tokenAddress={tokenAddress}
          validationError={validationError}
          Oncontinue={Oncontinue}
        />
      ) : step === 3 ? (
        <SendToken
          csvContent={csvContent}
          inputdata={inputdata}
          tokenAddress={tokenAddress}
          validationError={validationError}
          Oncontinue={Oncontinue}
          walletAddress={walletAddress}
          amount={amount}
        />
      ) : null}
    </div>
  );
};

export default CSVViewer;
