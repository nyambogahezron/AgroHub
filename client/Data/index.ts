import FeaturesItem from './Features';
import HomeNavData from './NavbarItems';

const priceTiers = [
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

const accordionData = [
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

export { FeaturesItem, HomeNavData, priceTiers, accordionData };
