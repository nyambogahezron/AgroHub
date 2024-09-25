
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

const FeaturesItem = [
  {
    icon: ViewQuiltRoundedIcon,
    title: 'Dashboard',
    description:
      'This item could provide a snapshot of the most important metrics or data points related to the product.',
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    icon: EdgesensorHighRoundedIcon ,
    title: 'Mobile integration',
    description:
      'This item could provide information about the mobile app version of the product.',
    imageLight:
      'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
  {
    icon: DevicesRoundedIcon ,
    title: 'Available on all platforms',
    description:
      'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
    imageLight:
      'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];


export default FeaturesItem;