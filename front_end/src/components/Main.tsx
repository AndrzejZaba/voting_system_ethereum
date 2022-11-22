import React, { useState } from "react"
import { Box, Button, Input, makeStyles, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"
import { borders } from '@mui/system';
import { useCall, useContractFunction } from "@usedapp/core"
import { Contract, utils } from "ethers"
import './cmoponents.css'
import VotingSystem from "../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"

export const Main = () => {

    const votingSystemAdress = '0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8'
    const contract = new Contract(votingSystemAdress, new utils.Interface(VotingSystem.abi)) as any

    const { send: sendVote, state: stateVote } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const addVote = (name: string, surname: string, PESEL: string, candidate: string) => {
        sendVote(name, surname, PESEL, candidate)
    }

    const isMining = stateVote.status === 'Mining'
    /**const chief = String(contract.electionChief()) */

    /**const { value } = useCall({ contract: contract, method: 'electionChief', args: [] }) */

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
            <Box sx={{ border: 1, borderColor: 'primary.main' }}>
                <form onSubmit={handleSubmitFrom} className="Form-test">
                    <div className="Form-contols"><TextField
                        required
                        fullWidth={true}
                        label='Imie'
                        variant='filled'
                        id="name-TextField"
                        value={name}
                        onChange={handleNameInputChange}></TextField></div><br />
                    <div className="Form-contols"><TextField
                        required
                        fullWidth={true}
                        label='Nazwisko'
                        variant='filled'
                        id="surname-TextField"
                        value={surname}
                        onChange={handleSurnameInputChange}></TextField></div><br />
                    <div className="Form-contols"><TextField
                        required
                        fullWidth={true}
                        type="number"
                        label='PESEL'
                        variant='filled'
                        id="pesel-TextField"
                        value={pesel}
                        onChange={handlePeselInputChange}></TextField></div><br />

                    <RadioGroup name="candidates" value={selectedCandidate} onChange={handleRadioChange}>
                        <FormControlLabel value="Kandydat 1" control={<Radio />} label="Kandydat 1" />
                        <FormControlLabel value="Kandydat 2" control={<Radio />} label="Kandydat 2" />
                        <FormControlLabel value="Kandydat 3" control={<Radio />} label="Kandydat 3" />
                    </RadioGroup>
                    <Button type="submit" color="primary" variant="contained" disabled={isMining}>
                        {isMining ? <CircularProgress size={26} /> : "GŁOSUJ"}
                    </Button>
                </form>
            </Box>
            <Box>

            </Box>
            {show ? (
                <Box>
                    <p>imie: {name}</p>
                    <p>Nazwisko: {surname}</p>
                    <p>PESEL: {pesel}</p>
                    <p>Kandydat: {selectedCandidate}</p>
                </Box>
            ) : (<></>)}
        </div>
    )
}
