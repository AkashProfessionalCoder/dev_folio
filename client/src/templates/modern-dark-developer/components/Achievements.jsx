export default function Achievements({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((item, i) => (
            <div key={i} className="bg-black border border-gray-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
