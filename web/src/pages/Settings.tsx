import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
	const [farmName, setFarmName] = useState('Green Valley Farm');
	const [ownerName, setOwnerName] = useState('Farm Manager');
	const [email, setEmail] = useState('manager@example.com');
	const [notifications, setNotifications] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [weatherAlerts, setWeatherAlerts] = useState(true);
	const [marketAlerts, setMarketAlerts] = useState(true);

	const handleSaveProfile = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Saving profile...');
		alert('Profile settings saved!');
	};

	const handleSavePreferences = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Saving preferences...');
		alert('Preferences saved!');
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
				<p className='text-muted-foreground'>
					Manage your account settings and preferences.
				</p>
			</div>

			<Separator />

			<div className='grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Profile Settings</CardTitle>
						<CardDescription>
							Update your farm and personal information.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSaveProfile}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<Label htmlFor='farmName'>Farm Name</Label>
									<Input
										id='farmName'
										value={farmName}
										onChange={(e) => setFarmName(e.target.value)}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='ownerName'>Owner/Manager Name</Label>
									<Input
										id='ownerName'
										value={ownerName}
										onChange={(e) => setOwnerName(e.target.value)}
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email Address</Label>
									<Input
										id='email'
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<Button onClick={handleSaveProfile}>Save Profile</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Preferences</CardTitle>
						<CardDescription>
							Customize your application experience.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSavePreferences}>
							<div className='grid gap-4'>
								<div className='flex items-center justify-between'>
									<Label htmlFor='notifications' className='flex-1'>
										Enable Notifications
									</Label>
									<Switch
										id='notifications'
										checked={notifications}
										onCheckedChange={setNotifications}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='darkMode' className='flex-1'>
										Dark Mode
									</Label>
									<Switch
										id='darkMode'
										checked={darkMode}
										onCheckedChange={setDarkMode}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='weatherAlerts' className='flex-1'>
										Weather Alerts
									</Label>
									<Switch
										id='weatherAlerts'
										checked={weatherAlerts}
										onCheckedChange={setWeatherAlerts}
									/>
								</div>
								<div className='flex items-center justify-between'>
									<Label htmlFor='marketAlerts' className='flex-1'>
										Market Price Alerts
									</Label>
									<Switch
										id='marketAlerts'
										checked={marketAlerts}
										onCheckedChange={setMarketAlerts}
									/>
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter>
						<Button onClick={handleSavePreferences}>Save Preferences</Button>
					</CardFooter>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Data Management</CardTitle>
					<CardDescription>
						Manage your farm data and account options.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-6 md:grid-cols-2'>
						<div>
							<h3 className='text-lg font-medium mb-2'>Export Data</h3>
							<p className='text-sm text-muted-foreground mb-4'>
								Download all your farm records and data.
							</p>
							<Button variant='outline'>Export All Data</Button>
						</div>
						<div>
							<h3 className='text-lg font-medium mb-2'>Account Actions</h3>
							<p className='text-sm text-muted-foreground mb-4'>
								Manage your account status.
							</p>
							<div className='flex gap-2'>
								<Button variant='outline'>Reset Password</Button>
								<Button variant='destructive'>Delete Account</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>About AgroHub</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-sm text-muted-foreground'>Version 1.0.0 (Beta)</p>
					<p className='text-sm text-muted-foreground mt-2'>
						© 2025 AgroHub - Smart Farm Management Solution
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
