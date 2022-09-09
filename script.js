"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const ethers = window.ethers
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;


/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum)
  console.log(ethers.constants.AddressZero)

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {};

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false,
  });

  console.log("Web3Modal instance is", web3Modal);
}


async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  if(provider.close) {
    await provider.close();
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
    let data = JSON.stringify({
        query: `{
            users(first: 5) {
              id
              address
              tokenOwned
            }
          }`
    }) 
    init();
    let request = "https://api.thegraph.com/subgraphs/name/fbartolisyg/hof-syg"
    fetch(request, {
        method:"post",
        body: data, 
        headers: {
            "Content-Type": "application/json",
            'User-Agent': 'Node',
        },
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        console.log(data.data.users)
        data.data.users.forEach(element => {
            let node = document.getElementById("address")
            let listItem = document.createElement("li")
            listItem.innerHTML = `${element.id} owns tokenID : ${element.tokenOwned}`
            node.appendChild(listItem)
        });
    })
});
