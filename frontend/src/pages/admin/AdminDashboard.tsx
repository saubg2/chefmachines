import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Trash2, Edit } from 'lucide-react';
import { api, Product } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'scraper'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [scraping, setScraping] = useState(false);
  const [scraperResult, setScraperResult] = useState<any>(null);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    model: '',
    category_slug: 'qsr-fast-food',
    brand: 'Pitco',
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
    if (!window.confirm('Delete this commercial product?')) return;
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-1">
              CMS Administration
            </span>
            <h1 className="text-2xl font-bold font-display text-slate-900">
              Commercial Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="px-3.5 py-1.5 bg-white border border-slate-300 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 transition"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  slug: '',
                  model: '',
                  category_slug: 'qsr-fast-food',
                  brand: 'Pitco',
                  description: '',
                  price_estimate: 85000,
                  image_url: '',
                  features_raw: 'Commercial Grade SS-304, High Efficiency',
                  is_featured: false
                });
                setShowProductModal(true);
              }}
              className="px-4 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-lg transition"
            >
              + Add Commercial Equipment
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'leads', name: `RFQ Leads (${leads.length})` },
            { id: 'products', name: `Catalog Products (${products.length})` },
            { id: 'scraper', name: 'Middleby Celfrost Scraper' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                activeTab === t.id
                  ? 'bg-brand-orange border-brand-orange text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <span className="text-xs text-slate-500 block mb-1">Catalog Products</span>
                <div className="text-2xl font-bold text-slate-900">{products.length}</div>
                <span className="text-[10px] text-slate-400">Authentic brand models</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <span className="text-xs text-slate-500 block mb-1">Inbound RFQ Leads</span>
                <div className="text-2xl font-bold text-brand-orange">{leads.length}</div>
                <span className="text-[10px] text-slate-400">{stats?.new_leads_count || 0} New</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <span className="text-xs text-slate-500 block mb-1">Categories</span>
                <div className="text-2xl font-bold text-slate-900">{stats?.categories_count || 6}</div>
                <span className="text-[10px] text-slate-400">Foodservice sectors</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <span className="text-xs text-slate-500 block mb-1">Academy Programs</span>
                <div className="text-2xl font-bold text-slate-900">{stats?.training_count || 3}</div>
                <span className="text-[10px] text-slate-400">Barista & Combi training</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3">Recent Inbound Quote Inquiries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Client</th>
                      <th className="py-2 px-3">Location / Brand</th>
                      <th className="py-2 px-3">Inquiry</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-500">{l.created_at ? new Date(l.created_at).toLocaleDateString() : 'Today'}</td>
                        <td className="py-2 px-3 font-semibold text-slate-900">{l.full_name}</td>
                        <td className="py-2 px-3 text-slate-600">{l.business_name || 'Individual'} ({l.city})</td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-700">{l.inquiry_type}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-brand-orange uppercase">
                            {l.status}
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

        {/* LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 mb-2">Inbound Leads & RFQs</h3>
            {leads.map((l) => (
              <div key={l.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900">{l.full_name}</strong>
                    <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-600">{l.inquiry_type}</span>
                  </div>
                  <div className="text-slate-600 space-x-3">
                    <span>Phone: {l.phone}</span>
                    <span>Email: {l.email}</span>
                    <span>City: {l.city}</span>
                    {l.business_name && <span>Brand: {l.business_name}</span>}
                  </div>
                  {l.message && <p className="text-slate-700 bg-white p-2 rounded border border-slate-200 mt-1">{l.message}</p>}
                </div>

                <div className="shrink-0">
                  <select
                    value={l.status}
                    onChange={(e) => handleStatusChange(l.id, e.target.value)}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_proposal">In Proposal</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Commercial Equipment ({products.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3">Equipment</th>
                    <th className="py-2 px-3">Brand</th>
                    <th className="py-2 px-3">Model</th>
                    <th className="py-2 px-3">Category</th>
                    <th className="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-2 px-3 text-slate-700 font-bold">{p.brand}</td>
                      <td className="py-2 px-3 font-mono text-slate-600">{p.model}</td>
                      <td className="py-2 px-3 text-slate-500">{p.category_slug}</td>
                      <td className="py-2 px-3 text-right space-x-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm({
                              name: p.name,
                              slug: p.slug,
                              model: p.model || '',
                              category_slug: p.category_slug,
                              brand: p.brand || 'Pitco',
                              description: p.description || '',
                              price_estimate: p.price_estimate || 85000,
                              image_url: p.image_url || '',
                              features_raw: (p.features || []).join(', '),
                              is_featured: !!p.is_featured
                            });
                            setShowProductModal(true);
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 text-[11px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SCRAPER */}
        {activeTab === 'scraper' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Middleby Celfrost Product Sync</h3>
                <p className="text-slate-500">Live API ingestion from middlebycelfrost.com</p>
              </div>
              <button
                onClick={handleRunScraper}
                disabled={scraping}
                className="px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-lg transition"
              >
                {scraping ? 'Syncing...' : 'Run Scraper Now'}
              </button>
            </div>

            {scraperResult && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-800">
                <strong>Sync Result:</strong> {scraperResult.message}
              </div>
            )}
          </div>
        )}

        {/* Modal: Add/Edit */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full text-xs max-h-[90vh] overflow-y-auto">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                {editingProduct ? 'Edit Commercial Equipment' : 'Add Commercial Equipment'}
              </h3>
              <form onSubmit={handleSaveProduct} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Equipment Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Brand *</label>
                    <input
                      type="text"
                      required
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Model</label>
                    <input
                      type="text"
                      value={productForm.model}
                      onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={productForm.category_slug}
                      onChange={(e) => setProductForm({ ...productForm, category_slug: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      <option value="qsr-fast-food">QSR & Frying</option>
                      <option value="refrigeration-freezers">Refrigeration & Cold Chain</option>
                      <option value="cooking-ovens">Combi Ovens & Cooking</option>
                      <option value="espresso-beverage">Espresso & Beverage</option>
                      <option value="bakery-prep">Bakery & Prep</option>
                      <option value="warewashing">Warewashing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Est. Price (₹)</label>
                    <input
                      type="number"
                      value={productForm.price_estimate}
                      onChange={(e) => setProductForm({ ...productForm, price_estimate: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.features_raw}
                    onChange={(e) => setProductForm({ ...productForm, features_raw: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-brand-orange text-white font-bold"
                  >
                    Save
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
