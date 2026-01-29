const fs = require('fs');
const path = require('path');

// Mapeamento de abreviações para nomes completos dos livros
const nomesDosLivros = {
  'gn': 'Gênesis',
  'ex': 'Êxodo',
  'êx': 'Êxodo',
  'lv': 'Levítico',
  'nm': 'Números',
  'dt': 'Deuteronômio',
  'js': 'Josué',
  'jz': 'Juízes',
  'rt': 'Rute',
  '1sm': '1 Samuel',
  '2sm': '2 Samuel',
  '1rs': '1 Reis',
  '2rs': '2 Reis',
  '1cr': '1 Crônicas',
  '2cr': '2 Crônicas',
  'ed': 'Esdras',
  'ne': 'Neemias',
  'et': 'Ester',
  'jó': 'Jó',
  'sl': 'Salmos',
  'pv': 'Provérbios',
  'ec': 'Eclesiastes',
  'ct': 'Cânticos',
  'is': 'Isaías',
  'jr': 'Jeremias',
  'lm': 'Lamentações',
  'ez': 'Ezequiel',
  'dn': 'Daniel',
  'os': 'Oseias',
  'jl': 'Joel',
  'am': 'Amós',
  'ob': 'Obadias',
  'jn': 'Jonas',
  'mq': 'Miqueias',
  'na': 'Naum',
  'hc': 'Habacuque',
  'sf': 'Sofonias',
  'ag': 'Ageu',
  'zc': 'Zacarias',
  'ml': 'Malaquias',
  'mt': 'Mateus',
  'mc': 'Marcos',
  'lc': 'Lucas',
  'jo': 'João',
  'at': 'Atos',
  'rm': 'Romanos',
  '1co': '1 Coríntios',
  '2co': '2 Coríntios',
  'gl': 'Gálatas',
  'ef': 'Efésios',
  'fp': 'Filipenses',
  'cl': 'Colossenses',
  '1ts': '1 Tessalonicenses',
  '2ts': '2 Tessalonicenses',
  '1tm': '1 Timóteo',
  '2tm': '2 Timóteo',
  'tt': 'Tito',
  'fm': 'Filemom',
  'hb': 'Hebreus',
  'tg': 'Tiago',
  '1pe': '1 Pedro',
  '2pe': '2 Pedro',
  '1jo': '1 João',
  '2jo': '2 João',
  '3jo': '3 João',
  'jd': 'Judas',
  'ap': 'Apocalipse',
  '1tn': '1 Timóteo',
};

const bibliaDir = path.join(__dirname, 'toda_bilbia_naa', 'bible-naa-json-files-main');
const outputFile = path.join(__dirname, 'data', 'biblia.ts');

const versiculos = [];

// Ler todos os arquivos JSON
const arquivos = fs.readdirSync(bibliaDir).filter(f => f.endsWith('.json'));

arquivos.forEach(arquivo => {
  const conteudo = fs.readFileSync(path.join(bibliaDir, arquivo), 'utf-8');
  const dados = JSON.parse(conteudo);
  
  const abrev = dados.abbrev.toLowerCase();
  const nomeLivro = nomesDosLivros[abrev] || dados.abbrev;
  
  dados.chapters.forEach((capitulo, capIndex) => {
    capitulo.forEach((texto, versIndex) => {
      versiculos.push({
        livro: nomeLivro,
        capitulo: capIndex + 1,
        versiculo: versIndex + 1,
        texto: texto
      });
    });
  });
});

console.log(`Total de versículos processados: ${versiculos.length}`);

// Gerar o arquivo TypeScript
const conteudoTS = `// Bíblia Sagrada - Nova Almeida Atualizada (NAA)
// Gerado automaticamente a partir dos arquivos JSON

export interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export const bibliaData: Versiculo[] = ${JSON.stringify(versiculos, null, 2)};

export const getLivros = (): string[] => {
  const livros = new Set(bibliaData.map(v => v.livro));
  return Array.from(livros);
};

export const getCapitulos = (livro: string): number[] => {
  const capitulos = new Set(
    bibliaData
      .filter(v => v.livro === livro)
      .map(v => v.capitulo)
  );
  return Array.from(capitulos).sort((a, b) => a - b);
};

export const getVersiculos = (livro: string, capitulo: number): Versiculo[] => {
  return bibliaData
    .filter(v => v.livro === livro && v.capitulo === capitulo)
    .sort((a, b) => a.versiculo - b.versiculo);
};

export const getVersiculo = (livro: string, capitulo: number, versiculo: number): Versiculo | undefined => {
  return bibliaData.find(
    v => v.livro === livro && v.capitulo === capitulo && v.versiculo === versiculo
  );
};

export const getTodosVersiculos = (): Versiculo[] => {
  return bibliaData;
};
`;

fs.writeFileSync(outputFile, conteudoTS);
console.log(`Arquivo gerado com sucesso: ${outputFile}`);
