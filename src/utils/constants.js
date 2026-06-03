export const NETWORKS = {
  mainnet: {
    chainId: "0x2c2f",
    chainIdDecimal: 11311,
    chainName: "Exbotix Mainnet",
    rpcUrls: ["https://rpc.exbotix.net/"],
    blockExplorerUrls: ["https://scan.exbotix.net/"],
    nativeCurrency: { name: "Exbotix", symbol: "EXBT", decimals: 18 }
  },
  testnet: {
    chainId: "0x2bcb",
    chainIdDecimal: 11211,
    chainName: "Exbotix Testnet",
    rpcUrls: ["http://testnet.rpc.exbotix.net"],
    blockExplorerUrls: ["http://testnet.explorer.exbotix.net"],
    nativeCurrency: { name: "Exbotix", symbol: "EXBT", decimals: 18 }
  }
};

export const EXPLORER_MAIN = "https://scan.exbotix.net/";

export const NAV_GROUPS = [
  {
    title: "Network",
    items: [
      { href: "/tokenomics", label: "Tokenomics" },
      { href: "/staking", label: "Staking" },
      { href: "/bridge", label: "Bridge" },
      { href: EXPLORER_MAIN, label: "Block Explorer", external: true }
    ]
  },
  {
    title: "Build",
    items: [
      { href: "/docs", label: "Developer Docs" },
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
