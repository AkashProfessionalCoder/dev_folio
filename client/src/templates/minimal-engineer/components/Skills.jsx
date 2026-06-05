export default function Skills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {data.map((skill, i) => (
            <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
