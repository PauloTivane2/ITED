import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showBack?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showBack = true,
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-b border-white/[0.06] ${className}`}>
      {/* Breadcrumb Path */}
      <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.04]"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-accent px-2 py-1 rounded-lg bg-accent/10 border border-accent/20">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.04]"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Back Button */}
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-accent/40 text-xs font-semibold text-slate-300 hover:text-white transition-all duration-200 active:scale-95 shadow-subtle group"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-accent group-hover:-translate-x-0.5 transition-transform" />
          <span>Voltar</span>
        </button>
      )}
    </div>
  );
};

export default Breadcrumbs;