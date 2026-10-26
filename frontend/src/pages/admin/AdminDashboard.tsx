import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Users,
  GraduationCap,
  BookOpen,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Flame,
  Search
} from 'lucide-react';
import { api, Product, LeadSubmission } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'scraper'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Scraper Trigger State
  const [scraping, setScraping] = useState(false);
  const [scraperResult, setScraperResult] = useState<any>(null);

  // Product Add / Edit Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    model: '',
    category_slug: 'qsr-fast-food',
    brand: 'ChefMachines Pro',
    description: '',
    price_estimate: 85000,
    image_url: '',
    features_raw: 'Commercial Grade SS-304, High Efficiency, Digital Controller',
    is_featured: false
  });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getAdminStats(),
      api.getAdminLeads(),
      api.getProducts()
    ])
      .then(([statsData, leadsData, prodsData]) => {
        setStats(statsData);
        setLeads(leadsData);
        setProducts(prodsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (leadId: number, status: string) => {
    try {
      await api.updateLeadStatus(leadId, status);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    } catch (e) {
      console.error(e);
      alert('Error updating lead status');
    }
  };

  const handleRunScraper = async () => {
    setScraping(true);
    setScraperResult(null);
    try {
      const res = await api.triggerMiddlebyScraper(8, 4);
      setScraperResult(res);
      loadData();
    } catch (e: any) {
      console.error(e);
      alert('Failed to run scraper: ' + e.message);
    } finally {
      setScraping(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this commercial product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      loadData();
    } catch (e) {
      console.error(e);
      alert('Failed to delete product');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const features = productForm.features_raw.split(',').map((f) => f.trim()).filter(Boolean);
      const payload = {
        name: productForm.name,
        slug: productForm.slug || productForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        model: productForm.model,
        category_slug: productForm.category_slug,
        brand: productForm.brand,
        description: productForm.description,
        price_estimate: Number(productForm.price_estimate),
        image_url: productForm.image_url,
        features: features,
        specs: { "Brand": productForm.brand, "Model": productForm.model },
        is_featured: productForm.is_featured,
        is_active: true
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
      } else {
        await api.createProduct(payload);
      }

      setShowProductModal(false);
      setEditingProduct(null);
      loadData();
    } catch (err: any) {
      console.error(err);
      alert('Error saving product: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" /> ChefMachines CMS Administration
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              Commercial Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  slug: '',
                  model: '',
                  category_slug: 'qsr-fast-food',
                  brand: 'ChefMachines Pro',
                  description: '',
                  price_estimate: 85000,
                  image_url: '',
                  features_raw: 'Commercial Grade SS-304, High Efficiency, Digital Controller',
                  is_featured: false
                });
                setShowProductModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-orange/30 transition"
            >
              <Plus className="w-4 h-4" /> Add Commercial Equipment
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'leads', name: `RFQ Leads & Quotes (${leads.length})`, icon: Users },
            { id: 'products', name: `Commercial Catalog (${products.length})`, icon: UtensilsCrossed },
            { id: 'scraper', name: 'Middleby Celfrost Scraper', icon: RefreshCw }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition border ${
                activeTab === t.id
                  ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* ================= TAB: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#151D2A] border border-slate-700/80 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">Total Products</span>
                <div className="text-3xl font-black text-white font-display">
                  {stats?.products_count || products.length}
                </div>
                <span className="text-[10px] text-amber-400 font-semibold mt-1 block">Live in Catalog</span>
              </div>
              <div className="bg-[#151D2A] border border-slate-700/80 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">Inbound Leads / Quotes</span>
                <div className="text-3xl font-black text-brand-orange font-display">
                  {stats?.leads_count || leads.length}
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                  {stats?.new_leads_count || 0} New Pending Follow-up
                </span>
              </div>
              <div className="bg-[#151D2A] border border-slate-700/80 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">Equipment Categories</span>
                <div className="text-3xl font-black text-white font-display">
                  {stats?.categories_count || 6}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">QSR, Bakery, Cold Chain</span>
              </div>
              <div className="bg-[#151D2A] border border-slate-700/80 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">Academy Modules</span>
                <div className="text-3xl font-black text-emerald-400 font-display">
                  {stats?.training_count || 4}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Barista & Combi Certifications</span>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-[#151F2E] border border-slate-700/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-display text-white">Recent Inbound Quote Inquiries</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs font-semibold text-brand-orange hover:text-amber-400"
                >
                  View All Leads →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Client Name</th>
                      <th className="py-2.5 px-3">Business / City</th>
                      <th className="py-2.5 px-3">Inquiry Type</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-900/50">
                        <td className="py-3 px-3 text-slate-400">
                          {l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Today'}
                        </td>
                        <td className="py-3 px-3 font-semibold text-white">{l.full_name}</td>
                        <td className="py-3 px-3 text-slate-300">
                          {l.business_name || 'Individual'} ({l.city || 'India'})
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[10px]">
                            {l.inquiry_type}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            l.status === 'new' ? 'bg-brand-orange/20 text-brand-orange' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {l.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: LEADS ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-[#151F2E] border border-slate-700/80 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold font-display text-white mb-4">
                Inbound RFQ Leads & Wizard Submissions
              </h3>

              <div className="space-y-4">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{l.full_name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                          {l.inquiry_type}
                        </span>
                        <span className="text-slate-500 text-[10px]">
                          {l.created_at ? new Date(l.created_at).toLocaleString() : ''}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-slate-300">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-brand-orange" /> {l.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-brand-orange" /> {l.email}
                        </span>
                        {l.city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-orange" /> {l.city}
                          </span>
                        )}
                        {l.business_name && (
                          <span className="text-slate-400">Brand: <strong>{l.business_name}</strong></span>
                        )}
                      </div>

                      {l.message && (
                        <p className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mt-2">
                          {l.message}
                        </p>
                      )}
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Lead Stage:</span>
                        <select
                          value={l.status}
                          onChange={(e) => handleStatusChange(l.id, e.target.value)}
                          className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-brand-orange"
                        >
                          <option value="new">New (Uncontacted)</option>
                          <option value="contacted">Contacted / Call Done</option>
                          <option value="in_proposal">Proposal / BOQ Sent</option>
                          <option value="completed">Deal Closed / Paid</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-[#151F2E] border border-slate-700/80 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Commercial Equipment Catalog</h3>
                  <p className="text-slate-400 text-xs">Manage product listings, specs, models, and featured items.</p>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  {products.length} Products
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Item</th>
                      <th className="py-2.5 px-3">Model</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Brand</th>
                      <th className="py-2.5 px-3">Featured</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/40">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 p-1 flex items-center justify-center shrink-0 border border-slate-800">
                              <img
                                src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=200'}
                                alt=""
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <span className="font-semibold text-white">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300">{p.model || '—'}</td>
                        <td className="py-3 px-3 text-slate-400">{p.category_slug}</td>
                        <td className="py-3 px-3 text-slate-300">{p.brand || 'ChefMachines'}</td>
                        <td className="py-3 px-3">
                          {p.is_featured ? (
                            <span className="px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange font-bold text-[10px]">
                              Featured
                            </span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setProductForm({
                                name: p.name,
                                slug: p.slug,
                                model: p.model || '',
                                category_slug: p.category_slug,
                                brand: p.brand || 'ChefMachines Pro',
                                description: p.description || '',
                                price_estimate: p.price_estimate || 85000,
                                image_url: p.image_url || '',
                                features_raw: (p.features || []).join(', '),
                                is_featured: !!p.is_featured
                              });
                              setShowProductModal(true);
                            }}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-red-900 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SCRAPER ================= */}
        {activeTab === 'scraper' && (
          <div className="bg-[#151F2E] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2 border border-cyan-500/30">
                  <RefreshCw className="w-3.5 h-3.5" /> Live Ingestion Pipeline
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Middleby Celfrost Product Sync Engine
                </h3>
                <p className="text-slate-400 text-xs mt-1 max-w-xl">
                  Scrapes the official Middleby Celfrost catalog API directly, parsing commercial reach-in freezers, blast chillers, Toastmaster bun warmers, and combi ovens into your ChefMachines database.
                </p>
              </div>

              <button
                onClick={handleRunScraper}
                disabled={scraping}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-brand-orange/30 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${scraping ? 'animate-spin' : ''}`} />
                {scraping ? 'Syncing Catalog...' : 'Run Scraper Now'}
              </button>
            </div>

            {scraperResult && (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-5 text-xs text-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Sync Result: {scraperResult.message}
                </div>
                {scraperResult.stats && (
                  <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Categories Added</span>
                      <strong className="text-white text-sm">{scraperResult.stats.categories_added}</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Products Added</span>
                      <strong className="text-emerald-400 text-sm">{scraperResult.stats.products_added}</strong>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Products Updated</span>
                      <strong className="text-amber-400 text-sm">{scraperResult.stats.products_updated}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
              <p>• <strong>Target API:</strong> https://www.middlebycelfrost.com/allapi/API/json.php</p>
              <p>• <strong>Actions:</strong> HeaderMenuCategory → ProductByCategory → ProductDetails</p>
              <p>• <strong>Rate Limiter:</strong> 50ms politeness delay per item</p>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#151F2E] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto text-xs">
              <h3 className="text-lg font-bold text-white mb-4">
                {editingProduct ? 'Edit Commercial Equipment' : 'Add New Commercial Equipment'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Model Number</label>
                    <input
                      type="text"
                      value={productForm.model}
                      onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Category</label>
                    <select
                      value={productForm.category_slug}
                      onChange={(e) => setProductForm({ ...productForm, category_slug: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="qsr-fast-food">QSR & Fast Food</option>
                      <option value="refrigeration-freezers">Refrigeration & Freezers</option>
                      <option value="cooking-ovens">Combi Ovens & Cooking</option>
                      <option value="espresso-beverage">Espresso & Beverage</option>
                      <option value="bakery-prep">Bakery & Prep</option>
                      <option value="warewashing">Warewashing</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Brand</label>
                    <input
                      type="text"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Estimated Price (₹ INR)</label>
                    <input
                      type="number"
                      value={productForm.price_estimate}
                      onChange={(e) => setProductForm({ ...productForm, price_estimate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.features_raw}
                    onChange={(e) => setProductForm({ ...productForm, features_raw: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={productForm.is_featured}
                    onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked })}
                    className="accent-brand-orange"
                  />
                  <label htmlFor="feat" className="text-slate-300">Feature this product on homepage</label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
