export default function ProductsBuilt({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Products Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.map((product, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 mb-4">{product.description}</p>
              {product.url && <a href={product.url} target="_blank" rel="noreferrer" className="text-orange-600 font-medium hover:underline">Visit</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
