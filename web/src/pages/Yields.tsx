
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
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Plus, Search, BarChart3 } from 'lucide-react';

export default function Yields() {
  const { yields, addYield } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [newYield, setNewYield] = useState({
    date: new Date().toISOString().split('T')[0],
    crop: '',
    quantity: '',
    unit: 'kg',
    field: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter yields based on search query
  const filteredYields = yields.filter(yieldItem => 
    yieldItem.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    yieldItem.field.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewYield(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewYield(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addYield({
      date: newYield.date,
      crop: newYield.crop,
      quantity: parseFloat(newYield.quantity),
      unit: newYield.unit,
      field: newYield.field
    });
    
    // Reset form and close dialog
    setNewYield({
      date: new Date().toISOString().split('T')[0],
      crop: '',
      quantity: '',
      unit: 'kg',
      field: ''
    });
    setIsDialogOpen(false);
  };
  
  // Process data for charts - group by crop
  const cropTotals: Record<string, number> = {};
  
  yields.forEach(yieldEntry => {
    if (cropTotals[yieldEntry.crop]) {
      cropTotals[yieldEntry.crop] += yieldEntry.quantity;
    } else {
      cropTotals[yieldEntry.crop] = yieldEntry.quantity;
    }
  });
  
  const chartData = Object.entries(cropTotals).map(([name, value]) => ({
    name,
    value
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Yield Management</h1>
          <p className="text-muted-foreground">
            Track and analyze your crop yields.
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Yield
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Yield</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Harvest Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newYield.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="crop">Crop</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('crop', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Corn">Corn</SelectItem>
                      <SelectItem value="Soybeans">Soybeans</SelectItem>
                      <SelectItem value="Barley">Barley</SelectItem>
                      <SelectItem value="Potatoes">Potatoes</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="0"
                    value={newYield.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select 
                    defaultValue="kg"
                    onValueChange={(value) => handleSelectChange('unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="ton">Tons</SelectItem>
                      <SelectItem value="bushel">Bushels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="field">Field</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('field', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="North">North Field</SelectItem>
                      <SelectItem value="South">South Field</SelectItem>
                      <SelectItem value="East">East Field</SelectItem>
                      <SelectItem value="West">West Field</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Yield</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Yield Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-10 w-10 mx-auto mb-2" />
                <p>Yield visualization</p>
                <p className="text-sm">(Showing real data in final implementation)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Productivity Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="by-crop">
              <TabsList className="mb-4">
                <TabsTrigger value="by-crop">By Crop</TabsTrigger>
                <TabsTrigger value="by-field">By Field</TabsTrigger>
              </TabsList>
              <TabsContent value="by-crop">
                <div className="space-y-2">
                  {Object.entries(cropTotals).map(([crop, total]) => (
                    <div key={crop} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Sprout className="h-4 w-4 mr-2 text-farm-green" />
                        <span>{crop}</span>
                      </div>
                      <span className="font-medium">{total} kg</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="by-field">
                <p className="text-muted-foreground text-center py-8">
                  Field productivity analysis will be available in the next update.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Yield History</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search yields..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Field</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredYields.length > 0 ? (
                filteredYields.map((yieldItem) => (
                  <TableRow key={yieldItem.id}>
                    <TableCell>{yieldItem.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Sprout className="h-4 w-4 mr-2 text-farm-green" />
                        {yieldItem.crop}
                      </div>
                    </TableCell>
                    <TableCell>{yieldItem.field} Field</TableCell>
                    <TableCell className="text-right font-medium">
                      {yieldItem.quantity} {yieldItem.unit}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No yields found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
