export default function MajorProjects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-12 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Major Projects</h2>
        <div className="space-y-6">
          {data.map((project, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.name}</h3>
              <p className="text-slate-600 mb-3">{project.description}</p>
              {project.impact && <p className="text-sm text-blue-600 font-medium">Impact: {project.impact}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
