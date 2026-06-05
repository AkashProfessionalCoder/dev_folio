export default function Projects({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
              <p className="text-gray-500 mb-4">{project.description}</p>
              <div className="flex gap-3">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Live</a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
