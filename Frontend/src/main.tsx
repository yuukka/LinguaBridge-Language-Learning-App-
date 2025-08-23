import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router' // add import for BrowserRouter
import './index.css'
import App from './App.tsx'

// Import the UserProvider component
import { UserProvider } from './contexts/UserContext.tsx';
import { SearchResultProvider } from './contexts/WordResult.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SearchResultProvider>
          <App />
        </SearchResultProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
