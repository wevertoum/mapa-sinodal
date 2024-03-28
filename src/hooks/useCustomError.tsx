import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const useCustomError = () => {
  const [error, setError] = React.useState<string | null>();

  const showError = (errorMessage: string | null) => {
    setError(errorMessage);
  };

  const ErrorComponent: React.FC = () => {
    return (
      <AlertDialog open={!!error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Atenção!</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => {
                setError(null);
              }}
            >
              Voltar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { showError, ErrorComponent };
};

export default useCustomError;
