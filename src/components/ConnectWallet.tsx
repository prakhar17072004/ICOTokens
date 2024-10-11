import { useState, useEffect } from 'react';
//import '../app/globals.css';
import { ethers } from 'ethers';


interface ConnectWalletProps {
    setAddress: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress }) => {
    const [balance, setBalance] = useState<string>('');

    const connectWallet = async () => {
        if ((window as any).ethereum) {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();
            setAddress(walletAddress);

            const walletBalance = await provider.getBalance(walletAddress);
            setBalance(ethers.formatEther(walletBalance));
        } else {
            alert('MetaMask not detected!');
        }
    };

    useEffect(() => {
        connectWallet();
    }, [connectWallet]); // Remove connectWallet from the dependency array

    return (
        <div className="flex flex-col items-center justify-center bg-green-800 shadow-md rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">ETH Balance: {balance} ETH</h2>
            <button 
                onClick={connectWallet} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
                Connect Wallet
            </button>
        </div>
    );
};

export default ConnectWallet;
