import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen, Card, Eyebrow, PageHeader, Pill } from '@/components/ui';
import { palette } from '@/constants/theme';
import { vehicles } from '@/data/vehicles';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => vehicles.filter((vehicle) => vehicle.name.toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <AppScreen>
      <PageHeader eyebrow="SYNTHETIC DEMO CATALOGUE" title="Explore vehicles" copy="Browse the website's six sample vehicles. These are not live advertisements or AI recommendations." />
      <TextInput value={query} onChangeText={setQuery} placeholder="Search make or model" placeholderTextColor="#98A3AE" style={styles.search} />
      <View style={styles.list}>
        {results.map((vehicle) => (
          <Card key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleVisual}><Text style={styles.car}>▰</Text><Pill label={`${vehicle.score}% demo match`} tone="success" /></View>
            <View style={styles.titleRow}><Text style={styles.name}>{vehicle.name}</Text><Text style={styles.year}>{vehicle.year}</Text></View>
            <Text style={styles.specs}>{vehicle.km.toLocaleString()} km · {vehicle.fuel} · {vehicle.body}</Text>
            <Text style={styles.price}>LKR {vehicle.price.toLocaleString('en-LK')}</Text>
            <View style={styles.footer}><Pill label={`${vehicle.risk} illustrative risk`} tone={vehicle.risk === 'Low' ? 'success' : 'warning'} /><Pressable><Text style={styles.action}>View demo details →</Text></Pressable></View>
          </Card>
        ))}
        {!results.length && <Card style={styles.empty}><Eyebrow>NO RESULTS</Eyebrow><Text style={styles.specs}>Try another make or model.</Text></Card>}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, color: palette.ink, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 }, list: { gap: 14 }, vehicleCard: { overflow: 'hidden' },
  vehicleVisual: { height: 120, backgroundColor: '#E9EEF1', margin: -1, marginBottom: 0, padding: 15, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }, car: { color: '#4B5964', fontSize: 74, transform: [{ scaleX: 1.8 }] },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 17 }, name: { color: palette.ink, fontSize: 18, fontWeight: '900' }, year: { color: palette.slate, fontWeight: '700' },
  specs: { color: palette.slate, fontSize: 12, lineHeight: 19, marginTop: 7, paddingHorizontal: 18 }, price: { color: palette.navy, fontSize: 19, fontWeight: '900', paddingHorizontal: 18, marginTop: 14 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: palette.line, margin: 18, marginTop: 16, paddingTop: 14 }, action: { color: palette.navy, fontSize: 11, fontWeight: '800' }, empty: { padding: 24 },
});
