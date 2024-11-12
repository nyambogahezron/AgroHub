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

// ******* budget api calls ********

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

// ******* users api calls ********

// create user
export async function createUser(data: any) {
  return await apiCall(`/api/v1/org-user/`, '', 'POST', data);
}

// update user
export async function updateUser(data: any, id: string) {
  return await apiCall(`/api/v1/org-user/${id}`, '', 'PATCH', data);
}

// delete user
export async function deleteUser(id: string) {
  return await apiCall(`/api/v1/org-user/${id}`, '', 'DELETE');
}

// get all users
export async function getAllUsers() {
  return await apiCall(`/api/v1/org-user/`, '', 'GET');
}

// ******* transactions api calls ********

// create transaction

export async function createTransaction(data: any) {
  return await apiCall(`/api/v1/transaction/`, '', 'POST', data);
}

// update transaction
export async function updateTransaction(data: any, id: string) {
  return await apiCall(`/api/v1/transaction/${id}`, '', 'PUT', data);
}

// delete transaction
export async function deleteTransaction(id: string) {
  return await apiCall(`/api/v1/transaction/${id}`, '', 'DELETE');
}

// get all transactions
export async function getAllTransactions() {
  return await apiCall(`/api/v1/transaction/`, '', 'GET');
}

// get single transaction
export async function getSingleTransaction(id: string) {
  return await apiCall(`/api/v1/transaction/${id}`, '', 'GET');
}

// ******* products api calls ********

// create product
export async function createProduct(data: any) {
  return await apiCall(`/api/v1/product/`, '', 'POST', data);
}

// update product
export async function updateProduct(data: any, id: string) {
  return await apiCall(`/api/v1/product/${id}`, '', 'PATCH', data);
}

// delete product
export async function deleteProduct(id: string) {
  return await apiCall(`/api/v1/product/${id}`, '', 'DELETE');
}

// get all products
export async function getAllProducts() {
  return await apiCall(`/api/v1/product/`, '', 'GET');
}

// get single product
export async function getSingleProduct(id: string) {
  return await apiCall(`/api/v1/product/${id}`, '', 'GET');
}

//get user products
export async function getUserProducts() {
  return await apiCall(`/api/v1/product/user`, '', 'GET');
}
