import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import "../app/globals.css";

interface TokenBalanceProps {
    address: string; // Type for the address prop
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ address }) => {
    const [tokenBalance, setTokenBalance] = useState<string>(''); // State for token balance
    const tokenAddress = '0x73014d0ECe38D562Ec0Fbc0384dfa192AbDD0e1c'; // Replace with your token address

    const fetchTokenBalance = async () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed. Please install it to use this feature.');
            return; // Exit the function if MetaMask is not detected
        }

        const tokenABI = [
            "function balanceOf(address owner) view returns (uint256)",
            "function decimals() view returns (uint8)"
        ];

        const provider = new ethers.providers.Web3Provider(window.ethereum); // No need for type assertion
        const contract = new ethers.Contract(tokenAddress, tokenABI, provider); // Use provider instead of signer

        try {
            const balance = await contract.balanceOf(address);
            const decimals = await contract.decimals();
            setTokenBalance(ethers.utils.formatUnits(balance, decimals));
        } catch (error) {
            console.error('Error fetching token balance:', error);
            alert('Error fetching token balance. Please try again later.');
        }
    };

    useEffect(() => {
        if (address) {
            fetchTokenBalance();
        }
    }, [address]);

    return (
        <div>
            <h3>Token Balance: {tokenBalance}</h3>
        </div>
    );
};

export default TokenBalance;
