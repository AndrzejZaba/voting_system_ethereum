import React, { useState } from "react"
import { Box, Grid, Button, Input, makeStyles, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"
import { useCall, useContractFunction, useEthers } from "@usedapp/core"
import { Contract, utils } from "ethers"

import { Ballot } from "./Ballot/Ballot"
import './cmoponents.css'
import VotingSystem from "../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"

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
    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNameValue = event.target.value === "" ? "" : String(event.target.value)
        setName(newNameValue)
        console.log(newNameValue)
    }

    const [surname, setSurname] = useState<string>()
    const handleSurnameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSurnameValue = event.target.value === "" ? "" : String(event.target.value)
        setSurname(newSurnameValue)
        console.log("surname: " + newSurnameValue)
    }

    const [pesel, setPesel] = useState<string>()
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

    const [show, setShow] = useState<boolean>(false);
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
                    <Ballot contract={contract} />
                    <Box>
                        <p>Chief: {electionChief}</p>
                        <p>Current Account: {account}</p>
                    </Box>
                    {show ? (
                        <Box>
                            <p>imie: {name}</p>
                            <p>Nazwisko: {surname}</p>
                            <p>PESEL: {pesel}</p>
                            <p>Kandydat: {selectedCandidate}</p>
                        </Box>
                    ) : (<></>)}
                    {String(account) === String(electionChief) ? (
                        <Box>
                            <p>Panel widoczny dla organizatora</p>
                        </Box>) : (<></>)}
                </Grid>
            </Grid>
        </div>
    )
}
