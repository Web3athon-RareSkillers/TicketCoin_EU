import React from 'react';

import {Image, StyleSheet, View, Text} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import SearchBar from '../components/SearchBar';
import RoundedButton from '../components/roundedButton';
import Footer from '../components/Footer';
import globalStyles from '../globalStyles';

export default function Notification({navigation}) {
  const handleSearchInputChange = text => {
    console.log('Search input value:', text);
  };
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
            <Row size={12}>
              <Text style={globalStyles.textMediumBold}>Notification</Text>
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
