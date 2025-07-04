export interface CustomerBase {
  nomeCompleto: string;
  email: string;
  nascimento: string;
}

export interface Customer extends CustomerBase {
  id: number | string;
  vendas: Array<{ data: string; valor: number }>;
}

export interface NormalizedCustomer extends Customer {
  missingLetter: string;
}

export type CustomerInput = CustomerBase;
