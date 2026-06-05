export default function TechnicalSkills({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Technical Skills</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((group, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{group.category}</h3>
              <p className="text-slate-700">{group.items?.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
