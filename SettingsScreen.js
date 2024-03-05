// FAQ.js

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.title}>FAQ</Text>
        {faqList.map((faq, index) => (
          <TouchableOpacity key={index} onPress={() => toggleQuestion(index)} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            {selectedQuestion === index && expanded && <Text style={styles.answer}>{faq.answer}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
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
    backgroundColor: '#f0f0f0',
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
});

export default FAQ;
