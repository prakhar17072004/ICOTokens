import { useState, FormEvent } from 'react';
import { ethers} from 'ethers';
import "../app/globals.css";

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
        const provider = new ethers.providers.Web3Provider((window as any).ethereum); // Type assertion for window
        const signer = provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, tokenABI, signer);

        const decimals = await contract.decimals();
        const value = ethers.utils.parseUnits(amount, decimals);
        const tx = await contract.transfer(recipient, value);
        await tx.wait();
        alert('Tokens Sent');
    };

    return (
        <form onSubmit={sendTokens} className="space-y-4">
            <input
                className="border p-2"
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <input
                className="border p-2"
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Send Tokens
            </button>
        </form>
    );
};

export default SendTokens;
