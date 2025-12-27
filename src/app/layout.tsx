import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body>
        

        {/* Single source of spacing */}
        <main className="pt-[120px] flex justify-center px-6 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
