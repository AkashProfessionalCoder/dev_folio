export default function OpenSource({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Open Source</h2>
        <div className="space-y-4">
          {data.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noreferrer" className="block bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
              <p className="text-gray-400">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
