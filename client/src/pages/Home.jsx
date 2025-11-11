import Navbar from "../components/Navbar"
import About from "../components/About"
import Contact from "../components/Contact"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Projects from "../components/Projects"
import Tools from "../components/Tools"


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Tools />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home
