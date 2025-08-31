// src/components/Landing.jsx
import { useNavigate } from 'react-router';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignInForm/SignInForm';

import { useUser } from '../../contexts/UserContext';

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



const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const products = [
    { name: 'Game', description: 'Play Language game', href: '/quiz/random', icon: ChartPieIcon, children: [
        { name: 'Quick Quiz', href: '/quiz/random' },
        ...(user ? [{ name: 'Quest', href: '/quiz/quest' }] : []),
        ...(user ? [{ name: 'Your Badges', href: '/quiz/bedges' }] : []),
      ] },
    { name: 'Library', description: 'Your Japanese-English library', href: '/library', icon: CursorArrowRaysIcon },
  ]

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleLogIn = () => {
    setMobileMenuOpen(false);
    navigate('/login');
  }

  return (
    <header className="bg-white/80">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Features
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

<PopoverPanel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 
    overflow-hidden rounded-3xl bg-white shadow-lg outline-1 outline-gray-900/5">
  <div className="p-4">
    {products.map((item) => (
      <div key={item.name} className="group relative">
        {item.children ? (
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center gap-x-4 rounded-lg p-4 
                  text-sm/6 font-semibold text-gray-900 hover:bg-gray-50">
                  <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                  <span>{item.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto h-5 w-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="pl-12 pr-4 pb-2">
                  {item.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="block py-1 text-sm text-gray-700 hover:text-indigo-600"
                    >
                      {child.name}
                    </a>
                  ))}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        ) : (
          <a
            href={item.href}
            className="flex items-center gap-x-4 rounded-lg p-4 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
          >
            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
            {item.name}
          </a>
        )}
      </div>
    ))}
  </div>
</PopoverPanel>
          </Popover>
          
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            About linguaBridge
          </a>

          {user ? (<a href="/profile" className="text-sm/6 font-semibold text-gray-900">
            Profile
          </a>): null}
        </PopoverGroup>
        {user ? (<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a className="text-sm/6 font-semibold text-gray-900" onClick={handleSignOut} >
            Sign out <span aria-hidden="true">&rarr;</span>
          </a>
        </div>) : (<div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a className="text-sm/6 font-semibold text-gray-900" onClick={() => navigate('/login')}>
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>)}

      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Features
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
<DisclosurePanel className="mt-2 space-y-2">
  {products.map((item) => (
    <div key={item.name}>
      {item.children ? (
        <Disclosure as="div" className="pl-3">
          {({ open }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                {item.name}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={`ml-2 size-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              </DisclosureButton>
              <DisclosurePanel className="space-y-1 pl-10">
                {item.children.map((child) => (
                  <a
                    key={child.name}
                    href={child.href}
                    className="block rounded-lg py-2 pr-3 pl-6 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {child.name}
                  </a>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ) : (
        <a
          href={item.href}
          className="block rounded-lg py-2 pr-3 pl-6 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          {item.name}
        </a>
      )}
    </div>
  ))}
</DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About linguaBridge
                </a>
              {user ? (<a
                  href="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </a>): null}
              </div>
              {user ?
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={handleLogIn}
                  >
                    Sign out
                  </a> : 
                  <a
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={handleLogIn}
                  >
                    Log in
                  </a>

              }

            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Menu;