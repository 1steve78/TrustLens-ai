import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full dark-scrollbar overflow-y-auto bg-black">

        {children}
      </body>
    </html>
  );
}
