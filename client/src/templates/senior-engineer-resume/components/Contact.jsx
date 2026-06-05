export default function Contact({ data }) {
  if (!data?.email) return null;
  return (
    <section className="py-12 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
        {data.email && <a href={"mailto:" + data.email} className="text-blue-400 hover:underline">{data.email}</a>}
        {data.linkedin && <p className="mt-2"><a href={data.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400">LinkedIn</a></p>}
      </div>
    </section>
  );
}
