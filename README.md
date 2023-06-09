# voting_system_ethereum

Is a FullStack decentralized web voting application based on Ethereum Blockchain. 
<br/><br/><b>Tech Stack:</b>
<br/><b>Front End</b> - Typescript and useDapp framework.  
<b>Back End</b> - Solidity (Smart Contract programming language)
<br/><b>Tests</b> - Unit tests: Python + Brownie framework (AAA - Arragne, Act, Assert). Static Analysis of Smart Contract - Slither. Fuzz Testing - Echidna.
<br/><b>Blockchain</b> - Ganche, Metamask wallet, Infura 
<br/><br/><br/>

![image](https://github.com/AndrzejZaba/voting_system_ethereum/assets/82410034/33c1fe87-18ea-4a79-baea-6482fabf74ef)

<br/>After filling a form with personal data, selecting a candidate and pressing "VOTE" button a blockchain transaction begins.
<br/>System checks whether user is allowed to vote.  

![image](https://github.com/AndrzejZaba/voting_system_ethereum/assets/82410034/b9e17783-2a37-405d-9995-e4e69af3b98e)

<br/>If so, small amount of test cryptocurrency (cryptocurrency without real value, created in order to test applications) is taken from user's account and vote is sent and counted.
<br/><br/>At the bottom of application we can see a info panel with data such as voting contract address, contract's owner address and currently connected to the website user's wallet address. 
If the contract owner is connected, then an Admin Panel shows up. It contains a button that finishes voting process. 

![image](https://github.com/AndrzejZaba/voting_system_ethereum/assets/82410034/37779c4b-fe05-4ed8-9012-11d36eb7a9f2)

<br/>After the voting is finished the website shows a election's results panel

![image](https://github.com/AndrzejZaba/voting_system_ethereum/assets/82410034/43b3dd88-7999-4128-901d-f3e7d2ddc0fb)



