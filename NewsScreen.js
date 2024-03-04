import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import moment from 'moment';

const newsData = [
  {
    title: 'TURKISH LIRA IS CRASHING',
    content:
      'The Central Bank of Turkey held its benchmark interest rate at 45% in February, citing escalating inflation. This marks a shift from the previous trend of consecutive rate hikes and reflects the new governor\'s cautious approach.',
    image: 'https://as1.ftcdn.net/v2/jpg/03/99/88/74/1000_F_399887421_6y12MDNR1E9OVofnxiDsgXnHOq9fc27Z.jpg',
    source: 'Financial Times',
    addedDate: '2024-02-27'
  },
  {
    title: 'Interest rate messages from Fed officials',
    content:
      'The Fed has maintained its policy interest rate in the range of 5.25-5.5 percent since July, and interest rates are not expected to change at the bank\'s March meeting. The first interest rate cut in the markets is expected in June. In line with the Fed\'s December forecasts, interest rate cuts are priced in at least three times this year.',
    image: 'https://geoim.bloomberght.com/2024/02/29/ver1709233682/2348494_620x349.jpg',
    source: 'Bloomberg',
    addedDate: '2024-03-01'
  },
  {
    title: "Nvidia CEO Jensen Huang: Don't learn coding, artificial intelligence will do this job now",
    content:
      "Nvidia's CEO Jensen Huang said that children should no longer learn coding, but should instead specialize in fields such as chemistry and biology. Huang cited the fact that artificial intelligence turns everyone into a programmer as the reason for this.",
    image: 'https://i.gazeteoksijen.com/2/850/478/storage/files/images/2024/02/28/nvidia-ceosu-jensen-huang-kodlama-ogrenmeyin-bu-isi-artik-yapay-zeka-yapacak-8t5y.jpg',
    source: 'Gazete Oksijen',
    addedDate: '2024-02-22'
  },
  {
    title: 'BTC skyrockets',
    content:
      'Btc has gone up by %40 since the new year. BTC reached its historical peak',
    image: 'https://static.news.bitcoin.com/wp-content/uploads/2024/02/btc900000.jpg',
    source: 'Bitcoin.com',
    addedDate: '2024-02-21'
  },
  {
    title: "It was going to rival Tesla: It became clear how much money was spent on the canceled Apple Car project",
    content:
      'While Apple stated that it would direct the staff involved in the project to productive artificial intelligence work, a report published by The New York Times revealed the size of the money spent on the Apple Car. It was determined that Apple invested approximately 10 billion dollars in the project, which was started in 2014 and terminated in 2024.',
    image: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1j6Xen.img?w=768&h=432&m=6',
    source: 'www.msn.com',
    addedDate: '2024-02-27'
  },
];

const NewsScreen = () => {
  return (
    <ScrollView>
      {newsData.map((item, index) => {
        const contentAddedDate = moment(item.addedDate);
        const currentDate = moment();
        const hoursSinceAdded = currentDate.diff(contentAddedDate, 'hours');

        let formattedDate = '';
        if (hoursSinceAdded < 24) {
          formattedDate = `${hoursSinceAdded} saat önce`;
        } else {
          const daysSinceAdded = Math.floor(hoursSinceAdded / 24);
          if (daysSinceAdded < 7) {
            formattedDate = `${daysSinceAdded} gün önce`;
          } else if (daysSinceAdded < 30) {
            const weeksSinceAdded = Math.floor(daysSinceAdded / 7);
            formattedDate = `${weeksSinceAdded} hafta önce`;
          } else if (daysSinceAdded < 365) {
            const monthsSinceAdded = Math.floor(daysSinceAdded / 30);
            formattedDate = `${monthsSinceAdded} ay önce`;
          } else {
            formattedDate = `${Math.floor(daysSinceAdded / 365)} yıl önce`;
          }
        }

        return (
          <Card key={index}>
            {item.image ? <Card.Cover source={{ uri: item.image }} /> : null}
            <Card.Content>
              <View style={{ backgroundColor: '#f04f0f0', padding: 16, borderRadius: 8 }}>
                <Text variant="titleLarge" style={{margin:10}}>{item.title}</Text>
                <Text variant="bodyMedium">{item.content}</Text>
                <Text variant="titleSmall" style={{ color: 'gray', left: 170, bottom: -10 }}>
                  Added {formattedDate}
                </Text>
                <Text variant="titleSmall" style={{ color: 'gray', left: 20,bottom:10}}>
                {item.source}
                </Text>
              </View>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default NewsScreen;
