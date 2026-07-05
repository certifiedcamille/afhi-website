import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import InfiniteGridGallery from './sections/InfiniteGridGallery';
import Mission from './sections/Mission';
import FocusAreas from './sections/FocusAreas';
import Objectives from './sections/Objectives';
import Videos from './sections/Videos';
import Community from './sections/Community';
import Footer from './sections/Footer';

function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <InfiniteGridGallery />
        <Mission />
        <FocusAreas />
        <Objectives />
        <Videos />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

export default App;
