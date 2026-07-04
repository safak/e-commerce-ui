"use client";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag, PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileButton = () => {
  const router = useRouter();

  return (
    <UserButton>
      <UserButton.MenuItems>
        {/* 订单 */}
        <UserButton.Action
          label="See Orders"
          labelIcon={<ShoppingBag className="w-4 h-4" />}
          onClick={() => router.push("/orders")}
        />

        {/* 尺寸档案 */}
        <UserButton.Action
          label="Size Profile"
          labelIcon={<PencilRuler className="w-4 h-4" />}
          onClick={() => router.push("/size-profile")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ProfileButton;
