import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen, Card, FieldLabel, PageHeader, Pill, PrimaryButton } from '@/components/ui';
import { palette } from '@/constants/theme';

export default function ValuationScreen() {
  const [make, setMake] = useState(''); const [model, setModel] = useState(''); const [price, setPrice] = useState(''); const [notice, setNotice] = useState('');
  return (
    <AppScreen>
      <PageHeader eyebrow="COMPONENT 01 · PRICE INTELLIGENCE" title="Evaluate an asking price" copy="The mobile form is ready for the shared backend. Live price inference is not implemented in the source repository." />
      <Card style={styles.form}>
        <FieldLabel label="Make"><TextInput value={make} onChangeText={setMake} placeholder="Toyota" style={styles.input} /></FieldLabel>
        <FieldLabel label="Model"><TextInput value={model} onChangeText={setModel} placeholder="Aqua" style={styles.input} /></FieldLabel>
        <FieldLabel label="Seller price (LKR)"><TextInput value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="7850000" style={styles.input} /></FieldLabel>
        <PrimaryButton title="Check backend availability" onPress={() => setNotice('Price inference endpoint is pending. No prediction was generated.')} />
        {!!notice && <Text style={styles.notice}>{notice}</Text>}
      </Card>
      <Card style={styles.status}><View style={styles.row}><Text style={styles.statusTitle}>Integration status</Text><Pill label="Endpoint pending" tone="warning" /></View><Text style={styles.copy}>The existing website evaluates a synthetic demo formula or imports externally generated model reports. This app will call a versioned API only after a real backend model contract is approved.</Text></Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ form: { padding: 18, gap: 16 }, input: { borderWidth: 1, borderColor: palette.line, borderRadius: 10, padding: 13, color: palette.ink, marginTop: 7 }, notice: { backgroundColor: palette.redSoft, color: palette.redDark, padding: 12, borderRadius: 9, fontSize: 12, lineHeight: 18 }, status: { padding: 18, marginTop: 14 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, statusTitle: { color: palette.ink, fontSize: 16, fontWeight: '800' }, copy: { color: palette.slate, fontSize: 13, lineHeight: 20, marginTop: 12 } });
