import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full dark-scrollbar overflow-hidden bg-black">
        {children}
      </body>
    </html>
  );
}
