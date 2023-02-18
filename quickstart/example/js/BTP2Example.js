/* eslint-disable */

import IconService from 'icon-sdk-js';
const { HttpProvider, IconBuilder , IconConverter} = IconService;

import MockData from '../../mockData/index.js';

let btpExample;

class BTPExample {
  constructor() {
    // HttpProvider is used to communicate with http.
    this.provider = new HttpProvider(MockData.NODE_URL);

    // Create IconService instance
    this.iconService = new IconService(this.provider);

    this.addListener();
  }

  addListener() {
    // getNetworkInfo
    document.getElementById('Q01-2').addEventListener('click', async () => {
      await this.getNetworkInfo();
    });

    // getNetworkTypeInfo
    document.getElementById('Q02-2').addEventListener('click', async () => {
      await this.getNetworkTypeInfo();
    });

    // get Messages
    document.getElementById('Q03-3').addEventListener('click', async () => {
      await this.getMessages();
    });

    // get Header
    document.getElementById('Q04-3').addEventListener('click', async () => {
      await this.getHeader();
    });

    // get proof
    document.getElementById('Q05-3').addEventListener('click', async () => {
      await this.getProof();
    });

    // get source information
    document.getElementById('Q06').addEventListener('click', async () => {
      await this.getSourceInformation();
    });

     // get Greeting
     document.getElementById('Q07').addEventListener('click', async () => {
      await this.getGreetingCall();
    });
  }

  async getNetworkInfo() {
    const id = document.getElementById("Q01").value;
    const networkInfo = await this.iconService.getBTPNetworkInfo(id).execute();
    document.getElementById("Q01-3").innerHTML = `networkTypeID : ${networkInfo.networkTypeID}`
    document.getElementById("Q01-4").innerHTML = `networkID : ${networkInfo.networkID}`
    document.getElementById("Q01-5").innerHTML = `networkTypeName : ${networkInfo.networkTypeName}`
    document.getElementById("Q01-6").innerHTML = `networkName : ${networkInfo.networkName}`
    document.getElementById("Q01-7").innerHTML = `startHeight : ${networkInfo.startHeight}`
    document.getElementById("Q01-8").innerHTML = `open : ${networkInfo.open}`
    document.getElementById("Q01-9").innerHTML = `owner : ${networkInfo.owner}`
    document.getElementById("Q01-10").innerHTML = `prevNSHash : ${networkInfo.prevNSHash}`
    document.getElementById("Q01-11").innerHTML = `lastNSHash : ${networkInfo.lastNSHash}`
    document.getElementById("Q01-12").innerHTML = `nextMessageSN : ${networkInfo.nextMessageSN}`
    document.getElementById("Q01-13").innerHTML = `nextProofContextChanged : ${networkInfo.nextProofContextChanged}`
  }

  async getNetworkTypeInfo() {
    const id = document.getElementById("Q02").value;
    const networkTypeInfo = await this.iconService.getBTPNetworkTypeInfo(id).execute();
    document.getElementById("Q02-3").innerHTML = `networkTypeID : ${networkTypeInfo.networkTypeID}`
    document.getElementById("Q02-4").innerHTML = `networkTypeName : ${networkTypeInfo.networkTypeName}`
    document.getElementById("Q02-5").innerHTML = `nextProofContext : ${networkTypeInfo.nextProofContext}`
    document.getElementById("Q02-6").innerHTML = `openNetworkIDs : ${networkTypeInfo.openNetworkIDs}`
  }

  async getMessages() {
    const id = document.getElementById("Q03").value;
    const height = document.getElementById("Q03-2").value;
    const messages = await this.iconService.getBTPMessages(id, height).execute();
    document.getElementById("Q03-4").innerHTML = `messages : ${messages}`
  }

  async getHeader() {
    const id = document.getElementById("Q04").value;
    const height = document.getElementById("Q04-2").value;
    const header = await this.iconService.getBTPHeader(id, height).execute();
    document.getElementById("Q04-4").innerHTML = `header : ${header}`
  }

  async getProof() {
    const id = document.getElementById("Q05").value;
    const height = document.getElementById("Q05-2").value;
    const proof = await this.iconService.getBTPProof(id, height).execute();
    document.getElementById("Q05-4").innerHTML = `proof : ${proof}`
  }

  async getSourceInformation() {
    const info = await this.iconService.getBTPSourceInformation().execute();
    document.getElementById("Q06-1").innerHTML = `srcNetworkUID : ${info.srcNetworkUID}`
    document.getElementById("Q06-2").innerHTML = `networkTypeIDs : ${info.networkTypeIDs}`
  }

  async getGreetingCall(){
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
    document.getElementById("Q07-1").innerHTML = `Greeting : ${stepCosts}`
  }

}

if (document.getElementById('Q01')) {
  btpExample = new BTPExample();
}

export default BTPExample;
