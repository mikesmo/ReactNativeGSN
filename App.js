import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import Voter from './build/contracts/Voter.json';

const ethers = require('ethers');
const crypto = require('./src/crypto');

const privateKey = "7dc79980cde90e81c3717e2ec03ff36f9afac2ce5ba4939ac54611c15bd22658"
const url = "https://node.sirius.lightstreams.io:443";

const provider = crypto.provider(url);
const wallet = crypto.newWallet(privateKey, provider);


class App extends Component {
  constructor() {
    super()
    this.state = {
      resultText: "",
      contractDeployed: false
    }
  }

  
  votePressed = async () => {
    console.log("votePressed")
    const voterAddress = "0x4C3Bf861A9F822F06c10fE12CD912AaCC5e3A4f6";
    const abi = Voter.abi;
    const contract = new ethers.Contract(voterAddress, abi, provider);

    let contractWithSigner = contract.connect(wallet);


    let tx = await contractWithSigner.upVote()
    //await tx.wait();

    
    let count = await contract.count();

    
    this.setState({
      resultText: count.toString(),
    });
  }

 /*
  votePressed = async () => {

    const address = "0x9BFb5D5117238a2B56721D5Dbb9a1f7C93A7ae01"
    let randomWallet = ethers.Wallet.createRandom();

    let encoded = Voter.contract.methods.upVote().encodeABI();

    let options = {
        approveFunction: ()=>{ return "aaaa6ad4b4fab03bb2feaea2d54c690206e40036e4baa930760e72479da0cc5575779f9db9ef801e144b5e6af48542107f2f094649334b030e2bb44f054429b451"},
        from: emptyAccAddr,
        to: voterAddr,
        txfee: 70,
        gas_limit: 1000000
    }

    let relay_client_config = {
        relayUrl: "https://gsn.sirius.lightstreams.io",
        relayAddress: RELAY_HUB,
        allowed_relay_nonce_gap: 0,
        verbose: true
    }
  }*/


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.bigButton} onPress={() => this.votePressed()}>
          <Text style={styles.buttonText}>Vote</Text>
        </TouchableOpacity>
        
        <Text style={[{marginTop: 30}]}>
        {this.state.resultText}</Text>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setValueView: {
    flex: 1,
    flexDirection: 'row',
    height: 100
  },
  bigButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    width: 200,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  button: {
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#76788f',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#76788f'

  },
  hidden: {
    opacity: 0,
    width: 0,
    height: 0,
  }
});
