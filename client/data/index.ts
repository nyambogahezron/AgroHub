import FeaturesItem from './Features';
import HomeNavData from './NavbarItems';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { BudgetProps } from '@/types';

export { FeaturesItem, HomeNavData };

export const priceTiers = [
  {
    title: 'Starter',
    price: '0',
    description: [
      'Manage up to 10 farms',
      'Track basic expenses and sales',
      '2 GB of data storage',
      'Access to community support',
      'Basic reporting features',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Professional',
    subheader: 'Most Popular',
    price: '15',
    description: [
      'Manage up to 20 farms',
      'Advanced expense and sales tracking',
      '10 GB of data storage',
      'Priority support',
      'Comprehensive reporting tools',
      'Access to marketplace insights',
    ],
    buttonText: 'Start now',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      'Manage 50+ farms',
      'Full access to all tracking and reporting features',
      '30 GB of data storage',
      'Phone and email support',
      'Custom integrations and solutions',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

export const accordionData = [
  {
    id: 'panel1',
    summary: 'How can I track expenses and sales on the platform?',
    details:
      'Our platform offers intuitive tools to track all your farm expenses, labor costs, and product sales in real-time. You can view detailed reports to analyze your financial performance and make data-driven decisions.',
  },
  {
    id: 'panel2',
    summary: 'Can I integrate other systems with the platform?',
    details:
      'Yes, our platform supports integrations with various farm management and accounting systems. This ensures seamless data flow and allows you to synchronize information across platforms to optimize your farm operations.',
  },
  {
    id: 'panel3',
    summary: 'What makes this platform unique compared to others?',
    details:
      'Our platform stands out for its comprehensive features tailored to farmers’ needs, including expense tracking, sales monitoring, predictive analytics, and an integrated marketplace. We also provide detailed reports to help you optimize your farm’s profitability.',
  },
  {
    id: 'panel4',
    summary: 'What kind of customer support do you offer?',
    details:
      'We offer dedicated customer support via email, phone, and live chat. Whether you need help navigating the platform or have specific questions about managing your farm, our team is ready to assist.',
  },
  {
    id: 'panel5',
    summary: 'Can I access the platform on mobile devices?',
    details:
      'Yes, our platform is fully responsive and can be accessed on mobile, tablet, and desktop devices, ensuring you can manage your farm operations anytime, anywhere.',
  },
  {
    id: 'panel6',
    summary: 'How does the platform help improve farm productivity?',
    details:
      'The platform provides powerful predictive analytics to forecast trends, monitor expenses, and optimize resource usage, helping you improve productivity and profitability over time.',
  },
];

export const DashboardMenuItem = [
  { text: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
  { text: 'Analytics', icon: PieChartIcon, link: '/dashboard/analytics' },
  { text: 'Market', icon: ShoppingCartIcon, link: '/dashboard/market' },
  { text: 'User', icon: PersonIcon, link: '/dashboard/users' },
  { text: 'Budget', icon: PersonIcon, link: '/dashboard/budget' },
  {
    text: 'Notifications',
    icon: ChatIcon,
    link: '/dashboard/notifications',
  },
  { text: 'Settings', icon: SettingsIcon, link: '/dashboard/settings' },
];

export const budgetData = [
  {
    id: '1',
    user: '1',
    title: 'Annual Budget for 2024',
    amount: 25000,
    organization: 1,
    date: '2024-01-01',
    items: [
      { id: '1', title: 'Salaries', amount: 15000 },
      { id: '2', title: 'Supplies', amount: 5000 },
      { id: '3', title: 'Equipment', amount: 5000 },
    ],
  },
  {
    id: '2',
    user: '1',
    title: 'Quarterly Budget Q2 2024',
    amount: 8000,
    organization: 1,
    date: '2024-04-01',
    items: [
      { id: '1', title: 'Salaries', amount: 5000 },
      { id: '2', title: 'Supplies', amount: 2000 },
      { id: '3', title: 'Equipment', amount: 1000 },
    ],
  },
  {
    id: '3',
    user: '1',
    title: 'Monthly Budget May 2024',
    amount: 3000,
    organization: 1,
    date: '2024-05-01',
    items: [
      { id: '1', title: 'Salaries', amount: 2000 },
      { id: '2', title: 'Supplies', amount: 500 },
      { id: '3', title: 'Equipment', amount: 500 },
    ],
  },
  {
    id: '4',
    user: '1',
    amount: 23000,
    title: 'Mid Year Budget June 2024',
    organization: 2,
    date: '2024-05-01',
    items: [
      { id: '1', title: 'Salaries', amount: 2000 },
      { id: '2', title: 'Supplies', amount: 500 },
      { id: '3', title: 'Equipment', amount: 500 },
    ],
  },
  {
    id: '5',
    user: '2',
    title: 'Annual Budget for 2023',
    amount: 22000,
    organization: 3,
    date: '2023-01-01',
    items: [
      { id: '1', title: 'Salaries', amount: 12000 },
      { id: '2', title: 'Marketing', amount: 4000 },
      { id: '3', title: 'Research', amount: 6000 },
    ],
  },
  {
    id: '6',
    user: '2',
    title: 'Quarterly Budget Q1 2023',
    amount: 7000,
    organization: 3,
    date: '2023-03-01',
    items: [
      { id: '1', title: 'Salaries', amount: 4000 },
      { id: '2', title: 'Marketing', amount: 2000 },
      { id: '3', title: 'Research', amount: 1000 },
    ],
  },
  {
    id: '7',
    user: '2',
    title: 'Monthly Budget January 2023',
    amount: 2500,
    organization: 3,
    date: '2023-01-15',
    items: [
      { id: '1', title: 'Salaries', amount: 1500 },
      { id: '2', title: 'Marketing', amount: 500 },
      { id: '3', title: 'Research', amount: 500 },
    ],
  },
  {
    id: '8',
    user: '2',
    title: 'Mid Year Budget 2023',
    amount: 16000,
    organization: 4,
    date: '2023-06-01',
    items: [
      { id: '1', title: 'Salaries', amount: 9000 },
      { id: '2', title: 'Marketing', amount: 3000 },
      { id: '3', title: 'Research', amount: 4000 },
    ],
  },
  {
    id: '9',
    user: '3',
    title: 'Annual Budget for 2025',
    amount: 26000,
    organization: 5,
    date: '2025-01-01',
    items: [
      { id: '1', title: 'Salaries', amount: 16000 },
      { id: '2', title: 'Supplies', amount: 5000 },
      { id: '3', title: 'Research', amount: 5000 },
    ],
  },
  {
    id: '10',
    user: '3',
    title: 'Quarterly Budget Q3 2025',
    amount: 8500,
    organization: 5,
    date: '2025-07-01',
    items: [
      { id: '1', title: 'Salaries', amount: 6000 },
      { id: '2', title: 'Supplies', amount: 1500 },
      { id: '3', title: 'Research', amount: 1000 },
    ],
  },
  {
    id: '11',
    user: '3',
    title: 'Monthly Budget July 2025',
    amount: 3200,
    organization: 5,
    date: '2025-07-01',
    items: [
      { id: '1', title: 'Salaries', amount: 2000 },
      { id: '2', title: 'Supplies', amount: 800 },
      { id: '3', title: 'Research', amount: 400 },
    ],
  },
  {
    id: '12',
    user: '3',
    amount: 24000,
    title: 'Mid Year Budget 2025',
    organization: 5,
    date: '2025-06-01',
    items: [
      { id: '1', title: 'Salaries', amount: 15000 },
      { id: '2', title: 'Supplies', amount: 5000 },
      { id: '3', title: 'Research', amount: 4000 },
    ],
  },
  {
    id: '13',
    user: '4',
    title: 'Annual Budget for 2022',
    amount: 18000,
    organization: 6,
    date: '2022-01-01',
    items: [
      { id: '1', title: 'Salaries', amount: 10000 },
      { id: '2', title: 'Marketing', amount: 4000 },
      { id: '3', title: 'Research', amount: 4000 },
    ],
  },
  {
    id: '14',
    user: '4',
    title: 'Quarterly Budget Q4 2022',
    amount: 6000,
    organization: 6,
    date: '2022-10-01',
    items: [
      { id: '1', title: 'Salaries', amount: 3000 },
      { id: '2', title: 'Marketing', amount: 2000 },
      { id: '3', title: 'Research', amount: 1000 },
    ],
  },
  {
    id: '15',
    user: '4',
    title: 'Monthly Budget October 2022',
    amount: 2200,
    organization: 6,
    date: '2022-10-01',
    items: [
      { id: '1', title: 'Salaries', amount: 1500 },
      { id: '2', title: 'Marketing', amount: 500 },
      { id: '3', title: 'Research', amount: 200 },
    ],
  },
  {
    id: '16',
    user: '4',
    amount: 15000,
    title: 'Mid Year Budget 2022',
    organization: 6,
    date: '2022-06-01',
    items: [
      { id: '1', title: 'Salaries', amount: 10000 },
      { id: '2', title: 'Marketing', amount: 3000 },
      { id: '3', title: 'Research', amount: 2000 },
    ],
  },
  {
    id: '17',
    user: '5',
    title: 'Annual Budget for 2026',
    amount: 27000,
    organization: 7,
    date: '2026-01-01',
    items: [
      { id: '1', title: 'Salaries', amount: 17000 },
      { id: '2', title: 'Supplies', amount: 5000 },
      { id: '3', title: 'Equipment', amount: 5000 },
    ],
  },
] satisfies BudgetProps[];
     
