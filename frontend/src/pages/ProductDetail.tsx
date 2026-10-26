import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Loading equipment specs...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Commercial Model Not Found</h2>
          <Link to="/products" className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Equipment Catalog
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5">
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 flex items-center justify-center h-80 relative">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200 shadow-sm">
                  {product.brand}
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase text-brand-orange">
                  {product.category_slug.replace('-', ' ')}
                </span>
                {product.model && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Model: {product.model}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-3">
                {product.name}
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Commercial Specifications:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs Box */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase block">{key}</span>
                        <strong className="text-slate-900 text-xs">{String(val)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Authorized Distributor</span>
                  <span className="text-xs font-bold text-slate-900">Commercial Factory Warranty Included</span>
                </div>
                <button
                  onClick={() => onOpenQuoteModal(product.name)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Request Official Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
