import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoriesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>VERY SOON</Text>
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

export default FavoriesScreen;
