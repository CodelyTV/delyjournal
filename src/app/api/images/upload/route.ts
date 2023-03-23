import {Drive} from "deta";

export async function POST(request: Request) {
  const images = Drive("images");

  const blob = await request.blob();
  const reader = blob.stream().getReader();
  const buffers: Buffer[] = [];
  for await (const chunk of readChunks(reader)) {
    buffers.push(Buffer.from(chunk))
  }

  images.put("picture2.jpg", {data: Buffer.concat(buffers)});

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
