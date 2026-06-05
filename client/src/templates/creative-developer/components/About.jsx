export default function About({ data }) {
  if (!data?.bio) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-8">About Me</h2>
        <p className="text-xl text-gray-600 leading-relaxed">{data.bio}</p>
      </div>
    </section>
  );
}
