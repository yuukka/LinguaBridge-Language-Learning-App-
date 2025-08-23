// src/components/Landing.jsx
import { useNavigate } from 'react-router';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <main>
//         <h1>Landing Page</h1>
//       </main>
      

//     </>

//   );
// };




// 'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const MainPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <h1>Hello</h1>
  );
};

export default MainPage;