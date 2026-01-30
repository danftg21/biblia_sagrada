import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

// Função para calcular o tamanho ideal do texto baseado no comprimento
const calcularTamanhoTexto = (texto: string): string => {
  const length = texto.length;
  
  // Tamanhos maiores para facilitar leitura de longe
  if (length < 50) return 'text-5xl md:text-7xl lg:text-8xl xl:text-9xl';
  if (length < 100) return 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl';
  if (length < 150) return 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl';
  if (length < 250) return 'text-2xl md:text-4xl lg:text-5xl xl:text-6xl';
  if (length < 350) return 'text-xl md:text-3xl lg:text-4xl xl:text-5xl';
  return 'text-lg md:text-2xl lg:text-3xl xl:text-4xl';
};

// Função para calcular tamanho das aspas baseado no texto
const calcularTamanhoAspas = (texto: string): string => {
  const length = texto.length;
  
  if (length < 100) return 'text-6xl md:text-8xl';
  if (length < 200) return 'text-5xl md:text-7xl';
  if (length < 300) return 'text-4xl md:text-6xl';
  return 'text-3xl md:text-5xl';
};

export default function Telao() {
  const router = useRouter();
  const { livro, capitulo, versiculo } = router.query;
  const [versiculoData, setVersiculoData] = useState<Versiculo | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Carregar versículo atual
  useEffect(() => {
    if (livro && capitulo && versiculo) {
      fetch(`/api/biblia?livro=${encodeURIComponent(livro as string)}&capitulo=${capitulo}&versiculo=${versiculo}`)
        .then(res => res.json())
        .then(data => {
          setVersiculoData(data);
          setAnimationKey(prev => prev + 1);
          setIsTransitioning(false);
        });
    }
  }, [livro, capitulo, versiculo]);

  // Navegar para próximo ou anterior versículo
  const navegarVersiculo = useCallback((direcao: 'proximo' | 'anterior') => {
    if (!versiculoData || isTransitioning) return;
    
    setIsTransitioning(true);
    
    let novoVersiculo = direcao === 'proximo' 
      ? versiculoData.versiculo + 1 
      : versiculoData.versiculo - 1;
    let novoCapitulo = versiculoData.capitulo;
    
    // Se estiver indo para trás e for o versículo 0, volta para o capítulo anterior
    if (novoVersiculo < 1) {
      novoCapitulo = versiculoData.capitulo - 1;
      if (novoCapitulo < 1) {
        setIsTransitioning(false);
        return;
      }
      // Buscar todos os versículos do capítulo anterior para pegar o último
      fetch(`/api/biblia?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.versiculos && data.versiculos.length > 0) {
            const ultimoVersiculo = Math.max(...data.versiculos.map((v: any) => v.versiculo));
            router.push(
              `/telao?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}&versiculo=${ultimoVersiculo}`,
              undefined,
              { shallow: false }
            );
          } else {
            setIsTransitioning(false);
          }
        })
        .catch(() => {
          setIsTransitioning(false);
        });
      return;
    }
    
    // Verificar se o versículo existe no capítulo atual
    fetch(`/api/biblia?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}&versiculo=${novoVersiculo}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.texto) {
          // Versículo existe, atualizar URL
          router.push(
            `/telao?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}&versiculo=${novoVersiculo}`,
            undefined,
            { shallow: false }
          );
        } else {
          // Versículo não existe, tentar próximo capítulo
          if (direcao === 'proximo') {
            novoCapitulo = versiculoData.capitulo + 1;
            novoVersiculo = 1;
            
            fetch(`/api/biblia?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}&versiculo=${novoVersiculo}`)
              .then(res => res.json())
              .then(data => {
                if (data && data.texto) {
                  router.push(
                    `/telao?livro=${encodeURIComponent(versiculoData.livro)}&capitulo=${novoCapitulo}&versiculo=${novoVersiculo}`,
                    undefined,
                    { shallow: false }
                  );
                } else {
                  setIsTransitioning(false);
                }
              })
              .catch(() => {
                setIsTransitioning(false);
              });
          } else {
            setIsTransitioning(false);
          }
        }
      })
      .catch(() => {
        setIsTransitioning(false);
      });
  }, [versiculoData, router, isTransitioning]);

  // Listener de teclado para setas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navegarVersiculo('proximo');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navegarVersiculo('anterior');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navegarVersiculo]);

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

  // Auto-fullscreen IMEDIATO quando a página carrega
  useEffect(() => {
    // Esconder scrollbar
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Tentar entrar em fullscreen imediatamente
    const enterFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setFullscreen(true);
        }).catch(() => {
          // Tentar novamente com clique do usuário
        });
      }
    };
    
    // Tentar imediatamente
    enterFullscreen();
    
    // Também tentar após um pequeno delay
    const timer = setTimeout(enterFullscreen, 100);
    
    // Listener para entrar em fullscreen no primeiro clique/tecla
    const handleInteraction = () => {
      enterFullscreen();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="text-white text-4xl font-bold mb-4 text-center">📖</div>
          <div className="text-white/70 text-2xl">Carregando versículo...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${versiculoData.livro} ${versiculoData.capitulo}:${versiculoData.versiculo}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style>{`
          html, body {
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 100vh !important;
            width: 100vw !important;
          }
          ::-webkit-scrollbar {
            display: none !important;
          }
        `}</style>
      </Head>

      <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden animate-page-enter">
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
        <div key={animationKey} className={`w-full h-full flex flex-col items-center justify-center gap-6 text-center relative z-10 px-8 ${isTransitioning ? 'animate-fade-out' : ''}`}>
          
          {/* Referência do Versículo */}
          <div className="animate-slide-down-fade">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 drop-shadow-2xl animate-shimmer">
              {versiculoData.livro} {versiculoData.capitulo}:{versiculoData.versiculo}
            </h1>
            <div className="flex justify-center gap-3 mt-2">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded animate-expand"></div>
            </div>
          </div>

          {/* Texto do Versículo - Grande e Centralizado */}
          <div className="animate-slide-up-fade-1 max-w-7xl">
            <p className={`${calcularTamanhoTexto(versiculoData.texto)} text-white font-black leading-snug drop-shadow-2xl tracking-wide`} style={{fontWeight: 900}}>
              <span className={`${calcularTamanhoAspas(versiculoData.texto)} text-yellow-200 mr-2 animate-fade-in-slow`}>"</span>
              {versiculoData.texto}
              <span className={`${calcularTamanhoAspas(versiculoData.texto)} text-yellow-200 ml-2 animate-fade-in-slow`}>"</span>
            </p>
          </div>
        </div>

        {/* Versão NAA - FIXO no Canto Inferior ESQUERDO */}
        <div className="fixed bottom-6 left-6 z-50 animate-fade-in-delay-3">
          <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-bold">Versão NAA</p>
        </div>

        {/* Logo da Igreja - FIXO no Canto Inferior DIREITO - MUITO MAIOR */}
        <div className="fixed bottom-4 right-6 z-50 animate-fade-in-delay-3">
          <img 
            src="/logo-iasd.png" 
            alt="Igreja Adventista do Sétimo Dia" 
            className="h-20 md:h-24 lg:h-32 xl:h-36 drop-shadow-2xl"
          />
        </div>

        {/* Instruções (aparecem quando não está em fullscreen) */}
        {!fullscreen && (
          <div className="absolute bottom-6 text-white/50 text-sm opacity-80 animate-pulse">
            Pressione F11 ou clique no botão acima para tela cheia
          </div>
        )}
      </div>

      <style jsx>{`
        /* Animação de entrada da página - Mais rápida */
        @keyframes page-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-page-enter {
          animation: page-enter 0.6s ease-out;
        }

        /* Animação de slide down + fade para o badge - Mais rápida */
        @keyframes slide-down-fade {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down-fade {
          animation: slide-down-fade 0.5s ease-out 0.1s both;
        }

        /* Animação de slide up + fade para referência - Mais rápida */
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up-fade-1 {
          animation: slide-up-fade 0.6s ease-out 0.2s both;
        }

        .animate-slide-up-fade-2 {
          animation: slide-up-fade 0.7s ease-out 0.3s both;
        }

        /* Efeito shimmer no texto dourado */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 8s linear infinite;
        }

        /* Animação de expansão da linha - Mais rápida */
        @keyframes expand {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 5rem;
            opacity: 1;
          }
        }

        .animate-expand {
          animation: expand 0.4s ease-out 0.5s both;
        }

        /* Fade in lento para aspas - Mais rápida */
        @keyframes fade-in-slow {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 0.5s ease-out 0.6s both;
        }

        /* Pulse lento para loading */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        /* Fade out para transição entre versículos */
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }

        /* Animação suave para entrada de novo versículo - Mais rápida */
        @keyframes verse-enter {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-delay-3 {
          animation: verse-enter 0.4s ease-out 0.7s both;
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
