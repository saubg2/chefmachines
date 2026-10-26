import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, Share2, Wand2 } from 'lucide-react';
import { api, BlogPost } from '../services/api';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getBlog(slug)
        .then((data) => {
          setBlog(data);
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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <Link to="/blogs" className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl">
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Hub
        </Link>

        <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-12">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 inline-block mb-3">
              {blog.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-tight mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-brand-orange" /> {blog.read_time}
              </span>
              <span>•</span>
              <span className="text-slate-300 font-semibold">{blog.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.cover_image && (
            <div className="rounded-2xl overflow-hidden mb-8 h-72 sm:h-96">
              <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content Body */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-bold font-display text-white pt-4">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('#### ')) {
                return <h4 key={idx} className="text-lg font-bold font-display text-amber-400 pt-3">{paragraph.replace('#### ', '')}</h4>;
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Bottom Card */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Planning a Commercial Setup?</h4>
              <p className="text-slate-400 text-xs">Run our interactive wizard to get equipment lists and power loads.</p>
            </div>
            <Link
              to="/wizard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20"
            >
              <Wand2 className="w-4 h-4" /> Launch Setup Wizard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
