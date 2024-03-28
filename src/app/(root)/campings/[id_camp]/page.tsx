import Link from "next/link";

interface CampingPageProps {
  params: {
    id_camp: string;
  };
}

export default function CampingPage({ params }: CampingPageProps) {
  return (
    <>
      <h1>id_camp {params.id_camp}</h1>
      <Link href="/">Home</Link>
    </>
  );
}
