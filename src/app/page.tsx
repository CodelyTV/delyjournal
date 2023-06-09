"use client"

import { useRef } from "react";

export default function Home() {

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(event.target.file.files);

    if (event.target.file.files && event.target.file.files[0]) {
      const i = event.target.file.files[0];
      const body = new FormData();
      body.append("image", i);
      
      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: body,
      });
    }
  }

  return (
    <main>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="file">Select file</label>
      <input 
        type="file"
        id="file"
        name="file"
        accept="image/*"
        style={{ display: 'none' }} />

      <input type="submit" value={"Send file"}/>
      </form>
    </main>
  )
}
