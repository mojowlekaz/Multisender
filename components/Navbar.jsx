"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { MultisendProviderContext } from "@/contexts/MultisendProvider";

export default function Navbar() {
  const menuItems = [
    {
      path: "Faq",
      link: "/",
    },
    {
      path: "Tutorial",
      link: "/",
    },
    {
      path: "Products",
      link: "/",
    },
    {
      path: "Information",
      link: "/",
    },
  ];

  const { walletaddress, Connectwallet, network } = useContext(
    MultisendProviderContext
  );

  return (
    <div className="bg-0b114c p-[20px] flex  h-full w-full  justify-between items-center">
      <h1 className="text-white text-[40px] font-bold ">MULTISENDER</h1>
      <div className="flex gap-10">
        {menuItems.map((items, index) => (
          <Link key={index} href={{ pathname: `${items.path}` }}>
            <p className="text-white text-[20px] font-medium">{items.path}</p>
          </Link>
        ))}
      </div>
      <div className="justify-center flex gap-4 items-center">
        <div className="w-[120px] bd h-[50px] rounded-[5px]  justify-center items-center flex gap-2">
          <Image
            src="/Navbarassets/core.png"
            alt="logo"
            height={20}
            width={20}
          />
          <p className="text-white text-[15px] font-medium">{network}</p>
        </div>
        {walletaddress?.length > 2 ? (
          <button className="w-[120px] rounded-[5px] bd  h-[50px] justify-center items-center flex">
            <p className="text-white text-[15px] font-medium">
              {walletaddress.slice(0, 8)}
            </p>
          </button>
        ) : (
          <button
            onClick={() => Connectwallet()}
            className="w-[120px] rounded-[5px] bd  h-[50px] justify-center items-center flex"
          >
            <p className="text-white text-[15px] font-medium">Connet Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
}
