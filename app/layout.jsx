// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Intelligent Revision Plan",
  description: "AI-powered revision & analytics for schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
