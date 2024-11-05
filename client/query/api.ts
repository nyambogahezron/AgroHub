import { axiosInstance } from '@/lib/axios';
import { toast } from 'react-toastify';
type method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

async function apiCall(
  endpoint: string,
  params: any,
  method?: method,
  data?: any
) {
  const options = {
    method: method ? method : 'GET',
    params: params ? params : {},
    url: endpoint,
    data: data ? data : {},
  };

  try {
    const response = await axiosInstance(options);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.msg);
    return null;
  }
}

// get user organization
export async function getUserOrg() {
  return await apiCall('/api/v1/org/', '', 'GET');
}

//create budget
export async function createBudget(data: any) {
  return await apiCall(`/api/v1/budget/`, '', 'POST', data);
}

// update budget
export async function updateBudget(data: any, id: string) {
  return await apiCall(`/api/v1/budget/${id}`, '', 'PUT', data);
}

// delete budget
export async function deleteBudget(id: string) {
  return await apiCall(`/api/v1/budget/${id}`, '', 'DELETE');
}

// get all budgets
export async function getAllBudgets() {
  return await apiCall(`/api/v1/budget/`, '', 'GET');
}