import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, BrandHeader, Card, Eyebrow, Pill, PrimaryButton } from '@/components/ui';
import { palette } from '@/constants/theme';

const components = [
  { number: '01', icon: '◇', title: 'Price evaluation', copy: 'Compare an asking price with an independent fair-value reference.', status: 'Prototype', route: '/valuation' as const },
  { number: '02', icon: '✦', title: 'Vehicle recommendation', copy: 'Feature-based recommendations will connect when the research component is ready.', status: 'Planned' },
  { number: '03', icon: '◈', title: 'Risk assessment', copy: 'Review model signals, SHAP/LIME explanations and verification steps.', status: 'Integrated', route: '/risk' as const },
  { number: '04', icon: '▤', title: 'Affordability', copy: 'Payment planning interface; backend lending advice is not connected.', status: 'Demo' },
];

export default function HomeScreen() {
  return (
    <AppScreen hero={<BrandHeader />}>
      <View style={styles.heroCard}>
        <Eyebrow>USED-VEHICLE DECISION SUPPORT · SRI LANKA</Eyebrow>
        <Text style={styles.heroTitle}>Know the value{`\n`}behind the drive.</Text>
        <Text style={styles.heroCopy}>Price context, explainable risk signals and purchase planning in one native experience.</Text>
        <View style={styles.heroActions}>
          <PrimaryButton title="Assess a listing" onPress={() => router.push('/risk')} />
          <Pressable style={styles.secondary} onPress={() => router.push('/valuation')}><Text style={styles.secondaryText}>Evaluate price</Text></Pressable>
        </View>
        <View style={styles.trustRow}><Text style={styles.trust}>✓ Explainable</Text><Text style={styles.trust}>✓ Versioned results</Text><Text style={styles.trust}>✓ No fake predictions</Text></View>
      </View>

      <View style={styles.sectionTitleRow}><View><Eyebrow>RESEARCH COMPONENTS</Eyebrow><Text style={styles.sectionTitle}>Four clearer decisions.</Text></View><Pill label="Research build" tone="neutral" /></View>
      <View style={styles.grid}>
        {components.map((item) => (
          <Pressable key={item.number} disabled={!item.route} onPress={() => item.route && router.push(item.route)}>
            <Card style={styles.componentCard}>
              <View style={styles.cardTop}><Text style={styles.cardIcon}>{item.icon}</Text><Text style={styles.number}>{item.number}</Text></View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCopy}>{item.copy}</Text>
              <View style={styles.cardFooter}><Pill label={item.status} tone={item.status === 'Integrated' ? 'success' : 'neutral'} /><Text style={styles.arrow}>{item.route ? 'Open →' : 'Not connected'}</Text></View>
            </Card>
          </Pressable>
        ))}
      </View>

      <Card style={styles.note}>
        <Text style={styles.noteTitle}>Built around the existing backend</Text>
        <Text style={styles.cardCopy}>This app does not contain backend services or model files. All operational predictions remain behind the Motor Vision Node API.</Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: { backgroundColor: palette.navy, marginHorizontal: -20, marginTop: -24, paddingHorizontal: 24, paddingTop: 26, paddingBottom: 34, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTitle: { color: palette.white, fontSize: 38, lineHeight: 43, fontWeight: '900', letterSpacing: -1.2, marginTop: 12 },
  heroCopy: { color: '#B5BEC8', fontSize: 15, lineHeight: 23, marginTop: 14, maxWidth: 470 },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 24 },
  secondary: { borderWidth: 1, borderColor: '#3B4652', borderRadius: 10, paddingHorizontal: 18, justifyContent: 'center' },
  secondaryText: { color: '#E6EBEF', fontWeight: '700' },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 22 },
  trust: { color: '#AEB7C1', fontSize: 11, fontWeight: '600' },
  sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 28, marginBottom: 14 },
  sectionTitle: { color: palette.ink, fontSize: 25, fontWeight: '900', marginTop: 6 },
  grid: { gap: 12 }, componentCard: { padding: 18 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#F0F2F5', color: palette.navy, textAlign: 'center', textAlignVertical: 'center', fontSize: 22 },
  number: { color: '#9AA6B2', fontSize: 12, letterSpacing: 2, fontWeight: '800' }, cardTitle: { color: palette.ink, fontSize: 18, fontWeight: '800', marginTop: 16 }, cardCopy: { color: palette.slate, fontSize: 13, lineHeight: 20, marginTop: 7 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: palette.line, marginTop: 16, paddingTop: 14 }, arrow: { color: palette.navy, fontSize: 12, fontWeight: '800' },
  note: { marginTop: 12, padding: 18, borderLeftWidth: 3, borderLeftColor: palette.red }, noteTitle: { color: palette.ink, fontSize: 15, fontWeight: '800' },
});
