import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const SCREEN_WIDTH = Dimensions.get('window').width;

const CarouselComponent = ({data}) => {
  const renderCard = ({item, index}) => {
    if (index === 0) {
      // If the card is the first one, set the left margin to avoid centering
      return (
        <View style={[styles.cardContainer, {marginLeft: 16}]}>
          <Image style={styles.cardImage} source={item.image} />
          {item.title ? (
            <View style={styles.cardPillContainer}>
              <View style={styles.cardPill}>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cardPillContainer}>
              <View style={styles.cardPillBackdrop} />
              <View style={styles.cardDescription}>
                <Text
                  style={
                    ({
                      fontFamily: 'NexaBold',
                    },
                    styles.cardTextLarge)
                  }>
                  {item.subTitle}
                </Text>
                <Text style={styles.cardText}>{item.eventCounter}</Text>
              </View>
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.cardContainer}>
          <Image style={styles.cardImage} source={item.image} />
          {item.title ? (
            <View style={styles.cardPillContainer}>
              <View style={styles.cardPill}>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cardDescription}>
              <View />
              <Text style={styles.cardTextLarge}>{item.subTitle}</Text>
              <Text style={styles.cardText}>{item.eventCounter}</Text>
            </View>
          )}
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderCard}
        sliderWidth={SCREEN_WIDTH - 32}
        sliderHeight={210}
        itemWidth={(SCREEN_WIDTH - 32) / 2}
        itemHeight={210}
        loop={true}
        loopClonesPerSide={10}
        snapToAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0D',
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  cardImage: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  cardPill: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardDescription: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  cardTextLarge: {
    color: 'white',
    fontFamily: 'NexaBold',
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 4,
  },
  cardText: {
    color: 'white',
    fontFamily: 'NexaLight',
    fontSize: 8,
  },
});

export default CarouselComponent;
