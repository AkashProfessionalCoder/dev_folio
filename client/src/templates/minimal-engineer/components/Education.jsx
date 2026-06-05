export default function Education({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
        <div className="space-y-6">
          {data.map((edu, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-400">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
