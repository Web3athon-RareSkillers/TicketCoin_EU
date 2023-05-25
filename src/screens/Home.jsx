import React, {useState} from 'react';

import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import SearchBar from '../components/SearchBar';
import CarouselComponent from '../components/CarouselComponent';
import RoundedButton from '../components/roundedButton';
import Footer from '../components/Footer';
import globalStyles from '../globalStyles';

export default function Home({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearchInputChange = text => {
    console.log('Search input value:', text);
  };

  // MOCK DATA FOR FEATURED EVENTS
  const featuredEventsSliderData = [
    {
      id: 1,
      title: 'Ed Sheeran',
      image: require('../assets/images/ed-sheeran.png'),
    },
    {
      id: 2,
      title: 'Super Bowl',
      image: require('../assets/images/super-bowl.png'),
    },
    {
      id: 3,
      title: 'Beyonce',
      image: require('../assets/images/beyonce.png'),
    },
    {
      id: 4,
      title: 'Gretan Van Fleet',
      image: require('../assets/images/gretan-van-fleet.png'),
    },
  ];

  // MOCK DATA FOR ALL EVENTS
  const allEventsSliderData = [
    {
      id: 1,
      subTitle: 'Ed Sheeran',
      eventCounter: '123 Events',
      image: require('../assets/images/ed-sheeran.png'),
    },
    {
      id: 2,
      subTitle: 'Super Bowl',
      eventCounter: '1 Event',
      image: require('../assets/images/super-bowl.png'),
    },
    {
      id: 3,
      subTitle: 'Beyonce',
      eventCounter: '109 Events',
      image: require('../assets/images/beyonce.png'),
    },
    {
      id: 4,
      subTitle: 'Gretan Van Fleet',
      eventCounter: '87 Events',
      image: require('../assets/images/gretan-van-fleet.png'),
    },
  ];
  return (
    <>
      <View style={globalStyles.mainContainer}>
        <View style={globalStyles.innerContainer}>
          <Col sm={12}>
            <Row size={12} style={globalStyles.headerWrap}>
              <Text>
                <View style={globalStyles.headerContainer}>
                  <Image
                    style={globalStyles.logo}
                    source={require('../assets/images/logo_mini.png')}
                  />
                  <Text style={globalStyles.ticketcoinText}>Ticketcoin</Text>
                </View>
              </Text>
            </Row>
            <Row size={12} style={globalStyles.searchBarRow}>
              <View>
                <SearchBar onInputChange={handleSearchInputChange}></SearchBar>
              </View>
            </Row>
            <Row size={12} style={styles.titleRow}>
              <Text style={globalStyles.textMediumBold}>Featured Event</Text>
            </Row>
            <Row size={12} style={styles.carouselRow}>
              <CarouselComponent
                data={featuredEventsSliderData}></CarouselComponent>
            </Row>
            <Row size={12} style={styles.titleRow}>
              <Text style={globalStyles.textMediumBold}>Events</Text>
            </Row>
            <Row size={12} style={globalStyles.categoryRow}>
              <View style={globalStyles.categoryContainer}>
                <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                  <Text
                    style={
                      selectedCategory === 'All'
                        ? globalStyles.selectedCategoryText
                        : globalStyles.unselectedCategoryText
                    }>
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCategory('Sport')}>
                  <Text
                    style={
                      selectedCategory === 'Sport'
                        ? globalStyles.selectedCategoryText
                        : globalStyles.unselectedCategoryText
                    }>
                    Sport
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCategory('Music')}>
                  <Text
                    style={
                      selectedCategory === 'Music'
                        ? globalStyles.selectedCategoryText
                        : globalStyles.unselectedCategoryText
                    }>
                    Music
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCategory('Art')}>
                  <Text
                    style={
                      selectedCategory === 'Art'
                        ? globalStyles.selectedCategoryText
                        : globalStyles.unselectedCategoryText
                    }>
                    Art
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedCategory('Food')}>
                  <Text
                    style={
                      selectedCategory === 'Food'
                        ? globalStyles.selectedCategoryText
                        : globalStyles.unselectedCategoryText
                    }>
                    Food
                  </Text>
                </TouchableOpacity>
              </View>
            </Row>
            <Row size={12} style={styles.carouselRow}>
              <CarouselComponent data={allEventsSliderData}></CarouselComponent>
            </Row>
          </Col>
        </View>
        <View style={globalStyles.floatingContainer}>
          <RoundedButton
            onPress={() => navigation.navigate('VerifyAttendee')}
            subTitle={'+   Verify Attendee'}
          />
        </View>
      </View>
      <View style={globalStyles.footerContainer}>
        <Footer></Footer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    marginBottom: 12,
  },
  carouselRow: {
    marginBottom: 16,
  },
});
