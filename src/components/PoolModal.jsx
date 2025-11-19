import { useEffect, useState } from "react";

export default function PoolModal({ pool, onClose }) {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("12:00");
  const [end, setEnd] = useState("14:00");
  const [busy, setBusy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL || "";

  useEffect(() => {
    if (!pool || !date) return;
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/pools/${pool.id}/availability?date=${date}`);
        const data = await res.json();
        setBusy(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [pool, date]);

  const handleBook = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pool_id: pool.id,
          guest_name: "Guest",
          guest_email: "guest@example.com",
          date,
          start_time: start,
          end_time: end,
          total_price: 0,
        }),
      });
      if (res.ok) {
        setMessage("Request sent! We'll email you once it's confirmed.");
      } else {
        const err = await res.json();
        setMessage(err.detail || "Could not create booking");
      }
    } catch (e) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!pool) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm grid place-items-center p-4 z-50">
      <div className="bg-slate-900 border border-blue-500/30 rounded-2xl max-w-2xl w-full overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-blue-500/20">
          <h3 className="text-white text-xl font-semibold">{pool.title}</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">Close</button>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden">
              {pool.photos?.[0] && (
                <img src={pool.photos[0]} alt={pool.title} className="w-full h-full object-cover" />
              )}
            </div>
            <p className="text-blue-200 mt-3 text-sm">{pool.description}</p>
            <div className="mt-3 text-sm text-blue-200/80">Amenities: {pool.amenities?.join(', ') || '—'}</div>
            <div className="mt-2 text-white font-semibold">${pool.price_per_hour}/hr · up to {pool.capacity}</div>
          </div>
          <div>
            <div className="space-y-3">
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full bg-slate-800 border border-blue-500/30 rounded-xl p-3 text-white"/>
              <div className="flex gap-2">
                <input type="time" value={start} onChange={(e)=>setStart(e.target.value)} className="flex-1 bg-slate-800 border border-blue-500/30 rounded-xl p-3 text-white"/>
                <input type="time" value={end} onChange={(e)=>setEnd(e.target.value)} className="flex-1 bg-slate-800 border border-blue-500/30 rounded-xl p-3 text-white"/>
              </div>
              {busy?.length > 0 && (
                <div className="text-sm text-blue-200/80">Booked: {busy.map(b=>`${b.start_time}-${b.end_time}`).join(', ')}</div>
              )}
              <button onClick={handleBook} disabled={!date || loading} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold">Request to book</button>
              {message && <div className="text-blue-200 text-sm">{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
