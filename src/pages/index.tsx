import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useState } from "react";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [schoolId, setSchoolId] = useState("");

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <input
          type="text"
          value={schoolId}
          onChange={(e) => {
            setSchoolId(e.target.value);
          }}
        />
        <Link legacyBehavior href={`/me/${schoolId}`}>
          <a className="text-2xl text-white">Go to your page</a>
        </Link>
      </main>
    </>
  );
}
