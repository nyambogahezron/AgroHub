
import { useStore } from '@/store/useStore';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { YieldChart } from '@/components/dashboard/YieldChart';
import { DollarSign, Sprout, Package, Users } from 'lucide-react';

export default function Dashboard() {
  const { expenses, yields, inventory, labor } = useStore();
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  // Calculate total yield
  const totalYield = yields.reduce((total, yieldEntry) => total + yieldEntry.quantity, 0);
  
  // Calculate low stock items
  const lowStockItems = inventory.filter(item => item.quantity < 100).length;
  
  // Calculate total labor cost
  const totalLaborCost = labor.reduce((total, entry) => total + (entry.hours * entry.rate), 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your farm management dashboard.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses}`}
          icon={DollarSign}
          description="This month"
          trend={{ value: 12, positive: false }}
        />
        <StatCard
          title="Total Yield"
          value={`${totalYield} kg`}
          icon={Sprout}
          description="This month"
          trend={{ value: 18, positive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={Package}
          description="Items needing restock"
        />
        <StatCard
          title="Labor Cost"
          value={`$${totalLaborCost}`}
          icon={Users}
          description="This week"
          trend={{ value: 5, positive: false }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <WeatherCard />
        <div className="grid gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="font-medium">Upcoming Tasks</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>Fertilize North Field</span>
                <span className="text-muted-foreground">Due Today</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Irrigation Check</span>
                <span className="text-muted-foreground">Due Tomorrow</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Equipment Maintenance</span>
                <span className="text-muted-foreground">April 18</span>
              </li>
            </ul>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <h3 className="font-medium">Alerts</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center text-amber-600">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Low Corn Seeds inventory
              </li>
              <li className="flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rainfall expected tomorrow
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <ExpenseChart />
        <YieldChart />
      </div>
    </div>
  );
}
