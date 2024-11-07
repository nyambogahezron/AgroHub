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
    toast.error(error?.response?.data?.msg);
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
  return await apiCall(`/api/v1/budget/${id}`, '', 'PATCH', data);
}

// delete budget
export async function deleteBudget(id: string) {
  return await apiCall(`/api/v1/budget/${id}`, '', 'DELETE');
}

// get all budgets
export async function getAllBudgets() {
  return await apiCall(`/api/v1/budget/`, '', 'GET');
}

// get single budget
export async function getSingleBudget(id: string) {
  return await apiCall(`/api/v1/budget/${id}`, '', 'GET');
}

export async function getBudgetTotal(budgetData: any) {
  const currentYear = new Date().getFullYear();

  const currentYearBudget = budgetData.filter((budget) => {
    const budgetYear = new Date(budget.date).getFullYear();
    return budgetYear === currentYear;
  });

  const totalBudget = currentYearBudget.reduce((acc, budget: any) => {
    return acc + budget.total;
  }, 0);

  return totalBudget;
}
