import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';
import axios from 'axios';
import CustomText from '../functions/CustomText';

const { width } = Dimensions.get('window');

const CryptoScreen = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
      setCryptos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} />
          ) : (
            <Text style={styles.subtitle}>Image not available</Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <CustomText style={styles.title}>{item.name}</CustomText>
          <Text style={styles.subtitle}>Price: ${item.current_price}</Text>
          {item.high_24h && <Text style={styles.subtitle}>High Day: ${item.high_24h}</Text>}
          {item.low_24h && <Text style={styles.subtitle}>Low Day: ${item.low_24h}</Text>}
          <Text style={styles.subtitle}>Market Cap: ${item.market_cap}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>CRYPTOCURRENCY</CustomText>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Cryptocurrency"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={filteredCryptos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 45,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3,
  },
});

export default CryptoScreen;
