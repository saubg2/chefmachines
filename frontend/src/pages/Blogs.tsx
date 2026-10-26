import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { api, BlogPost } from '../services/api';

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Loading articles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Commercial Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Kitchen Setup Guides & Checklists
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Technical equipment sizing, MEP electrical checklists, and operational best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl overflow-hidden shadow-sm transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={b.cover_image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'}
                    alt={b.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-900 border border-slate-200 shadow-sm">
                    {b.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[11px] text-slate-500 mb-1">
                    {b.read_time} • {b.author}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-brand-orange transition">
                    <Link to={`/blogs/${b.slug}`}>{b.title}</Link>
                  </h3>

                  <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                <Link
                  to={`/blogs/${b.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
