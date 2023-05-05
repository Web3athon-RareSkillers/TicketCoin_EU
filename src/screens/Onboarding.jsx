
import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    View,
    Text,
} from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import RoundedButton from '../components/roundedButtons';
import TransparentButton from '../components/transparentButton';
import { useAuthorization } from '../components/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';
import { toUint8Array } from 'js-base64';
import { PublicKey } from '@solana/web3.js';
import { AuthContext } from '../../AuthContext';
import { useConnection } from '@solana/wallet-adapter-react';


export const APP_IDENTITY = {
    name: "TicketCoin",
    uri:  'https://ticketcoin.com',
    icon: "../assets/images/logo_mini.png",
  }


  function getPublicKeyFromAddress(address) {
    const publicKeyByteArray = toUint8Array(address)
    return new PublicKey(publicKeyByteArray)
  }
  function convertLamportsToSOL(lamports) {
    return new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
      (lamports || 0) / LAMPORTS_PER_SOL,
    );
  }
  
  
function getAccountFromAuthorizedAccount(account) {
    return {
      ...account,
      publicKey: getPublicKeyFromAddress(account.address)
    }
  } 
function Onboarding({ navigation }) {
    const {authorizeSession} = useAuthorization();
    const {connection} = useConnection();
    const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
    const { user, isLoading, login, logout } = useContext(AuthContext);

    const handleConnectPress = useCallback(async () => {
        try {
          if (authorizationInProgress) {
            return;
          }
          setAuthorizationInProgress(true);
          await transact(async wallet => {
            await authorizeSession(wallet);
            navigation.navigate("Home")
          });
        } finally {
          setAuthorizationInProgress(false);
        }
      }, [authorizationInProgress, authorizeSession]);
    const handleConnectPress1 = useCallback(async () => {await transact(async wallet => {
        // Transact starts a session with the wallet app during which our app
        // can send actions (like `authorize`) to the wallet.
        const authResult = await wallet.authorize({
          cluster: 'devnet',
          identity: APP_IDENTITY,
        });
        const {accounts, auth_token} = authResult;
  
        // After authorizing, store the authResult with the onConnect callback we pass into the button
        console.log({
          address: accounts[0].address,
          label: accounts[0].label,
          authToken: auth_token,
          publicKey: getPublicKeyFromAddress(accounts[0].address),
        });
        login({
            address: accounts[0].address,
            label: accounts[0].label,
            authToken: auth_token,
            publicKey: getPublicKeyFromAddress(accounts[0].address),
          })
        navigation.navigate("Home")
      })
    });
    return (
        <>
            <SafeAreaView >


                <StatusBar translucent={true} backgroundColor={'transparent'} />

            </SafeAreaView>

            <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#050203" }}>



                <View style={{ padding: 30, flexDirection: "row", flex: 1, position: 'absolute' }}>
                    <Col sm={12} >
                        <Row size={12} style={{}}>

                            <View style={{ flexDirection: 'row', marginTop: 100, alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/images/wallet.png')}
                                />
                            </View>
                        </Row>


                        <Row size={12} style={{ marginTop: 20, marginBottom: 20, }}>
                            <View style={{ flexDirection: 'column', marginTop: 80, alignItems: 'center' }}>
                                <Text style={{
                                    color: 'white', fontFamily: "NexaBold", fontSize: 18, textAlign: 'center',
                                }}>Connect your wallet</Text>
                                <Text style={{
                                    color: '#999999', fontFamily: "NexaLight", fontSize: 16, marginTop: 10, textAlign: 'center',
                                }}>Attach your wallet to get full access of event tickets from booking, buying and verifying</Text>

                            </View>

                        </Row>
                        <Row size={12} style={{ marginTop: 35 }}>
                            <RoundedButton onPress={() =>handleConnectPress()}  title={"Connect wallet"} />
                        </Row>
                        <Row size={12} style={{ marginTop: 20 }}>
                            <TransparentButton title={"Skip for now"} />
                        </Row>

                    </Col>

                </View >

            </View >
        </>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default Onboarding;