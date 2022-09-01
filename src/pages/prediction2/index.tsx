
import { useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';

const Moralis = require('moralis')

const appId = "rkAlf9LI2jJDYG2nSfxXIbN2HGkgRFbqtO3TuYhy";
const serverUrl = "https://6zqbzokycupj.usemoralis.com:2053/server";
export default function Authenticate() {
 
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">wat</h1>
      
      <h1>This site is a 1:1 copy of pancakeswap except we have changed some of the functionalities of predictions.</h1><h4> You now see the average of cumulative winrate for other players, and their wagers.</h4><h4>the cost is 0.1 BNB for access</h4><h4>Authenticate and pay then see some nonsense like this</h4>
      <img alt="hmm" src="/win.jpeg" />
    </div>
  );
}
