import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import RoundedButton from '../components/roundedButton';
import TransparentButton from '../components/transparentButton';
import { useAuthorization } from '../components/AuthorizationProvider';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';
import { toUint8Array } from 'js-base64';
import { AuthContext } from '../../AuthContext';



import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from '@metaplex-foundation/js';
const SCREEN_WIDTH = Dimensions.get('window').width;

export const APP_IDENTITY = {
  name: 'TicketCoin',
  uri: 'https://ticketcoin.com',
  icon: '../assets/images/logo_mini.png',
};

function getPublicKeyFromAddress(address) {
  const publicKeyByteArray = toUint8Array(address);
  return new PublicKey(publicKeyByteArray);
}

function convertLamportsToSOL(lamports) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
    (lamports || 0) / LAMPORTS_PER_SOL,
  );
}

function getAccountFromAuthorizedAccount(account) {
  return {
    ...account,
    publicKey: getPublicKeyFromAddress(account.address),
  };
}

function Onboarding({ navigation }) {
  const { authorizeSession } = useAuthorization();
  const [collections, setCollections] = useState([]);

  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
  const metaplex = new Metaplex(connection);

  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const { user, isLoading, login, logout } = useContext(AuthContext);
  function parseNFTMetadata(data) {
    console.log(data)
    // Implement your own parsing logic based on the metadata structure of your NFTs
    // Example: return JSON.parse(data);
    return null; // Return null if parsing fails or metadata is not available
  }
  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);

      await transact(async wallet => {
        const authResult = await wallet.authorize({
          cluster: 'mainnet-beta',
          identity: APP_IDENTITY,
        });
        const { accounts, auth_token } = authResult;
        let pubk = getPublicKeyFromAddress(accounts[0].address)
        let nftCollection = []

        // After authorizing, store the authResult with the onConnect callback we pass into the button
        // console.log({
        //   address: accounts[0].address,
        //   label: accounts[0].label,
        //   authToken: auth_token,
        //   publicKey: getPublicKeyFromAddress(accounts[0].address),
        // });
        try {
          const tokenAccounts = await connection.getTokenAccountsByOwner(
            pubk,
            {
              programId: TOKEN_PROGRAM_ID,
            }
          );
         
          // console.log("Token                                         Balance");
          // console.log("------------------------------------------------------------");
          tokenAccounts.value.forEach(async (tokenAccount) => {
            const accountData = AccountLayout.decode(tokenAccount.account.data);

            // console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`);
            const mintAddress = new PublicKey(accountData.mint)
            const nft = await metaplex.nfts().findByMint({ mintAddress });

            
            if (nft.uri) {
              let response = await fetch(nft.uri);
              let json = await response.json();
              nftCollection.push({id:nftCollection.length+1,title:json.name,image:json.image,collection:true})

            }
          })

          login({
            address: accounts[0].address,
            label: accounts[0].label,
            authToken: auth_token,
            publicKey: getPublicKeyFromAddress(accounts[0].address),
            nftCollection:nftCollection
          });

        }
        catch (err) {
          console.error(err)
        }
        navigation.navigate('Home');
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);

  const skipConnection = () => {
    navigation.navigate('Home');
  };



  // Animation for pulsing wallet image
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const verticalAnimation = useRef(new Animated.Value(0)).current;

  const startAnimations = () => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(verticalAnimation, {
            toValue: -10,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(verticalAnimation, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimations();
  }, []);
  return (
    <>
      <SafeAreaView>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.walletContainer}>
          <Animated.Image
            source={require('../assets/images/wallet.png')}
            style={[
              {
                transform: [
                  { scale: pulseAnimation },
                  { translateY: verticalAnimation },
                ],
              },
            ]}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Connect your wallet</Text>
          <Text style={styles.subtitle}>
            Attach your wallet to get full access of event tickets from booking,
            buying and verifying
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <RoundedButton
            onPress={() => handleConnectPress()}
            title={'Connect wallet'}
          />
          <TransparentButton
            onPress={() => skipConnection()}
            title={'Skip for now'}
          />
        </View>
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

export default Onboarding;
