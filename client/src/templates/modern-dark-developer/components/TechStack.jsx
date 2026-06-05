export default function TechStack({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((tech, i) => (
            <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
              <p className="text-white font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
