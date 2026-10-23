import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen, Card, FieldLabel, PageHeader, Pill, PrimaryButton } from '@/components/ui';
import { palette } from '@/constants/theme';
import { api } from '@/services/api';
import type { RiskAssessmentResponse } from '@/types/api';

export default function RiskScreen() {
  const [form, setForm] = useState({ make: '', model: '', year: '', mileage: '', price: '' });
  const [loading, setLoading] = useState(false); const [error, setError] = useState(''); const [result, setResult] = useState<RiskAssessmentResponse | null>(null);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const assess = async () => {
    setLoading(true); setError(''); setResult(null);
    try { setResult(await api.assessRisk({ make: form.make.trim(), model: form.model.trim(), year: Number(form.year), mileage: Number(form.mileage), price: Number(form.price) })); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Assessment failed.'); }
    finally { setLoading(false); }
  };
  const valid = !!(form.make.trim() && form.model.trim() && Number(form.year) >= 1980 && Number(form.mileage) >= 0 && Number(form.price) > 0);

  return (
    <AppScreen>
      <PageHeader eyebrow="COMPONENT 03 · EXPLAINABLE AI" title="Assess listing risk" copy="Requests use the existing Node backend and trained risk worker. No model is bundled into this app." />
      <Card style={styles.form}>
        <View style={styles.row}><FieldLabel label="Make" style={styles.half}><TextInput value={form.make} onChangeText={(v) => update('make', v)} placeholder="Toyota" style={styles.input} /></FieldLabel><FieldLabel label="Model" style={styles.half}><TextInput value={form.model} onChangeText={(v) => update('model', v)} placeholder="Aqua" style={styles.input} /></FieldLabel></View>
        <View style={styles.row}><FieldLabel label="Year" style={styles.half}><TextInput value={form.year} onChangeText={(v) => update('year', v)} keyboardType="numeric" placeholder="2018" style={styles.input} /></FieldLabel><FieldLabel label="Mileage (km)" style={styles.half}><TextInput value={form.mileage} onChangeText={(v) => update('mileage', v)} keyboardType="numeric" placeholder="42500" style={styles.input} /></FieldLabel></View>
        <FieldLabel label="Asking price (LKR)"><TextInput value={form.price} onChangeText={(v) => update('price', v)} keyboardType="numeric" placeholder="7850000" style={styles.input} /></FieldLabel>
        <PrimaryButton title={loading ? 'Running assessment…' : 'Assess listing risk'} disabled={!valid || loading} onPress={assess} />
        {loading && <ActivityIndicator color={palette.red} />}{!!error && <Text style={styles.error}>{error}</Text>}
      </Card>
      {result && <Card style={styles.result}><View style={styles.resultTop}><View><Text style={styles.muted}>TRAINED MODEL RESULT</Text><Text style={styles.resultTitle}>{result.final_tier} risk</Text></View><Pill label={`${Math.round(result.risk_score * 100)}% score`} tone={result.final_tier === 'LOW' ? 'success' : 'warning'} /></View><Text style={styles.copy}>{result.limitation}</Text><Text style={styles.version}>Model: {result.modelVersion}</Text></Card>}
      <Card style={styles.warning}><Text style={styles.warningTitle}>Development connection required</Text><Text style={styles.copy}>The current backend only accepts localhost requests. Use EXPO_PUBLIC_API_URL now; the approved backend branch must add configurable host/origin and mobile authentication before device testing.</Text></Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ form: { padding: 18, gap: 16 }, row: { flexDirection: 'row', gap: 12 }, half: { flex: 1 }, input: { borderWidth: 1, borderColor: palette.line, borderRadius: 10, padding: 13, color: palette.ink, marginTop: 7 }, error: { color: palette.redDark, backgroundColor: palette.redSoft, padding: 12, borderRadius: 9, fontSize: 12, lineHeight: 18 }, result: { padding: 18, marginTop: 14 }, resultTop: { flexDirection: 'row', justifyContent: 'space-between' }, muted: { color: palette.slate, fontSize: 10, letterSpacing: 1.4, fontWeight: '800' }, resultTitle: { color: palette.ink, fontSize: 26, fontWeight: '900', marginTop: 6 }, copy: { color: palette.slate, fontSize: 13, lineHeight: 20, marginTop: 12 }, version: { color: palette.ink, fontSize: 11, fontWeight: '700', marginTop: 14 }, warning: { padding: 18, marginTop: 14, borderLeftWidth: 3, borderLeftColor: palette.red }, warningTitle: { color: palette.ink, fontWeight: '800' } });
