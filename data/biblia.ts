// Dados simplificados da Bíblia com alguns versículos de exemplo
// Para produção, você pode conectar a uma API completa da Bíblia

export interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export const bibliaData: Versiculo[] = [
  // João 3
  { livro: "João", capitulo: 3, versiculo: 16, texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." },
  { livro: "João", capitulo: 3, versiculo: 17, texto: "Porque Deus enviou o seu Filho ao mundo, não para que condenasse o mundo, mas para que o mundo fosse salvo por ele." },
  
  // Salmos 23
  { livro: "Salmos", capitulo: 23, versiculo: 1, texto: "O Senhor é o meu pastor; nada me faltará." },
  { livro: "Salmos", capitulo: 23, versiculo: 2, texto: "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas." },
  { livro: "Salmos", capitulo: 23, versiculo: 3, texto: "Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome." },
  { livro: "Salmos", capitulo: 23, versiculo: 4, texto: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo; a tua vara e o teu cajado me consolam." },
  
  // Provérbios 3
  { livro: "Provérbios", capitulo: 3, versiculo: 5, texto: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento." },
  { livro: "Provérbios", capitulo: 3, versiculo: 6, texto: "Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas." },
  
  // Filipenses 4
  { livro: "Filipenses", capitulo: 4, versiculo: 13, texto: "Posso todas as coisas em Cristo que me fortalece." },
  { livro: "Filipenses", capitulo: 4, versiculo: 6, texto: "Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças." },
  
  // Romanos 8
  { livro: "Romanos", capitulo: 8, versiculo: 28, texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { livro: "Romanos", capitulo: 8, versiculo: 31, texto: "Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?" },
  
  // Mateus 5
  { livro: "Mateus", capitulo: 5, versiculo: 14, texto: "Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte." },
  { livro: "Mateus", capitulo: 5, versiculo: 16, texto: "Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus." },
  
  // Isaías 40
  { livro: "Isaías", capitulo: 40, versiculo: 31, texto: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão." },
  
  // Jeremias 29
  { livro: "Jeremias", capitulo: 29, versiculo: 11, texto: "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais." },
  
  // 1 Coríntios 13
  { livro: "1 Coríntios", capitulo: 13, versiculo: 4, texto: "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece." },
  { livro: "1 Coríntios", capitulo: 13, versiculo: 13, texto: "Agora, pois, permanecem a fé, a esperança e o amor, estes três, mas o maior destes é o amor." },
];

export const getLivros = (): string[] => {
  const livros = new Set(bibliaData.map(v => v.livro));
  return Array.from(livros).sort();
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
