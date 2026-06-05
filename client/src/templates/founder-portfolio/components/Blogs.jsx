export default function Blogs({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Blog</h2>
        <div className="space-y-6">
          {data.map((blog, i) => (
            <a key={i} href={blog.url} target="_blank" rel="noreferrer" className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h3>
              <p className="text-gray-500">{blog.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
