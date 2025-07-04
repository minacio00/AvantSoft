'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      router.push('/customers');
    } catch (err: any) {
      setError(err.message || 'Usuário ou senha inválidos');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)} />
        <input
          type="password"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >Entrar</button>
      </form>
    </div>
  );
}
