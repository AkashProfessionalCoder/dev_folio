export default function Blogs({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Blog</h2>
        <div className="space-y-6">
          {data.map((blog, i) => (
            <a key={i} href={blog.url} target="_blank" rel="noreferrer" className="block border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-gray-500">{blog.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
