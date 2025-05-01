
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';

export function YieldChart() {
  const { yields } = useStore();
  
  // Process data for the chart - group by crop
  const cropTotals: Record<string, number> = {};
  
  yields.forEach(yieldEntry => {
    if (cropTotals[yieldEntry.crop]) {
      cropTotals[yieldEntry.crop] += yieldEntry.quantity;
    } else {
      cropTotals[yieldEntry.crop] = yieldEntry.quantity;
    }
  });
  
  const data = Object.entries(cropTotals).map(([name, value]) => ({
    name,
    value
  }));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Crop Yields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} kg`, 'Yield']} />
              <Bar dataKey="value" fill="#4D7C0F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
