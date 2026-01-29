import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export default function Telao() {
  const router = useRouter();
  const { livro, capitulo, versiculo } = router.query;
  const [versiculoData, setVersiculoData] = useState<Versiculo | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (livro && capitulo && versiculo) {
      fetch(`/api/biblia?livro=${encodeURIComponent(livro as string)}&capitulo=${capitulo}&versiculo=${versiculo}`)
        .then(res => res.json())
        .then(data => setVersiculoData(data));
    }
  }, [livro, capitulo, versiculo]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };

  // Auto-fullscreen quando a página carrega
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
          // Se falhar, apenas ignora
        });
        setFullscreen(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Detectar saída de fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!versiculoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${versiculoData.livro} ${versiculoData.capitulo}:${versiculoData.versiculo}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Efeito de fundo sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        {/* Botão de Fullscreen (aparece quando não está em fullscreen) */}
        {!fullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition-all z-10 border border-white/20 shadow-xl"
          >
            🖥️ Tela Cheia
          </button>
        )}

        {/* Conteúdo Principal */}
        <div className="max-w-7xl w-full text-center relative z-10">
          {/* Badge da Igreja */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
              <span className="text-yellow-300 text-sm md:text-base font-semibold">Igreja Adventista do Sétimo Dia</span>
            </div>
          </div>

          {/* Referência do Versículo */}
          <div className="mb-10 animate-fade-in-delay-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 drop-shadow-2xl mb-3">
              {versiculoData.livro} {versiculoData.capitulo}:{versiculoData.versiculo}
            </h1>
            <div className="flex justify-center gap-3 mt-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded"></div>
            </div>
          </div>

          {/* Texto do Versículo */}
          <div className="animate-fade-in-delay-2 px-4">
            <p className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-serif leading-relaxed drop-shadow-2xl tracking-wide">
              <span className="text-yellow-200 text-5xl md:text-7xl mr-2">"</span>
              {versiculoData.texto}
              <span className="text-yellow-200 text-5xl md:text-7xl ml-2">"</span>
            </p>
          </div>

          {/* Decoração Final */}
          <div className="mt-12 flex justify-center gap-4 animate-fade-in-delay-3">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse delay-200"></div>
          </div>

          {/* Marca NAA */}
          <div className="mt-12 animate-fade-in-delay-3">
            <p className="text-white/40 text-sm md:text-base font-semibold">Nova Almeida Atualizada</p>
          </div>
        </div>

        {/* Instruções (aparecem quando não está em fullscreen) */}
        {!fullscreen && (
          <div className="absolute bottom-6 text-white/50 text-sm opacity-80 animate-pulse">
            Pressione F11 ou clique no botão acima para tela cheia
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-delay-1 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-2 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay-3 {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in-delay-1 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay-2 1.2s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in-delay-3 1s ease-out 1.2s both;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
}
