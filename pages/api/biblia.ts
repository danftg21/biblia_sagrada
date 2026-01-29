import type { NextApiRequest, NextApiResponse } from 'next';
import { getLivros, getCapitulos, getVersiculos, getVersiculo } from '../../data/biblia';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { livro, capitulo, versiculo } = req.query;

  // Listar todos os livros
  if (!livro) {
    return res.status(200).json({ livros: getLivros() });
  }

  // Listar capítulos de um livro
  if (!capitulo) {
    return res.status(200).json({ capitulos: getCapitulos(livro as string) });
  }

  // Listar versículos de um capítulo
  if (!versiculo) {
    const versiculos = getVersiculos(livro as string, parseInt(capitulo as string));
    return res.status(200).json({ versiculos });
  }

  // Obter um versículo específico
  const versiculoData = getVersiculo(
    livro as string,
    parseInt(capitulo as string),
    parseInt(versiculo as string)
  );

  if (!versiculoData) {
    return res.status(404).json({ error: 'Versículo não encontrado' });
  }

  return res.status(200).json(versiculoData);
}
