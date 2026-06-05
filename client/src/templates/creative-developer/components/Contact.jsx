export default function Contact({ data }) {
  if (!data?.email && !data?.message) return null;
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-4">Let's Work Together</h2>
        <p className="text-gray-400 mb-8">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="inline-block px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">{data.email}</a>}
      </div>
    </section>
  );
}
