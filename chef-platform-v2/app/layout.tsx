// app/layout.tsx (FINAL CLEANED CODE)

// Correctly imports your custom global CSS with the Inter font setup
import './globals.css'; 

export const metadata = {
  title: 'ChefConnect Web',
  description: 'Your new clean platform for chef services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The empty className is essential. It prevents Next.js from injecting
          the Geist font variables that were causing the error. 
      */}
      <body className=""> 
        {children}
      </body>
    </html>
  );
}