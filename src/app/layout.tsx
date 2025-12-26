import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "TrustLens AI",
  description: "Explainable scam & fake platform detection",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body >
        <Navbar />

        {/* Offset for floating navbar */}
        <main className="pt-40 px-4">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
