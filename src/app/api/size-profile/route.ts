import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  const data = await req.json();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = await clerkClient();

  // 先拿已有数据
  const user = await client.users.getUser(userId);

  // merge
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      ...user.publicMetadata, // 保留原来的
      sizeProfile: data, // 新增/覆盖这个字段
    },
  });

  return Response.json({ success: true });
}
