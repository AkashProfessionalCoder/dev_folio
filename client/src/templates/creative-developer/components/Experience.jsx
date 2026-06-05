export default function Experience({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">Experience</h2>
        <div className="space-y-8">
          {data.map((exp, i) => (
            <div key={i} className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
              <p className="text-purple-600 font-medium">{exp.company}</p>
              <p className="text-sm text-gray-400 mb-2">{exp.duration}</p>
              <p className="text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
