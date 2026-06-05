export default function Skills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {data.map((skill, i) => (
            <span key={i} className="px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-medium">{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
