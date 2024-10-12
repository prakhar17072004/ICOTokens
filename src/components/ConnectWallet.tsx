import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ConnectWalletProps {
    setAddress: (address: string) => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress }) => {
    const [balance, setBalance] = useState<string>(''); // Store wallet balance
    const [isConnected, setIsConnected] = useState<boolean>(false); // Track connection status
    const [loading, setLoading] = useState<boolean>(false); // Track loading state

    // Holsky network configuration
    const holskyChainId = `0x${Number(17000).toString(16)}`; // Holsky's chain ID (Example: 0x1392 for 5010 in hex)
    const holskyNetwork = {
        chainId: holskyChainId,
        chainName: 'Holsky ',
        nativeCurrency: {
            name: 'holsky',
            symbol: 'ETH', // Native currency
            decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/eth_holesky"], // RPC URL for Holsky testnet
        blockExplorerUrls: ["https://holesky.etherscan.io/"], // Optional: Explorer URL
    };

    // Helper function to add or switch to Holsky network
    const switchToHolskyNetwork = async () => {
        try {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const currentNetwork = await provider.send('eth_chainId', []);
                if (currentNetwork !== holskyChainId) {
                    // Try to switch to Holsky Testnet
                    try {
                        await (window as any).ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: holskyChainId }],
                        });
                    } catch (switchError: any) {
                        // If the network is not added, add it
                        if (switchError.code === 4902) {
                            await (window as any).ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [holskyNetwork],
                            });
                        } else {
                            throw switchError;
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Failed to switch or add Holsky network:', error);
        }
    };

    // Simulate connecting to MetaMask and getting wallet details
    const connectWallet = async () => {
        setLoading(true); // Start loading
        try {
            if ((window as any).ethereum) {
                const provider = new ethers.BrowserProvider((window as any).ethereum);
                const accounts = await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const walletAddress = await signer.getAddress();
                setAddress(walletAddress);

                const walletBalance = await provider.getBalance(walletAddress);
                setBalance(ethers.formatEther(walletBalance));

                // Switch to Holsky network
                await switchToHolskyNetwork();

                // Simulate delay before completing connection
                setTimeout(() => {
                    setIsConnected(true); // Set connection status to true
                    setLoading(false); // Stop loading
                }, 2000); // 2 seconds delay
            } else {
                alert('MetaMask not detected!');
                setLoading(false); // Stop loading if no MetaMask
            }
        } catch (error) {
            console.error(error);
            setLoading(false); // Stop loading in case of error
        }
    };

    // Simulate disconnecting wallet
    const disconnectWallet = () => {
        setLoading(true); // Start loading
        setTimeout(() => {
            setAddress(''); // Clear address
            setBalance(''); // Clear balance
            setIsConnected(false); // Set connection status to false
            setLoading(false); // Stop loading
        }, 2000); // 2 seconds delay
    };

    useEffect(() => {
        connectWallet(); // Automatically try to connect on page load
    }, [setAddress]);

    return (
        <div className="flex flex-col items-center justify-center bg-cyan-800 shadow-xl shadow-black rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">ETH Balance: {balance} ETH</h2>

            {loading ? (
                <p className="text-white">Processing...</p> // Show loading message/spinner
            ) : (
                !isConnected ? (
                    <button
                        onClick={connectWallet}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <button
                        onClick={disconnectWallet}
                        className="bg-blue-700 hover:bg-slate-900 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Disconnect Wallet
                    </button>
                )
            )}
        </div>
    );
};

export default ConnectWallet;
