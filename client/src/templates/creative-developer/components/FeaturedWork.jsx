export default function FeaturedWork({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Featured Work</h2>
        <div className="space-y-16">
          {data.map((work, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{work.title}</h3>
                <p className="text-gray-600 mb-4">{work.description}</p>
                {work.url && <a href={work.url} target="_blank" rel="noreferrer" className="text-purple-600 font-medium hover:underline">View Project</a>}
              </div>
              <div className="bg-purple-100 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-purple-400 text-lg">Preview</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
