import { useState } from "react";
import { parseEther, isAddress } from "viem";
import SendUserOperationButton from "@/components/SendUserOperationButton";

export default function TransactionForm() {
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidValue, setIsValidValue] = useState(false);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    setIsValidAddress(newAddress === "" || isAddress(newAddress));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    try {
      if (newValue === "" || parseFloat(newValue) >= 0) {
        setIsValidValue(true);
      } else {
        setIsValidValue(false);
      }
    } catch {
      setIsValidValue(false);
    }
  };


  const isFormValid: boolean = isValidAddress && isValidValue;

  return (
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
          to={address as `0x${string}`}
          value={parseEther(value)}
          isEnabled={isFormValid}
        />
      </div>
    </form>
  );
}
