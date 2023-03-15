// Chakra imports
import { Button, Flex, Link, Text } from '@chakra-ui/react';

// Assets
import banner from './EmployerBanner.jpg';

import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
    Account,
    getMint,
    getAccount
} from '@solana/spl-token';
import React, { useState } from 'react';

// Special setup to add a Buffer class, because it's missing
window.Buffer = window.Buffer || require("buffer").Buffer;



export default function Banner() {
    let [result, setResult] = useState("");
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    // Public Key to your Phantom Wallet
    // const toWallet = "Ex9JQuRGaUf4yBM2joQ58d7FBScBnndbHQebe5muBPLq";
    const toWallet = new PublicKey("5xeeH5vXhxX358kJ89v46oUxnzQiZKbz1GGnVKsKDCNH");
    let fromTokenAccount: Account;
    let mint: PublicKey;


    async function createToken() {
        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);

        // Create new token mint
        mint = await createMint(
            connection,
            fromWallet,
            fromWallet.publicKey,
            null,
            9 // 9 here means we have a decmial of 9 0's
        );
        console.log(`Create token: ${mint.toBase58()}`);
        alert(`Step I : Created Token For Fitness Account: ${mint.toBase58()}`);

        // Get the token account of the fromWallet address, and if it does not exist, create it
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );
        console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);

        alert(`Step II :Created Employee Fitness Account : ${fromTokenAccount.address.toBase58()}`);
        // setResult(`Create token: ${mint.toBase58()}` + "\n" +` Create Token Account: ${fromTokenAccount.address.toBase58()}`);
        // address=fromTokenAccount.address;

    }

    async function mintToken() {
        // Mint 1 new token to the "fromTokenAccount" account we just created
        const signature = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet.publicKey,
            10000000000 // 10 billion
        );
        console.log(`Mint signature: ${signature}`);
        alert(`Added 1000 Solana Successsfully with Transaction ID: ${signature}`);
        // setResult(`Mint signature: ${signature}`);
    }

    async function checkBalance() {
        // get the supply of tokens we have minted into existance
        const mintInfo = await getMint(connection, mint);
        console.log(mintInfo.supply);

        // get the amount of tokens left in the account
        const tokenAccountInfo = await getAccount(connection, fromTokenAccount.address);
        console.log(tokenAccountInfo.amount);
        alert(`Availabe Funds in Account: ${tokenAccountInfo.amount} Tokens, 1000 Solana`);
    }

    async function sendToken() {
        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);
        console.log(`toTokenAccount ${toTokenAccount.address}`);

        const signature = await transfer(
            connection,
            fromWallet,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            1000000000 // 1 billion
        );
        console.log(`finished transfer with ${signature}`);
        alert(`finished transfer with ${signature}`);
    }
    // Chakra Color Mode
    return (
        <Flex
            direction='column'
            bgImage={banner}
            bgSize='width: 350px;
            height: 350px;'
            py={{ base: '30px', md: '56px' }}
            px={{ base: '30px', md: '64px' }}
            borderRadius='30px'>
            <Text
             
                fontSize={{ base: '24px', md: '34px' }}
                color='lightblue'
                mb='14px'
                maxW={{
                    base: '100%',
                    md: '64%',
                    lg: '46%',
                    xl: '70%',
                    '2xl': '50%',
                    '3xl': '42%'
                }}
                fontWeight='700'
                lineHeight={{ base: '32px', md: '42px' }}>
                Welcome Microsys Employee Wellness Admin
            </Text>
            <Text
                fontSize='small'
                color='#E3DAFF'
                maxW={{
                    base: '100%',
                    md: '64%',
                    lg: '40%',
                    xl: '56%',
                    '2xl': '46%',
                    '3xl': '34%'
                }}
                fontWeight='500'
                mb='40px'
                lineHeight='28px'>
                You can create account, transfer funds and check funds balance!
            </Text>
            <div >

                <br></br>
                <Button
                    onClick={createToken}

                    bg='white'
                    color='black'
                    _hover={{ bg: 'whiteAlpha.900' }}
                    _active={{ bg: 'white' }}
                    _focus={{ bg: 'white' }}
                    fontWeight='500'
                    fontSize='14px'
                    py='10px'
                    px='19'
                    me='30px'>
                    Create Wellness Account
                </Button>

                <Button
                    onClick={mintToken}

                    bg='white'
                    color='black'
                    _hover={{ bg: 'whiteAlpha.900' }}
                    _active={{ bg: 'white' }}
                    _focus={{ bg: 'white' }}
                    fontWeight='500'
                    fontSize='14px'
                    py='10px'
                    px='19'
                    me='30px'>
                    Add Solana Fitness Fund
                </Button>
                <Button
                    onClick={checkBalance}

                    bg='white'
                    color='black'
                    _hover={{ bg: 'whiteAlpha.900' }}
                    _active={{ bg: 'white' }}
                    _focus={{ bg: 'white' }}
                    fontWeight='500'
                    fontSize='14px'
                    py='10px'
                    px='19'
                    me='30px'>
                    Check Solana Balance(s)
                </Button>
                {/* <Button
					onClick={mintToken}
					
                    bg ='white'
					color='black'
					_hover={{ bg: 'whiteAlpha.900' }}
					_active={{ bg: 'white' }}
					_focus={{ bg: 'white' }}
					fontWeight='500'
					fontSize='14px'
					py='10px'
					px='19'
					me='30px'>
					Send token
				</Button> */}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <h2 style={{ fontSize: 12 }}>Solana Funds Transfer History</h2>

                <table style={{ fontSize: 12, border: 3 }}>
                    <tr >
                        <th>|</th>
                        <th>Date</th>
                        <th>|</th>
                        <th>Funds</th>
                        <th>|</th>
                    </tr>
                    <tr>
                    <th>|</th>
                        <td>01.01.2023</td>
                        <th>|</th>
                        <td>1000</td>
                        <th>|</th>

                    </tr>
                    <tr>
                    <th>|</th>
                        <td>02.01.2023</td>
                        <th>|</th>
                        <td>1000</td>
                        <th>|</th>

                    </tr>
                </table>

            </div>
            <br></br>
            <div>
                <label style={{ fontSize: 10 }}>
                © Developed for Solana Grizzlython. All rights reserverd by Employee WellnessFi.
                </label>
            </div>
        </Flex>
        
    );
}
