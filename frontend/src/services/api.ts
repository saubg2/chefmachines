// API service layer for ChefMachines
const API_BASE = '/api';

export interface Product {
  id: number;
  name: string;
  slug: string;
  model?: string;
  category_slug: string;
  brand?: string;
  description?: string;
  features?: string[];
  specs?: Record<string, any>;
  price_estimate?: number;
  is_rfq_only?: boolean;
  image_url?: string;
  additional_images?: string[];
  brochure_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  sort_order: number;
  product_count?: number;
}

export interface TrainingModule {
  id: number;
  title: string;
  slug: string;
  level: string;
  category: string;
  duration: string;
  description: string;
  syllabus?: Array<{ day?: number; topic: string; hours?: string; hands_on?: string }>;
  certification?: string;
  badge?: string;
  image_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  cover_image?: string;
  created_at?: string;
}

export interface WizardPreset {
  id: number;
  concept_key: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  equipment_presets: Record<string, Array<{
    name: string;
    qty: number;
    kw: number;
    category: string;
    est_cost: number;
    must_have: boolean;
  }>>;
  utility_estimates: Record<string, {
    total_kw: number;
    plumbing_inlets: number;
    drain_points: number;
    recommended_sqft: string;
    exhaust_cfm: number;
  }>;
  base_budget_min: number;
  base_budget_max: number;
}

export interface LeadSubmission {
  full_name: string;
  email: string;
  phone: string;
  city?: string;
  business_name?: string;
  business_type?: string;
  inquiry_type?: string;
  message?: string;
  equipment_interest?: any;
  estimated_budget?: string;
}

export const api = {
  // Products
  async getProducts(params?: { category?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    const q = new URLSearchParams();
    if (params?.category) q.append('category', params.category);
    if (params?.featured !== undefined) q.append('featured', String(params.featured));
    if (params?.search) q.append('search', params.search);
    const res = await fetch(`${API_BASE}/products?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(slug: string): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Setup Wizard
  async getWizardPresets(): Promise<WizardPreset[]> {
    const res = await fetch(`${API_BASE}/wizard/presets`);
    if (!res.ok) throw new Error('Failed to fetch wizard presets');
    return res.json();
  },

  async calculateWizard(data: {
    concept_key: string;
    scale: string;
    selected_equipment_names?: string[];
  }) {
    const res = await fetch(`${API_BASE}/wizard/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to calculate wizard');
    return res.json();
  },

  async submitWizard(data: any) {
    const res = await fetch(`${API_BASE}/wizard/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit wizard quote');
    return res.json();
  },

  // Calculators
  async calcColdRoom(data: any) {
    const res = await fetch(`${API_BASE}/calculators/cold-room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async calcCoffee(data: any) {
    const res = await fetch(`${API_BASE}/calculators/coffee-throughput`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async calcExhaust(data: any) {
    const res = await fetch(`${API_BASE}/calculators/exhaust-cfm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async calcFryerRoi(data: any) {
    const res = await fetch(`${API_BASE}/calculators/fryer-oil-roi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Training
  async getTrainingModules(category?: string): Promise<TrainingModule[]> {
    const q = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/training${q}`);
    return res.json();
  },

  async getTrainingModule(slug: string): Promise<TrainingModule> {
    const res = await fetch(`${API_BASE}/training/${slug}`);
    return res.json();
  },

  async enrollTraining(data: any) {
    const res = await fetch(`${API_BASE}/training/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Blogs
  async getBlogs(category?: string): Promise<BlogPost[]> {
    const q = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/blogs${q}`);
    return res.json();
  },

  async getBlog(slug: string): Promise<BlogPost> {
    const res = await fetch(`${API_BASE}/blogs/${slug}`);
    return res.json();
  },

  // Leads
  async submitLead(data: LeadSubmission) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin / CMS
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return res.json();
  },

  async triggerMiddlebyScraper(max_categories = 10, max_products_per_cat = 5) {
    const res = await fetch(`${API_BASE}/admin/scrape-middleby`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ max_categories, max_products_per_cat })
    });
    return res.json();
  },

  async getAdminLeads() {
    const res = await fetch(`${API_BASE}/admin/leads`);
    return res.json();
  },

  async updateLeadStatus(id: number, status: string) {
    const res = await fetch(`${API_BASE}/admin/leads/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  async createProduct(data: any) {
    const res = await fetch(`${API_BASE}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateProduct(id: number, data: any) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteProduct(id: number) {
    const res = await fetch(`${API_BASE}/admin/products/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  }
};
