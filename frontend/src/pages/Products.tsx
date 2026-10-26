import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api, Product, Category } from '../services/api';
import { BRANDS } from '../components/BrandMarquee';
import { CategoryIcon } from '../components/CategoryIcons';
import { BrandLogo } from '../components/BrandLogos';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] block mb-1">
            AUTHORIZED COMMERCIAL HARDWARE
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display uppercase tracking-tight">
            Commercial Kitchen Equipment Catalog
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Official distributor of Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall, Fiorenzato, Marco, and Sinmag.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-slate-300 rounded-md p-3 mb-6 flex flex-col md:flex-row items-center justify-between gap-3 shadow-none">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by model, brand, or equipment type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-[#FF5722] focus:bg-white"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{products.length}</strong> commercial models
          </span>
        </div>

        {/* Category Filter Pills (with Category Icons) */}
        <div className="mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-bold">
            Equipment Categories:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategorySelect('')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition border ${
                activeCategory === ''
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => {
              const selected = activeCategory === c.slug;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCategorySelect(c.slug)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition border ${
                    selected
                      ? 'bg-[#FF5722] border-[#FF5722] text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <CategoryIcon slug={c.slug} className={`w-3.5 h-3.5 ${selected ? 'text-white' : 'text-[#FF5722]'}`} />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand Filter Row (with Brand Logos) */}
        <div className="mb-8 pb-4 border-b border-slate-200">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-bold">
            Authorized Brands:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handleBrandSelect('')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition border ${
                activeBrand === ''
                  ? 'bg-slate-900 border-slate-900 text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Brands
            </button>
            {BRANDS.map((b) => (
              <button
                key={b.name}
                onClick={() => handleBrandSelect(b.name)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition border ${
                  activeBrand.toLowerCase() === b.name.toLowerCase()
                    ? 'bg-[#FF5722] border-[#FF5722] text-white font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-8 h-8 border-2 border-[#FF5722] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono uppercase tracking-wider">Loading commercial equipment catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center bg-white border border-slate-200 rounded-md p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-1">No equipment matches your filters</h3>
            <p className="text-slate-500 text-xs mb-4">
              Try selecting a different brand or category, or clear search queries.
            </p>
            <button
              onClick={() => {
                setSearchParams({});
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#FF5722] text-white font-bold text-xs uppercase tracking-wider rounded-md"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-md overflow-hidden transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 flex items-center justify-center p-4 border-b border-slate-100">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                      <BrandLogo brand={p.brand} className="h-4" showWordmark={true} />
                    </div>
                    {p.category_slug && (
                      <div className="absolute top-3 right-3 p-1.5 rounded bg-white/90 border border-slate-200 text-slate-600">
                        <CategoryIcon slug={p.category_slug} className="w-4 h-4" />
                      </div>
                    )}
                    {p.model && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-600 border border-slate-200">
                        {p.model}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      {p.category_slug.replace('-', ' ')}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-[#FF5722] transition">
                      <Link to={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {p.features && p.features.length > 0 && (
                      <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                        {p.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Commercial</span>
                    <span className="text-xs font-bold text-slate-900">Direct Factory RFQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded transition"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3 py-1.5 bg-[#FF5722] hover:bg-[#e64a19] text-xs font-bold text-white rounded transition"
                    >
                      RFQ
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
