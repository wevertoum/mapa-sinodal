export const validateCPF = (cpf: string): boolean => {
  let Soma;
  let Resto;
  Soma = 0;

  const strCPF = cpf.replace(/[^\d]/g, "");

  if (strCPF.length !== 11 || /^(\d)\1+$/.test(strCPF)) return false;

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
  return true;
};
