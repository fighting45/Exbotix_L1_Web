// Vesting contract addresses per network
export const VESTING_ADDRESSES = {
  11311: "0x0000000000000000000000000000000000000000", // Mainnet (not deployed yet)
  11211: "0x764f3d1177bAbDf32D895C268B27eBF2532d634b"  // Testnet
};

export function getVestingAddress(chainId) {
  return VESTING_ADDRESSES[chainId] || VESTING_ADDRESSES[11211];
}
