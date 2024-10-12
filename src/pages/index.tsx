import { useState } from 'react';
import '../app/globals.css';
import ConnectWallet from '../components/ConnectWallet';
import TokenBalance from '../components/TokenBalance';
import SendTokens from '../components/SendTokens'; // Make sure to import SendTokens correctly

const Home: React.FC = () => {
    const [address, setAddress] = useState<string>('');

    return (
        <div className="container mx-auto p-6 bg-slate-300 h-[100vh]">
            <h1 className="text-4xl font-bold text-center  shadow-black mb-6"><span className="">Welcome to the Token DApp</span></h1>
            <ConnectWallet setAddress={setAddress} />
            {address && (
                <div className="mt-16 flex">
                    <TokenBalance address={address} />
                    <SendTokens address={address} />
                </div>
            )}
        </div>
    );
};

export default Home; // Ensure this line is present
