
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock price history data - would come from API in real app
const priceHistory = [
  { date: '2025-04-09', wheat: 7.0, corn: 6.5, soybeans: 14.2, barley: 5.8 },
  { date: '2025-04-10', wheat: 7.1, corn: 6.6, soybeans: 14.3, barley: 5.7 },
  { date: '2025-04-11', wheat: 7.0, corn: 6.7, soybeans: 14.4, barley: 5.9 },
  { date: '2025-04-12', wheat: 7.2, corn: 6.8, soybeans: 14.3, barley: 5.8 },
  { date: '2025-04-13', wheat: 7.3, corn: 6.7, soybeans: 14.5, barley: 5.8 },
  { date: '2025-04-14', wheat: 7.4, corn: 6.8, soybeans: 14.4, barley: 5.9 },
  { date: '2025-04-15', wheat: 7.2, corn: 6.8, soybeans: 14.5, barley: 5.9 },
];

export default function Market() {
  const { marketPrices } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [selectedMarket, setSelectedMarket] = useState('all');
  
  // Filter market prices based on search and filters
  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          price.market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = selectedMarket === 'all' || price.market === selectedMarket;
    
    return matchesSearch && matchesMarket;
  });
  
  // Prepare chart data
  const chartData = priceHistory.map(entry => ({
    name: entry.date.split('-')[2], // Just use day for x-axis
    price: entry[selectedCrop as keyof typeof entry] as number
  }));
  
  // Simulate refresh function (would fetch from API in real app)
  const handleRefresh = () => {
    console.log('Refreshing market data...');
    // In a real app, this would fetch the latest data from an API
    alert('Market data would be refreshed from an API in the full implementation.');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Market Prices</h1>
          <p className="text-muted-foreground">
            Track commodity prices and market trends.
          </p>
        </div>
        
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Prices
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Price Trends</CardTitle>
          <div className="flex space-x-2">
            <Select defaultValue={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="barley">Barley</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Price per bushel']} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#4D7C0F" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Wheat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$7.20</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Corn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$6.80</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+4.6%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Soybeans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$14.50</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Barley</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">$5.90</div>
              <div className="flex items-center text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-1.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Market Prices</CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops or markets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                <SelectItem value="Local">Local Market</SelectItem>
                <SelectItem value="Regional">Regional Market</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrices.length > 0 ? (
                filteredPrices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">
                      {price.crop}
                    </TableCell>
                    <TableCell>{price.market}</TableCell>
                    <TableCell>{price.date}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${price.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No price data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Local vs Regional - Wheat</span>
                <span className="text-green-600">+5.6% Premium</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Local vs Regional - Corn</span>
                <span className="text-red-600">-3.2% Discount</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Local vs Regional - Soybeans</span>
                <span className="text-green-600">+2.1% Premium</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
