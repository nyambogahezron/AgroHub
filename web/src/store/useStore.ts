
import { create } from 'zustand';

// Types
interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

interface Yield {
  id: string;
  date: string;
  crop: string;
  quantity: number;
  unit: string;
  field: string;
}

interface Inventory {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  lastUpdated: string;
}

interface Labor {
  id: string;
  name: string;
  role: string;
  hours: number;
  date: string;
  rate: number;
}

interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  date: string;
  market: string;
}

interface AppState {
  expenses: Expense[];
  yields: Yield[];
  inventory: Inventory[];
  labor: Labor[];
  marketPrices: MarketPrice[];
  
  // Actions
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addYield: (yieldData: Omit<Yield, 'id'>) => void;
  addInventoryItem: (item: Omit<Inventory, 'id'>) => void;
  updateInventoryItem: (id: string, updates: Partial<Omit<Inventory, 'id'>>) => void;
  addLabor: (labor: Omit<Labor, 'id'>) => void;
}

// Generate a simple ID for demo purposes
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the store
export const useStore = create<AppState>((set) => ({
  expenses: [
    { id: '1', date: '2025-04-10', category: 'Seeds', amount: 250, description: 'Corn seeds for north field' },
    { id: '2', date: '2025-04-05', category: 'Fertilizer', amount: 420, description: 'Organic fertilizer' },
    { id: '3', date: '2025-03-28', category: 'Equipment', amount: 1200, description: 'Irrigation equipment repair' },
    { id: '4', date: '2025-03-15', category: 'Fuel', amount: 180, description: 'Tractor fuel' },
    { id: '5', date: '2025-03-10', category: 'Pesticides', amount: 320, description: 'Organic pest control' }
  ],
  
  yields: [
    { id: '1', date: '2025-04-01', crop: 'Wheat', quantity: 1250, unit: 'kg', field: 'North' },
    { id: '2', date: '2025-03-20', crop: 'Corn', quantity: 800, unit: 'kg', field: 'East' },
    { id: '3', date: '2025-03-15', crop: 'Soybeans', quantity: 650, unit: 'kg', field: 'West' },
    { id: '4', date: '2025-03-10', crop: 'Barley', quantity: 900, unit: 'kg', field: 'South' },
    { id: '5', date: '2025-03-05', crop: 'Wheat', quantity: 1100, unit: 'kg', field: 'North' }
  ],
  
  inventory: [
    { id: '1', name: 'Corn Seeds', category: 'Seeds', quantity: 500, unit: 'kg', lastUpdated: '2025-04-10' },
    { id: '2', name: 'Organic Fertilizer', category: 'Fertilizer', quantity: 1200, unit: 'kg', lastUpdated: '2025-04-08' },
    { id: '3', name: 'Tractor Fuel', category: 'Fuel', quantity: 350, unit: 'liters', lastUpdated: '2025-04-05' },
    { id: '4', name: 'Irrigation Pipes', category: 'Equipment', quantity: 25, unit: 'pcs', lastUpdated: '2025-04-01' },
    { id: '5', name: 'Organic Pesticide', category: 'Pesticides', quantity: 85, unit: 'liters', lastUpdated: '2025-03-28' }
  ],
  
  labor: [
    { id: '1', name: 'John Smith', role: 'Harvester', hours: 8, date: '2025-04-10', rate: 18 },
    { id: '2', name: 'Maria Garcia', role: 'Field Worker', hours: 10, date: '2025-04-10', rate: 16 },
    { id: '3', name: 'David Chen', role: 'Equipment Operator', hours: 6, date: '2025-04-09', rate: 20 },
    { id: '4', name: 'Sarah Johnson', role: 'Harvester', hours: 8, date: '2025-04-09', rate: 18 },
    { id: '5', name: 'Carlos Lopez', role: 'Field Worker', hours: 9, date: '2025-04-08', rate: 16 }
  ],
  
  marketPrices: [
    { id: '1', crop: 'Wheat', price: 7.2, date: '2025-04-15', market: 'Local' },
    { id: '2', crop: 'Corn', price: 6.8, date: '2025-04-15', market: 'Local' },
    { id: '3', crop: 'Soybeans', price: 14.5, date: '2025-04-15', market: 'Local' },
    { id: '4', crop: 'Barley', price: 5.9, date: '2025-04-15', market: 'Local' },
    { id: '5', crop: 'Wheat', price: 7.6, date: '2025-04-15', market: 'Regional' }
  ],
  
  // Actions
  addExpense: (expense) => 
    set((state) => ({ 
      expenses: [...state.expenses, { ...expense, id: generateId() }] 
    })),
  
  addYield: (yieldData) => 
    set((state) => ({ 
      yields: [...state.yields, { ...yieldData, id: generateId() }] 
    })),
  
  addInventoryItem: (item) => 
    set((state) => ({ 
      inventory: [...state.inventory, { ...item, id: generateId(), lastUpdated: new Date().toISOString().split('T')[0] }] 
    })),
  
  updateInventoryItem: (id, updates) => 
    set((state) => ({ 
      inventory: state.inventory.map(item => 
        item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : item
      ) 
    })),
  
  addLabor: (labor) => 
    set((state) => ({ 
      labor: [...state.labor, { ...labor, id: generateId() }] 
    })),
}));
