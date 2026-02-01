import { NavigationProvider } from './context/NavigationContext';
import { Navigation } from './components/Layout/Navigation';
import { Footer } from './components/Layout/Footer';
import { ScrollContainer } from './components/Layout/ScrollContainer';
import { Home } from './components/Sections/Home';
import { About } from './components/Sections/About';
import { Roster } from './components/Sections/Roster';
import { Contact } from './components/Sections/Contact';
import './styles/global.css';

function App() {
  return (
    <NavigationProvider>
      <div className="app">
        <Navigation />
        <Footer />
        <ScrollContainer>
          <Home />
          <About />
          <Roster />
          <Contact />
        </ScrollContainer>
      </div>
    </NavigationProvider>
  );
}

export default App;
