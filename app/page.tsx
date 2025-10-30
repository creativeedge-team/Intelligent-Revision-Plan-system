import Image from "next/image";

export default function Home() {
  return (
  <>
  
     <div className="bg-white shadow rounded-lg p-8 text-center mt-10">
      <h1 className="text-3xl font-bold mb-2">Intelligent Revision Plan (IRP)</h1>
      <p className="text-slate-600 mb-6">
        AI-powered academic assistant turning test data into actionable revision strategies.
      </p>
      <a href="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-md">Get Demo Access</a>
    </div>
  
  
  </>
  );
}
