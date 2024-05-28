const hre = require("hardhat");

async function deployLatteToken(name, symbol) {
  const accounts = await hre.ethers.getSigners();
  const contractOwner = accounts[0];
  
  const LatteToken = await hre.ethers.getContractFactory("FHERC20");
  
  const latteToken = await LatteToken.connect(contractOwner).deploy(name, symbol);
  await latteToken.waitForDeployment();
  
  console.log(`${name} deployed to: ${await latteToken.getAddress()}`);

}

async function deployLatteTokens() {
  await deployLatteToken("Uniswap", "UNI");
  await deployLatteToken("DAI", "DAI");
  await deployLatteToken("USD Coin", "USDC");
  await deployLatteToken("Link", "LINK");
  await deployLatteToken("MATIC", "MATIC");
}

deployLatteTokens().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
