import { useState, useMemo } from "react";
import { parseEther, isAddress, Address } from "viem";
import SendUserOperationButton from "@/components/SendUserOperationButton";

export default function TransactionForm() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");

  const isValidAddress = useMemo(() => {
    if (address === "") return false;
    return isAddress(address);
  }, [address]);

  const isValidValue = useMemo(() => {
    if (value === "") return false;
    try {
      return parseEther(value) >= 0n;
    } catch {
      return false;
    }
  }, [value]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };


  const isFormValid: boolean = isValidAddress && isValidValue;

  return (
    <div className="w-96 mt-12">
      <form className="space-y-4">
        <div>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Recipient Address (0x...)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <input
            type="number"
            id="value"
            value={value}
            onChange={handleValueChange}
            placeholder="Amount (0.0001 ETH)"
            step="0.000001"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mt-8">
          <SendUserOperationButton
            to={address as Address}
            value={isValidValue ? parseEther(value) : 0n}
            isEnabled={isFormValid}
          />
        </div>
      </form>
    </div>
  );
}
