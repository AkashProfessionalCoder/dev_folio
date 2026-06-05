export default function Hero({ data }) {
  if (!data?.name) return null;
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
        <p className="text-xl text-blue-400 mb-4">{data.title}</p>
        <div className="flex gap-4 text-slate-400 text-sm">
          {data.location && <span>{data.location}</span>}
          {data.email && <a href={"mailto:" + data.email} className="hover:text-blue-400">{data.email}</a>}
        </div>
      </div>
    </section>
  );
}
