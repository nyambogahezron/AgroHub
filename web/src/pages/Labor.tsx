
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
import { Users, Plus, Search, Download, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Labor() {
  const { labor, addLabor } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [newLabor, setNewLabor] = useState({
    name: '',
    role: '',
    hours: '',
    date: new Date().toISOString().split('T')[0],
    rate: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter labor records based on search query
  const filteredLabor = labor.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLabor(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewLabor(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLabor({
      name: newLabor.name,
      role: newLabor.role,
      hours: parseFloat(newLabor.hours),
      date: newLabor.date,
      rate: parseFloat(newLabor.rate)
    });
    
    // Reset form and close dialog
    setNewLabor({
      name: '',
      role: '',
      hours: '',
      date: new Date().toISOString().split('T')[0],
      rate: ''
    });
    setIsDialogOpen(false);
  };
  
  // Calculate total hours and labor cost
  const totalHours = labor.reduce((total, entry) => total + entry.hours, 0);
  const totalLaborCost = labor.reduce((total, entry) => total + (entry.hours * entry.rate), 0);
  
  // Count workers by role
  const roleCount: Record<string, number> = {};
  labor.forEach(entry => {
    if (roleCount[entry.role]) {
      roleCount[entry.role]++;
    } else {
      roleCount[entry.role] = 1;
    }
  });
  
  // Simulate export function (would connect to actual export in real app)
  const handleExport = () => {
    console.log('Exporting labor logs...');
    // In a real app, this would generate and download a CSV or Excel file
    alert('Labor logs would be exported as CSV in the full implementation.');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Labor Management</h1>
          <p className="text-muted-foreground">
            Track worker hours and manage labor costs.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Labor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Labor Hours</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Worker Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Full name"
                      value={newLabor.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange('role', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Harvester">Harvester</SelectItem>
                        <SelectItem value="Field Worker">Field Worker</SelectItem>
                        <SelectItem value="Equipment Operator">Equipment Operator</SelectItem>
                        <SelectItem value="Supervisor">Supervisor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newLabor.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hours">Hours Worked</Label>
                    <Input
                      id="hours"
                      name="hours"
                      type="number"
                      placeholder="0"
                      value={newLabor.hours}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rate">Hourly Rate ($)</Label>
                    <Input
                      id="rate"
                      name="rate"
                      type="number"
                      placeholder="0.00"
                      value={newLabor.rate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Workers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Set(labor.map(entry => entry.name)).size}
            </div>
            <p className="text-sm text-muted-foreground">
              Across {Object.keys(roleCount).length} different roles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalHours}</div>
            <p className="text-sm text-muted-foreground">
              Logged this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">Labor Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalLaborCost}</div>
            <p className="text-sm text-muted-foreground">
              Based on current rates
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Worker Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(roleCount).map(([role, count]) => (
              <Badge key={role} variant="outline" className="bg-muted/50">
                <Users className="h-3 w-3 mr-1" /> {role}: {count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">Labor Logs</CardTitle>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers or roles..."
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
                <TableHead>Worker</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Hours</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabor.length > 0 ? (
                filteredLabor.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {entry.role}
                      </div>
                    </TableCell>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        {entry.hours}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(entry.hours * entry.rate).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No labor records found
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
