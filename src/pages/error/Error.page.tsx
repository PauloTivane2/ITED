import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 text-center">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-3">Ops! Algo deu errado.</h1>
        <p className="text-secondary/80 mb-8 text-sm leading-relaxed">
          {isRouteErrorResponse(error)
            ? error.status === 404
              ? "A página que você está procurando não existe ou foi removida temporariamente."
              : error.statusText
            : "Um erro inesperado ocorreu. Por favor, tente novamente mais tarde."}
        </p>
        <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors shadow-glow w-full">
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
};
