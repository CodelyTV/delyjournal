import {Drive} from "deta";
import os from "os";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const images = Drive("images");
  const image = (await request.formData()).get("image")
  const file = await (image as File).arrayBuffer()

  images.put("image.jpg", {data: Buffer.from(file)});

  return new Response('Hello, Next.js!')
}

export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
    return {
        async* [Symbol.asyncIterator]() {
            let readResult = await reader.read();
            while (!readResult.done) {
                yield readResult.value;
                readResult = await reader.read();
            }
        },
    };
}
