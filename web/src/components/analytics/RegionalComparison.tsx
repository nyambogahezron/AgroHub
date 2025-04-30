
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { RegionData } from "@/data/pricing";

interface RegionalComparisonProps {
  data: RegionData[];
}

const RegionalComparison = ({ data }: RegionalComparisonProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string>("Apples");
  
  // Get all unique products
  const products = Object.keys(data[0].prices);
  
  // Prepare data for the selected product
  const chartData = data.map(region => ({
    region: region.region,
    price: region.prices[selectedProduct]
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Regional Price Comparison</h3>
      
      <div className="mb-6">
        <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Product
        </label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-agri-green focus:border-transparent"
        >
          {products.map(product => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis 
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              domain={[
                Math.min(...chartData.map(item => item.price)) * 0.9,
                Math.max(...chartData.map(item => item.price)) * 1.1
              ]}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
            />
            <Legend />
            <Bar dataKey="price" fill="#4CAF50" name={`${selectedProduct} Price`} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionalComparison;
