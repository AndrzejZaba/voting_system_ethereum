import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

import { DAppProvider, Goerli, Mainnet, useEthers, useEtherBalance, Config } from "@usedapp/core"
import { getDefaultProvider } from 'ethers'
import { formatEther } from '@ethersproject/units'

import { Container } from "@material-ui/core"
import { Header } from './components/Header';
import { Main } from './components/Main';


const config = {
  networks: [Goerli, Mainnet],
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
  }
}


ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
)

function App() {
  return (
    <DAppProvider config={{
      networks: [Goerli, Mainnet],
      readOnlyChainId: Mainnet.chainId,
      readOnlyUrls: {
        [Goerli.chainId]: getDefaultProvider('goerli'),
        [Mainnet.chainId]: getDefaultProvider('mainnet'),
      }
    }}>
      <Container maxWidth="md">
        <Header />

        <Main />
      </Container>

    </DAppProvider>
  );
}

export default App;
