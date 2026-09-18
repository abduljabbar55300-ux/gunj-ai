import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gunj AI</Text>
      <Text style={styles.subtitle}>Your personal AI project assistant</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 12,
  },
});
