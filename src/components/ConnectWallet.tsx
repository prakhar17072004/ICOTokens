import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import "../app/globals.css";

interface ConnectWalletProps {
    setAddress: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress }) => {
    const [balance, setBalance] = useState<string>('');

    const connectWallet = async () => {
        if ((window as any).ethereum) {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const walletAddress = await signer.getAddress();
            setAddress(walletAddress);

            const walletBalance = await provider.getBalance(walletAddress);
            setBalance(ethers.utils.formatEther(walletBalance));
        } else {
            alert('MetaMask not detected!');
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    return (
        <div>
            <h2>ETH Balance: {balance}</h2>
        </div>
    );
};

export default ConnectWallet;
