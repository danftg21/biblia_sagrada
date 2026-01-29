import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

// Função para normalizar texto (remover acentos)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

// Função para busca inteligente
const buscaInteligente = (versiculos: Versiculo[], termo: string): Versiculo[] => {
  const termoNormalizado = normalizeText(termo);
  
  // Detectar se é uma referência bíblica (ex: "salmos 23", "joão 3:16", "salmos 1 2")
  const referenciaMatch = termoNormalizado.match(/^([a-z0-9\s]+?)(\d+)?(?:\s+(\d+))?(?:[:\s]+(\d+))?$/);
  
  if (referenciaMatch) {
    const [, livroTermo, cap, vers1, vers2] = referenciaMatch;
    const livroNormalizado = livroTermo.trim();
    const capitulo = cap ? parseInt(cap) : (vers1 ? parseInt(vers1) : null);
    const versiculo = vers2 ? parseInt(vers2) : (vers1 && cap ? parseInt(vers1) : null);
    
    return versiculos.filter(v => {
      const livroVersiculoNormalizado = normalizeText(v.livro);
      
      // Verifica se o livro corresponde (busca parcial)
      if (!livroVersiculoNormalizado.includes(livroNormalizado)) {
        return false;
      }
      
      // Se especificou capítulo
      if (capitulo !== null && v.capitulo !== capitulo) {
        return false;
      }
      
      // Se especificou versículo
      if (versiculo !== null && v.versiculo !== versiculo) {
        return false;
      }
      
      return true;
    });
  }
  
  // Busca por texto (palavras no conteúdo)
  return versiculos.filter(v => {
    const textoNormalizado = normalizeText(v.texto);
    const livroNormalizado = normalizeText(v.livro);
    
    return textoNormalizado.includes(termoNormalizado) || 
           livroNormalizado.includes(termoNormalizado);
  });
};

