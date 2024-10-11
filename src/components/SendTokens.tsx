import { useState, FormEvent } from 'react';
import { ethers } from 'ethers';
//import '../app/globals.css';

interface SendTokensProps {
    address: string; // Type for the address prop
}

const SendTokens: React.FC<SendTokensProps> = ({ address }) => {
    const [recipient, setRecipient] = useState<string>(''); // State for recipient address
    const [amount, setAmount] = useState<string>(''); // State for amount
    const tokenAddress = '0x73014d0ECe38D562Ec0Fbc0384dfa192AbDD0e1c'; // Replace with your token address

    const sendTokens = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const tokenABI = ["function transfer(address to, uint256 value) returns (bool)"];
        const provider = new ethers.BrowserProvider((window as any).ethereum); // Type assertion for window
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, tokenABI, signer);

        try {
            const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18)); // Token has 18 decimals
            console.log('Transaction submitted', tx);
            await tx.wait();
            console.log('Transaction confirmed', tx);
            alert('Tokens sent successfully!');
        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed! Please check the console for details.');
        }
        
    };

    return (
        <form onSubmit={sendTokens} className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Send Tokens</h2>
            <input
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200 w-full"
            >
                Send Tokens
            </button>
        </form>
    );
};

export default SendTokens;
