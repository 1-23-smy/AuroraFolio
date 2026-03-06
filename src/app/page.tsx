import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProjectCarousel from "@/components/ProjectCarousel";
import SkillChart from "@/components/SkillChart";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center w-full">
        <Hero />
        {/* Projects Section */}
        <section id="projects" className="min-h-screen border-t border-white/5 py-20 w-full flex flex-col items-center">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">Interactive 3D showcase of my recent work. Drag to rotate and explore.</p>
          </div>
          <ProjectCarousel />
        </section>
        <section id="skills" className="min-h-screen border-t border-white/5 py-20 w-full flex flex-col items-center">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Technical Expertise</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10">A comprehensive view of my skill domains and proficiency levels.</p>
          </div>
          <SkillChart />
        </section>
      </main>
      <Footer />
    </>
  );
}
