export default function Projects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, i) => (
            <div key={i} className="bg-black border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2">{project.name}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 text-sm hover:underline">Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-emerald-400 text-sm hover:underline">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
