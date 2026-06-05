export default function Experience({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Experience</h2>
        <div className="space-y-6">
          {data.map((exp, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                <span className="text-emerald-400 text-sm">{exp.duration}</span>
              </div>
              <p className="text-gray-400 font-medium mb-2">{exp.company}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
