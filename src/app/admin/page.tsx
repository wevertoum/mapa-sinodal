import Link from "next/link";

interface AdminPageProps {
  params: {
    id_camping: string;
  };
}

export default function AdminPage({ params }: AdminPageProps) {
  return (
    <>
      <h1>admin page</h1>
    </>
  );
}
