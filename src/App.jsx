import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="app">
            <Navigation />
            <main>
                <Hero />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
