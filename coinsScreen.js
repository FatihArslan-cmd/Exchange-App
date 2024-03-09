import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import CustomText from './functions/CustomText';

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
        <CustomText style={styles.title}>{item.name}</CustomText>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{ width: 60, height: 60, marginLeft: 75, margin: 5 }}
          />
        )}
        {!item.image && <Text style={styles.subtitle}>Image not available</Text>}
        <Text style={styles.subtitle}>Price: ${item.current_price}</Text>
        {item.high_24h && <Text style={styles.subtitle}>High Day: ${item.high_24h}</Text>}
        {item.low_24h && <Text style={styles.subtitle}>Low Day: ${item.low_24h}</Text>}
        <Text style={styles.subtitle}>Market Cap: ${item.market_cap}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ fontSize: 20 }}>CRYPTOCURRENCY</CustomText>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Cryptocurrency"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredCryptos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    marginTop: 30
  },
  searchInput: {
    height: 30,
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    textAlign:'center',
    fontSize: 18,
  },
  subtitle: {
    margin:3,
    textAlign:'center',
    fontSize: 16,
    color: '#666',
  },
});

export default CryptoScreen;
