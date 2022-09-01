
import { useState } from 'react';
import { useChain, useMoralis } from 'react-moralis';

const Moralis = require('moralis')

const appId = "rkAlf9LI2jJDYG2nSfxXIbN2HGkgRFbqtO3TuYhy";
const serverUrl = "https://6zqbzokycupj.usemoralis.com:2053/server";
export default function Authenticate() {
 
  const [ first, setFirst ] = useState(true)
  if (first){
    console.log(111)
        setFirst(false);
    setTimeout(async function(){
        await Moralis.start({ serverUrl, appId })
       await Moralis.enableWeb3();
  
  console.log(333)})

    
 }
 const { switchNetwork, chainId, chain, account } = useChain();
 if (Moralis.web3){
  
 switchNetwork("0x38")
 
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">Please Login to Continue</h1>
      
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none mt-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={() => {
          try { 
              
              console.log('hm1')

              
console.log('hm')
          } catch (err){
            console.log(err)
           // logout()
          }
        }}
      >
        Authenticate
      </button>
      <h1>This site is a 1:1 copy of pancakeswap except we have changed some of the functionalities of predictions.</h1><h4> You now see the average of cumulative winrate for other players, and their wagers.</h4><h4>the cost is 0.1 BNB for access</h4><h4>Authenticate and pay then see some nonsense like this</h4>
      <img alt="hmm" src="/win.jpeg" />
    </div>
  );
}
