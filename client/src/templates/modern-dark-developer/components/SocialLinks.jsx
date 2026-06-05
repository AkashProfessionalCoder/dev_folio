export default function SocialLinks({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-6">
          {data.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-lg">{link.platform}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
