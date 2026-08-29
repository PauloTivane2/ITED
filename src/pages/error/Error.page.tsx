import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { SEO } from '@/shared/ui/SEO/SEO';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060911] p-5 text-center text-slate-100">
      <SEO 
        title="Página Não Encontrada" 
        description="A página solicitada não foi encontrada."
      />
      <div className="max-w-md w-full bg-[#0E1528]/95 border border-white/[0.10] rounded-3xl p-8 sm:p-10 shadow-dark-card backdrop-blur-2xl">
        <div className="w-16 h-16 bg-accent/15 border border-accent/25 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent shadow-subtle">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">Página Não Encontrada</h1>
        <p className="text-slate-300 mb-8 text-sm sm:text-base leading-relaxed">
          {isRouteErrorResponse(error)
            ? error.status === 404
              ? "A página que você está procurando não existe ou mudou de endereço."
              : error.statusText
            : "Ocorreu um imprevisto técnico. Por favor, tente retornar à página inicial."}
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#E2BE4B] text-[#060911] font-bold border border-[#FFF5DC]/60 shadow-[0_2px_10px_rgba(0,0,0,0.3),0_0_18px_rgba(212,175,55,0.22)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_28px_rgba(212,175,55,0.38)] transition-all duration-normal w-full active:scale-98 text-sm"
        >
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
