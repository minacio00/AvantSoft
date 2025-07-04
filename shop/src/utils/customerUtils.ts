export function firstMissingLetter(name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const letters = new Set(cleanName);

  for (let char of 'abcdefghijklmnopqrstuvwxyz') {
    if (!letters.has(char)) {
      return char;
    }
  }
  return '-';
}

export function normalizeCustomers(customers: any[]): any[] {
  const seenEmails = new Set<string>();

  return customers
    .map(c => ({
      id: c.info.id || c.id || c.detalhes.id,
      nomeCompleto: c.info.nomeCompleto,
      email: c.info.detalhes.email,
      nascimento: c.info.detalhes.nascimento,
      vendas: c.estatisticas?.vendas || []
    }))
    .filter(customer => {
      if (!customer.email || seenEmails.has(customer.email)) return false;
      seenEmails.add(customer.email);
      return true;
    });
}
