import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center mt-16">
      <SignIn />
    </div>
  );
}
