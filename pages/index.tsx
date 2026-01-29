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
  
  const [livroSelecionado, setLivroSelecionado] = useState('');
  const [capituloSelecionado, setCapituloSelecionado] = useState('');
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<Versiculo | null>(null);

  // Carregar livros ao montar o componente
  useEffect(() => {
    fetch('/api/biblia')
      .then(res => res.json())
      .then(data => setLivros(data.livros));
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

  return (
    <>
      <Head>
        <title>Painel de Controle - Bíblia Sagrada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            📖 Painel de Controle - Bíblia Sagrada
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Seletor de Livro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Livro
                </label>
                <select
                  value={livroSelecionado}
                  onChange={(e) => setLivroSelecionado(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  {livros.map((livro) => (
                    <option key={livro} value={livro}>
                      {livro}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seletor de Capítulo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capítulo
                </label>
                <select
                  value={capituloSelecionado}
                  onChange={(e) => setCapituloSelecionado(e.target.value)}
                  disabled={!livroSelecionado}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">Selecione...</option>
                  {capitulos.map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>
              </div>

              {/* Informação do versículo selecionado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Versículo Selecionado
                </label>
                <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                  {versiculoSelecionado 
                    ? `${versiculoSelecionado.livro} ${versiculoSelecionado.capitulo}:${versiculoSelecionado.versiculo}`
                    : 'Nenhum'
                  }
                </div>
              </div>
            </div>

            {/* Lista de Versículos */}
            {versiculos.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Versículos Disponíveis:
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {versiculos.map((v) => (
                    <div
                      key={`${v.livro}-${v.capitulo}-${v.versiculo}`}
                      onClick={() => setVersiculoSelecionado(v)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        versiculoSelecionado?.versiculo === v.versiculo
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <span className="font-semibold text-blue-600">
                            {v.livro} {v.capitulo}:{v.versiculo}
                          </span>
                          <p className="mt-2 text-gray-700">{v.texto}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botão de Enviar para Telão */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <button
              onClick={enviarParaTelao}
              disabled={!versiculoSelecionado}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              📺 Enviar para Telão (Tela Cheia)
            </button>
            
            {versiculoSelecionado && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Prévia do que será exibido:</strong>
                </p>
                <p className="text-lg font-semibold text-blue-900">
                  {versiculoSelecionado.livro} {versiculoSelecionado.capitulo}:{versiculoSelecionado.versiculo}
                </p>
                <p className="text-gray-700 mt-2">
                  {versiculoSelecionado.texto}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>💡 Dica: Selecione um versículo e clique em "Enviar para Telão" para abrir em tela cheia</p>
          </div>
        </div>
      </div>
    </>
  );
}
