export default function CaseStudies({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 mb-12">Case Studies</h2>
        <div className="space-y-12">
          {data.map((cs, i) => (
            <div key={i} className="border-l-4 border-orange-500 pl-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{cs.title}</h3>
              <p className="text-gray-600 mb-2">{cs.challenge}</p>
              <p className="text-gray-500">{cs.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
