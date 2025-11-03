// @ts-nocheck
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Intelligent Revision Plan",
  description: "AI-Powered Academic Assistant by CreativeEdge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* ✅ Responsive Navbar */}
        <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
          {/* Logo */}
          <Link href="/" className="font-bold text-indigo-600 text-lg sm:text-xl">
         Intelligent Revision Plan
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/login" className="hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <Link href="/teacher" className="hover:text-indigo-600 transition-colors">
              Teacher
            </Link>
            <Link href="/student" className="hover:text-indigo-600 transition-colors">
              Student
            </Link>
            <Link href="/parent" className="hover:text-indigo-600 transition-colors">
              Parent
            </Link>
            <Link href="/counselor" className="hover:text-indigo-600 transition-colors">
              Counselor
            </Link>
            <Link href="/admin" className="hover:text-indigo-600 transition-colors">
              Admin
            </Link>
          </div>

          {/* ✅ Mobile Dropdown Menu */}
          <div className="md:hidden relative">
            <details className="cursor-pointer select-none">
              <summary className="text-slate-700 text-sm font-medium list-none">
                ☰ Menu
              </summary>
              <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg w-40 py-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "Login", href: "/login" },
                  { name: "Teacher", href: "/teacher" },
                  { name: "Student", href: "/student" },
                  { name: "Parent", href: "/parent" },
                  { name: "Counselor", href: "/counselor" },
                  { name: "Admin", href: "/admin" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </nav>

        {/* Page Content */}
        <main className=" mx-auto p-4 sm:p-6">{children}</main>
      </body>
    </html>
  );
}
