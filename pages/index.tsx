import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export default function Painel() {
  const [livros, setLivros] = useState<string[]>([]);
  const [capitulos, setCapitulos] = useState<number[]>([]);
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [todosVersiculos, setTodosVersiculos] = useState<Versiculo[]>([]);
  
  const [livroSelecionado, setLivroSelecionado] = useState('');
  const [capituloSelecionado, setCapituloSelecionado] = useState('');
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<Versiculo | null>(null);
  const [buscaTexto, setBuscaTexto] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState<Versiculo[]>([]);
  const [modoBusca, setModoBusca] = useState<'navegacao' | 'pesquisa'>('navegacao');

  // Carregar livros e todos versículos ao montar o componente
  useEffect(() => {
    fetch('/api/biblia')
      .then(res => res.json())
      .then(data => {
        setLivros(data.livros);
        // Carregar todos os versículos para busca
        if (data.todosVersiculos) {
          setTodosVersiculos(data.todosVersiculos);
        }
      });
  }, []);

  // Carregar capítulos quando selecionar um livro
  useEffect(() => {
    if (livroSelecionado) {
      fetch(`/api/biblia?livro=${encodeURIComponent(livroSelecionado)}`)
        .then(res => res.json())
        .then(data => {
          setCapitulos(data.capitulos);
          setCapituloSelecionado('');
          setVersiculos([]);
          setVersiculoSelecionado(null);
        });
    }
  }, [livroSelecionado]);

  // Carregar versículos quando selecionar um capítulo
  useEffect(() => {
    if (livroSelecionado && capituloSelecionado) {
      fetch(`/api/biblia?livro=${encodeURIComponent(livroSelecionado)}&capitulo=${capituloSelecionado}`)
        .then(res => res.json())
        .then(data => {
          setVersiculos(data.versiculos);
          setVersiculoSelecionado(null);
        });
    }
  }, [livroSelecionado, capituloSelecionado]);

  const enviarParaTelao = () => {
    if (versiculoSelecionado) {
      const url = `/telao?livro=${encodeURIComponent(versiculoSelecionado.livro)}&capitulo=${versiculoSelecionado.capitulo}&versiculo=${versiculoSelecionado.versiculo}`;
      window.open(url, 'telao', 'fullscreen=yes');
    }
  };

  // Função de busca por texto
  const realizarBusca = (texto: string) => {
    setBuscaTexto(texto);
    if (texto.trim().length < 3) {
      setResultadosBusca([]);
      return;
    }

    const termo = texto.toLowerCase();
    const resultados = todosVersiculos.filter(v => 
      v.texto.toLowerCase().includes(termo) ||
      v.livro.toLowerCase().includes(termo)
    ).slice(0, 50); // Limitar a 50 resultados

    setResultadosBusca(resultados);
  };

  return (
    <>
      <Head>
        <title>Painel de Controle - Bíblia Sagrada NAA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Moderno */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
              <span className="text-yellow-300 text-sm font-semibold">Igreja Adventista do Sétimo Dia</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              📖 Bíblia Sagrada
            </h1>
            <p className="text-blue-200 text-lg">Nova Almeida Atualizada</p>
          </div>

          {/* Tabs de Navegação vs Pesquisa */}
          <div className="flex gap-3 mb-6 justify-center">
            <button
              onClick={() => setModoBusca('navegacao')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                modoBusca === 'navegacao'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🗂️ Navegar por Livro
            </button>
            <button
              onClick={() => setModoBusca('pesquisa')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                modoBusca === 'pesquisa'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              🔍 Pesquisar Texto
            </button>
          </div>

          {/* Modo Navegação */}
          {modoBusca === 'navegacao' && (
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">📚</span> Navegação por Referência
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                {/* Seletor de Livro */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">📖</span> Livro
                  </label>
                  <select
                    value={livroSelecionado}
                    onChange={(e) => setLivroSelecionado(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-800 font-medium hover:border-blue-400 bg-white"
                  >
                    <option value="">Selecione um livro...</option>
                    {livros.map((livro) => (
                      <option key={livro} value={livro}>
                        {livro}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletor de Capítulo */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">📄</span> Capítulo
                  </label>
                  <select
                    value={capituloSelecionado}
                    onChange={(e) => setCapituloSelecionado(e.target.value)}
                    disabled={!livroSelecionado}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all text-gray-800 font-medium hover:border-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed bg-white"
                  >
                    <option value="">Selecione um capítulo...</option>
                    {capitulos.map((cap) => (
                      <option key={cap} value={cap}>
                        Capítulo {cap}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Versículo Selecionado */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span> Selecionado
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-green-300 rounded-xl bg-green-50 text-gray-800 font-semibold flex items-center justify-center min-h-[48px]">
                    {versiculoSelecionado 
                      ? `${versiculoSelecionado.livro} ${versiculoSelecionado.capitulo}:${versiculoSelecionado.versiculo}`
                      : 'Nenhum versículo selecionado'
                    }
                  </div>
                </div>
              </div>

              {/* Lista de Versículos */}
              {versiculos.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📜</span> Versículos Disponíveis
                  </h3>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {versiculos.map((v) => (
                      <div
                        key={`${v.livro}-${v.capitulo}-${v.versiculo}`}
                        onClick={() => setVersiculoSelecionado(v)}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] ${
                          versiculoSelecionado?.versiculo === v.versiculo
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg ring-4 ring-blue-200'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg text-sm mb-2">
                              {v.livro} {v.capitulo}:{v.versiculo}
                            </span>
                            <p className="text-gray-700 leading-relaxed text-base">{v.texto}</p>
                          </div>
                          {versiculoSelecionado?.versiculo === v.versiculo && (
                            <div className="text-2xl animate-bounce">✅</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modo Pesquisa */}
          {modoBusca === 'pesquisa' && (
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 mb-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-3xl">🔍</span> Pesquisa por Texto
              </h2>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  value={buscaTexto}
                  onChange={(e) => realizarBusca(e.target.value)}
                  placeholder="Digite o que deseja encontrar na Bíblia... (mínimo 3 caracteres)"
                  className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-gray-800 text-lg placeholder-gray-400"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">🔎</span>
              </div>

              {buscaTexto.trim().length >= 3 && (
                <div className="mb-4 text-sm text-gray-600">
                  {resultadosBusca.length > 0 
                    ? `${resultadosBusca.length} resultado(s) encontrado(s)${resultadosBusca.length === 50 ? ' (mostrando os primeiros 50)' : ''}`
                    : 'Nenhum resultado encontrado'
                  }
                </div>
              )}

              {resultadosBusca.length > 0 && (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {resultadosBusca.map((v, index) => (
                    <div
                      key={`${v.livro}-${v.capitulo}-${v.versiculo}-${index}`}
                      onClick={() => setVersiculoSelecionado(v)}
                      className={`p-5 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] ${
                        versiculoSelecionado?.versiculo === v.versiculo &&
                        versiculoSelecionado?.capitulo === v.capitulo &&
                        versiculoSelecionado?.livro === v.livro
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg ring-4 ring-purple-200'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg text-sm mb-2">
                            {v.livro} {v.capitulo}:{v.versiculo}
                          </span>
                          <p className="text-gray-700 leading-relaxed text-base">{v.texto}</p>
                        </div>
                        {versiculoSelecionado?.versiculo === v.versiculo &&
                         versiculoSelecionado?.capitulo === v.capitulo &&
                         versiculoSelecionado?.livro === v.livro && (
                          <div className="text-2xl animate-bounce">✅</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Botão de Enviar para Telão */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 animate-slide-up">
            <button
              onClick={enviarParaTelao}
              disabled={!versiculoSelecionado}
              className="w-full py-5 px-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold text-2xl rounded-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="text-3xl">📺</span>
              Enviar para Telão (Tela Cheia)
            </button>
            
            {versiculoSelecionado && (
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 animate-fade-in">
                <p className="text-sm text-gray-600 mb-3 font-semibold">
                  <span className="text-lg">👁️</span> PRÉVIA DO QUE SERÁ EXIBIDO:
                </p>
                <p className="text-2xl font-bold text-blue-900 mb-3">
                  {versiculoSelecionado.livro} {versiculoSelecionado.capitulo}:{versiculoSelecionado.versiculo}
                </p>
                <p className="text-gray-800 text-lg leading-relaxed">
                  "{versiculoSelecionado.texto}"
                </p>
              </div>
            )}
          </div>

          {/* Rodapé com Dicas */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-white">
              <p className="text-sm mb-2">💡 <strong>Dicas de Uso:</strong></p>
              <p className="text-xs opacity-90">
                Navegue por livros ou use a pesquisa • Selecione o versículo • Clique em "Enviar para Telão"
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
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
