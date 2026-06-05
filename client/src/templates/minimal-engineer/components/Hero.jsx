export default function Hero({ data }) {
  if (!data?.name) return null;
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{data.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{data.role}</p>
        <p className="text-gray-500 max-w-2xl mx-auto">{data.description}</p>
      </div>
    </section>
  );
}
