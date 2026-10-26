import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { api, Product, Category } from '../services/api';
import { BRANDS } from '../components/BrandMarquee';

interface ProductsProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const activeBrand = searchParams.get('brand') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getCategories(),
      api.getProducts({
        category: activeCategory || undefined,
        brand: activeBrand || undefined,
        search: searchQuery || undefined
      })
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
  }, [activeCategory, activeBrand, searchQuery]);

  const handleCategorySelect = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    setSearchParams(params);
  };

  const handleBrandSelect = (brandName: string) => {
    const params = new URLSearchParams(searchParams);
    if (brandName.toLowerCase() === activeBrand.toLowerCase()) {
      params.delete('brand');
    } else {
      params.set('brand', brandName);
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Commercial Equipment Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Commercial Kitchen Equipment
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Supplying Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall, Fiorenzato, Marco, and Sinmag.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model, brand, or equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{products.length}</strong> commercial models
          </span>
        </div>

        {/* Brand Filter Row */}
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Filter by Brand:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            <button
              onClick={() => handleBrandSelect('')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                activeBrand === ''
                  ? 'bg-brand-orange border-brand-orange text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Brands
            </button>
            {BRANDS.map((b) => (
              <button
                key={b.name}
                onClick={() => handleBrandSelect(b.name)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                  activeBrand.toLowerCase() === b.name.toLowerCase()
                    ? 'bg-brand-orange border-brand-orange text-white font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8 pb-1">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
              activeCategory === ''
                ? 'bg-slate-900 border-slate-900 text-white font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.slug)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                activeCategory === c.slug
                  ? 'bg-slate-900 border-slate-900 text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            Loading commercial equipment...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900 mb-1">No Equipment Found</h3>
            <p className="text-slate-500 text-xs mb-3">Try clearing your brand or category filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-4 py-1.5 bg-brand-orange text-white text-xs font-bold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl overflow-hidden shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200 shadow-sm">
                      {p.brand}
                    </div>
                    {p.model && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-600 border border-slate-200">
                        {p.model}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {p.category_slug.replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-brand-orange transition">
                      <Link to={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {p.features && p.features.length > 0 && (
                      <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                        {p.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commercial</span>
                    <span className="text-xs font-bold text-slate-900">Direct Factory RFQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-xs font-bold text-white rounded-lg transition"
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
