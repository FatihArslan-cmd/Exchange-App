import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from './functions/CustomText';

const FAQ = () => {
 

  const faqList = [
    { question: 'React Native nedir?', answer: 'React Native, Facebook tarafından geliştirilen açık kaynaklı bir mobil uygulama çerçevesidir. JavaScript ve React kullanılarak iOS ve Android için native mobil uygulamalar geliştirmek için kullanılır.' },
    { question: 'React Nativei nasıl öğrenebilirim?', answer: 'React Native öğrenmek için temel JavaScript ve React bilgisine ihtiyacınız vardır. Ayrıca, React Nativein resmi belgelerini takip ederek ve örnek projeler üzerinde pratik yaparak becerilerinizi geliştirebilirsiniz.' },
    { question: 'React Native performansı nasıldır?', answer: 'React Native, platforma özgü bileşenlerle birleştirilmiş JavaScript kodunu çalıştırır. Doğru yapılandırıldığında ve optimize edildiğinde iyi performans gösterebilir, ancak karmaşık uygulamalarda performans sorunları yaşanabilir.' },
    // Ek sıkça sorulan soruları buraya ekleyebilirsiniz
  ];

  const [expanded, setExpanded] = React.useState(false);
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);

  const toggleQuestion = (index) => {
    if (selectedQuestion === index) {
      setExpanded(false);
      setSelectedQuestion(null);
    } else {
      setExpanded(true);
      setSelectedQuestion(index);
    }
  };

  const handlePressLinkedin = () => {
    Linking.openURL('https://www.linkedin.com/in/fatih-arslan-4582231b1/');
  };

  const handlePressGmail = () => {
    Linking.openURL('mailto:fatih.arslan12@ogr.sakarya.edu.tr');
  };
  const packageJson = require('./package.json');
  const version = packageJson.version;
  return (
    <ScrollView style={styles.container}>
       <View style={{marginTop:50, flexDirection: 'row',}}>
      <CustomText fontFamily="bungee"style={styles.contactText}>CHANGE LANG</CustomText>
      <Image 
      source={require('./assets/icons8-arrow-64.png')} 
      style={{ borderRadius: 10 }}
    />
      <TouchableOpacity onPress={handlePressGmail}>
          <Image source={require('./assets/try.png')} style={styles.contactIcon} />
        </TouchableOpacity>
       </View>
      <View style={styles.contactContainer}>
        <CustomText fontFamily="bungee" style={styles.contactText}>CONTACT ME VIA</CustomText>
        <Image source={require('./assets/icons8-arrow-64.png')} style={styles.contactIcon} />
        <TouchableOpacity onPress={handlePressLinkedin}>
          <Image source={require('./assets/icons8-linkedin-48.png')} style={styles.contactIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressGmail}>
          <Image source={require('./assets/new.png')} style={styles.contactIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.frame}>
        <Text style={styles.title}>FAQ - v{packageJson.version}</Text>
        {faqList.map((faq, index) => (
          <TouchableOpacity key={index} onPress={() => toggleQuestion(index)} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {selectedQuestion === index && expanded && <Text style={styles.answer}>{faq.answer}</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{fontSize: 16,
                    fontWeight: 'bold',
                    color: 'gray',
                    textAlign:'center' }}>
                    All Rights Reserved © 2024</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor:'#E6EBF9',
  },
  frame: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 10,
    backgroundColor:'#E6EBF9',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  answer: {
    marginLeft: 10,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom:60,
  },
  contactText: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: 'orange',
    padding: 15,
    fontSize: 15,
    maxWidth: 160,
    maxHeight: 50,
    textAlign: 'center',
    marginLeft: 10,
    fontFamily:'pop2',
  },
  contactIcon: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});

export default FAQ;
