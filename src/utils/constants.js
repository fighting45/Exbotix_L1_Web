export const EXCHANGE_URLS = {
  lbank: 'https://www.lbank.com/trade/exbt_usdt',
  exbeast: 'https://exbeast.com/spot-platform/EXBT-USDT/spot',
};

export const NETWORKS = {
  mainnet: {
    chainId: "0x2c2f",
    chainIdDecimal: 11311,
    chainName: "ExBeast Mainnet",
    rpcUrls: ["https://rpc.exbtnetwork.com/"],
    blockExplorerUrls: ["https://scan.exbtnetwork.com/"],
    nativeCurrency: { name: "ExBeast", symbol: "EXBT", decimals: 18 }
  },
  testnet: {
    chainId: "0x2bcb",
    chainIdDecimal: 11211,
    chainName: "ExBeast Testnet",
    rpcUrls: ["https://testnet_rpc.exbtnetwork.com"],
    blockExplorerUrls: ["https://testnet_explorer.exbtnetwork.com"],
    nativeCurrency: { name: "ExBeast", symbol: "EXBT", decimals: 18 }
  }
};

export const EXPLORER_MAIN = "https://scan.exbtnetwork.com/";

export const NAV_GROUPS = [
  {
    title: "Network",
    items: [
      { href: "/tokenomics", label: "Tokenomics" },
      { href: "/staking", label: "Staking" },
      { href: "/vesting", label: "Vesting" },
      { href: "/bridge", label: "Bridge" },
      { href: EXPLORER_MAIN, label: "Block Explorer", external: true },
      { href: EXCHANGE_URLS.lbank, label: "Buy EXBT · LBank", external: true },
      { href: EXCHANGE_URLS.exbeast, label: "Buy EXBT · ExBeast", external: true }
    ]
  },
  {
    title: "Build",
    items: [
      { href: "/docs", label: "Developer Docs" },
      { href: "/whitepaper", label: "Whitepaper" },
      { href: "/ecosystem", label: "Ecosystem" },
      { href: "/community", label: "Grants" }
    ]
  },
  {
    title: "Community",
    items: [
      { href: "/mission", label: "Mission & Vision" },
      { href: "/mission", label: "Roadmap" },
      { href: "/community", label: "Blog" }
    ]
  }
];
