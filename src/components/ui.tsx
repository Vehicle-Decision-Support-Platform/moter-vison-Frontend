import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/constants/theme';

export function AppScreen({ children, hero }: PropsWithChildren<{ hero?: ReactNode }>) {
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.scroll} contentContainerStyle={styles.content}>{hero}{children}</ScrollView></SafeAreaView>;
}
export function BrandHeader() { return <View style={styles.brand}><View style={styles.mark}><Text style={styles.markText}>MV</Text></View><View><Text style={styles.brandName}>MOTOR VISION</Text><Text style={styles.brandTag}>SMART INSIGHTS · BETTER DRIVES</Text></View></View>; }
export function Eyebrow({ children }: PropsWithChildren) { return <Text style={styles.eyebrow}>{children}</Text>; }
export function PageHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <View style={styles.pageHeader}><Eyebrow>{eyebrow}</Eyebrow><Text style={styles.pageTitle}>{title}</Text><Text style={styles.pageCopy}>{copy}</Text></View>; }
export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) { return <View style={[styles.card, style]}>{children}</View>; }
export function Pill({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'success' | 'warning' }) { return <Text style={[styles.pill, tone === 'success' && styles.pillSuccess, tone === 'warning' && styles.pillWarning]}>{label}</Text>; }
export function PrimaryButton({ title, onPress, disabled }: { title: string; onPress: () => void; disabled?: boolean }) { return <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.primary, disabled && styles.disabled, pressed && !disabled && styles.pressed]}><Text style={styles.primaryText}>{title} →</Text></Pressable>; }
export function FieldLabel({ label, children, style }: PropsWithChildren<{ label: string; style?: StyleProp<ViewStyle> }>) { return <View style={style}><Text style={styles.label}>{label}</Text>{children}</View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.navy }, scroll: { flex: 1, backgroundColor: palette.background }, content: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 110 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: palette.navy, marginHorizontal: -20, marginTop: -24, paddingHorizontal: 22, paddingVertical: 14 }, mark: { width: 38, height: 38, borderRadius: 11, backgroundColor: palette.red, alignItems: 'center', justifyContent: 'center', transform: [{ skewX: '-7deg' }] }, markText: { color: palette.white, fontSize: 13, fontWeight: '900' }, brandName: { color: palette.white, fontSize: 15, fontWeight: '900', letterSpacing: 1.2 }, brandTag: { color: '#8994A0', fontSize: 7, letterSpacing: 1, marginTop: 2 },
  eyebrow: { color: palette.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 }, pageHeader: { marginBottom: 22 }, pageTitle: { color: palette.ink, fontSize: 31, lineHeight: 37, fontWeight: '900', letterSpacing: -0.8, marginTop: 8 }, pageCopy: { color: palette.slate, fontSize: 14, lineHeight: 22, marginTop: 10 },
  card: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 15 },
  pill: { alignSelf: 'flex-start', borderRadius: 99, backgroundColor: '#F0F2F5', color: palette.slate, overflow: 'hidden', paddingHorizontal: 9, paddingVertical: 5, fontSize: 10, fontWeight: '800' }, pillSuccess: { backgroundColor: '#EAF6F0', color: palette.green }, pillWarning: { backgroundColor: '#FFF4E1', color: palette.amber },
  primary: { backgroundColor: palette.red, minHeight: 48, paddingHorizontal: 18, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, primaryText: { color: palette.white, fontWeight: '800' }, disabled: { opacity: 0.45 }, pressed: { backgroundColor: palette.redDark }, label: { color: palette.ink, fontSize: 12, fontWeight: '700' },
});
