"use client";
import useCollection from "@/hooks/firebase/useCollection";
import { useCallback, useState } from "react";

interface CampsPageProps {
  params: {};
}

interface Camp {
  data: string;
  id: string;
  nome: string;
  vagas: number;
}

export default function CampsPage({ params }: CampsPageProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [vagas, setVagas] = useState("");

  // const [camp, { set, update, remove, hasResult, isEmpty, path, ref }] =
  //   useDocument<Camp>("camps/qf4VXBJjfY6CuUgRgBTG");

  const [camps, { add }] = useCollection<Camp>("camps");

  const addCamp = useCallback(async (camp: Camp) => {
    try {
      await add(camp);
      return;
    } catch (error) {
      console.error("Erro ao adicionar acampamento: ", error);
    }
  }, []);

  const handleAddCamp = async (e: React.FormEvent) => {
    e.preventDefault();
    const campToAdd = { nome, data, vagas: parseInt(vagas, 10) } as Camp;
    await addCamp(campToAdd).then(() => {
      setNome("");
      setData("");
      setVagas("");
    });
  };

  return (
    <>
      <h1>Acampamentos</h1>
      {camps?.map((camp) => (
        <div key={camp.id}>
          <h2>{camp.nome}</h2>
          <p>Data: {camp.data}</p>
          <p>Vagas: {camp.vagas}</p>
        </div>
      ))}
      <br />
      <form onSubmit={handleAddCamp}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Acampamento"
          required
        />
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data"
          required
        />
        <input
          type="number"
          value={vagas}
          onChange={(e) => setVagas(e.target.value)}
          placeholder="Vagas"
          required
        />
        <button type="submit">Adicionar Acampamento</button>
      </form>
    </>
  );
}
