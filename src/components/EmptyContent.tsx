import { DocumentIcon } from "@heroicons/react/24/outline";
interface EmptyContentProps {
  label: string;
}

export const EmptyContent = ({ label }: EmptyContentProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 dark:bg-red-300 flex items-center mt-8">
      <DocumentIcon className="w-5 h-w-5 text-red-500 mr-4" />
      <p className="text-black font-bold">{label}</p>
    </div>
  );
};
