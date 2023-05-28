import React, { useContext, useEffect, useState } from 'react';

import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import SearchBar from '../components/SearchBar';
import RoundedButton from '../components/roundedButton';
import Footer from '../components/Footer';
import globalStyles from '../globalStyles';
import { AuthContext } from '../../AuthContext';
import CarouselComponent from '../components/CarouselComponent';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Collections({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user, isLoading, login, logout } = useContext(AuthContext);
  useEffect(()=>{
console.log(user)

  }, [])
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
            <Row size={12} style={styles.carouselRow}>
              {user && <CarouselComponent navigation={navigation}
                data={user.nftCollection}></CarouselComponent>}
            </Row>
          </Col>
        </View>

      </View>
      <View style={globalStyles.footerContainer}>
        <Footer></Footer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0C0C0D',
  },
  walletContainer: {
    marginTop: 140,
    marginBottom: 64,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 56,
  },
  title: {
    color: 'white',
    fontFamily: 'NexaBold',
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: '#999999',
    fontFamily: 'NexaLight',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    width: SCREEN_WIDTH - 32,
    marginBottom: 64,
    gap: 16,
    maxHeight: 120,
  },
});
