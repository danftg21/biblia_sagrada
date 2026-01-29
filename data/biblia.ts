// Bíblia Sagrada - Nova Almeida Atualizada (NAA)
// Versículos mais usados e importantes

export interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

export const bibliaData: Versiculo[] = [
  // GÊNESIS
  { livro: "Gênesis", capitulo: 1, versiculo: 1, texto: "No princípio, criou Deus os céus e a terra." },
  { livro: "Gênesis", capitulo: 1, versiculo: 27, texto: "Criou Deus, pois, o ser humano à sua imagem, à imagem de Deus o criou; homem e mulher os criou." },
  { livro: "Gênesis", capitulo: 1, versiculo: 31, texto: "Viu Deus tudo quanto havia feito, e eis que era muito bom. Houve tarde e manhã, o sexto dia." },
  { livro: "Gênesis", capitulo: 2, versiculo: 2, texto: "E, tendo concluído no sétimo dia a sua obra, que fizera, descansou Deus no sétimo dia de toda a obra que havia feito." },
  { livro: "Gênesis", capitulo: 2, versiculo: 3, texto: "E Deus abençoou o sétimo dia e o santificou, porque nele descansou de toda a obra que, como Criador, fizera." },

  // ÊXODO
  { livro: "Êxodo", capitulo: 20, versiculo: 8, texto: "Lembra-te do dia de sábado, para o santificar." },
  { livro: "Êxodo", capitulo: 20, versiculo: 9, texto: "Seis dias trabalharás e farás toda a tua obra." },
  { livro: "Êxodo", capitulo: 20, versiculo: 10, texto: "Mas o sétimo dia é o sábado do SENHOR, teu Deus; não farás nenhum trabalho, nem tu, nem o teu filho, nem a tua filha, nem o teu servo, nem a tua serva, nem o teu animal, nem o forasteiro das tuas portas para dentro." },
  { livro: "Êxodo", capitulo: 20, versiculo: 11, texto: "Porque em seis dias fez o SENHOR os céus e a terra, o mar e tudo o que neles há e, ao sétimo dia, descansou; por isso, o SENHOR abençoou o dia de sábado e o santificou." },
  { livro: "Êxodo", capitulo: 20, versiculo: 3, texto: "Não terás outros deuses diante de mim." },
  { livro: "Êxodo", capitulo: 20, versiculo: 12, texto: "Honra teu pai e tua mãe, para que se prolonguem os teus dias na terra que o SENHOR, teu Deus, te dá." },

  // LEVÍTICO
  { livro: "Levítico", capitulo: 19, versiculo: 18, texto: "Não te vingarás, nem guardarás ira contra os filhos do teu povo; mas amarás o teu próximo como a ti mesmo. Eu sou o SENHOR." },

  // DEUTERONÔMIO
  { livro: "Deuteronômio", capitulo: 6, versiculo: 5, texto: "Amarás, pois, o SENHOR, teu Deus, de todo o teu coração, de toda a tua alma e de toda a tua força." },
  { livro: "Deuteronômio", capitulo: 28, versiculo: 1, texto: "Se você obedecer fielmente à voz do SENHOR, seu Deus, tendo o cuidado de cumprir todos os seus mandamentos que hoje lhe ordeno, o SENHOR, seu Deus, o colocará bem no alto, acima de todas as nações da terra." },

  // JOSUÉ
  { livro: "Josué", capitulo: 1, versiculo: 8, texto: "Não cesse de falar deste Livro da Lei; antes, medite nele dia e noite, para que tenha cuidado de fazer segundo tudo o que nele está escrito; então, você será bem-sucedido em seus caminhos e prosperará." },
  { livro: "Josué", capitulo: 1, versiculo: 9, texto: "Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem se desanime, pois o SENHOR, seu Deus, está com você por onde você andar." },
  { livro: "Josué", capitulo: 24, versiculo: 15, texto: "Porém, se não lhes agrada servir ao SENHOR, escolham hoje a quem vão servir: se aos deuses a quem serviram os seus pais que estavam dalém do Eufrates ou aos deuses dos amorreus em cuja terra vocês habitam. Eu e a minha casa serviremos ao SENHOR." },

  // SALMOS
  { livro: "Salmos", capitulo: 1, versiculo: 1, texto: "Como é feliz aquele que não anda segundo o conselho dos ímpios, não se detém no caminho dos pecadores, nem se assenta na roda dos zombadores!" },
  { livro: "Salmos", capitulo: 1, versiculo: 2, texto: "Antes, o seu prazer está na lei do SENHOR, e na sua lei medita de dia e de noite." },
  { livro: "Salmos", capitulo: 23, versiculo: 1, texto: "O SENHOR é o meu pastor; nada me faltará." },
  { livro: "Salmos", capitulo: 23, versiculo: 2, texto: "Ele me faz repousar em pastos verdejantes. Leva-me para junto de águas de descanso." },
  { livro: "Salmos", capitulo: 23, versiculo: 3, texto: "Refrigera-me a alma. Guia-me pelas veredas da justiça por amor do seu nome." },
  { livro: "Salmos", capitulo: 23, versiculo: 4, texto: "Mesmo quando eu andar por um vale de trevas e morte, não temerei perigo algum, pois tu estás comigo; o teu bordão e o teu cajado me consolam." },
  { livro: "Salmos", capitulo: 23, versiculo: 5, texto: "Preparas uma mesa perante mim, à vista dos meus inimigos; unges a minha cabeça com óleo; o meu cálice transborda." },
  { livro: "Salmos", capitulo: 23, versiculo: 6, texto: "Bondade e misericórdia certamente me seguirão todos os dias da minha vida; e habitarei na Casa do SENHOR para todo o sempre." },
  { livro: "Salmos", capitulo: 27, versiculo: 1, texto: "O SENHOR é a minha luz e a minha salvação; de quem terei medo? O SENHOR é a fortaleza da minha vida; a quem temerei?" },
  { livro: "Salmos", capitulo: 37, versiculo: 4, texto: "Agrada-te do SENHOR, e ele satisfará os desejos do seu coração." },
  { livro: "Salmos", capitulo: 37, versiculo: 5, texto: "Entregue o seu caminho ao SENHOR, confie nele, e o mais ele fará." },
  { livro: "Salmos", capitulo: 46, versiculo: 1, texto: "Deus é o nosso refúgio e a nossa fortaleza, socorro bem presente nas tribulações." },
  { livro: "Salmos", capitulo: 91, versiculo: 1, texto: "Aquele que habita no esconderijo do Altíssimo e descansa à sombra do Onipotente" },
  { livro: "Salmos", capitulo: 91, versiculo: 2, texto: "diz ao SENHOR: Meu refúgio e meu baluarte, Deus meu, em quem confio." },
  { livro: "Salmos", capitulo: 91, versiculo: 11, texto: "Porque aos seus anjos ele dará ordens a seu respeito, para que o guardem em todos os seus caminhos." },
  { livro: "Salmos", capitulo: 119, versiculo: 105, texto: "Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos." },
  { livro: "Salmos", capitulo: 121, versiculo: 1, texto: "Elevo os olhos para os montes: de onde me virá o socorro?" },
  { livro: "Salmos", capitulo: 121, versiculo: 2, texto: "O meu socorro vem do SENHOR, que fez o céu e a terra." },
  { livro: "Salmos", capitulo: 139, versiculo: 14, texto: "Eu te louvarei, porque de um modo terrível e tão maravilhoso fui formado; maravilhosas são as tuas obras, e a minha alma o sabe muito bem." },

  // PROVÉRBIOS
  { livro: "Provérbios", capitulo: 3, versiculo: 5, texto: "Confie no SENHOR de todo o seu coração e não se apoie na sua própria inteligência." },
  { livro: "Provérbios", capitulo: 3, versiculo: 6, texto: "Reconheça o SENHOR em todos os seus caminhos, e ele endireitará as suas veredas." },
  { livro: "Provérbios", capitulo: 22, versiculo: 6, texto: "Ensine a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele." },
  { livro: "Provérbios", capitulo: 16, versiculo: 3, texto: "Confia ao SENHOR as tuas obras, e os teus planos serão estabelecidos." },

  // ECLESIASTES
  { livro: "Eclesiastes", capitulo: 12, versiculo: 13, texto: "De tudo o que se tem ouvido, a conclusão é esta: tema a Deus e guarde os seus mandamentos; porque isso é o dever de todo ser humano." },

  // ISAÍAS
  { livro: "Isaías", capitulo: 40, versiculo: 31, texto: "mas os que esperam no SENHOR renovam as suas forças, sobem com asas como águias, correm e não se cansam, caminham e não se fatigam." },
  { livro: "Isaías", capitulo: 41, versiculo: 10, texto: "Não tema, pois eu estou com você; não tenha medo, pois eu sou o seu Deus; eu o fortaleço, e o ajudo, e o sustento com a minha destra fiel." },
  { livro: "Isaías", capitulo: 43, versiculo: 2, texto: "Quando você passar pelas águas, estarei com você; quando passar pelos rios, eles não o submergirão; quando você passar pelo fogo, não se queimará, nem a chama arderá em você." },
  { livro: "Isaías", capitulo: 53, versiculo: 5, texto: "Mas ele foi traspassado pelas nossas transgressões e moído pelas nossas iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas suas pisaduras fomos sarados." },
  { livro: "Isaías", capitulo: 55, versiculo: 6, texto: "Busquem o SENHOR enquanto é possível achá-lo; invoquem-no enquanto está perto." },
  { livro: "Isaías", capitulo: 58, versiculo: 13, texto: "Se você desviar o pé de profanar o sábado e de cuidar dos seus próprios interesses no meu santo dia; se chamar ao sábado deleitoso e santo dia do SENHOR, digno de honra, e o honrar, não seguindo os seus caminhos, não pretendendo fazer a sua própria vontade, nem falando palavras vãs," },
  { livro: "Isaías", capitulo: 58, versiculo: 14, texto: "então, você terá prazer no SENHOR. Eu farei que você cavalgue sobre os altos da terra e se sustente com a herança de Jacó, seu pai, porque a boca do SENHOR o disse." },

  // JEREMIAS
  { livro: "Jeremias", capitulo: 29, versiculo: 11, texto: "Eu é que sei que pensamentos tenho a respeito de vocês, diz o SENHOR; pensamentos de paz e não de mal, para dar a vocês o fim que desejam." },
  { livro: "Jeremias", capitulo: 29, versiculo: 12, texto: "Vocês clamarão a mim, virão orar a mim, e eu os ouvirei." },
  { livro: "Jeremias", capitulo: 29, versiculo: 13, texto: "Vocês me buscarão e me acharão quando me buscarem de todo o coração." },
  { livro: "Jeremias", capitulo: 33, versiculo: 3, texto: "Clame a mim, e eu responderei e anunciarei a você coisas grandes e ocultas, que você não sabe." },

  // DANIEL
  { livro: "Daniel", capitulo: 2, versiculo: 44, texto: "Mas, nos dias desses reis, o Deus do céu levantará um reino que não será jamais destruído; este reino não passará a outro povo; esmiuçará e consumirá todos esses reinos, mas ele mesmo subsistirá para sempre." },
  { livro: "Daniel", capitulo: 12, versiculo: 2, texto: "Muitos dos que dormem no pó da terra ressuscitarão, uns para a vida eterna, e outros para vergonha e horror eterno." },

  // JOEL
  { livro: "Joel", capitulo: 2, versiculo: 28, texto: "Depois disso, derramarei o meu Espírito sobre todos os seres humanos; os seus filhos e as suas filhas profetizarão, os velhos terão sonhos, e os jovens terão visões." },

  // MALAQUIAS
  { livro: "Malaquias", capitulo: 3, versiculo: 10, texto: "Tragam todos os dízimos à casa do Tesouro, para que haja mantimento na minha casa; e provem-me nisto, diz o SENHOR dos Exércitos, se eu não lhes abrir as janelas do céu e não derramar sobre vocês bênção sem medida." },
  { livro: "Malaquias", capitulo: 4, versiculo: 2, texto: "Mas para vocês que temem o meu nome nascerá o sol da justiça, trazendo salvação nas suas asas; vocês sairão saltando como bezerros soltos da estrebaria." },

  // MATEUS
  { livro: "Mateus", capitulo: 5, versiculo: 3, texto: "Bem-aventurados os humildes de espírito, porque deles é o Reino dos Céus." },
  { livro: "Mateus", capitulo: 5, versiculo: 14, texto: "Vocês são a luz do mundo. Não se pode esconder uma cidade edificada sobre um monte." },
  { livro: "Mateus", capitulo: 5, versiculo: 16, texto: "Assim brilhe também a luz de vocês diante das pessoas, para que vejam as suas boas obras e glorifiquem o Pai de vocês, que está nos céus." },
  { livro: "Mateus", capitulo: 6, versiculo: 33, texto: "Busquem, pois, em primeiro lugar, o seu Reino e a sua justiça, e todas essas coisas lhes serão acrescentadas." },
  { livro: "Mateus", capitulo: 7, versiculo: 7, texto: "Peçam, e lhes será dado; busquem, e acharão; batam, e a porta lhes será aberta." },
  { livro: "Mateus", capitulo: 11, versiculo: 28, texto: "Venham a mim, todos os que estão cansados e sobrecarregados, e eu lhes darei descanso." },
  { livro: "Mateus", capitulo: 24, versiculo: 14, texto: "E será pregado este evangelho do Reino por todo o mundo, para testemunho a todas as nações. Então virá o fim." },
  { livro: "Mateus", capitulo: 28, versiculo: 19, texto: "Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo" },
  { livro: "Mateus", capitulo: 28, versiculo: 20, texto: "ensinando-os a guardar todas as coisas que tenho ordenado a vocês. E eis que estou com vocês todos os dias até a consumação do século." },

  // MARCOS
  { livro: "Marcos", capitulo: 16, versiculo: 15, texto: "E disse-lhes: Vão por todo o mundo e preguem o evangelho a toda criatura." },

  // LUCAS
  { livro: "Lucas", capitulo: 19, versiculo: 10, texto: "Pois o Filho do Homem veio buscar e salvar o que estava perdido." },

  // JOÃO
  { livro: "João", capitulo: 1, versiculo: 1, texto: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." },
  { livro: "João", capitulo: 1, versiculo: 12, texto: "Mas, a todos quantos o receberam, deu-lhes o poder de se tornarem filhos de Deus, a saber, aos que creem no seu nome" },
  { livro: "João", capitulo: 3, versiculo: 16, texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna." },
  { livro: "João", capitulo: 3, versiculo: 17, texto: "Porquanto Deus enviou o seu Filho ao mundo, não para que julgasse o mundo, mas para que o mundo fosse salvo por meio dele." },
  { livro: "João", capitulo: 8, versiculo: 32, texto: "e conhecerão a verdade, e a verdade os libertará." },
  { livro: "João", capitulo: 10, versiculo: 10, texto: "O ladrão vem somente para roubar, matar e destruir; eu vim para que tenham vida e a tenham em abundância." },
  { livro: "João", capitulo: 11, versiculo: 25, texto: "Disse-lhe Jesus: Eu sou a ressurreição e a vida. Quem crê em mim, ainda que morra, viverá;" },
  { livro: "João", capitulo: 14, versiculo: 1, texto: "Não se turbe o coração de vocês; creiam em Deus, creiam também em mim." },
  { livro: "João", capitulo: 14, versiculo: 2, texto: "Na casa de meu Pai há muitas moradas. Se não fosse assim, eu teria dito a vocês, pois vou preparar-lhes lugar." },
  { livro: "João", capitulo: 14, versiculo: 3, texto: "E, quando eu for e lhes preparar lugar, voltarei e os receberei para mim mesmo, para que, onde eu estou, vocês estejam também." },
  { livro: "João", capitulo: 14, versiculo: 6, texto: "Respondeu-lhe Jesus: Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai senão por mim." },
  { livro: "João", capitulo: 14, versiculo: 27, texto: "Deixo com vocês a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se turbe o coração de vocês, nem se atemorize." },
  { livro: "João", capitulo: 15, versiculo: 5, texto: "Eu sou a videira, vocês, os ramos. Quem permanece em mim, e eu, nele, esse dá muito fruto; porque sem mim vocês não podem fazer coisa alguma." },

  // ATOS
  { livro: "Atos", capitulo: 1, versiculo: 8, texto: "Mas receberão poder ao descer sobre vocês o Espírito Santo, e serão minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria e até os confins da terra." },
  { livro: "Atos", capitulo: 2, versiculo: 38, texto: "Respondeu-lhes Pedro: Arrependam-se, e cada um de vocês seja batizado em nome de Jesus Cristo para remissão dos seus pecados, e vocês receberão o dom do Espírito Santo." },
  { livro: "Atos", capitulo: 4, versiculo: 12, texto: "E não há salvação em nenhum outro, pois, debaixo do céu, não existe nenhum outro nome, dado entre os seres humanos, pelo qual importa que sejamos salvos." },

  // ROMANOS
  { livro: "Romanos", capitulo: 3, versiculo: 23, texto: "pois todos pecaram e carecem da glória de Deus" },
  { livro: "Romanos", capitulo: 5, versiculo: 8, texto: "Mas Deus prova o seu próprio amor para conosco pelo fato de Cristo ter morrido por nós, sendo nós ainda pecadores." },
  { livro: "Romanos", capitulo: 6, versiculo: 23, texto: "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor." },
  { livro: "Romanos", capitulo: 8, versiculo: 1, texto: "Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus." },
  { livro: "Romanos", capitulo: 8, versiculo: 28, texto: "Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito." },
  { livro: "Romanos", capitulo: 8, versiculo: 31, texto: "Que diremos, pois, à vista destas coisas? Se Deus é por nós, quem será contra nós?" },
  { livro: "Romanos", capitulo: 8, versiculo: 38, texto: "Porque eu estou bem certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as coisas do presente, nem do porvir, nem os poderes," },
  { livro: "Romanos", capitulo: 8, versiculo: 39, texto: "nem a altura, nem a profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus, que está em Cristo Jesus, nosso Senhor." },
  { livro: "Romanos", capitulo: 10, versiculo: 9, texto: "Se, com a sua boca, você confessar Jesus como Senhor e, em seu coração, crer que Deus o ressuscitou dentre os mortos, será salvo." },
  { livro: "Romanos", capitulo: 12, versiculo: 1, texto: "Rogo a vocês, pois, irmãos, pela compaixão de Deus, que apresentem o seu corpo como sacrifício vivo, santo e agradável a Deus, que é o culto racional de vocês." },
  { livro: "Romanos", capitulo: 12, versiculo: 2, texto: "E não se conformem com este mundo, mas transformem-se pela renovação da mente, para que experimentem qual seja a boa, agradável e perfeita vontade de Deus." },

  // 1 CORÍNTIOS
  { livro: "1 Coríntios", capitulo: 10, versiculo: 13, texto: "Não sobreveio a vocês tentação que não fosse humana; mas Deus é fiel e não permitirá que vocês sejam tentados além das suas forças; pelo contrário, juntamente com a tentação, lhes proverá livramento, de sorte que a possam suportar." },
  { livro: "1 Coríntios", capitulo: 13, versiculo: 4, texto: "O amor é paciente, é bondoso; o amor não arde em ciúmes, não se ufana, não se ensoberbece," },
  { livro: "1 Coríntios", capitulo: 13, versiculo: 13, texto: "Agora, pois, permanecem a fé, a esperança e o amor, estes três; porém o maior destes é o amor." },
  { livro: "1 Coríntios", capitulo: 15, versiculo: 51, texto: "Eis que lhes digo um mistério: nem todos dormiremos, mas transformados seremos todos," },
  { livro: "1 Coríntios", capitulo: 15, versiculo: 52, texto: "num momento, num abrir e fechar de olhos, ao ressoar da última trombeta. A trombeta soará, os mortos ressuscitarão incorruptíveis, e nós seremos transformados." },

  // 2 CORÍNTIOS
  { livro: "2 Coríntios", capitulo: 5, versiculo: 17, texto: "E, assim, se alguém está em Cristo, é nova criatura; as coisas antigas já passaram; eis que se fizeram novas." },
  { livro: "2 Coríntios", capitulo: 12, versiculo: 9, texto: "Então, ele me disse: A minha graça te basta, porque o poder se aperfeiçoa na fraqueza. De boa vontade, pois, mais me gloriarei nas fraquezas, para que sobre mim repouse o poder de Cristo." },

  // GÁLATAS
  { livro: "Gálatas", capitulo: 2, versiculo: 20, texto: "Estou crucificado com Cristo; logo, já não sou eu quem vive, mas Cristo vive em mim; e esse viver que, agora, tenho na carne, vivo pela fé no Filho de Deus, que me amou e a si mesmo se entregou por mim." },
  { livro: "Gálatas", capitulo: 5, versiculo: 22, texto: "Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade," },
  { livro: "Gálatas", capitulo: 5, versiculo: 23, texto: "mansidão, domínio próprio. Contra essas coisas não há lei." },

  // EFÉSIOS
  { livro: "Efésios", capitulo: 2, versiculo: 8, texto: "Porque pela graça vocês são salvos, mediante a fé; e isto não vem de vocês; é dom de Deus;" },
  { livro: "Efésios", capitulo: 2, versiculo: 9, texto: "não de obras, para que ninguém se glorie." },
  { livro: "Efésios", capitulo: 6, versiculo: 11, texto: "Vistam toda a armadura de Deus, para que possam ficar firmes contra as ciladas do diabo;" },

  // FILIPENSES
  { livro: "Filipenses", capitulo: 4, versiculo: 6, texto: "Não andem ansiosos de coisa alguma; em tudo, porém, sejam conhecidos diante de Deus os seus pedidos, pela oração e pela súplica, com ações de graças." },
  { livro: "Filipenses", capitulo: 4, versiculo: 7, texto: "E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus." },
  { livro: "Filipenses", capitulo: 4, versiculo: 13, texto: "Tudo posso naquele que me fortalece." },
  { livro: "Filipenses", capitulo: 4, versiculo: 19, texto: "E o meu Deus, segundo a sua riqueza em glória, há de suprir toda a necessidade de vocês em Cristo Jesus." },

  // COLOSSENSES
  { livro: "Colossenses", capitulo: 3, versiculo: 2, texto: "Pensem nas coisas lá do alto, não nas que são aqui da terra;" },

  // 1 TESSALONICENSES
  { livro: "1 Tessalonicenses", capitulo: 4, versiculo: 16, texto: "Pois, dada a ordem, com a voz do arcanjo e o ressoar da trombeta de Deus, o próprio Senhor descerá do céu, e os mortos em Cristo ressuscitarão primeiro;" },
  { livro: "1 Tessalonicenses", capitulo: 4, versiculo: 17, texto: "depois, nós, os vivos, os que ficarmos, seremos arrebatados juntamente com eles, entre nuvens, para o encontro do Senhor nos ares, e, assim, estaremos para sempre com o Senhor." },
  { livro: "1 Tessalonicenses", capitulo: 5, versiculo: 17, texto: "Orem sem cessar." },

  // 2 TIMÓTEO
  { livro: "2 Timóteo", capitulo: 1, versiculo: 7, texto: "Porque Deus não nos tem dado espírito de covardia, mas de poder, de amor e de moderação." },
  { livro: "2 Timóteo", capitulo: 3, versiculo: 16, texto: "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a educação na justiça," },
  { livro: "2 Timóteo", capitulo: 3, versiculo: 17, texto: "a fim de que a pessoa de Deus seja perfeita e perfeitamente habilitada para toda boa obra." },

  // HEBREUS
  { livro: "Hebreus", capitulo: 4, versiculo: 9, texto: "Portanto, resta um repouso para o povo de Deus." },
  { livro: "Hebreus", capitulo: 4, versiculo: 10, texto: "Porque aquele que entrou no descanso de Deus, esse também descansou de suas obras, como Deus descansou das suas." },
  { livro: "Hebreus", capitulo: 11, versiculo: 1, texto: "Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem." },
  { livro: "Hebreus", capitulo: 13, versiculo: 5, texto: "Sejam vossos costumes sem avareza, contentando-vos com o que tendes; porque ele disse: Não te deixarei, nem te desampararei." },

  // TIAGO
  { livro: "Tiago", capitulo: 1, versiculo: 5, texto: "Se, porém, algum de vocês necessita de sabedoria, peça-a a Deus, que a todos dá liberalmente e nada censura; e lhe será concedida." },
  { livro: "Tiago", capitulo: 4, versiculo: 7, texto: "Portanto, submetam-se a Deus. Resistam ao diabo, e ele fugirá de vocês." },
  { livro: "Tiago", capitulo: 5, versiculo: 16, texto: "Confessem os seus pecados uns aos outros e orem uns pelos outros, para que sejam curados. A oração de um justo é poderosa e eficaz." },

  // 1 PEDRO
  { livro: "1 Pedro", capitulo: 5, versiculo: 7, texto: "lançando sobre ele toda a ansiedade de vocês, porque ele tem cuidado de vocês." },

  // 1 JOÃO
  { livro: "1 João", capitulo: 1, versiculo: 9, texto: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça." },
  { livro: "1 João", capitulo: 4, versiculo: 8, texto: "Aquele que não ama não conhece a Deus, pois Deus é amor." },
  { livro: "1 João", capitulo: 4, versiculo: 19, texto: "Nós amamos porque ele nos amou primeiro." },
  { livro: "1 João", capitulo: 5, versiculo: 3, texto: "Porque este é o amor de Deus: que guardemos os seus mandamentos; e os seus mandamentos não são penosos." },

  // APOCALIPSE
  { livro: "Apocalipse", capitulo: 1, versiculo: 7, texto: "Eis que vem com as nuvens, e todo olho o verá, até quantos o traspassaram. E todas as tribos da terra se lamentarão sobre ele. Certamente. Amém!" },
  { livro: "Apocalipse", capitulo: 3, versiculo: 20, texto: "Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa e cearei com ele, e ele, comigo." },
  { livro: "Apocalipse", capitulo: 14, versiculo: 7, texto: "dizendo, em grande voz: Temam a Deus e deem glória a ele, pois chegou a hora do seu juízo; adorem aquele que fez o céu, e a terra, e o mar, e as fontes das águas." },
  { livro: "Apocalipse", capitulo: 14, versiculo: 12, texto: "Aqui está a perseverança dos santos, os que guardam os mandamentos de Deus e a fé em Jesus." },
  { livro: "Apocalipse", capitulo: 21, versiculo: 4, texto: "E lhes enxugará dos olhos toda lágrima, e a morte já não existirá, já não haverá luto, nem pranto, nem dor, porque as primeiras coisas passaram." },
  { livro: "Apocalipse", capitulo: 22, versiculo: 12, texto: "E eis que venho sem demora, e comigo está a recompensa que tenho para retribuir a cada um segundo as suas obras." },
  { livro: "Apocalipse", capitulo: 22, versiculo: 20, texto: "Aquele que dá testemunho destas coisas diz: Certamente, venho sem demora. Amém! Vem, Senhor Jesus!" },
];

export const getLivros = (): string[] => {
  const livros = new Set(bibliaData.map(v => v.livro));
  return Array.from(livros).sort((a, b) => {
    // Manter ordem bíblica aproximada
    const ordemBiblica = [
      "Gênesis", "Êxodo", "Levítico", "Deuteronômio", "Josué", "Salmos", "Provérbios", "Eclesiastes",
      "Isaías", "Jeremias", "Daniel", "Joel", "Malaquias",
      "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", 
      "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses", "Colossenses",
      "1 Tessalonicenses", "2 Timóteo", "Hebreus", "Tiago", "1 Pedro", "1 João", "Apocalipse"
    ];
    return ordemBiblica.indexOf(a) - ordemBiblica.indexOf(b);
  });
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
