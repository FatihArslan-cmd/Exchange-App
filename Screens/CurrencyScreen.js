import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import CustomText from '../functions/CustomText';

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const currencies = [
    { code: 'TRY', name: 'Turkish lira', image: require('../assets/try.png') },
    { code: 'AZN', name: 'Azerbaijan Manat', image: require('../assets/azn.jpg') },
    { code: 'EUR', name: 'Euro', image: require('../assets/eur.png') },
    { code: 'GBP', name: 'British Pound', image: require('../assets/gbp.png') },
    { code: 'JPY', name: 'Japanese Yen', image: require('../assets/jpy.png') },
    { code: 'AUD', name: 'Australian Dollar', image: require('../assets/aud.png') },
    { code: 'CAD', name: 'Canadian Dollar', image: require('../assets/cad.jpg') },
    { code: 'CHF', name: 'Swiss Franc', image: require('../assets/chf.png') },
    { code: 'CNY', name: 'Chinese Yuan', image: require('../assets/cny.png') },
    { code: 'INR', name: 'Indian Rupee', image: require('../assets/inr.png') },
    { code: 'RUB', name: 'Russian Ruble', image: require('../assets/rub.png') },
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeRates(data.rates);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    const interval = setInterval(fetchExchangeRates, 60000); // Update every minute
    fetchExchangeRates();

    return () => clearInterval(interval);
  }, []);

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title}>Exchange Rates</CustomText>
        {lastUpdated && <CustomText style={styles.lastUpdated}>Last updated: {lastUpdated.toLocaleString()}</CustomText>}
        <TextInput
          placeholder="Search currency..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.table}>
        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          filteredCurrencies.map(currency => (
            <View style={styles.row} key={currency.code}>
              <View style={styles.cell}>
                <Image source={currency.image} style={styles.image} />
                <CustomText style={styles.currencyName}>{currency.name}</CustomText>
              </View>
              <View style={styles.cell}>
                <CustomText style={styles.exchangeRate}>1 USD = {exchangeRates[currency.code]} {currency.code}</CustomText>
              </View>
            </View>
          ))
        )}
        {!loading && <Text style={styles.moreSoon}>More Coming Soon</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginTop: 5,
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 15,
  },
  table: {
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
  },
  exchangeRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  moreSoon: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
    color: '#999',
  },
});

export default ExchangeRates;
