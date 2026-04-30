import About from "./AboutUs";
import { Contact } from "./Contact";
import { Courses } from "./Courses";
import Faculty from "./Faculty";
import { Footer } from "./Footer";
import Gallery from "./Gallery";
import Header from "./Header";
import { Hero } from "./Hero";
import { SearchCourses } from "./Search";



export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <SearchCourses/>
      <About/>
      <Courses/>
      <Gallery/>
      <Faculty/>
      <Contact/>
      <Footer/>
    </>
  );
}