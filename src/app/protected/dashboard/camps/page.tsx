"use client";
import { Button } from "@/components/ui/button";
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

  const [camps, { add, remove }] = useCollection<Camp>("camps");

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
    <div className="flex flex-col space-y-4 w-[800px]">
      {camps?.map((camp) => (
        <div
          key={camp.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-bold">{camp.nome}</h2>
            <p className="text-gray-600">Data: {camp.data}</p>
            <p className="text-gray-600">Vagas: {camp.vagas}</p>
          </div>
          <Button
            onClick={() => remove(camp.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Remove
          </Button>
        </div>
      ))}
      <br />
      <br />
      <br />
      <form onSubmit={handleAddCamp} className="flex flex-col space-y-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Acampamento"
          required
          className="border rounded-md p-2"
        />
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Data"
          required
          className="border rounded-md p-2"
        />
        <input
          type="number"
          value={vagas}
          onChange={(e) => setVagas(e.target.value)}
          placeholder="Vagas"
          required
          className="border rounded-md p-2"
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Adicionar Acampamento
        </Button>
      </form>
    </div>
  );
}
