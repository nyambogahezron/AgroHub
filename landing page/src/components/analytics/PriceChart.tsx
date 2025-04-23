
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { PriceData } from "@/data/pricing";

interface PriceChartProps {
  data: PriceData[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    data.slice(0, 3).map(item => item.product)
  );

  const toggleProduct = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter(p => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Prepare the combined data for the chart
  const chartData = data[0].data.map((item, index) => {
    const dataPoint: any = { date: item.date };
    
    data.forEach(productData => {
      if (selectedProducts.includes(productData.product)) {
        dataPoint[productData.product] = productData.data[index].price;
      }
    });
    
    return dataPoint;
  });

  // Define colors for lines
  const colors = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0"];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Price Trends Over Time</h3>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {data.map((item, index) => (
          <button
            key={item.product}
            onClick={() => toggleProduct(item.product)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedProducts.includes(item.product)
                ? `bg-${colors[index % colors.length].toLowerCase()} text-white`
                : "bg-gray-200 text-gray-700"
            }`}
            style={{
              backgroundColor: selectedProducts.includes(item.product) 
                ? colors[index % colors.length] 
                : undefined
            }}
          >
            {item.product}
          </button>
        ))}
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleString('default', { month: 'short' })}`;
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, ""]}
              labelFormatter={(label) => {
                const date = new Date(label);
                return `${date.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
              }}
            />
            <Legend />
            {data.map((item, index) => (
              selectedProducts.includes(item.product) && (
                <Line
                  key={item.product}
                  type="monotone"
                  dataKey={item.product}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
