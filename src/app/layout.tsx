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
        <main className="pt-[120px] min-h-screen flex justify-center px-6">
          {children}
        </main>

      </body> 
    </html>
  );
}
