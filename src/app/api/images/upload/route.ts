import {Drive} from "deta";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const images = Drive("images");
  const image = (await request.formData()).get("image");
  const file = await (image as File).arrayBuffer();

  images.put("image.jpg", {data: Buffer.from(file)});

  return new Response('Hello, Next.js!');
}
