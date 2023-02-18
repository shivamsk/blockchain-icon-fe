/* eslint-disable */

import IconService from 'icon-sdk-js';
const { HttpProvider, IconBuilder , IconConverter} = IconService;

import MockData from '../../mockData/index.js';

let helloWorld;

class HelloWorldExample {
  constructor() {
    // HttpProvider is used to communicate with http.
    this.provider = new HttpProvider(MockData.NODE_URL);

    // Create IconService instance
    this.iconService = new IconService(this.provider);

    this.addListener();

    window.addEventListener('ICONEX_RELAY_RESPONSE', this.eventHandler, false);
  }

  addListener() {
     // get Greeting
     document.getElementById('H07').addEventListener('click', async () => {
      await this.getHelloGreetingCall();
    });    
    
    // get Greeting
    document.getElementById('H08').addEventListener('click', async () => {
      await this.setNameCall();
    });    
  }

  eventHandler(event) {

    console.log("Event Handler ");

    var responseScore = document.getElementById('H08-1');

    var type = event.detail.type;
    var payload = event.detail.payload;
    console.log("Event Type " + type);
    switch (type) {

      case 'REQUEST_JSON-RPC':
        console.log("JSON RPC Event Payload " + payload)
        responseScore.innerHTML = JSON.stringify(payload);
        break;
      case 'CANCEL_JSON-RPC':
        responseScore.innerHTML = 'User cancelled';
        break;
    }
  }

  async getHelloGreetingCall(){
    // Get step costs by iconService.call
    const { CallBuilder } = IconBuilder;

    const callBuilder = new CallBuilder();
    const methodName = "getGreeting";
    const params = {};
    const call = callBuilder
        .to(MockData.HELLO_CONTRACT_ADDRESS)
        .method(methodName)
        .build();
    const stepCosts = await this.iconService.call(call).execute();    
    console.log("StepCosts " + JSON.stringify(stepCosts))
    document.getElementById("H07-1").innerHTML = `Greeting : ${stepCosts}`
  }

  async setNameCall(){
    // Get step costs by iconService.call
    const { CallTransactionBuilder } = IconBuilder;

    const methodName = "setName";
    const params = {
      name : "Bob",
    };

     // networkId of node 1:mainnet, 2~:etc
    const networkId = IconConverter.toBigNumber(2);
    const version = IconConverter.toBigNumber(3);
    const timestamp = (new Date()).getTime() * 1000;

    //Enter transaction information
    const tokenTransactionBuilder = new CallTransactionBuilder();
    const transaction = tokenTransactionBuilder
        .from("hx083b3f0b35023c320c9d2b8eb6c117d06b30e2b8")
        .nid(networkId)
        .to(MockData.HELLO_CONTRACT_ADDRESS)
        .stepLimit(10000000000)
        .method(methodName)
        .params(params)
        .version(version)
        .timestamp(timestamp)
        .build();

    const inputData = {
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: IconConverter.toRawTransaction(transaction),
      id: 3456,
    }

    console.log("Input Data " + JSON.stringify(inputData));
    
    window.dispatchEvent(
      new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: 'REQUEST_JSON-RPC',
          payload: inputData,
        },
      })
    );

    // console.log("setName " + JSON.stringify(setName))
    // document.getElementById("Q07-1").innerHTML = `SetName : ${setName}`
  }
}

if (document.getElementById('H07')) {
  helloWorld = new HelloWorldExample();
}

export default HelloWorldExample;
