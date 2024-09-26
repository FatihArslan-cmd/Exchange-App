import React, { useState } from 'react';
import { Card, TextInput, Text, useTheme } from 'react-native-paper';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import CustomText from '../functions/CustomText';
import newsData from '../news/newsdata.json'; // Import the JSON file

const { width } = Dimensions.get('window');

const NewsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const filteredNewsData = newsData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNewsItem = (item, index) => (
    <Card key={index} style={styles.card}>
      {item.image ? <Card.Cover source={{ uri: item.image }} style={styles.image} /> : null}
      <Card.Content style={styles.cardContent}>
        <CustomText style={styles.title}>{item.title}</CustomText>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(item.addedDate)}</Text>
          <Text style={styles.source}>{item.source}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  const formatDate = (addedDate) => {
    const currentDate = moment();
    const hoursSinceAdded = currentDate.diff(moment(addedDate), 'hours');

    if (hoursSinceAdded < 24) {
      return `${hoursSinceAdded} hour${hoursSinceAdded !== 1 ? 's' : ''} ago`;
    }
    const daysSinceAdded = Math.floor(hoursSinceAdded / 24);
    if (daysSinceAdded < 7) {
      return `${daysSinceAdded} day${daysSinceAdded !== 1 ? 's' : ''} ago`;
    } else if (daysSinceAdded < 30) {
      const weeksSinceAdded = Math.floor(daysSinceAdded / 7);
      return `${weeksSinceAdded} week${weeksSinceAdded !== 1 ? 's' : ''} ago`;
    } else if (daysSinceAdded < 365) {
      const monthsSinceAdded = Math.floor(daysSinceAdded / 30);
      return `${monthsSinceAdded} month${monthsSinceAdded !== 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(daysSinceAdded / 365)} year${Math.floor(daysSinceAdded / 365) !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/icons8-search-50.png')}
          style={styles.searchIcon}
        />
        <TextInput
          mode="outlined"
          placeholder="Search news..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchInput}
        />
        <Image source={require('../assets/icons8-money-48.png')} style={styles.moneyIcon} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredNewsData.map(renderNewsItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    height: 40,
  },
  moneyIcon: {
    width: 35,
    height: 35,
  },
  scrollView: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    height: 180,
    width: '100%',
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#E6EBF9',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  source: {
    fontSize: 12,
    color: 'gray',
  },
});

export default NewsScreen;
