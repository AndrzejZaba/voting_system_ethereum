import React, { useState } from "react"
import { useCall, useContractFunction, useEthers } from "@usedapp/core"
import { Box, Button, TextField, RadioGroup, Radio, FormControlLabel, CircularProgress } from "@material-ui/core"

import VotingSystem from "../../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"
import './../cmoponents.css'
import { Contract } from "ethers"


export const AdminPanel = (contract: any, chief: string,) => {

    return (
        <div>

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

        </div>
    )
}