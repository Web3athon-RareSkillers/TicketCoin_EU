
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
import { AuthContext } from '../../AuthContext';
import { useConnection } from '@solana/wallet-adapter-react';
import { useAuthorization } from '../components/AuthorizationProvider';




export default function Home({ navigation, route }) {
    const { user, isLoading, login, logout } = useContext(AuthContext);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    const { connection } = useConnection();
    const { selectedAccount } = useAuthorization();
    const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
    const [balance, setBalance] = useState(0);
    const LAMPORTS_PER_SOL = 1000000000;
    function convertLamportsToSOL(lamports) {
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
            (lamports || 0) / LAMPORTS_PER_SOL,
        );
    }
    const fetchAndUpdateBalance = useCallback(
        async (account) => {
            console.log('Fetching balance for: ' + account.publicKey);
            const fetchedBalance = await connection.getBalance(account.publicKey);
            console.log('Balance fetched: ' + fetchedBalance);
            setBalance(fetchedBalance)
        },
        [connection],
    );
    useEffect(() => {
        
            if (!selectedAccount) {
                console.log(error)
            }
            console.log(user)

            fetchAndUpdateBalance(selectedAccount);
        
    }, [fetchAndUpdateBalance, user, selectedAccount]);
    return (
        <>
            <SafeAreaView >


                <StatusBar translucent={true} backgroundColor={'transparent'} />

            </SafeAreaView>

            <View style={{ flex: 1, justifyContent: "flex-start", backgroundColor: "#050203" }}>



                <View style={{ padding: 30, flexDirection: "row", flex: 1, position: 'absolute' }}>
                    <Col sm={12} >



                        <Row size={12} style={{ marginTop: 20, marginBottom: 20, }}>
                            <View style={{ flexDirection: 'column', marginTop: 80, alignItems: 'center' }}>
                                <Text style={{
                                    color: 'white', fontFamily: "NexaBold", fontSize: 18, textAlign: 'center',
                                }}>
                                    wallet Address: {selectedAccount  && selectedAccount.address}
                                    
                                </Text>
                                <Text style={{
                                    color: 'white', fontFamily: "NexaBold", fontSize: 18,marginTop:20, textAlign: 'center',
                                }}>
                                  
                                    {balance !== null
                                        ? `Balance: ${convertLamportsToSOL(balance)} SOL`
                                        : 'Loading balance...'}
                                </Text>
                            </View>

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

