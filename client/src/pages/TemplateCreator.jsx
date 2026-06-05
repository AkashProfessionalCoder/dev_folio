import Navbar from "../components/common/Navbar";

export default function TemplateCreator() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 py-20">
          <div className="mb-6 text-6xl">&#128640;</div>
          <h1 className="mb-3 text-3xl font-bold text-gray-200">
            Template Creator
          </h1>
          <h2 className="mb-4 text-xl font-semibold text-brand-400">
            Coming Soon
          </h2>
          <p className="max-w-lg text-center text-gray-500">
            Soon developers can create and publish their own portfolio
            templates. Define your layout, create a schema, and share it with
            the community.
          </p>
        </div>
      </div>
    </div>
  );
}
