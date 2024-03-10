import React, { useState } from 'react';
import { Card, Text } from 'react-native-paper';
import { View, ScrollView, TextInput, Image } from 'react-native';
import moment from 'moment';
import CustomText from '../functions/CustomText';
import newsData from '../news/newsdata.json'; // Import the JSON file

const NewsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNewsData = newsData.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderNewsItem = (item, index) => (
    <Card key={index}>
      {item.image ? <Card.Cover source={{ uri: item.image }} /> : null}
      <Card.Content>
        <View style={{ backgroundColor: '#E6EBF9', padding: 16, borderRadius: 8 }}>
          <CustomText style={{ fontSize: 24, margin: 10 }}>{item.title}</CustomText>
          <Text variant="bodyMedium">{item.content}</Text>
          <Text variant="titleSmall" style={{ color: 'gray', left: 170, bottom: -10 }}>
            Added {formatDate(item.addedDate)}
          </Text>
          <Text variant="titleSmall" style={{ color: 'gray', left: 20, bottom: 10 }}>
            {item.source}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const formatDate = (addedDate) => {
    const currentDate = moment();
    const hoursSinceAdded = currentDate.diff(moment(addedDate), 'hours');

    let formattedDate = '';
    if (hoursSinceAdded < 24) {
      formattedDate = `${hoursSinceAdded} hour${hoursSinceAdded !== 1 ? 's' : ''} ago`;
    } else {
      const daysSinceAdded = Math.floor(hoursSinceAdded / 24);
      if (daysSinceAdded < 7) {
        formattedDate = `${daysSinceAdded} day${daysSinceAdded !== 1 ? 's' : ''} ago`;
      } else if (daysSinceAdded < 30) {
        const weeksSinceAdded = Math.floor(daysSinceAdded / 7);
        formattedDate = `${weeksSinceAdded} week${weeksSinceAdded !== 1 ? 's' : ''} ago`;
      } else if (daysSinceAdded < 365) {
        const monthsSinceAdded = Math.floor(daysSinceAdded / 30);
        formattedDate = `${monthsSinceAdded} month${monthsSinceAdded !== 1 ? 's' : ''} ago`;
      } else {
        formattedDate = `${Math.floor(daysSinceAdded / 365)} year${daysSinceAdded !== 1 ? 's' : ''} ago`;
      }
    }
    return formattedDate;
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../assets/icons8-search-50.png')}
          style={{ width: 25, height: 25, marginTop: 5 }}
        />
        <TextInput
          placeholder="Search news..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          style={{ paddingHorizontal: 100, paddingVertical: 1, backgroundColor: '#e8e6e6', marginLeft: 10 }}
        />
        <Image source={require('../assets/icons8-money-48.png')} style={{ width: 35, height: 35, marginLeft: 15 }} />
      </View>
      <ScrollView>
        {filteredNewsData.map(renderNewsItem)}
      </ScrollView>
    </View>
  );
};

export default NewsScreen;
