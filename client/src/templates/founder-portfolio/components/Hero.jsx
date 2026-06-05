export default function Hero({ data }) {
  if (!data?.name) return null;
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-6xl font-black text-gray-900 mb-4">{data.name}</h1>
        <p className="text-2xl text-orange-600 font-medium mb-4">{data.title}</p>
        <p className="text-xl text-gray-500 max-w-2xl">{data.tagline}</p>
      </div>
    </section>
  );
}
