import "./globals.css";


export const metadata = {
  title: "Intelligent Revision Plan",
  description: "AI-Powered Academic Assistant by CreativeEdge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between">
          <h1 className="font-bold">IRP Demo</h1>
          <div className="flex gap-4 text-sm">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/teacher">Teacher</a>
            <a href="/student">Student</a>
            <a href="/parent">Parent</a>
            <a href="/admin">Admin</a>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
