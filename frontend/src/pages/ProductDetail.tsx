import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  Download,
  ShieldCheck,
  Zap,
  Gauge,
  Layers,
  Sparkles
} from 'lucide-react';
import { api, Product } from '../services/api';

interface ProductDetailProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getProduct(slug)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Commercial Model Not Found</h2>
          <p className="text-slate-400 text-sm mb-4">The equipment item you are looking for is unavailable.</p>
          <Link to="/products" className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Equipment Catalog
        </Link>

        {/* Main Grid */}
        <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Image Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-center h-80 sm:h-96 relative">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 text-amber-400 border border-amber-500/30">
                  {product.brand || 'ChefMachines Pro'}
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-bold text-brand-orange">
                    {product.category_slug.replace('-', ' ')}
                  </span>
                  {product.model && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Model: {product.model}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black font-display text-white mb-4 leading-tight">
                  {product.name}
                </h1>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features Checklist */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Engineering Capabilities:
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Specs Box */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 my-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" /> Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase block">{key}</span>
                        <strong className="text-white text-xs">{String(val)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Row */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">B2B Commercial Pricing</span>
                  <span className="text-sm font-bold text-white">Direct Factory Quotation + Warranty</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onOpenQuoteModal(product.name)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition"
                  >
                    <PhoneCall className="w-4 h-4" /> Request Official Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
