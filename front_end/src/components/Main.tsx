import React, { useState } from "react"
import { Box, Grid, Button, Input, makeStyles, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"
import { useCall, useContractFunction, useEthers } from "@usedapp/core"
import { Contract, utils } from "ethers"

import { Ballot } from "./Ballot/Ballot"
import './cmoponents.css'
import VotingSystem from "../chain-info/deployments/5/0x3ab321172ca1Dc6D33cDA074c9d9d3001fD1f050.json"
import { AdminPanel } from "./Ballot/AdminPanel"
import { color, textAlign } from "@mui/system"

export const Main = () => {

    /** CONNECT CONTRACT */
    const { account } = useEthers()
    const votingSystemAdress = '0x3ab321172ca1Dc6D33cDA074c9d9d3001fD1f050'
    const contract = new Contract(votingSystemAdress, new utils.Interface(VotingSystem.abi)) as any

    /** GET FUNCTIONS AND VALUES FROM CONTRACT */
    const { send: sendVote, state: stateVote } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const addVote = (name: string, surname: string, PESEL: string, candidate: string) => {
        sendVote(name, surname, PESEL, candidate)
    }
    const isMining = stateVote.status === 'Mining'

    const { value: electionChief, error } = useCall({ contract: contract, method: 'electionChief', args: [] }) ?? {}
    const { value: isElectionOpen, error: errorElectionOpen } = useCall({ contract: contract, method: 'electionOpen', args: [] }) ?? {}

    const { value: C1, error: errorC1 } = useCall({ contract: contract, method: 'votesValue', args: ["Kandydat 1"] }) ?? {}
    const { value: C2, error: errorC2 } = useCall({ contract: contract, method: 'votesValue', args: ["Kandydat 2"] }) ?? {}
    const { value: C3, error: errorC3 } = useCall({ contract: contract, method: 'votesValue', args: ["Kandydat 3"] }) ?? {}

    /** FORM DATA */
    const [name, setName] = useState<string>('')
    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNameValue = event.target.value === "" ? "" : String(event.target.value)
        setName(newNameValue)
        console.log(newNameValue)
    }
    const [surname, setSurname] = useState<string>('')
    const handleSurnameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSurnameValue = event.target.value === "" ? "" : String(event.target.value)
        setSurname(newSurnameValue)
        console.log("surname: " + newSurnameValue)
    }
    const [pesel, setPesel] = useState<string>('')
    const handlePeselInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPeselValue = event.target.value === "" ? "" : String(event.target.value)
        setPesel(newPeselValue)
        console.log(newPeselValue)
    }
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCandidate((event.target as HTMLInputElement).value);
    }
    const handleSubmitFrom = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShow(true);
        addVote(name ?? '', surname ?? '', pesel ?? '', selectedCandidate ?? '');
    }
    const [showAdminPanel, setShow] = useState<boolean>(true);


    return (


        <div >
            {String(isElectionOpen) === "true" ?
                (
                    <Box>
                        <div>
                            <h2>Głosowanie otwarte!</h2>
                            <p>Podaj swoje dane a następnie wybierz swojego kandydata</p>

                        </div>

                        <Box component="form" onSubmit={handleSubmitFrom} sx={{ border: 1, borderColor: 'primary.main' }}>

                            <div className="Form-contols"><TextField
                                required
                                disabled={!isElectionOpen}
                                fullWidth={true}
                                label='Imie'
                                variant='outlined'
                                id="name-TextField"
                                value={name}
                                onChange={handleNameInputChange}></TextField></div><br />
                            <div className="Form-contols"><TextField
                                required
                                disabled={!isElectionOpen}
                                fullWidth={true}
                                label='Nazwisko'
                                variant='outlined'
                                id="surname-TextField"
                                value={surname}
                                onChange={handleSurnameInputChange}></TextField></div><br />
                            <div className="Form-contols"><TextField
                                required
                                disabled={!isElectionOpen}
                                fullWidth={true}
                                type="number"
                                label='PESEL'
                                variant='outlined'
                                id="pesel-TextField"
                                value={pesel}
                                onChange={handlePeselInputChange}></TextField></div><br />
                            <RadioGroup name="candidates" value={selectedCandidate} onChange={handleRadioChange}>
                                <FormControlLabel className="radio-buttons" value="Kandydat 1" control={<Radio />} label="Kandydat 1" disabled={!isElectionOpen} />
                                <FormControlLabel className="radio-buttons" value="Kandydat 2" control={<Radio />} label="Kandydat 2" disabled={!isElectionOpen} />
                                <FormControlLabel className="radio-buttons" value="Kandydat 3" control={<Radio />} label="Kandydat 3" disabled={!isElectionOpen} />
                            </RadioGroup>
                            <Button type="submit" color="primary" variant="contained" disabled={!isElectionOpen || isMining}>
                                {isMining ? <CircularProgress size={26} /> : "GŁOSUJ"}
                            </Button>

                        </Box>

                        <Box>
                            <p><b>INFO:</b></p>
                            <p><b>Adres kontraktu:</b> {String(contract.address)}</p>
                            <p><b>Właściciel kontraktu:</b> {electionChief}</p>
                            <p><b>Twoje konto:</b> {account}</p>
                        </Box>



                        {showAdminPanel && String(account) === String(electionChief) ? (

                            <div>
                                <h2>PANEL ADMINISTRATORA</h2>
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

                    </Box>
                ) : <></>}
            {String(isElectionOpen) === "false" ?
                (
                    <Box>
                        <Box>
                            <h2>Głosowanie Zamknięte!</h2>
                            <p>Wybory oparte o kontrakt: </p>
                            <p>{contract.address}</p>
                        </Box>
                        <Box>
                            <h2>WYNIKI:</h2>
                            <p>Głosy oddane na Kandydata 1:   <b>{String(C1)}</b></p>
                            <p>Głosy oddane na Kandydata 2:   <b>{String(C2)}</b></p>
                            <p>Głosy oddane na Kandydata 3:   <b>{String(C3)}</b></p>
                        </Box>
                    </Box>
                ) : (<></>)}
        </div>

    )
}
