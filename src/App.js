import React from 'react';


import logo from './logo.svg';
import './App.css';


import { AuthService, tryRegisterSW,loginUsingSSO } from "@liquality/wallet-sdk";
import { useEffect,useState,useContext } from 'react';

import { setupSDK } from "./setupSDK";

import { DataContext } from "./DataContext";

function App() {

  // const registration = tryRegisterSW("/serviceworker/sw.js");
  const [tKey, setTKey] = useState();


  const { loginResponse, setLoginResponse } = useContext(DataContext);


  const directParams = {
    baseUrl: `http://localhost:3000/serviceworker`,
    enableLogging: true,
    networkUrl: "https://goerli.infura.io/v3/a8684b771e9e4997a567bbd7189e0b27",
    network: "testnet",
  };

  const verifierMap = {
    google: {
      name: "Google",
      typeOfLogin: "google",
      clientId:"64832699752-k4vhbfabig26msb1j89r1i5cervstedp.apps.googleusercontent.com",
      verifier: "liquality-google-testnet",
    },
  };

  const logInUsingGoogleSSO = async () => {
    setupSDK()
    const response = await AuthService.loginUsingSSO(tKey, verifierMap);
    setLoginResponse(response);
    console.log(loginResponse)
  };


  
  useEffect(() => {
    const init = async () => {
      setupSDK()
      tryRegisterSW("/serviceworker/sw.js");
      const tKeyResponse = await AuthService.init(directParams);
      setTKey(tKeyResponse);
      console.log(tKeyResponse)

      // const wallet = await AuthService.createWallet(tKey, verifierMap);


      // const response = await AuthService.loginUsingSSO(tKey,verifierMap);


    };

    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      <button onClick={logInUsingGoogleSSO}>Login</button>

      </header>
    </div>
  );
}

export default App;
