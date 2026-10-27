import React, { useState, useEffect } from 'react';
import { RefreshCw, Plus, Trash2, Edit, Upload, Image as ImageIcon, ExternalLink, HardDrive } from 'lucide-react';
import { api, Product } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'scraper'>('products');
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [scraping, setScraping] = useState(false);
  const [scraperResult, setScraperResult] = useState<any>(null);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
      setScraperResult({ message: 'Scraper failed: ' + e.message });
    } finally {
      setScraping(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this commercial product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      loadData();
    } catch (e) {
      console.error(e);
      alert('Failed to delete product');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    setUploadError(null);
    try {
      const res = await api.uploadImage(file);
      setProductForm((prev) => ({
        ...prev,
        image_url: res.image_url
      }));
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Failed to upload image');
    } finally {
      setUploadingPhoto(false);
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] font-bold">
                CHEFMACHINES CMS PORTAL
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <HardDrive className="w-3 h-3 text-emerald-600" />
                Persistent Volume (/data) Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 uppercase tracking-tight">
              Commercial Operations & Catalog Control
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="px-3.5 py-1.5 bg-white border border-slate-300 text-xs font-semibold text-slate-700 rounded hover:bg-slate-50 transition inline-flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
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
                  features_raw: 'Commercial Grade SS-304, High Efficiency, Digital Controller',
                  is_featured: false
                });
                setShowProductModal(true);
              }}
              className="px-4 py-1.5 bg-[#FF5722] hover:bg-[#e64a19] text-white text-xs font-bold uppercase tracking-wider rounded transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Equipment
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {[
            { id: 'products', name: `Catalog Products (${products.length})` },
            { id: 'leads', name: `RFQ Leads (${leads.length})` },
            { id: 'overview', name: 'Overview' },
            { id: 'scraper', name: 'Middleby Celfrost Scraper' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition border ${
                activeTab === t.id
                  ? 'bg-slate-900 border-slate-900 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* TAB 1: PRODUCTS TABLE WITH IMAGE THUMBNAILS */}
        {activeTab === 'products' && (
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-tight">
                  Commercial Equipment Inventory ({products.length} Models)
                </h3>
                <p className="text-xs text-slate-500">
                  Equipment photos are hosted on genuine manufacturer CDNs or stored locally in persistent volume (<code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">/data/uploads</code>).
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Click any thumbnail to inspect full size
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Thumbnail</th>
                    <th className="py-2.5 px-3">Equipment Name</th>
                    <th className="py-2.5 px-3">Brand</th>
                    <th className="py-2.5 px-3">Model</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Est. Price</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      {/* Image Thumbnail Column */}
                      <td className="py-2 px-3">
                        {p.image_url ? (
                          <a
                            href={p.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-block w-14 h-14 bg-slate-50 border border-slate-200 rounded p-1 hover:border-[#FF5722] transition"
                            title="Open full image in new tab"
                          >
                            <img
                              src={p.image_url}
                              alt={p.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded text-white">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </div>
                          </a>
                        ) : (
                          <div className="w-14 h-14 bg-slate-100 rounded border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                            <ImageIcon className="w-4 h-4 opacity-50" />
                            <span className="text-[9px] uppercase tracking-wider mt-0.5">No Img</span>
                          </div>
                        )}
                      </td>

                      {/* Equipment Details */}
                      <td className="py-2 px-3">
                        <div className="font-bold text-slate-900 hover:text-[#FF5722]">
                          <a href={`/products/${p.slug}`} target="_blank" rel="noreferrer">
                            {p.name}
                          </a>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          slug: {p.slug}
                        </div>
                      </td>

                      <td className="py-2 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold font-mono text-[11px]">
                          {p.brand}
                        </span>
                      </td>

                      <td className="py-2 px-3 font-mono text-slate-600 text-[11px]">
                        {p.model || '—'}
                      </td>

                      <td className="py-2 px-3 text-slate-500 text-[11px]">
                        {p.category_slug}
                      </td>

                      <td className="py-2 px-3 font-semibold text-slate-900">
                        {p.price_estimate ? `₹${p.price_estimate.toLocaleString()}` : 'RFQ Only'}
                      </td>

                      <td className="py-2 px-3 text-right space-x-1.5 whitespace-nowrap">
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
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-600 font-medium text-[11px]"
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

        {/* TAB 2: INBOUND RFQ LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-md p-4">
              <h3 className="text-base font-bold text-slate-900 font-display uppercase">
                Customer Inquiries & RFQ Leads ({leads.length})
              </h3>
              <p className="text-xs text-slate-500">Live lead submissions from wizard, quotation requests, and academy registrations.</p>
            </div>

            {leads.map((l) => (
              <div key={l.id} className="bg-white border border-slate-200 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{l.full_name}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700">{l.business_name || 'Individual'}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-50 text-[#FF5722] border border-orange-200">
                      {l.inquiry_type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 space-x-3 mb-1">
                    <span>Phone: <strong className="text-slate-800">{l.phone}</strong></span>
                    <span>Email: <strong className="text-slate-800">{l.email}</strong></span>
                    <span>City: {l.city || 'Not specified'}</span>
                  </div>
                  {l.equipment_interest && (
                    <div className="text-xs bg-slate-50 border border-slate-200 rounded p-2 text-slate-700 mt-2">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Equipment Interest:</span>
                      {l.equipment_interest}
                    </div>
                  )}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Status:</span>
                  <select
                    value={l.status}
                    onChange={(e) => handleStatusChange(l.id, e.target.value)}
                    className="px-2.5 py-1 text-xs border border-slate-300 rounded bg-slate-50 font-semibold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_proposal">Proposal Sent</option>
                    <option value="completed">Closed / Won</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: OVERVIEW & STORAGE STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-md p-5">
                <span className="text-xs text-slate-500 block mb-1">Catalog Products</span>
                <div className="text-3xl font-black font-display text-slate-900">{products.length}</div>
                <span className="text-[10px] text-slate-400">Authentic brand models</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-md p-5">
                <span className="text-xs text-slate-500 block mb-1">Inbound RFQ Leads</span>
                <div className="text-3xl font-black font-display text-[#FF5722]">{leads.length}</div>
                <span className="text-[10px] text-slate-400">{stats?.new_leads_count || 0} New</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-md p-5">
                <span className="text-xs text-slate-500 block mb-1">Categories</span>
                <div className="text-3xl font-black font-display text-slate-900">{stats?.categories_count || 6}</div>
                <span className="text-[10px] text-slate-400">Foodservice sectors</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-md p-5">
                <span className="text-xs text-slate-500 block mb-1">Volume Storage</span>
                <div className="text-xl font-bold font-mono text-emerald-700">/data</div>
                <span className="text-[10px] text-slate-400">SQLite + Photos persistent</span>
              </div>
            </div>

            {/* Storage Volume Architecture Guide */}
            <div className="bg-white border border-slate-200 rounded-md p-6">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-5 h-5 text-[#FF5722]" />
                <h3 className="text-base font-bold text-slate-900 font-display uppercase tracking-tight">
                  Persistent Storage Architecture
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                To guarantee zero data loss across Docker container redeployments on Railway, a persistent SSD volume mount is configured:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded">
                  <strong className="text-slate-900 block mb-1">a) SQLite Database:</strong>
                  <span className="text-slate-600 block">/data/chefmachines.db</span>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Preserves all products, leads, and wizard configurations permanently.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded">
                  <strong className="text-slate-900 block mb-1">b) Photo Media Uploads:</strong>
                  <span className="text-slate-600 block">/data/uploads/*</span>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Served publicly via HTTP at /uploads/filename.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MIDDLEBY SCRAPER */}
        {activeTab === 'scraper' && (
          <div className="bg-white border border-slate-200 rounded-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display uppercase">Middleby Celfrost Product Sync</h3>
                <p className="text-slate-500">Live API ingestion from middlebycelfrost.com with authentic manufacturer CDN photos.</p>
              </div>
              <button
                onClick={handleRunScraper}
                disabled={scraping}
                className="px-4 py-2 bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-xs uppercase tracking-wider rounded transition"
              >
                {scraping ? 'Syncing...' : 'Run Scraper Now'}
              </button>
            </div>

            {scraperResult && (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-emerald-800">
                <strong>Sync Result:</strong> {scraperResult.message}
              </div>
            )}
          </div>
        )}

        {/* ADD / EDIT PRODUCT MODAL (WITH LIVE THUMBNAIL PREVIEW & PHOTO UPLOAD TO VOLUME) */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white border border-slate-200 rounded-md shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 text-xs text-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h3 className="text-base font-bold text-slate-900 font-display uppercase">
                  {editingProduct ? 'Edit Commercial Equipment' : 'Add New Commercial Equipment'}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:border-[#FF5722]"
                    placeholder="e.g. Pitco 35C+ Commercial Gas Fryer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Brand</label>
                    <select
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                    >
                      <option value="Pitco">Pitco</option>
                      <option value="Celfrost">Celfrost</option>
                      <option value="TurboChef">TurboChef</option>
                      <option value="Middleby Marshall">Middleby Marshall</option>
                      <option value="Toastmaster">Toastmaster</option>
                      <option value="Electrolux">Electrolux</option>
                      <option value="La Marzocco">La Marzocco</option>
                      <option value="La Cimbali">La Cimbali</option>
                      <option value="Fiorenzato">Fiorenzato</option>
                      <option value="Marco">Marco</option>
                      <option value="Timemore">Timemore</option>
                      <option value="MHW-3BOMBER">MHW-3BOMBER</option>
                      <option value="Fiamma">Fiamma</option>
                      <option value="Cunill">Cunill</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Model / Code</label>
                    <input
                      type="text"
                      value={productForm.model}
                      onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                      placeholder="e.g. 35C+ SS / GN 650 TN"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Category</label>
                    <select
                      value={productForm.category_slug}
                      onChange={(e) => setProductForm({ ...productForm, category_slug: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                    >
                      <option value="qsr-fast-food">QSR & Commercial Frying</option>
                      <option value="refrigeration-freezers">Refrigeration & Cold Chain</option>
                      <option value="cooking-ovens">Combi Ovens & Rapid Cooking</option>
                      <option value="espresso-beverage">Espresso & Coffee Stations</option>
                      <option value="bakery-prep">Bakery & Food Prep</option>
                      <option value="warewashing">Commercial Warewashing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Est. Price (₹ INR)</label>
                    <input
                      type="number"
                      value={productForm.price_estimate}
                      onChange={(e) => setProductForm({ ...productForm, price_estimate: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                    />
                  </div>
                </div>

                {/* PHOTO UPLOAD & THUMBNAIL PREVIEW SECTION */}
                <div className="border border-slate-200 rounded p-3 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-bold text-slate-800 uppercase text-[10px]">
                      Product Photo (Image URL or Direct Volume Upload)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Persistent: /data/uploads
                    </span>
                  </div>

                  {/* Live Thumbnail Preview */}
                  {productForm.image_url ? (
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded border border-slate-200">
                      <img
                        src={productForm.image_url}
                        alt="Product preview"
                        className="w-16 h-16 object-contain bg-slate-50 rounded border p-1 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="font-bold text-slate-900 block text-xs">Live Photo Thumbnail</span>
                        <span className="text-[10px] text-slate-400 break-all font-mono">{productForm.image_url}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3 bg-white border border-dashed border-slate-300 rounded text-slate-400">
                      No photo attached yet. Paste a URL or upload a file below.
                    </div>
                  )}

                  {/* Direct Photo File Upload */}
                  <div className="flex items-center gap-3 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-xs uppercase tracking-wider transition">
                      <Upload className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span>{uploadingPhoto ? 'Uploading to /data...' : 'Upload Photo from Computer'}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={handleFileUpload}
                        disabled={uploadingPhoto}
                        className="hidden"
                      />
                    </label>
                    {uploadingPhoto && <span className="text-xs text-slate-500 animate-pulse">Saving to persistent volume...</span>}
                    {uploadError && <span className="text-xs text-red-600 font-semibold">{uploadError}</span>}
                  </div>

                  {/* Manual URL / Path Input */}
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">Image URL or Server Path:</span>
                    <input
                      type="text"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                      placeholder="/uploads/filename.png or https://..."
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Description</label>
                  <textarea
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px]">Features (comma separated)</label>
                  <input
                    type="text"
                    value={productForm.features_raw}
                    onChange={(e) => setProductForm({ ...productForm, features_raw: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 rounded bg-slate-100 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold uppercase tracking-wider transition"
                  >
                    Save Equipment
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
