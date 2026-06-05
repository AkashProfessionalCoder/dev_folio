export default function Hero({ data }) {
  if (!data?.name) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-emerald-400 font-mono mb-4">{data.greeting}</p>
        <h1 className="text-6xl font-bold text-white mb-4">{data.name}</h1>
        <p className="text-2xl text-gray-400 mb-6">{data.role}</p>
        <p className="text-gray-500 max-w-2xl">{data.description}</p>
      </div>
    </section>
  );
}
