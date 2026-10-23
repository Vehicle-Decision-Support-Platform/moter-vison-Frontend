import { Tabs } from 'expo-router';
import { StyleSheet, Text, type ColorValue } from 'react-native';

import { palette } from '@/constants/theme';

const icon = (glyph: string, color: ColorValue) => (
  <Text style={[styles.icon, { color }]}>{glyph}</Text>
);

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.red,
        tabBarInactiveTintColor: palette.slate,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => icon('⌂', color) }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => icon('⌕', color) }} />
      <Tabs.Screen name="valuation" options={{ title: 'Price', tabBarIcon: ({ color }) => icon('◇', color) }} />
      <Tabs.Screen name="risk" options={{ title: 'Risk', tabBarIcon: ({ color }) => icon('◈', color) }} />
      <Tabs.Screen name="profile" options={{ title: 'Account', tabBarIcon: ({ color }) => icon('○', color) }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { height: 76, paddingTop: 8, paddingBottom: 10, backgroundColor: '#FFFFFF', borderTopColor: palette.line },
  label: { fontSize: 11, fontWeight: '700' },
  icon: { fontSize: 21, fontWeight: '800' },
});
