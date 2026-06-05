export default function Contact({ data }) {
  if (!data?.email && !data?.message) return null;
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-400 mb-6">{data.message}</p>
        {data.email && <a href={"mailto:" + data.email} className="text-emerald-400 hover:underline text-lg">{data.email}</a>}
      </div>
    </section>
  );
}
