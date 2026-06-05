import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import PageLayout from './components/layout/PageLayout';
import Toast from './components/ui/Toast';

// Import pages
import Home from './pages/Home';
import Staking from './pages/Staking';
import Bridge from './pages/Bridge';
import Docs from './pages/Docs';
import Whitepaper from './pages/Whitepaper';
import Tokenomics from './pages/Tokenomics';
import Mission from './pages/Mission';
import Ecosystem from './pages/Ecosystem';
import Community from './pages/Community';
import FaucetPage from './pages/FaucetPage';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
            <Route path="staking" element={<Staking />} />
            <Route path="bridge" element={<Bridge />} />
            <Route path="faucet" element={<FaucetPage />} />
            <Route path="docs" element={<Docs />} />
            <Route path="whitepaper" element={<Whitepaper />} />
            <Route path="tokenomics" element={<Tokenomics />} />
            <Route path="mission" element={<Mission />} />
            <Route path="ecosystem" element={<Ecosystem />} />
            <Route path="community" element={<Community />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toast />
    </WalletProvider>
  );
}

export default App
