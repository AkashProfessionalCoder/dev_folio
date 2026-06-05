export default function Summary({ data }) {
  if (!data?.text) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Professional Summary</h2>
        <p className="text-slate-600 leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}
