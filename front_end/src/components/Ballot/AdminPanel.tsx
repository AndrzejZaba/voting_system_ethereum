import React, { useState } from "react"
import { useCall, useContractFunction, useEthers } from "@usedapp/core"
import { Box, Button, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"

import VotingSystem from "../../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"
import './../cmoponents.css'
import { Contract } from "ethers"

interface IAdminPanel {
    contract: Contract
    account: string | undefined
    chief: string
    name: string | undefined
    surname: string | undefined
    pesel: string | undefined
    selectedCandidate: string
}

export const AdminPanel = ({ contract, account, chief, name, surname, pesel, selectedCandidate }: IAdminPanel) => {
    const { value: electionChief, error } = useCall({ contract: contract, method: 'electionChief', args: [] }) ?? {}
    return (
        <div>

            <Box>
                <p>Chief: {chief}</p>
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

        </div>
    )
}