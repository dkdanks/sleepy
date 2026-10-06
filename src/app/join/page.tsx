import type { Metadata } from "next";
import { Header } from "@/components/chrome";
import { JoinFlow } from "./join-flow";

export const metadata: Metadata = { title: "Join · Sleepys Wine Club" };

export default function JoinPage() {
  return (
    <>
      <Header />
      <main>
        <JoinFlow />
      </main>
    </>
  );
}
