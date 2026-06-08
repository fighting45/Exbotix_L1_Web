const { ethers } = require('ethers');
const vestingAbi = require('./src/contracts/vestingAbi.json');

const VESTING_ADDRESS = '0x764f3d1177bAbDf32D895C268B27eBF2532d634b';
const RPC_URL = 'https://testnet_rpc.exbotix.net';
const CHECK_ADDRESS = '0x7d4EAB3d217ce6dea6A83BAFf963e1909996f6a1';

async function checkVesting() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(VESTING_ADDRESS, vestingAbi, provider);

    console.log('Checking vesting for:', CHECK_ADDRESS);
    console.log('---');

    // Get vesting data
    const vestings = await contract.vestings(CHECK_ADDRESS);
    console.log('Vesting schedule exists:', vestings.exists);

    if (!vestings.exists) {
      console.log('❌ No vesting schedule found for this address');
      return;
    }

    console.log('Total allocation:', ethers.formatEther(vestings.totalAllocation), 'EXBT');
    console.log('Released:', ethers.formatEther(vestings.released), 'EXBT');
    console.log('TGE percent:', vestings.tgePercent.toString(), '%');
    console.log('Cliff periods:', vestings.cliffPeriods.toString());
    console.log('Vesting periods:', vestings.vestingPeriods.toString());
    console.log('Start time:', new Date(Number(vestings.startTime) * 1000).toLocaleString());
    console.log('---');

    // Get vested amount
    const vestedAmount = await contract.vestedAmount(CHECK_ADDRESS);
    console.log('Vested amount:', ethers.formatEther(vestedAmount), 'EXBT');

    // Get releasable amount
    const releasable = await contract.releasable(CHECK_ADDRESS);
    console.log('Releasable (claimable):', ethers.formatEther(releasable), 'EXBT');
    console.log('---');

    if (Number(releasable) === 0) {
      console.log('⚠️  ISSUE: Nothing to claim! Releasable amount is 0.');
      console.log('This is why the transaction is failing.');

      const locked = vestings.totalAllocation - vestedAmount;
      console.log('Still locked:', ethers.formatEther(locked), 'EXBT');

      // Calculate next unlock
      const period = await contract.PERIOD();
      const now = Math.floor(Date.now() / 1000);
      const start = Number(vestings.startTime);
      const cliffEnd = start + Number(vestings.cliffPeriods) * Number(period);
      const vestEnd = start + (Number(vestings.cliffPeriods) + Number(vestings.vestingPeriods)) * Number(period);

      if (now < cliffEnd) {
        console.log('Next unlock: Cliff ends on', new Date(cliffEnd * 1000).toLocaleString());
      } else if (now >= vestEnd) {
        console.log('Status: Fully vested');
      } else {
        const elapsed = now - start;
        const nextPeriod = Math.ceil(elapsed / Number(period));
        const next = Math.min(start + nextPeriod * Number(period), vestEnd);
        console.log('Next unlock:', new Date(next * 1000).toLocaleString());
      }
    } else {
      console.log('✅ You can claim:', ethers.formatEther(releasable), 'EXBT');
    }

    // Check contract balance
    const contractBalance = await contract.contractBalance();
    console.log('---');
    console.log('Contract balance:', ethers.formatEther(contractBalance), 'EXBT');

    if (Number(contractBalance) < Number(releasable)) {
      console.log('⚠️  WARNING: Contract does not have enough balance to fulfill claims!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkVesting();
