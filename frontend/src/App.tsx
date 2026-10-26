import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { SetupWizard } from './pages/SetupWizard';
import { TurnkeySolutions } from './pages/TurnkeySolutions';
import { Calculators } from './pages/Calculators';
import { TrainingAcademy } from './pages/TrainingAcademy';
import { Blogs } from './pages/Blogs';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { About } from './pages/About';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalEquipment, setQuoteModalEquipment] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (equipment?: string) => {
    setQuoteModalEquipment(equipment);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setQuoteModalEquipment(undefined);
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#0B0F17] text-slate-100">
        <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/products" element={<Products onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/products/:slug" element={<ProductDetail onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/wizard" element={<SetupWizard />} />
            <Route path="/turnkey" element={<TurnkeySolutions onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/training" element={<TrainingAcademy />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPostDetail />} />
            <Route path="/about" element={<About onOpenQuoteModal={handleOpenQuoteModal} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />

        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={handleCloseQuoteModal}
          defaultEquipment={quoteModalEquipment}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
