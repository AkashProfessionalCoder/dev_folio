export default function Hero({ data }) {
  if (!data?.name) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-7xl font-black text-gray-900 mb-6 leading-tight">{data.name}</h1>
        <p className="text-2xl text-purple-600 font-medium mb-4">{data.role}</p>
        <p className="text-xl text-gray-500 max-w-2xl">{data.tagline}</p>
      </div>
    </section>
  );
}
