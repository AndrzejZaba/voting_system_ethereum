import React, { useState } from "react"
import { Box, Button, Input, makeStyles, TextField, RadioGroup, Radio, FormControlLabel } from "@material-ui/core"
import { useCall, useContractFunction } from "@usedapp/core"
import { Contract, utils } from "ethers"
import VotingSystem from "../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"

const useStyles = makeStyles((theme) => ({
    textField: {
        required: true,
        label: 'Required',
        variant: 'filled'
    }


}))

export const Main = () => {

    const votingSystemAdress = '0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8'
    const contract = new Contract(votingSystemAdress, new utils.Interface(VotingSystem.abi)) as any

    const { state, send } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const addVote = () => {
        send("Halina", "Nowak", "90022074332", "Kandydat 2")
    }
    /**const chief = String(contract.electionChief()) */

    /**const { value } = useCall({ contract: contract, method: 'electionChief', args: [] }) */

    const [name, setName] = useState<number | string | Array<number | string>>()
    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNameValue = event.target.value === "" ? "" : String(event.target.value)
        setName(newNameValue)
        console.log(newNameValue)
    }

    const [surname, setSurname] = useState<number | string | Array<number | string>>()
    const handleSurnameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSurnameValue = event.target.value === "" ? "" : String(event.target.value)
        setSurname(newSurnameValue)
        console.log("surname: " + newSurnameValue)
    }

    const [pesel, setPesel] = useState<number | string | Array<number | string>>()
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
    }

    const classes = useStyles()

    const [show, setShow] = useState<boolean>(false);
    return (
        <Box>
            <Box>
                <div>
                    <Button color="primary"
                        variant="contained"
                        onClick={() => addVote()}>VOTE!</Button>
                </div>
            </Box>
            <Box>
                <form onSubmit={handleSubmitFrom}>
                    <TextField className={classes.textField}
                        required
                        label='Imie'
                        variant='filled'
                        id="name-TextField"
                        value={name}
                        onChange={handleNameInputChange}></TextField><br />
                    <p>Oto: {name}</p>
                    <TextField className={classes.textField}
                        required
                        label='Nazwisko'
                        variant='filled'
                        id="surname-TextField"
                        value={surname}
                        onChange={handleSurnameInputChange}></TextField><br />
                    <p>Oto: {surname}</p>
                    <TextField className={classes.textField}
                        required
                        type="number"
                        label='PESEL'
                        variant='filled'
                        id="pesel-TextField"
                        value={pesel}
                        onChange={handlePeselInputChange}></TextField><br />
                    <p>Oto: {pesel}</p><br />

                    <RadioGroup name="candidates" value={selectedCandidate} onChange={handleRadioChange}>
                        <FormControlLabel value="Kandydat 1" control={<Radio />} label="Kandydat 1" />
                        <FormControlLabel value="Kandydat 2" control={<Radio />} label="Kandydat 2" />
                        <FormControlLabel value="Kandydat 3" control={<Radio />} label="Kandydat 3" />
                    </RadioGroup>
                    <Button type="submit" variant="outlined">
                        Submit
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
        </Box>
    )
}
