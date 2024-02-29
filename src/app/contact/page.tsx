import Link from "next/link";

interface ContactsPageProps {
  params: {};
}

export default function ContactsPage({ params }: ContactsPageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-28">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
          CONTATOS PAGE
        </h1>
      </div>
    </div>
  );
}
