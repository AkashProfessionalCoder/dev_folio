export default function Testimonials({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((t, i) => (
            <blockquote key={i} className="bg-orange-50 rounded-2xl p-8">
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <footer className="font-semibold text-gray-900">{t.author}</footer>
              <p className="text-sm text-gray-400">{t.role}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
