import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <SignIn />
    </div>
  );
}
