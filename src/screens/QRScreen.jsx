import React, { useContext, useEffect, useState } from 'react';

import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';

import Footer from '../components/Footer';
import globalStyles from '../globalStyles';
import RoundedButton from '../components/roundedButton';
import { AuthContext } from '../../AuthContext';
import { keypairIdentity, Metaplex, SendAndConfirmTransactionResponse } from '@metaplex-foundation/js';
import { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createInitializeMintInstruction, MINT_SIZE, mintTo, mintToInstructionData, createMint } from '@solana/spl-token';
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol';


import * as Web3 from '@solana/web3.js'
import { APP_IDENTITY } from './Onboarding';

import { Buffer } from 'buffer';
import { TextEncoder } from 'fast-text-encoding'
import { ScrollView } from 'react-native';


// import {TextEncoder} from 'text-encoding';



export default function QRScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { user, isLoading, login, logout } = useContext(AuthContext);
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));

    const TOKEN_PROGRAM = "7CfS9hfXmqejz69Dx7kPhKxyNUwt1F8gmRTvAp1KyD3f"
    const ticketcoinSolanaProgram = new Web3.PublicKey("7CfS9hfXmqejz69Dx7kPhKxyNUwt1F8gmRTvAp1KyD3f")
    const memoProgramId = new Web3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")


    useEffect(() => {
        console.log(user)

    }, [])
    async function handleMinting() {
        // const myWallet = Keypair.generate();
        // await transact(async (mobileWallet) => {
        //     const authorizationResult = await mobileWallet.reauthorize({
        //         auth_token: user.auth_token,
        //         identity: APP_IDENTITY,
        //     });


        //     // console.log(authorizationResult)
        //     console.log("Minting Starts")
        //     // const lamports =
        //     // await connection.getMinimumBalanceForRentExemption(
        //     //   MINT_SIZE
        //     // );
        //     // console.log(user)
        //     let wallet = user;
        //     let collectNftPubKey;

        //     // const tokenProgramId = new PublicKey(TOKEN_PROGRAM_ID);
        //     // const walletPublicKey = new PublicKey(wallet.publicKey);
        //     try {
        //         const mintKey = Web3.Keypair.generate();
        //         // const NftTokenAccount = await getAssociatedTokenAddress(
        //         // {    mint:mintKey.publicKey,
        //         //     owner:wallet.publicKey}
        //         // );
        //         // console.log("NFT Account: ", NftTokenAccount.toBase58());

        //         // const mint_tx = new Web3.Transaction().add(
        //         //     Web3.SystemProgram.createAccount({
        //         //         fromPubkey: wallet.publicKey,
        //         //         newAccountPubkey: mintKey.publicKey,
        //         //         space: MINT_SIZE,
        //         //         programId: TOKEN_PROGRAM_ID,
        //         //         lamport:0
        //         //     }),
        //         //     createInitializeMintInstruction(
        //         //         mintKey.publicKey,
        //         //         0,
        //         //         wallet.publicKey,
        //         //         wallet.publicKey
        //         //     ),
        //         //     createAssociatedTokenAccountInstruction(
        //         //         wallet.publicKey,
        //         //         // NftTokenAccount,
        //         //         wallet.publicKey,
        //         //         mintKey.publicKey
        //         //     )
        //         // );

        //         const latestBlockhash = await connection.getLatestBlockhash();

        //         // Construct a transaction. This transaction uses web3.js `SystemProgram`
        //         // to create a transfer that sends lamports to randomly generated address.

        //         const messageBuffer = Buffer.from("NFT TEST")

        //         // const keypair = Web3.Keypair.generate();
        //         const memoProgramTransaction = new Web3.Transaction({
        //             ...latestBlockhash,
        //             feePayer: wallet.publicKey,
        //         }).add(
        //             new Web3.TransactionInstruction({
        //                 data: messageBuffer,
        //                 keys: [],
        //                 programId: memoProgramId,
        //             }),
        //         );

        //         // Send a `signAndSendTransactions` request to the wallet. The wallet will sign the transaction with the private key and send it to devnet.
        //         let res = await mobileWallet.signAndSendTransactions({
        //             transactions: [memoProgramTransaction],
        //         });
        //         console.log(res)
        //         // const tx_result = await connection.sendTransaction(mint_tx, [endUser, mintKey]);
        //         // console.log("Confirm transaction: ", await connection.confirmTransaction(tx_result));
        //         // console.log(
        //         //     await connection.getParsedAccountInfo(mintKey.publicKey)
        //         // );

        //         // console.log(
        //         //     await connection.getParsedAccountInfo(NftTokenAccount)
        //         // );



        //         // console.log("NFT Account: ", tx_result);
        //         // //console.log("Mint key: ", mintKey.publicKey.toString());
        //         // //console.log("User: ", wallet.publicKey.toString());

        //         // const metadataAddress = await getMetadata(mintKey.publicKey);
        //         // const masterEdition = await getMasterEdition(mintKey.publicKey);
        //         // const authorityRecord = await getUseAuthority(mintKey.publicKey, verifierPubKey);
        //         // const burnerAddress = await getBurner();

        //         // //console.log("Metadata address: ", metadataAddress.toBase58());
        //         // //console.log("MasterEdition: ", masterEdition.toBase58());
        //         // //console.log("AuthorityRecord: ", authorityRecord.toBase58());
        //         // //console.log("burner: ", burnerAddress.toBase58());



        //         // let program = new Program(IDL, ticketcoinSolanaProgram, new AnchorProvider(connection, new Wallet(endUser), {})); // TicketcoinContract as Program<TicketcoinContract>;

        //         // const tx = await program.methods.mintNft(
        //         //     mintKey.publicKey,
        //         //     "https://github.com/zigtur",
        //         //     "Zigtur Collection",
        //         // )
        //         //     .accounts({
        //         //         mintAuthority: endUser.publicKey,
        //         //         collection: collectNftPubKey,
        //         //         mint: mintKey.publicKey,
        //         //         tokenAccount: NftTokenAccount,
        //         //         tokenProgram: TOKEN_PROGRAM_ID,
        //         //         metadata: metadataAddress,
        //         //         tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        //         //         payer: endUser.publicKey,
        //         //         systemProgram: Web3.SystemProgram.programId,
        //         //         rent: Web3.SYSVAR_RENT_PUBKEY,
        //         //         masterEdition: masterEdition,
        //         //         useAuthorityRecord: authorityRecord,
        //         //         verifier: verifierPubKey,
        //         //         burner: burnerAddress,
        //         //     },
        //         //     )
        //         //     .rpc();
        //         // res.send("Mint Key: " + mintKey.publicKey.toString());



        //     } catch (error) {
        //         console.error(error);
        //     }
        // })
    }
    return (
        <>
            <View style={globalStyles.mainContainer}>
                <Row size={12} style={{ marginTop: 48, padding: 16, }}>
                    <Text>
                        <View style={{ position: "relative", flexDirection: "row" }}>
                            <Image
                                style={globalStyles.logo}
                                source={require('../assets/images/logo_mini.png')}
                            />
                            <Text style={globalStyles.ticketcoinText}>Ticketcoin</Text>
                        </View>
                    </Text>
                </Row>
                <ScrollView style={{ padding: 16, }}>




                    <Image
                        style={{ height: 400, width: 330, resizeMode: 'contain' }}
                        source={require('../assets/images/qr.png')}
                    />
                    <Text style={{ width: 330 }}>
                        Show this QR Code while entering event.
                        {"\n"}{"\n"}


                    </Text>
                    <View style={{ paddingBottom: 120 }}>



                    </View>


                </ScrollView>

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
