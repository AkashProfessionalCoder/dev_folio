export default function Testimonials({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-purple-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((t, i) => (
            <blockquote key={i} className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
              <footer className="text-gray-900 font-semibold">{t.author}</footer>
              <p className="text-sm text-gray-400">{t.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
