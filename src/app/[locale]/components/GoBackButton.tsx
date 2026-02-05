"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  readonly label?: string;
};

export function GoBackButton({ label = "Go Back" }: Readonly<Props>) {
  return (
    <Button
      className="w-full"
      onClick={() => window.history.back()}
      size="lg"
      variant="outline"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
