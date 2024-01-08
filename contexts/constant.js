import MultiAirdropdispenserJSON from "@/contexts/MultiAirdropDispenser.json";

// Log the raw JSON data before parsing
console.log("Raw JSON data:", MultiAirdropdispenserJSON);

// Extract ABI from the JSON data
export const MultiAirdropdispenserABI = MultiAirdropdispenserJSON.abi;
export const MultiAirdropdispenserAddress =
  "0x6398E7AA46c981D52bb42B3a562C99c2cc6c6D3b";
