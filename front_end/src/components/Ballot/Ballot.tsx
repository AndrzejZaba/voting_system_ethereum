import React, { useState } from "react"
import { useContractFunction } from "@usedapp/core"
import { Box, Button, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"

import './../cmoponents.css'

interface IFormData {
    name: string
    surname: string
    pesel: string
    selectedCandidate: string
    updateName: (value: string) => void
    updateSurname: (value: string) => void
    updatePesel: (value: string) => void
    updateSelectedCandidate: (value: string) => void
}

export const Ballot = (contract: any, { name, surname, pesel, selectedCandidate, updateName, updateSurname, updatePesel, updateSelectedCandidate }: IFormData) => {


    /** GET FUNCTIONS AND VALUES FROM CONTRACT */
    const { send: sendVote, state: stateVote } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const addVote = (name: string, surname: string, PESEL: string, candidate: string) => {
        sendVote(name, surname, PESEL, candidate)
    }
    const isMining = stateVote.status === 'Mining'

    /** FORM DATA */
    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNameValue = event.target.value === "" ? "" : String(event.target.value)
        updateName(newNameValue)
        console.log(newNameValue)
    }

    const handleSurnameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSurnameValue = event.target.value === "" ? "" : String(event.target.value)
        updateSurname(newSurnameValue)
        console.log("surname: " + newSurnameValue)
    }

    const handlePeselInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPeselValue = event.target.value === "" ? "" : String(event.target.value)
        updatePesel(newPeselValue)
        console.log(newPeselValue)
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateSelectedCandidate((event.target as HTMLInputElement).value);
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
                        onChange={() => handleNameInputChange}></TextField></div><br />
                    <div className="Form-contols"><TextField
                        required
                        fullWidth={true}
                        label='Nazwisko'
                        variant='filled'
                        id="surname-TextField"
                        value={surname}
                        onChange={() => handleSurnameInputChange}></TextField></div><br />
                    <div className="Form-contols"><TextField
                        required
                        fullWidth={true}
                        type="number"
                        label='PESEL'
                        variant='filled'
                        id="pesel-TextField"
                        value={pesel}
                        onChange={() => handlePeselInputChange}></TextField></div><br />

                    <RadioGroup name="candidates" value={selectedCandidate} onChange={() => handleRadioChange}>
                        <FormControlLabel value="Kandydat 1" control={<Radio />} label="Kandydat 1" />
                        <FormControlLabel value="Kandydat 2" control={<Radio />} label="Kandydat 2" />
                        <FormControlLabel value="Kandydat 3" control={<Radio />} label="Kandydat 3" />
                    </RadioGroup>
                    <Button type="submit" color="primary" variant="contained" disabled={isMining}>
                        {isMining ? <CircularProgress size={26} /> : "GŁOSUJ"}
                    </Button>
                </form>
            </Box>
        </div>
    )
}
