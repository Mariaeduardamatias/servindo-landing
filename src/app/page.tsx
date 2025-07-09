'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'

export default function Home() {
  const [frases, setFrases] = useState<string[]>([])
  const [respiracoes, setRespiracoes] = useState<any[]>([])
  const [autocuidados, setAutocuidados] = useState<any[]>([])
  const [emergencias, setEmergencias] = useState<any[]>([])

  useEffect(() => {
    fetch('https://servindo-api.onrender.com/frases-motivacionais')
      .then(res => res.json())
      .then(data => setFrases(data))

    fetch('https://servindo-api.onrender.com/exercicios-respiracao')
      .then(res => res.json())
      .then(data => setRespiracoes(data))

    fetch('https://servindo-api.onrender.com/autocuidado')
      .then(res => res.json())
      .then(data => setAutocuidados(data))

    fetch('https://servindo-api.onrender.com/emergencia')
      .then(res => res.json())
      .then(data => setEmergencias(data))
  }, [])

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

        {/* Frases Motivacionais */}
        <section id="frases" className="py-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🌟 Frases Motivacionais</h2>
          <div className="grid gap-4">
            {frases.map((frase, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-4 rounded shadow hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {typeof frase === 'string' ? frase : frase.frase}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Exercícios de Respiração */}
        <section id="respiracao" className="py-10 px-6 max-w-4xl mx-auto bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4">🧘‍♀️ Exercícios de Respiração</h2>
          <ul className="list-disc ml-6">
            {respiracoes.map((item, idx) => (
              <li key={idx} className="mb-2">
                <strong>{item.titulo}</strong>: {item.descricao}
              </li>
            ))}
          </ul>
        </section>

        {/* Autocuidado */}
        <section id="autocuidado" className="py-10 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🌱 Dicas de Autocuidado</h2>
          <ul className="list-disc ml-6">
            {autocuidados.map((item, idx) => (
              <li key={idx} className="mb-2">
                <strong>{item.titulo}</strong>: {item.descricao}
              </li>
            ))}
          </ul>
        </section>

        {/* Emergência */}
       <section id="emergencia" className="py-10 px-6 max-w-4xl mx-auto bg-red-100">
        <h2 className="text-2xl font-semibold mb-4">🚨 Contatos de Emergência</h2>
        <ul className="list-disc ml-6">
          {emergencias.map((item, idx) => (
            <li key={idx} className="mb-2">
              <strong>{item.nome}</strong><br />
              {item.contato && <span>📞 {item.contato}<br /></span>}
              {item.informacao && <span>ℹ️ {item.informacao}<br /></span>}
              {item.site && (
                <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  🔗 Acessar site
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
  )
}
