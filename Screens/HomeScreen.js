import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Linking, Animated} from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../functions/CustomText'; 



const MyComponent = () => {
  const navigation = useNavigation();
  const [animatedValue] = React.useState(new Animated.Value(0));
  const [showQuote, setShowQuote] = React.useState(false);
  const [quoteOpacity] = React.useState(new Animated.Value(0));
  
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
    <View style={{ marginTop: 50, backgroundColor:'#E6EBF9',flex:1 }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TouchableOpacity onPress={() => navigation.navigate('CoinsScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/icons8-bitcoin-48.png')}
                style={styles.image}
              />
            </View>
            <CustomText style={styles.coinsText}>CRYPTOCURRENCY</CustomText>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CurrencyScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/icons8-currency-50.png')}
                style={styles.image}
              />
            </View>
            <CustomText style={styles.coinsText}>CURRENCIES</CustomText>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FavoriesScreen')}>
          <Card style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/icons8-favorites-48.png')}
                style={styles.image}
              />
            </View>
            <CustomText style={styles.coinsText}>FAVORIES</CustomText>
          </Card>
        </TouchableOpacity>

        <CustomText style={styles.Headertext}>
          The most reliable & comprehensive <CustomText style={{color: 'blue'}}>cryptocurrency market app</CustomText> for traders
        </CustomText>
        

      
        <TouchableOpacity onPress={toggleQuote}>
          <Image
            source={require('../assets/icons8-easter-egg-48.png')}
          />
        </TouchableOpacity>
         
        <Animated.View style={{ opacity: quoteOpacity }}>
          <CustomText style={styles.coolQuote}>Never  
          <CustomText style={{color: 'red'}}> give up </CustomText> 
           on the stock market, for even in its chaos lies 
          <CustomText style={{color: 'gold'}}> opportunity.</CustomText>
          </CustomText>
        </Animated.View>
        
        <View style={styles.shareContainer}>
          <CustomText style={{fontSize:20}}>Share</CustomText> 
          <CustomText style={{fontSize:20, color:"red"}}>Us!</CustomText>
          <CustomText style={{marginTop:25, fontSize:20}}>Support</CustomText>
          <CustomText style={{marginTop:25,fontSize:20, color:"red"}}>Us!</CustomText>
        
          <TouchableOpacity onPress={handlePressFacebook}>
            <Image
              source={require('../assets/icons8-facebook-48.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressInstagram}>
            <Image
              source={require('../assets/icons8-instagram-48.png')}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressWhatsapp}>
            <Image
              source={require('../assets/icons8-whatsapp-48.png')}
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
  Headertext:
  {
    marginBottom:20,
    marginLeft:20,
    marginTop:20,
  fontSize:25,
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
    
  },
  shareContainer: {
    marginLeft:3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E6EBF9',
  },
  shareIcon: {
    width: 60,
    height: 60,
  },
  
  coolQuote: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});

export default MyComponent;
