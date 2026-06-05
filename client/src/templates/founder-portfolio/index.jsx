import Hero from './components/Hero';
import Story from './components/Story';
import ProductsBuilt from './components/ProductsBuilt';
import CaseStudies from './components/CaseStudies';
import Blogs from './components/Blogs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function FounderPortfolio({ portfolioData }) {
  return (
    <main>
      <Hero data={portfolioData.hero || portfolioData} />
      <Story data={portfolioData.story || portfolioData} />
      <ProductsBuilt data={portfolioData.productsBuilt} />
      <CaseStudies data={portfolioData.caseStudies} />
      <Blogs data={portfolioData.blogs} />
      <Testimonials data={portfolioData.testimonials} />
      <Contact data={portfolioData.contact || portfolioData} />
    </main>
  );
}
