import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoinsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merhaba, React Native!</Text>
      <Text style={styles.paragraph}>
        Bu bir basit React Native sayfasıdır.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CoinsScreen;
