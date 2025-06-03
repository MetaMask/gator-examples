"use client";

import { useSessionAccount } from "@/providers/SessionAccountProvider";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";

export default function CreateSessionAccountButton() {
  const { createSessionAccount } = useSessionAccount();

  const handleCreateSessionAccount = async () => {
    await createSessionAccount();
  };

  return (
    <Button className="w-full space-x-2" onClick={handleCreateSessionAccount}>
      <span>Create Session Account</span>
      <ArrowRight className="w-5 h-5" />
    </Button>
  );
}
