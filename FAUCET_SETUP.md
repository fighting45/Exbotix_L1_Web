# Testnet Faucet Setup Guide

## Overview
The Exbotix testnet faucet allows users to request free testnet EXBT tokens for development and testing purposes. Users can select from 5, 10, 15, or 20 EXBT and receive them at their specified address with real-time status updates.

## Features
- ✅ Select from 4 preset amounts: 5, 10, 15, 20 EXBT
- ✅ Custom address input
- ✅ Real-time transaction status (Pending → Confirming → Success)
- ✅ Transaction hash with explorer link
- ✅ 24-hour rate limiting per address
- ✅ Responsive UI with status indicators
- ✅ Integrated on Home and Docs pages

## Setup Instructions

### 1. Create a Faucet Wallet

You need a wallet on the Exbotix testnet with EXBT tokens to distribute:

1. Create a new wallet using MetaMask or any Ethereum wallet
2. Add the Exbotix Testnet network:
   - **Chain ID**: 11211
   - **RPC URL**: https://testnet_rpc.exbotix.net
   - **Currency**: EXBT (test)
   - **Explorer**: https://testnet_explorer.exbotix.net

3. Fund this wallet with testnet EXBT tokens
   - Minimum recommended: 10,000 EXBT for distribution
   - Keep some extra for gas fees

### 2. Configure Environment Variable

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your faucet wallet's private key to `.env`:
   ```env
   VITE_FAUCET_PRIVATE_KEY=your_actual_private_key_here
   ```

   ⚠️ **SECURITY WARNING**:
   - NEVER commit the `.env` file to version control
   - Only use a dedicated testnet wallet (never use a mainnet wallet)
   - Keep your private key secure
   - The `.env` file is already in `.gitignore`

### 3. Verify Installation

The faucet requires the `ethers` package, which should already be installed. If not:

```bash
npm install ethers
```

### 4. Test the Faucet

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to:
   - **Home page**: http://localhost:5173 (faucet appears after trust bar)
   - **Docs page**: http://localhost:5173/docs (scroll to "Faucet & explorer" section)

3. Test the faucet:
   - Enter a valid Ethereum address
   - Select an amount (5, 10, 15, or 20 EXBT)
   - Click "Request Tokens"
   - Watch the status change in real-time

## How It Works

### Frontend Flow
1. User enters address and selects amount
2. Frontend validates the address format
3. Checks 24-hour rate limit via localStorage
4. Calls `sendTestnetTokens()` utility function
5. Displays real-time status updates
6. Shows transaction hash with explorer link on success

### Backend Flow
1. Connects to Exbotix testnet via RPC
2. Creates wallet instance from private key
3. Constructs transaction with selected amount
4. Estimates gas and sends transaction
5. Waits for confirmation
6. Returns transaction hash or error

### Status States
- **idle**: Initial state, ready for input
- **pending**: Connecting and preparing transaction
- **confirming**: Transaction sent, waiting for confirmation
- **success**: Transaction confirmed successfully
- **error**: Transaction failed or validation error

### Rate Limiting
- Each address can request tokens once every 24 hours
- Tracked via browser localStorage
- Key format: `faucet_{address}`
- Value: timestamp of last request

## File Structure

```
src/
├── components/
│   └── common/
│       └── Faucet.jsx              # Main faucet UI component
├── utils/
│   └── faucet.js                   # Faucet utility functions
├── pages/
│   ├── Home.jsx                    # Includes faucet section
│   └── Docs.jsx                    # Includes faucet in grid
└── .env                            # Environment variables (gitignored)
```

## Component Props

The `Faucet` component is self-contained and requires no props:

```jsx
import Faucet from '../components/common/Faucet';

// Use in any page
<Faucet />
```

## Utility Functions

### `sendTestnetTokens(recipientAddress, amount, onStatusChange)`
Sends testnet EXBT to an address with real-time status updates.

**Parameters:**
- `recipientAddress` (string): Ethereum address to receive tokens
- `amount` (number): Amount to send (5, 10, 15, or 20)
- `onStatusChange` (function): Callback for status updates (status, message)

**Returns:**
```javascript
{
  success: boolean,
  txHash?: string,
  error?: string
}
```

### `canRequestTokens(address)`
Checks if an address can request tokens (not rate limited).

**Returns:** `boolean`

### `recordTokenRequest(address)`
Records a token request for rate limiting.

### `getTimeUntilNextRequest(address)`
Gets minutes remaining until next request is allowed.

**Returns:** `number` (minutes)

## Troubleshooting

### "Faucet private key not configured"
- Ensure `.env` file exists in project root
- Verify `VITE_FAUCET_PRIVATE_KEY` is set correctly
- Restart the dev server after changing `.env`

### "Invalid Ethereum address"
- Ensure address starts with `0x`
- Must be 42 characters long (0x + 40 hex characters)
- Use a valid checksum address

### "Transaction failed"
- Check faucet wallet has sufficient EXBT balance
- Verify testnet RPC is accessible
- Check network connectivity
- Review browser console for detailed errors

### Rate limit message
- Each address can only request once per 24 hours
- Wait for the cooldown period to expire
- Or test with a different address

## Production Deployment

⚠️ **Important**: When deploying to production:

1. Use environment variables on your hosting platform:
   - Vercel: Add to project settings → Environment Variables
   - Netlify: Add to Site settings → Environment variables
   - Docker: Pass via `-e` flag or docker-compose

2. Ensure the faucet wallet is well-funded

3. Monitor the faucet wallet balance regularly

4. Consider implementing server-side rate limiting for additional security

5. Set up monitoring/alerts for failed transactions

## Security Best Practices

1. ✅ Use a dedicated testnet-only wallet
2. ✅ Never expose mainnet private keys
3. ✅ Keep `.env` file gitignored
4. ✅ Implement rate limiting (currently 24h per address)
5. ✅ Monitor faucet wallet balance
6. ✅ Consider adding CAPTCHA for production use
7. ✅ Log suspicious activity
8. ✅ Rotate private keys periodically

## Future Enhancements

Potential improvements:
- Server-side API endpoint for better security
- CAPTCHA integration to prevent abuse
- IP-based rate limiting
- Email verification
- Admin dashboard for monitoring
- Configurable amount limits
- Multi-network support
- Analytics tracking

---

**Need Help?**
If you encounter issues, check:
1. Browser console for errors
2. Network tab for failed requests
3. Testnet explorer for transaction status
4. RPC endpoint connectivity
