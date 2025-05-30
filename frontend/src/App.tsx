import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import SongList from './components/SongList';
import AdminDashboard from './components/AdminDashboard';
import { useGSAP } from './hooks/useGSAP';

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP({
    animation: (gsap) => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );
    },
    dependencies: [],
  });

  return (
    <div ref={mainRef} className="min-h-screen bg-lofi-cream/50">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#F0EAE3',
            color: '#554B40',
            border: '1px solid #D4C8BE',
          },
          success: {
            iconTheme: {
              primary: '#8C7B6B',
              secondary: '#F0EAE3',
            },
          },
        }}
      />
      
      <BrowserRouter>
        <Header />
        
        <main ref={contentRef} className="pt-16 pb-20">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <section className="container mx-auto px-4 py-16">
                  <h2 className="text-2xl md:text-3xl font-semibold text-lofi-dark mb-12 text-center">
                    Vote for Your Favorite Tracks
                  </h2>
                  <SongList />
                </section>
              </>
            } />
            
            <Route path="/admin" element={
              <section className="container mx-auto px-4 py-16">
                <h2 className="text-2xl md:text-3xl font-semibold text-lofi-dark mb-12 text-center">
                  Admin Dashboard
                </h2>
                <AdminDashboard />
              </section>
            } />
          </Routes>
        </main>
        
        <footer className="bg-lofi-brown/10 py-8">
          <div className="container mx-auto px-4 text-center text-lofi-dark">
            <p>© Developed by Xboy</p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
