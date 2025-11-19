export default function PoolCard({ pool, onView }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-400/40 transition">
      <div className="aspect-video w-full bg-slate-700">
        {pool.photos?.[0] ? (
          <img src={pool.photos[0]} alt={pool.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-blue-200/60">No Photo</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg truncate">{pool.title}</h3>
          {pool.rating && (
            <span className="text-yellow-300">★ {pool.rating.toFixed(1)}</span>
          )}
        </div>
        <p className="text-blue-200/80 text-sm truncate">{pool.location}</p>
        <div className="mt-2 text-white font-medium">${pool.price_per_hour}/hr · up to {pool.capacity}</div>
        <button onClick={() => onView(pool)} className="mt-3 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold">View</button>
      </div>
    </div>
  );
}
