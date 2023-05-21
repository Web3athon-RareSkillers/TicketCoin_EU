import React, {useCallback, useContext, useEffect, useState} from 'react';
// import { Metaplex, keypairIdentity } from '@metaplex/js';

import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import {AuthContext} from '../../AuthContext';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {useAuthorization} from '../components/AuthorizationProvider';

import {Metaplex, walletAdapterIdentity} from '@metaplex-foundation/js';
import {clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';

export default function Home({navigation, route}) {
//   const connections = new Connection(clusterApiUrl('mainnet-beta'));
//   const mx = Metaplex.make(connections);

  const [nfts, setNfts] = useState([]);

  const {user, isLoading, login, logout} = useContext(AuthContext);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // const metaplex = new Metaplex(connection);

  const {selectedAccount} = useAuthorization();


  const { connection } = useConnection();

  const { wallet } = useWallet();

  const mx = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const [balance, setBalance] = useState(0);
  const LAMPORTS_PER_SOL = 1000000000;
  function convertLamportsToSOL(lamports) {
    return new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
      (lamports || 0) / LAMPORTS_PER_SOL,
    );
  }
  const fetchAndUpdateBalance = useCallback(
    async account => {
      try {
        console.log(account);
        console.log('Fetching balance for: ' + account.publicKey);
        const fetchedBalance = await connection.getBalance(account.publicKey);
        console.log('Balance fetched: ' + fetchedBalance);
        // setBalance(fetchedBalance);
        // const publicKey = new PublicKey(account.publicKey);
        // getUserNFTs(account.publicKey).then(nfts => console.log(nfts));
        //const nfts = await metaplex.getNFTsForOwner(account.publicKey);
        //setNfts(nfts);

        // const list = await mx
        //   .nfts()
        //   .findAllByOwner({  owner: mx.identity().publicKey});

       console.log(list);
      } catch (err) {
        console.error(err);
      }
    },
    [connection],
  );

  const getUserNFTs = async publicKey => {
    try {
      const tokenAccounts = await connection.getAccountInfo(publicKey);
      console.log(tokenAccounts);
      // Create an NFT object for each NFT.
      const nfts = tokenAccounts.data.map(account => {
        return new NFT(account);
      });
      // const publicKeyStr = new PublicKey(publicKey);

      // // Use the Metaplex client to get the user's NFTs
      // const userNfts = await metaplex.metadata().forOwner(publicKeyStr);

      // Log the retrieved NFTs
      console.log(nfts);
      return nfts;
    } catch (err) {
      console.error('Error fetching user NFTs:', err);
    }
  };
  useEffect(() => {
    if (!selectedAccount) {
      console.log(error);
    }
    console.log(user);

    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, user, selectedAccount]);
  return (
    <>
      <SafeAreaView>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
      </SafeAreaView>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: '#050203',
        }}>
        <View
          style={{
            padding: 30,
            flexDirection: 'row',
            flex: 1,
            position: 'absolute',
          }}>
          <Col sm={12}>
            <Row size={12} style={{marginTop: 20, marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 80,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'NexaBold',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  wallet Address: {selectedAccount && selectedAccount.address}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'NexaBold',
                    fontSize: 18,
                    marginTop: 20,
                    textAlign: 'center',
                  }}>
                  {balance !== null
                    ? `Balance: ${convertLamportsToSOL(balance)} SOL`
                    : 'Loading balance...'}
                </Text>
              </View>
            </Row>
          </Col>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
