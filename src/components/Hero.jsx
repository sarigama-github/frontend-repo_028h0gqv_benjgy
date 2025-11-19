import { useState } from "react";

export default function Hero({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Find a private pool by the hour</h1>
      <p className="text-blue-200 mb-6">Book beautiful backyards for parties, family time, or a quick dip.</p>
      <div className="max-w-xl mx-auto flex gap-2">
        <input
          className="flex-1 rounded-xl bg-slate-800/70 border border-blue-500/30 px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by city or keywords"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(q)}
        />
        <button
          onClick={() => onSearch(q)}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
