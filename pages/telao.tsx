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

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-8 relative">
        {/* Botão de Fullscreen (aparece quando não está em fullscreen) */}
        {!fullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-all z-10"
          >
            🖥️ Tela Cheia
          </button>
        )}

        {/* Conteúdo Principal */}
        <div className="max-w-6xl w-full text-center">
          {/* Referência do Versículo */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-300 drop-shadow-lg">
              {versiculoData.livro} {versiculoData.capitulo}:{versiculoData.versiculo}
            </h1>
          </div>

          {/* Texto do Versículo */}
          <div className="animate-fade-in-delay">
            <p className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-serif leading-relaxed drop-shadow-lg">
              "{versiculoData.texto}"
            </p>
          </div>

          {/* Decoração */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="w-16 h-1 bg-yellow-300 rounded"></div>
            <div className="w-16 h-1 bg-yellow-300 rounded"></div>
            <div className="w-16 h-1 bg-yellow-300 rounded"></div>
          </div>
        </div>

        {/* Instruções (aparecem quando não está em fullscreen) */}
        {!fullscreen && (
          <div className="absolute bottom-4 text-white text-sm opacity-70">
            Pressione F11 ou clique no botão acima para tela cheia
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
      `}</style>
    </>
  );
}
