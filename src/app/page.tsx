'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'

type Frase = { frase: string }
type Respiracao = { tecnica: string; descricao: string }
type Autocuidado = { titulo: string; descricao: string }
type Emergencia = { nome: string; contato?: string; informacao?: string; site?: string }

export default function Home() {
  const [frases, setFrases] = useState<Frase[]>([])
  const [respiracoes, setRespiracoes] = useState<Respiracao[]>([])
  const [autocuidados, setAutocuidados] = useState<Autocuidado[]>([])
  const [emergencias, setEmergencias] = useState<Emergencia[]>([])

  useEffect(() => {
    fetch('https://servindo-api.onrender.com/frases-motivacionais')
      .then(res => res.json())
      .then(setFrases)

    fetch('https://servindo-api.onrender.com/exercicios-respiracao')
      .then(res => res.json())
      .then(setRespiracoes)

    fetch('https://servindo-api.onrender.com/autocuidado')
      .then(res => res.json())
      .then(setAutocuidados)

    fetch('https://servindo-api.onrender.com/emergencia')
      .then(res => res.json())
      .then(setEmergencias)
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
              <li key={idx} className="mb-2">
                <strong>{item.tecnica}</strong>: {item.descricao}
              </li>
            ))}
          </ul>
        </section>

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

        <section id="emergencia" className="py-10 px-6 max-w-4xl mx-auto bg-blue-100 rounded-lg mt-10">
          <h2 className="text-2xl font-semibold mb-4">🚨 Contatos de Emergência</h2>
          <ul className="space-y-4">
            {emergencias.map((item, idx) => (
              <li key={idx} className="bg-white p-4 rounded shadow">
                <p className="font-bold">{item.nome}</p>
                {item.contato && <p>📞 {item.contato}</p>}
                {item.informacao && <p>{item.informacao}</p>}
                {item.site && (
                  <a href={item.site} target="_blank" className="text-blue-600 underline">
                    🌐 Site
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
