import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import TokenBalance from '../components/TokenBalance';
import SendTokens from '../components/TokenBalance';

const Home: React.FC = () => {
    const [address, setAddress] = useState<string>('');

    return (
        <div className="container mx-auto">
            <ConnectWallet setAddress={setAddress} />
            {address && <TokenBalance address={address} />}
            {address && <SendTokens address={address} />}
        </div>
    );
};

export default Home; // Ensure this line is present
