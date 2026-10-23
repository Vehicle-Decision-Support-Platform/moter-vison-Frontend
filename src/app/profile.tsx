import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen, Card, FieldLabel, PageHeader, Pill, PrimaryButton } from '@/components/ui';
import { palette } from '@/constants/theme';
import { api, apiBaseUrl } from '@/services/api';

export default function ProfileScreen() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState('');
  const signIn = async () => { try { const result = await api.login(email, password); setMessage(`Signed in as ${result.user.name}. Cookie persistence still requires backend mobile-session support.`); } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-in failed.'); } };
  return (
    <AppScreen>
      <PageHeader eyebrow="ACCOUNT & CONNECTION" title="Your Motor Vision account" copy="The mobile app reuses the existing account database. A separate mobile identity store will not be created." />
      <Card style={styles.connection}><View style={styles.row}><Text style={styles.title}>Backend</Text><Pill label={apiBaseUrl ? 'Configured' : 'Not configured'} tone={apiBaseUrl ? 'success' : 'warning'} /></View><Text style={styles.endpoint}>{apiBaseUrl || 'Set EXPO_PUBLIC_API_URL in .env'}</Text></Card>
      <Card style={styles.form}>
        <Text style={styles.formTitle}>Email sign in</Text><Text style={styles.copy}>This calls the existing login endpoint. Persistent native sessions will be enabled after the backend token exchange is added.</Text>
        <FieldLabel label="Email"><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" style={styles.input} /></FieldLabel>
        <FieldLabel label="Password"><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="At least 8 characters" style={styles.input} /></FieldLabel>
        <PrimaryButton title="Sign in" disabled={!email.includes('@') || password.length < 8} onPress={signIn} />{!!message && <Text style={styles.message}>{message}</Text>}
      </Card>
      <Card style={styles.security}><Text style={styles.securityTitle}>Mobile security boundary</Text><Text style={styles.copy}>Refresh credentials will use Expo SecureStore. OAuth client secrets and model files remain on the backend.</Text></Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ connection: { padding: 18, marginBottom: 14 }, row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { color: palette.ink, fontSize: 16, fontWeight: '800' }, endpoint: { color: palette.slate, marginTop: 10, fontSize: 12 }, form: { padding: 18, gap: 16 }, formTitle: { color: palette.ink, fontSize: 20, fontWeight: '900' }, copy: { color: palette.slate, fontSize: 13, lineHeight: 20 }, input: { borderWidth: 1, borderColor: palette.line, borderRadius: 10, padding: 13, color: palette.ink, marginTop: 7 }, message: { backgroundColor: palette.redSoft, color: palette.redDark, padding: 12, borderRadius: 9, fontSize: 12, lineHeight: 18 }, security: { padding: 18, marginTop: 14, borderLeftWidth: 3, borderLeftColor: palette.green }, securityTitle: { color: palette.ink, fontWeight: '800', marginBottom: 4 } });
