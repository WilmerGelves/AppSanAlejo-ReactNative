import React, { useEffect } from 'react';
import { initDB } from './src/database/db';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

  useEffect(() => {
    initDB();
  }, []);

  return <AppNavigator />;
}