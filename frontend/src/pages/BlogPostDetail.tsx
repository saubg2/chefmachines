import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
          <Link to="/blogs" className="px-4 py-2 bg-brand-orange text-white text-xs font-bold rounded-lg">
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Knowledge Hub
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-orange-50 text-brand-orange border border-orange-200 inline-block mb-2">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 leading-tight mb-3">
              {blog.title}
            </h1>
            <div className="text-xs text-slate-500 border-b border-slate-200 pb-4">
              <span>{blog.read_time}</span> • <span className="font-semibold text-slate-700">{blog.author}</span>
            </div>
          </div>

          {blog.cover_image && (
            <div className="rounded-xl overflow-hidden mb-6 h-64 sm:h-80">
              <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="text-slate-700 text-sm leading-relaxed space-y-4">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-lg font-bold font-display text-slate-900 pt-3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('#### ')) {
                return <h4 key={idx} className="text-base font-bold font-display text-brand-orange pt-2">{paragraph.replace('#### ', '')}</h4>;
              }
              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Planning a Commercial Setup?</h4>
              <p className="text-slate-500 text-[11px]">Run our interactive wizard to get equipment lists and power loads.</p>
            </div>
            <Link
              to="/wizard"
              className="px-4 py-2 rounded-xl bg-brand-orange text-white font-bold text-xs uppercase tracking-wider"
            >
              Launch Setup Wizard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
