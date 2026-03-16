import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './components/common/Detail';
import Navbar from './Navbar/Navbar';
import Hero from './components/hero/Hero';
import Products from './components/products/Products';
import About from './components/about/About';
import Services from './components/services/Services';
import Gallery from './components/Gallery/Gallery';
import EventsPage from './components/events/EventsPage';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import ExecutiveTeam from './components/Executive Team/ExecutiveTeam';
import FAQSection from './components/FAQ SECTION/Faq';
import ContactForm from './components/contact/ContactForm';
import CloudEffects from './components/services/details/CloudEffects';
import LuxuryWedding from './components/services/details/LuxuryWedding';
import GrandEntry from './components/services/details/GrandEntry';
import VenueDecoration from './components/services/details/VenueDecoration';
import Fireworks from './components/services/details/Fireworks';
import SoundLightVisual from './components/services/details/SoundLightVisual';
import ItemSelection from './components/booking/ItemSelection';
import ThankYou from './components/booking/ThankYou';
import ScrollToTop from './components/common/ScrollToTop';
// import Gallery from './components/Gallery/Gallery';
// import Payment from './components/booking/Payment';
// import AnnouncementBar from './components/common/AnnoucementBar';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <ExecutiveTeam/>
                <Products />
                <Services />
                <Gallery />
                <FAQSection/>
                <Contact />
              </>
            } />
            <Route path="/contact" element={
              <ContactForm />
            } />
            <Route path="/events" element={
              <EventsPage />
            } />
            <Route path="/select-items" element={
              <div className="min-h-[calc(100vh-4rem)]">
                <ItemSelection />
              </div>
            } />
            <Route path="/services/cloud-effects" element={
              <CloudEffects />
            } />
            <Route path="/services/luxury-wedding" element={
              <LuxuryWedding />
            } />
            <Route path="/services/grand-entry" element={
              <GrandEntry />
            } />
            <Route path="/services/venue-decoration" element={
              <VenueDecoration />
            } />
            <Route path="/services/fireworks" element={
              <Fireworks />
            } />
            <Route path="/services/sound-light-visual" element={
              <SoundLightVisual />
            } />
            <Route path="/events/:eventId" element={
              <div className="bg-white">
                <EventsPage />
              </div>
            } />
            <Route path="/thank-you" element={
              <div className="min-h-[calc(100vh-4rem)] bg-yellow-50">
                <ThankYou />
              </div>
            } />
          </Routes>
        </main>
        {/* <Gallery /> */}
        <Footer />
        <Detail />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;