import HeroSlider from './components/HeroSlider'
import BlogSection from './components/BlogSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import PropertyCards from './components/PropertyCards'

export default function Home() {
  return (
    <>
      <HeroSlider />
     <PropertyCards />
      <BlogSection />
      <AboutSection />
      <ContactSection />
    </>
  )
}