import {Drive} from "deta";

export async function POST(request: Request) {
  const images = Drive("images");

  const blob = await request.blob();
  const result = await blob.stream().getReader().read();

  images.put("picture2.jpg", {data: result.value});

  return new Response('Hello, Next.js!')
}
