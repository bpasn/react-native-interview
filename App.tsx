import { SafeAreaView, StyleSheet } from 'react-native';
import HomePage from './src/screens/HomePage';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <HomePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
