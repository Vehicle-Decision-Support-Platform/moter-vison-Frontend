import { ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AppTabs from '@/components/app-tabs';
import { navigationTheme } from '@/constants/theme';

export default function TabLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="light" />
      <AppTabs />
    </ThemeProvider>
  );
}
