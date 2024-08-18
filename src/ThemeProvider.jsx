import React, { useEffect } from 'react';
import { PrimeReactProvider } from 'primereact/api';

// Import your preferred theme CSS
import 'primereact/resources/themes/lara-light-blue/theme.css';
// Import PrimeReact core CSS
import 'primereact/resources/primereact.min.css';
// Import PrimeIcons if you're using them
import 'primeicons/primeicons.css';

const ThemeProvider = ({ children }) => {

  useEffect(() => {
    // You can add logic here to load the user's preferred theme from localStorage or any other source
    // For now, we'll just use the default theme
  }, []);

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      {children}
    </PrimeReactProvider>
  );
};

export default ThemeProvider;