import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

import { DAppProvider, Goerli, Mainnet, useEthers, useEtherBalance, Config } from "@usedapp/core"
import { getDefaultProvider } from 'ethers'
import { formatEther } from '@ethersproject/units'

import { Container, Box } from "@material-ui/core"
import { Header } from './components/Header';
import { Main } from './components/Main';
import { BarChart } from './components/BarChart';


const config_1 = {
  networks: [Goerli],
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://goerli.infura.io/v3/4136a47a12ce4898857f6bd976d3707c",
  }
}


function App() {
  return (
    <DAppProvider config={config_1}>


      <Container maxWidth="xs" className='Container-test'>
        <Box className='Box-test'>
          <Header />
          <Main />
        </Box>
      </Container>
    </DAppProvider>
  );
}

export default App;
