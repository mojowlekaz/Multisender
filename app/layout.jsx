import { Inter } from "next/font/google";
import "/styles/globals.css";
import MultisendProvider from "@/contexts/MultisendProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Multisender",
  description:
    "This DApp allows users to send thousands of tokens to multiple addresses efficiently by batching the transfers and automating the process. This tool enables users to save time by automatically generating transactions on MetaMask.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MultisendProvider>{children}</MultisendProvider>
      </body>
    </html>
  );
}
