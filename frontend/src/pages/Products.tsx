import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  UtensilsCrossed,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { api, Product, Category } from '../services/api';

interface ProductsProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getCategories(),
      api.getProducts({ category: activeCategory || undefined, search: searchQuery || undefined })
    ])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [activeCategory, searchQuery]);

  const handleCategorySelect = (slug: string) => {
    if (slug === activeCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-4 h-4" /> Commercial Foodservice Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Heavy-duty freezers, fryers, combi ovens, contact bun warmers, espresso machines, and Middleby Celfrost systems.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#151F2E] border border-slate-700/80 rounded-2xl p-4 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by equipment, model, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing <strong className="text-white">{products.length}</strong> commercial models</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
              activeCategory === ''
                ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/25'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                activeCategory === c.slug
                  ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/25'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {c.name} {c.product_count ? `(${c.product_count})` : ''}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-xs">Loading commercial catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-[#151F2E] border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Equipment Found</h3>
            <p className="text-slate-400 text-xs mb-4">
              Try adjusting your search terms or view our full catalog.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-[#151D2A] border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-brand-orange transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-60 bg-slate-900/95 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                      {p.brand || 'ChefMachines Pro'}
                    </div>
                    {p.model && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-slate-300 border border-slate-700">
                        {p.model}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {p.category_slug.replace('-', ' ')}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white line-clamp-2 group-hover:text-amber-400 transition">
                      <Link to={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Features preview */}
                    {p.features && p.features.length > 0 && (
                      <ul className="mt-4 space-y-1">
                        {p.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-brand-orange shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer / Actions */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commercial Pricing</span>
                    <span className="text-xs font-bold text-white">Direct Factory RFQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3.5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-xs font-bold text-white rounded-xl shadow-md shadow-brand-orange/30 transition"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
