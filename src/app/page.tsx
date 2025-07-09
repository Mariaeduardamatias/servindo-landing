'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'

type Frase = {
  frase: string;
};

type Respiracao = string;

type Autocuidado = string;

type ContatoEmergencia = {
  nome: string;
  contato?: string;
  site?: string;
  informacao?: string;
};

export default function Home() {
  const [frases, setFrases] = useState<Frase[]>([]);
  const [respiracoes, setRespiracoes] = useState<Respiracao[]>([]);
  const [autocuidados, setAutocuidados] = useState<Autocuidado[]>([]);
  const [emergencias, setEmergencias] = useState<ContatoEmergencia[]>([]);

  useEffect(() => {
    fetch('https://servindo-api.onrender.com/frases-motivacionais')
      .then(res => res.json())
      .then(data => setFrases(data));

    fetch('https://servindo-api.onrender.com/exercicios-respiracao')
      .then(res => res.json())
      .then(data => setRespiracoes(data));

    fetch('https://servindo-api.onrender.com/autocuidado')
      .then(res => res.json())
      .then(data => setAutocuidados(data));

    fetch('https://servindo-api.onrender.com/emergencia')
      .then(res => res.json())
      .then(data => setEmergencias(data));
  }, []);

  return (
    <>
      <Head>
        <title>Servindo 🐕‍🦺</title>
      </Head>
      <main className="bg-gradient-to-b from-blue-100 to-white min-h-screen text-gray-800 font-sans">
        <header className="text-center py-12 bg-blue-200 shadow-md">
          <h1 className="text-4xl font-bold">Servindo 🐕‍🦺</h1>
          <p className="text-lg mt-2">Apoio emocional com carinho e tecnologia</p>
        </header>

        <section id="frases" className="py-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🌟 Frases Motivacionais</h2>
          <div className="grid gap-4">
            {frases.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-4 rounded shadow hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {item.frase}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="respiracao" className="py-10 px-6 max-w-4xl mx-auto bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4">🧘‍♀️ Exercícios de Respiração</h2>
          <ul className="list-disc ml-6">
            {respiracoes.map((item, idx) => (
              <li key={idx} className="mb-2">{item}</li>
            ))}
          </ul>
        </section>

        <section id="autocuidado" className="py-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🌱 Dicas de Autocuidado</h2>
          <ul className="list-disc ml-6">
            {autocuidados.map((item, idx) => (
              <li key={idx} className="mb-2">{item}</li>
            ))}
          </ul>
        </section>

        <section id="emergencia" className="py-10 px-6 max-w-4xl mx-auto bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4">🚨 Contatos de Emergência</h2>
          <ul className="list-disc ml-6">
            {emergencias.map((item, idx) => (
              <li key={idx} className="mb-4">
                <strong>{item.nome}</strong><br />
                {item.contato && <span>📞 {item.contato}<br /></span>}
                {item.informacao && <span>ℹ️ {item.informacao}<br /></span>}
                {item.site && (
                  <a href={item.site} target="_blank" className="text-blue-600 underline">
                    🌐 Acesse o site
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <footer className="text-center py-8 bg-blue-200 mt-10">
          <p className="text-sm">Desenvolvido por Maria Eduarda • Programa Programadores do Amanhã 💙</p>
        </footer>
      </main>
    </>
  );
}
