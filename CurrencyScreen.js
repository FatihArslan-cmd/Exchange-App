import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null); // State for last updated date

  const currencies = [
    { code: 'TRY', name: 'Türk Lirası', image: require('./assets/try.png') },
    { code: 'AZN', name: 'Azerbaycan Manatı', image: require('./assets/azn.jpg') },
    { code: 'EUR', name: 'Euro', image: require('./assets/eur.png') }, // Euro
    { code: 'GBP', name: 'British Pound', image: require('./assets/gbp.png') }, // British Pound
    { code: 'JPY', name: 'Japanese Yen', image: require('./assets/jpy.png') }, // Japanese Yen
    { code: 'AUD', name: 'Australian Dollar', image: require('./assets/aud.png') }, // Australian Dollar
    { code: 'CAD', name: 'Canadian Dollar', image: require('./assets/cad.jpg') }, // Canadian Dollar
    { code: 'CHF', name: 'Swiss Franc', image: require('./assets/chf.png') }, // Swiss Franc
    { code: 'CNY', name: 'Chinese Yuan', image: require('./assets/cny.png') }, // Chinese Yuan
    { code: 'INR', name: 'Indian Rupee', image: require('./assets/inr.png') }, // Indian Rupee
    { code: 'RUB', name: 'Russian Ruble', image: require('./assets/rub.png') }, // Russian Ruble
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
        setLastUpdated(new Date()); // Update lastUpdated state with current date
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // You can set state to indicate error to the user if necessary
      }
    };

    const interval = setInterval(fetchExchangeRates, 60000); // Update every minute
    fetchExchangeRates();

    return () => clearInterval(interval);
  }, []);

  return (
    
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1,marginTop:30 }}>
        <Text style={styles.title}>Döviz Kurları</Text>
        {lastUpdated && <Text style={styles.lastUpdated}>Son Güncelleme: {lastUpdated.toLocaleString()}</Text>}
        <View style={styles.table}>
          {currencies.map(currency => (
            <View style={styles.row} key={currency.code}>
              <View style={styles.cell}>
                <Image source={currency.image} style={styles.image} />
                <Text style={styles.currencyName}>{currency.name}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.exchangeRate}>1 USD = {exchangeRates[currency.code]} {currency.code}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.moreSoon}>Dahası Yakında</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  table: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  currencyName: {
    fontSize: 18,
  },
  exchangeRate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moreSoon: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 40,
    color: 'gray',
  },
});

export default ExchangeRates;