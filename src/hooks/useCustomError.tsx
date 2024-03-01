import React from "react";

const useCustomError = () => {
  const [error, setError] = React.useState<string | null>();

  const showError = (errorMessage: string | null) => {
    setError(errorMessage);
  };

  const ErrorComponent: React.FC = () => {
    return (
      <>
        {error && (
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            style={{
              position: "relative",
            }}
          >
            <svg
              onClick={() => setError(null)}
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 4,
                right: 4,
              }}
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>

            <p className="font-bold">Ops...</p>
            <p>{error}</p>
          </div>
        )}
      </>
    );
  };

  return { showError, ErrorComponent };
};

export default useCustomError;
