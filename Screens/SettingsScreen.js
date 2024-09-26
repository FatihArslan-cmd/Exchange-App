import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Linking, LayoutAnimation, Platform, UIManager } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../functions/CustomText';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQ = () => {
  const faqList = [
    { question: 'What is the aim of the APP', answer: 'Transmit real-time data to users with great accuracy.' },
    { question: 'Will there be more language support?', answer: 'As the community expands, we will eagerly expand the variety of languages.' },
    { question: 'Which programming language has been used to develop?', answer: 'React Native is the language that has been used.' },
  ];

  const [expanded, setExpanded] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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

  const packageJson = require('../package.json');

  return (
    <ScrollView style={styles.container}>
      {/* Language Change Section */}
      <View style={styles.header}>
        <CustomText fontFamily="bungee" style={styles.languageText}>CHANGE LANG</CustomText>
        <Image source={require('../assets/icons8-arrow-64.png')} style={styles.arrowIcon} />
        <TouchableOpacity onPress={handlePressGmail}>
          <Image source={require('../assets/try.png')} style={styles.contactIcon} />
        </TouchableOpacity>
      </View>

      {/* Contact Section */}
      <View style={styles.contactContainer}>
        <CustomText fontFamily="bungee" style={styles.contactText}>CONTACT ME VIA</CustomText>
        <TouchableOpacity onPress={handlePressLinkedin}>
          <Image source={require('../assets/icons8-linkedin-48.png')} style={styles.contactIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressGmail}>
          <Image source={require('../assets/new.png')} style={styles.contactIcon} />
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View style={styles.frame}>
        <CustomText fontFamily="bungee" style={styles.title}>FAQ - v{packageJson.version}</CustomText>
        {faqList.map((faq, index) => (
          <TouchableOpacity key={index} onPress={() => toggleQuestion(index)} style={styles.faqItem}>
            <CustomText style={styles.question}>{faq.question}</CustomText>
            {selectedQuestion === index && expanded && <Text style={styles.answer}>{faq.answer}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>All Rights Reserved © 2024</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
    padding: 10,
    borderColor: '#F97316',
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    color: '#111827',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  contactText: {
    fontSize: 18,
    color: '#F97316',
  },
  contactIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  frame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  faqItem: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#4B5563',
  },
  footer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FAQ;
