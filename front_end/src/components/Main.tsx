import React, { useState } from "react"
import { Box, Grid, Button, Input, makeStyles, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"
import { useCall, useContractFunction, useEthers } from "@usedapp/core"
import { Contract, utils } from "ethers"

import { Ballot } from "./Ballot/Ballot"
import './cmoponents.css'
import VotingSystem from "../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"
import { AdminPanel } from "./Ballot/AdminPanel"

export const Main = () => {

    /** CONNECT CONTRACT */
    const { account } = useEthers()
    const votingSystemAdress = '0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8'
    const contract = new Contract(votingSystemAdress, new utils.Interface(VotingSystem.abi)) as any

    /** GET FUNCTIONS AND VALUES FROM CONTRACT */
    const { send: sendVote, state: stateVote } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const addVote = (name: string, surname: string, PESEL: string, candidate: string) => {
        sendVote(name, surname, PESEL, candidate)
    }
    const isMining = stateVote.status === 'Mining'

    const { value: electionChief, error } = useCall({ contract: contract, method: 'electionChief', args: [] }) ?? {}

    /** FORM DATA */
    const [name, setName] = useState<string>()
    const updateName = (_name: string): void => {
        setName(_name)
    }

    const [surname, setSurname] = useState<string>()
    const updateSurname = (_surname: string): void => {
        setSurname(_surname)
    }

    const [pesel, setPesel] = useState<string>()
    const updatePesel = (_pesel: string): void => {
        setPesel(_pesel)
    }

    const [selectedCandidate, setSelectedCandidate] = useState('');

    const updateSelectedCandidate = (_selectedCandidate: string): void => {
        setSelectedCandidate(_selectedCandidate)
    }
    const [showAdminPanel, setShow] = useState<boolean>(true);
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <Ballot
                        contract={contract}
                        name={name}
                        surname={surname}
                        pesel={pesel}
                        selectedCandidate={selectedCandidate}
                        updateName={updateName}
                        updateSurname={updateSurname}
                        updatePesel={updatePesel}
                        updateSelectedCandidate={updateSelectedCandidate} />
                    <Box>
                        <p>Chief: {electionChief}</p>
                        <p>Current Account: {account}</p>
                    </Box>
                    {showAdminPanel && String(account) === String(electionChief) ? (

                        <div>

                            <Box>
                                <p>Chief: {electionChief}</p>
                                <p>Current Account: {account}</p>
                            </Box>
                            <Box>
                                <p>imie: {name}</p>
                                <p>Nazwisko: {surname}</p>
                                <p>PESEL: {pesel}</p>
                                <p>Kandydat: {selectedCandidate}</p>

                            </Box>
                            <Box>
                                <p>Panel widoczny dla organizatora</p>
                            </Box>



                            <AdminPanel
                                contract={contract}
                                account={account}
                                chief={electionChief}
                                name={name}
                                surname={surname}
                                pesel={pesel}
                                selectedCandidate={selectedCandidate}
                            />
                        </div>
                    ) : (<></>)}


                </Grid>
            </Grid>
        </div>
    )
}
