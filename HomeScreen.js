import * as React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Linking, Animated } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Asset } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation();
  const [animatedValue] = React.useState(new Animated.Value(0));
  const [showQuote, setShowQuote] = React.useState(false);
  const [quoteOpacity] = React.useState(new Animated.Value(0));
  const gif = Asset.fromModule(require('./assets/133361 (Original).gif')).uri;
  const coolQuote = "Never give up on the stock market, for even in its chaos lies opportunity.";

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const handlePressFacebook = () => {
    Linking.openURL('https://www.facebook.com/');
  };

  const handlePressInstagram = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const handlePressWhatsapp = () => {
    Linking.openURL('https://web.whatsapp.com/');
  };

  const toggleQuote = () => {
    setShowQuote(!showQuote);
    Animated.timing(quoteOpacity, {
      toValue: showQuote ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeInQuote = () => {
    Animated.timing(quoteOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      fadeOutQuote();
    }, 3000);
  };

  const fadeOutQuote = () => {
    Animated.timing(quoteOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ marginTop: 50, backgroundColor:'#E6EBF9' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TouchableOpacity onPress={() => navigation.navigate('CoinsScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/icons8-bitcoin-48.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.coinsText}>COINS</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CurrencyScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/icons8-currency-50.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.coinsText}>CURRENCIES</Text>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FavoriesScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('./assets/icons8-favorites-48.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.coinsText}>FAVORIES</Text>
          </Card>
        </TouchableOpacity>

        <Image
          source={{ uri: gif }}
          style={{ width: 400, height: 185 }}
          resizeMode="contain"
        />
      
        <TouchableOpacity onPress={toggleQuote}>
          <Image
            source={require('./assets/icons8-easter-egg-48.png')}
          />
        </TouchableOpacity>
         
        <Animated.View style={{ opacity: quoteOpacity }}>
          <Text style={styles.coolQuote}>{coolQuote}</Text>
        </Animated.View>
        
        <View style={styles.shareContainer}>
          <Text style={{fontSize:20}}>Share</Text> 
          <Text style={{fontSize:20, color:"red"}}>Us!</Text>
          <Text style={{marginTop:25, fontSize:20}}>Support</Text>
          <Text style={{marginTop:25,fontSize:20, color:"red"}}>Us!</Text>
        
          <TouchableOpacity onPress={handlePressFacebook}>
            <Image
              source={require('./assets/icons8-facebook-48.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressInstagram}>
            <Image
              source={require('./assets/icons8-instagram-48.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressWhatsapp}>
            <Image
              source={require('./assets/icons8-whatsapp-48.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  coinsText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    backgroundColor: '#e1e3e1',
  },
  shareIcon: {
    width: 60,
    height: 60,
  },
  
  coolQuote: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default MyComponent;
