# Blockchain ICON FE 

## Usage 

- Integrate HanaWallet and interact with SCORE ( Smart Contracts in ICON )

## Commands 

```
cd quickstart 
npm i 
npm start 
```
Go to localhost:3000 and open hello world to interact with SmartContract/Wallet. 

## Gotchas 

- Save the file again if the webpack build fails. This will rerun the webpack and reflect the changes without having to do the npm start again.  

## References 
- Uses Javascript SDK https://github.com/icon-project/icon-sdk-js
- Check teh JSON RPC API calls from here : 
    - https://docs.icon.community/v/icon1/references/reference-manuals/icon-json-rpc-api-v3-specification#debug_estimatestep
- Check out the Events from Frontend here : 
    - https://docs.hanawallet.io/developing-for-hana/icon-dapps
- Implementation of Hana wallet to integration with FE is listed here 
    - https://medium.com/@2infiniti/icon-workshop-iconex-web-connect-164ff3cd6792
- Use the HelloWorld.html/js to see how the basic interaction with HanaWallet to setName and getGreeting Methods are integrated. 
- It's little different from ether.js to interact with hana wallet. Refer helloworld.js to see how the events are leveraged. 
- https://docs.icon.community/getting-started/how-to-write-a-smart-contract
- https://docs.icon.community/icon-stack/client-apis/json-rpc-api/v3
- https://github.com/icon-project/icon-sdk-js/tree/master/quickstart