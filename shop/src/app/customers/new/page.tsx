'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCustomer } from '@/services/customerService';

export default function NewCustomerPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createCustomer({ nomeCompleto: nome, email, nascimento });
      router.push('/customers');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar cliente');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Cliente</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Nome Completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Data de Nascimento"
          type="date"
          value={nascimento}
          onChange={e => setNascimento(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >Criar</button>
      </form>
    </div>
  );
}

