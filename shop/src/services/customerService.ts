import { firstMissingLetter, normalizeCustomers } from '@/utils/customerUtils';
import { apiFetch } from './api';
import { Customer, CustomerInput, NormalizedCustomer } from '@/app/types/customer';

export async function fetchCustomers(): Promise<NormalizedCustomer[]> {
  try {
    const res = await apiFetch('/customers/');
    const raw = res.data?.clientes || [];
    const normalized = normalizeCustomers(raw);
    return normalized.map(c => ({
      ...c,
      missingLetter: firstMissingLetter(c.nomeCompleto)
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export async function createCustomer(data: CustomerInput): Promise<Customer> {
  return apiFetch('/customers/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCustomer(
  id: number | string,
  data: Partial<CustomerInput>
): Promise<Customer> {
  return apiFetch(`/customers/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(id: number | string): Promise<void> {
  await apiFetch(`/customers/${id}/`, { method: 'DELETE' });
}
