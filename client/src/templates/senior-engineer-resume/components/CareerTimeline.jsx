export default function CareerTimeline({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Career Timeline</h2>
        <div className="space-y-8">
          {data.map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-32 flex-shrink-0 text-sm text-slate-400 pt-1">{item.duration}</div>
              <div className="border-l-2 border-blue-500 pl-6 pb-4">
                <h3 className="text-lg font-semibold text-slate-900">{item.position}</h3>
                <p className="text-blue-600 font-medium">{item.company}</p>
                <p className="text-slate-500 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
