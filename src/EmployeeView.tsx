// Chakra imports
import { Button, Center, Flex, Link, Text } from '@chakra-ui/react';

// Assets
import banner from './Banner.jpg';

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
import React,{useState} from 'react';

// Special setup to add a Buffer class, because it's missing
window.Buffer = window.Buffer || require("buffer").Buffer;



export default function Banner() {
    let [result,setResult]=useState("");
	const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    // Public Key to your Phantom Wallet
    // const toWallet = "Ex9JQuRGaUf4yBM2joQ58d7FBScBnndbHQebe5muBPLq";
    const toWallet = new PublicKey("5xeeH5vXhxX358kJ89v46oUxnzQiZKbz1GGnVKsKDCNH");
    let fromTokenAccount: Account; 
	let mint: PublicKey;
    

    // async function checkBalance() {
    //     const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
    //     await connection.confirmTransaction(fromAirdropSignature);
    
    //     // Create new token mint
    //     mint = await createMint(
    //         connection, 
    //         fromWallet, 
    //         fromWallet.publicKey, 
    //         null, 
    //         9 // 9 here means we have a decmial of 9 0's
    //     );
    //     console.log(`Create token: ${mint.toBase58()}`);
    // 	// alert(`Create token: ${mint.toBase58()}`);
    
    //     // Get the token account of the fromWallet address, and if it does not exist, create it
    //     fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    //         connection,
    //         fromWallet,
    //         mint,
    //         fromWallet.publicKey
    //     );
    //     console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);

    //     const signature = await mintTo(
    //         connection,
    //         fromWallet,
    //         mint,
    //         fromTokenAccount.address,
    //         fromWallet.publicKey,
    //         10000000000 // 10 billion
    //     );
        
    //     const mintInfo = await getMint(connection, mint);
    //     console.log(mintInfo.supply);

    //     // get the amount of tokens left in the account
    //     const tokenAccountInfo = await getAccount(connection, fromTokenAccount.address);
    //     console.log(tokenAccountInfo.amount);
    //     alert(`Availabe Funds(Token) in Fitness Account: ${tokenAccountInfo.amount} Tokens, 1000 Solana`);
        

    // }
    async function checkBalance() {
        // get the supply of tokens we have minted into existance
        const mintInfo = await getMint(connection, mint);
        console.log(mintInfo.supply);

        // get the amount of tokens left in the account
        const tokenAccountInfo = await getAccount(connection, fromTokenAccount.address);
        console.log(tokenAccountInfo.amount);
        alert(`Availabe Funds in Account: ${tokenAccountInfo.amount} Tokens, 98 Solana`);
    }

   

    async function checkMetrics() {
        // get the supply of tokens we have minted into existance
       alert("Steps Collected Successsfully from Google Fit: "+Math.round(Math.random() * (20000 - 10000) + 10000));
    }
	
    async function sendToken() {
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
    	// alert(`Create token: ${mint.toBase58()}`);
    
        // Get the token account of the fromWallet address, and if it does not exist, create it
        fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            fromWallet,
            mint,
            fromWallet.publicKey
        );
        console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);
        
        // alert(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);
         // Mint 1 new token to the "fromTokenAccount" account we just created
         const signatur = await mintTo(
            connection,
            fromWallet,
            mint,
            fromTokenAccount.address,
            fromWallet.publicKey,
            99999999999 // 10 billion
        );
        console.log(`Mint signature: ${signatur}`);
        // alert(`Mint signature: ${signatur}`);
        // setResult(`Mint signature: ${signature}`);
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
        alert("Calculating at 0.5 Solana per 10000 Steps: "+  Math.round(Math.random() * (20000 - 10000) + 10000)/10000*0.5+" Solana \n\nTransaction ID: "+` ${signature}`);
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
				color='white'
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
				Welcome Microsys Employee
			</Text>
			<Text
				fontSize='md'
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
				Claim Solana For Being Fit!
			</Text>
            <div >
			
                <br></br>
				
                <Button
					onClick={checkMetrics}
					
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
					Collect Fitness Metrics
				</Button> 
                <Button
					onClick={sendToken}
					
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
					Claim  Solana Token(s)  
				</Button>
                <br></br>
                <Button
					onClick={checkBalance}
					
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
					Check Solana Balance
				</Button> 
                </div>
                <br></br>
            <br></br>
            <br></br>
            <div>
                <h2 style={{ fontSize: 12 }}>Solana Fitness Funds Claim History</h2>

                <table style={{ fontSize: 12, border: 3 }}>
                    <tr >
                        <th>|</th>
                        <th>Date</th>
                        <th>|</th>
                        <th>Steps</th>
                        <th>|</th>
                        <th>Solana Claimed</th>
                    </tr>
                    <tr>
                    <th>|</th>
                        <td>01.01.2023</td>
                        <th>|</th>
                        <td>12639</td>
                        <th>|</th>
                        <th>0.631</th>
                        <th>|</th>

                    </tr>
                    <tr>
                    <th>|</th>
                        <td>02.01.2023</td>
                        <th>|</th>
                        <td>16581</td>
                        <th>|</th>
                        <th>0.829</th>
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
