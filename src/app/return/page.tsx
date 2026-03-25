import Link from "next/link";
import React from "react";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined; //session id 作为参数导入到return页面
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return <div>No session id found!</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
  );
  const data = await res.json();

  return (
    <div className="">
      {/* 从session.route拿到的支付状态 */}
      <h1>Payment {data.status}</h1>
      <p>Payment status: {data.paymentStatus}</p>
      <Link href="/orders">See your orders</Link>
    </div>
  );
};

export default ReturnPage;
