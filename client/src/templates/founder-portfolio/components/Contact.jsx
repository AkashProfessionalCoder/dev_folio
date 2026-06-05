export default function Contact({ data }) {
  if (!data?.email && !data?.message) return null;
  return (
    <section className="py-24 px-6 bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-4">Let's Connect</h2>
        <p className="text-gray-400 mb-8">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">{data.email}</a>}
      </div>
    </section>
  );
}
