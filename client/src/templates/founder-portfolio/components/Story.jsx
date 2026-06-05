export default function Story({ data }) {
  if (!data?.text) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">My Story</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{data.text}</p>
      </div>
    </section>
  );
}
