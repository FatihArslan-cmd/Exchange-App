import React, { useState } from 'react';
import { View, Button, Image, Modal, Text } from 'react-native';

const App = () => {
  const [showImage, setShowImage] = useState(false);

  const handleButtonPress = () => {
    setShowImage(true);
    setTimeout(() => {
      setShowImage(false);
    }, 2000); // 2 saniye sonra göstermeyi durdur
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Fotoğrafı Göster" onPress={handleButtonPress} />
      <Modal visible={showImage} transparent={true} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./assets/news.jpg')} style={{ width: 300, height: 650 }} />
        </View>
      </Modal>
    </View>
  );
};

export default App;
