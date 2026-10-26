import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, User, Tag } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" /> Commercial Knowledge Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            Guides, Case Studies & Checklists
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Technical equipment guides, electrical MEP checklists, and lessons learned across 500+ commercial kitchen installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-[#151D2A] border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl hover:border-brand-orange transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-slate-900 relative overflow-hidden">
                  <img
                    src={b.cover_image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/80 text-amber-400 border border-amber-400/40">
                    {b.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" /> {b.read_time}
                    </span>
                    <span>•</span>
                    <span className="truncate">{b.author}</span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white line-clamp-2 leading-snug hover:text-amber-400 transition">
                    <Link to={`/blogs/${b.slug}`}>{b.title}</Link>
                  </h3>

                  <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4">
                <Link
                  to={`/blogs/${b.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-amber-400"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
