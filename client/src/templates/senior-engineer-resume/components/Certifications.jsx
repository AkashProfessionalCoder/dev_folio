export default function Certifications({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Certifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((cert, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900">{cert.name}</h3>
              <p className="text-sm text-slate-400">{cert.issuer} &middot; {cert.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
