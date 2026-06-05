export default function About({ data }) {
  if (!data?.bio) return null;
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About</h2>
        <p className="text-gray-600 leading-relaxed">{data.bio}</p>
      </div>
    </section>
  );
}
