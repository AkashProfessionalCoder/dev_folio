import { lazy, Suspense, Component } from "react";

const templateMap = {
  "minimal-engineer": lazy(
    () => import("../../templates/minimal-engineer/index.jsx"),
  ),
  "modern-dark-developer": lazy(
    () => import("../../templates/modern-dark-developer/index.jsx"),
  ),
  "creative-developer": lazy(
    () => import("../../templates/creative-developer/index.jsx"),
  ),
  "senior-engineer-resume": lazy(
    () => import("../../templates/senior-engineer-resume/index.jsx"),
  ),
  "founder-portfolio": lazy(
    () => import("../../templates/founder-portfolio/index.jsx"),
  ),
};

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
          <p className="text-sm font-medium">Preview crashed</p>
          <p className="text-xs">Check your portfolio data for invalid values.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function TemplatePreview({ templatePath, data }) {
  const TemplateComponent = templateMap[templatePath];

  if (!TemplateComponent) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        Template preview not available
      </div>
    );
  }

  return (
    <PreviewErrorBoundary data={data}>
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center text-gray-400">
            Loading preview...
          </div>
        }
      >
        <TemplateComponent portfolioData={data} />
      </Suspense>
    </PreviewErrorBoundary>
  );
}
