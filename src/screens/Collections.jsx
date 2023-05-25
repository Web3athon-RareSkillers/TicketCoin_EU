import React, {useState} from 'react';

import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import SearchBar from '../components/SearchBar';
import RoundedButton from '../components/roundedButton';
import Footer from '../components/Footer';
import globalStyles from '../globalStyles';

export default function Collections({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
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
              <SearchBar></SearchBar>
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