export default function Painel() {
  const [todosVersiculos, setTodosVersiculos] = useState<Versiculo[]>([]);
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<Versiculo | null>(null);
  const [buscaTexto, setBuscaTexto] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState<Versiculo[]>([]);

  // Carregar todos versículos ao montar
  useEffect(() => {
    fetch('/api/biblia')
      .then(res => res.json())
      .then(data => {
        if (data.todosVersiculos) {
          setTodosVersiculos(data.todosVersiculos);
        }
      });
  }, []);

  // Função de busca melhorada
  const realizarBusca = (texto: string) => {
    setBuscaTexto(texto);
    
    if (texto.trim().length < 2) {
      setResultadosBusca([]);
      return;
    }

    const resultados = buscaInteligente(todosVersiculos, texto).slice(0, 100);
    setResultadosBusca(resultados);
  };

  const enviarParaTelao = () => {
    if (versiculoSelecionado) {
      const url = `/telao?livro=${encodeURIComponent(versiculoSelecionado.livro)}&capitulo=${versiculoSelecionado.capitulo}&versiculo=${versiculoSelecionado.versiculo}`;
      window.open(url, 'telao', 'fullscreen=yes');
    }
  };

  return (
    <>
      <Head>
        <title>Bíblia Sagrada NAA - Igreja Adventista</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header Horizontal */}
        <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
            {/* Logo e Título - Esquerda */}
            <div className="flex items-center gap-4 min-w-fit">
              <div className="text-5xl">📖</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Bíblia Sagrada</h1>
                <p className="text-sm text-blue-200">Nova Almeida Atualizada</p>
                <p className="text-xs text-yellow-300 font-semibold">Igreja Adventista do Sétimo Dia</p>
              </div>
            </div>

            {/* Busca - Direita */}
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <input
                  type="text"
                  value={buscaTexto}
                  onChange={(e) => realizarBusca(e.target.value)}
                  placeholder="Digite: salmos, salmos 23, salmos 23 1, joão 3:16, amor, fé..."
                  className="w-full px-6 py-4 pr-14 border-2 border-white/20 bg-white/10 backdrop-blur-sm rounded-2xl focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition-all text-white text-lg placeholder-white/50"
                  autoFocus
                />
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-3xl">🔍</span>
              </div>
              
              {buscaTexto.trim().length >= 2 && (
                <div className="mt-2 text-sm text-white/70">
                  {resultadosBusca.length > 0 
                    ? `${resultadosBusca.length} versículo(s) encontrado(s)`
                    : 'Nenhum resultado encontrado'
                  }
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna de Resultados - 2/3 */}
            <div className="lg:col-span-2">
              {resultadosBusca.length > 0 ? (
                <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                  {resultadosBusca.map((v, index) => (
                    <div
                      key={`${v.livro}-${v.capitulo}-${v.versiculo}-${index}`}
                      onClick={() => setVersiculoSelecionado(v)}
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.01] ${
                        versiculoSelecionado?.versiculo === v.versiculo &&
                        versiculoSelecionado?.capitulo === v.capitulo &&
                        versiculoSelecionado?.livro === v.livro
                          ? 'border-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-lg ring-4 ring-green-300/50'
                          : 'border-white/20 bg-white/5 backdrop-blur-sm hover:border-blue-300 hover:bg-white/10 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg text-sm mb-3">
                            {v.livro} {v.capitulo}:{v.versiculo}
                          </span>
                          <p className="text-white/90 leading-relaxed text-base">{v.texto}</p>
                        </div>
                        {versiculoSelecionado?.versiculo === v.versiculo &&
                         versiculoSelecionado?.capitulo === v.capitulo &&
                         versiculoSelecionado?.livro === v.livro && (
                          <div className="text-3xl animate-bounce">✅</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : buscaTexto.trim().length >= 2 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-white/70 text-lg">Nenhum versículo encontrado</p>
                  <p className="text-white/50 text-sm mt-2">Tente buscar por: nome do livro, capítulo, ou palavras-chave</p>
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📖</div>
                  <p className="text-white/70 text-lg mb-4">Digite para pesquisar na Bíblia</p>
                  <div className="text-white/50 text-sm space-y-1 max-w-md mx-auto bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="font-semibold text-white/70 mb-3">Exemplos de busca:</p>
                    <p>• <strong>"salmos"</strong> → Todos os salmos</p>
                    <p>• <strong>"salmos 23"</strong> → Salmo 23 completo</p>
                    <p>• <strong>"salmos 23 1"</strong> → Salmo 23:1</p>
                    <p>• <strong>"joão 3:16"</strong> → João 3:16</p>
                    <p>• <strong>"amor"</strong> → Versículos com a palavra</p>
                  </div>
                </div>
              )}
            </div>

            {/* Coluna de Prévia e Envio - 1/3 */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📺</span> Enviar para Telão
                  </h2>
                  
                  <button
                    onClick={enviarParaTelao}
                    disabled={!versiculoSelecionado}
                    className="w-full py-5 px-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-xl rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 mb-4 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🖥️</span>
                    <span className="relative">Tela Cheia</span>
                  </button>
                  
                  {versiculoSelecionado ? (
                    <div className="p-5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border-2 border-blue-300/50 animate-slide-in shadow-lg">
                      <p className="text-xs text-white/70 mb-3 font-semibold">PRÉVIA:</p>
                      <p className="text-xl font-bold text-yellow-300 mb-3 animate-glow">
                        {versiculoSelecionado.livro} {versiculoSelecionado.capitulo}:{versiculoSelecionado.versiculo}
                      </p>
                      <p className="text-white/90 leading-relaxed">
                        "{versiculoSelecionado.texto}"
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 bg-white/5 rounded-xl border-2 border-white/10 text-center">
                      <p className="text-white/50">Nenhum versículo selecionado</p>
                      <p className="text-white/30 text-sm mt-2">Clique em um versículo para selecionar</p>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <p className="text-yellow-200 text-xs">
                      💡 <strong>Dica:</strong> A busca funciona sem acentos! "genesis" encontra "Gênesis"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Fade in suave */
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Slide in com bounce suave */
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }

        /* Efeito glow no texto selecionado */
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(253, 224, 71, 0.5),
                         0 0 20px rgba(253, 224, 71, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(253, 224, 71, 0.8),
                         0 0 30px rgba(253, 224, 71, 0.5),
                         0 0 40px rgba(253, 224, 71, 0.3);
          }
        }

        /* Scrollbar personalizada */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #06b6d4);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #0891b2);
        }
      `}</style>
    </>
  );
}
