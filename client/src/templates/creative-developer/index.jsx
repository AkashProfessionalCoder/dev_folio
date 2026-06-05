import Hero from './components/Hero';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function CreativeDeveloper({ portfolioData }) {
  return (
    <main>
      <Hero data={portfolioData.hero || portfolioData} />
      <About data={portfolioData.about || portfolioData} />
      <FeaturedWork data={portfolioData.featuredWork} />
      <Skills data={portfolioData.skills} />
      <Testimonials data={portfolioData.testimonials} />
      <Experience data={portfolioData.experience} />
      <Contact data={portfolioData.contact || portfolioData} />
    </main>
  );
}
