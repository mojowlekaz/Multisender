import React, { useEffect, useState, useContext } from "react";
import { MultisendProviderContext } from "@/contexts/MultisendProvider";

export default function ApprovalModal({
  csvContent,
  inputdata,
  Oncontinue,
  tokenAddress,
}) {
  const { tokenname, usertokenBalance, calculateFees, fee, Approve, approved } =
    useContext(MultisendProviderContext);
  const [totalrecipient, setTotalRecipient] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);

  useEffect(() => {
    handleContinue();
    calculateFees(totalrecipient);
  });
  const handleContinue = () => {
    const lines = (csvContent || inputdata).split("\n");

    let totalRecipients = 0;
    let totalAmount = 0;

    const areWalletAddressesValid = lines.every((line) => {
      const [walletAddress, amount] = line
        .split(",")
        .map((item) => item.trim());

      if (walletAddress.length > 0) {
        totalRecipients++;
      }

      if (!isNaN(parseInt(amount))) {
        totalAmount += parseInt(amount);
      }

      return walletAddress.length > 0 && !isNaN(parseInt(amount));
    });

    if (areWalletAddressesValid) {
      setTotalRecipient(totalRecipients);
      setTotalAmount(totalAmount);
      console.log("All wallet addresses and amounts are valid. Continue...");
    } else {
      console.error("Some wallet addresses or amounts are invalid.");
    }
  };

  const handleApproval = () => {
    try {
      Approve(tokenAddress, totalamount);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const content = [
    { name: totalrecipient, for: "Total Recipient" },
    { name: totalamount, for: `Total Amount of $${tokenname} ` },
    { name: fee, for: "Total Fee(CORE)" },
    {
      name: (
        <div>
          {" "}
          {usertokenBalance.length > 10
            ? `${usertokenBalance.slice(0, 6)}...`
            : usertokenBalance}
        </div>
      ),
      for: <div>Your ${tokenname} Balance</div>,
    },
  ];
  return (
    <div className="px-10 py-10 h-full w-full   justify-center items-center">
      <div className="flex flex-row flex-wrap flex-shrink justify-between relative gap-10">
        {content.map((items, index) => (
          <div
            key={index}
            className="boxx flex flex-wrap flex-shrink justify-center items-center"
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-gray-200 font-bold text-[17px]">
                {" "}
                {items.name}
              </p>
              <p className="text-gray-200 font-bold text-[15px]">
                {" "}
                {items.for}
              </p>
            </div>
          </div>
        ))}
      </div>
      <br />
      <h1 className="text-gray-600 font-bold text-[15px]">Amount to approve</h1>
      <p className="text-gray-200 font-bold text-[17px]"> {totalamount}</p>
      <div className="flex justify-center items-center">
        {approved ? (
          <button
            onClick={() => Oncontinue()}
            className="w-full  rounded-[5px] bg-gray-500  h-[40px] justify-center items-center flex"
          >
            <p className="text-white text-[15px] font-medium">Continue</p>
          </button>
        ) : (
          <button
            onClick={() => handleApproval()}
            className="w-full  rounded-[5px] bg-gray-500  h-[40px] justify-center items-center flex"
          >
            <p className="text-white text-[15px] font-medium">Approve</p>
          </button>
        )}
      </div>
    </div>
  );
}
