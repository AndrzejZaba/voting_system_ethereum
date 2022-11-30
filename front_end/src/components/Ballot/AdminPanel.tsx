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
    name: string
    surname: string
    pesel: string
    selectedCandidate: string
}

export const AdminPanel = ({ contract, account, chief, name, surname, pesel, selectedCandidate }: IAdminPanel) => {
    const { value: electionChief, error } = useCall({ contract: contract, method: 'electionChief', args: [] }) ?? {}

    const { send: finishElection, state: stateFinishElection } = useContractFunction(contract, 'finishElection', { transactionName: 'finishElection', gasLimitBufferPercentage: 10, })
    const isFinishElectionMining = stateFinishElection.status === 'Mining'

    const finishElectionF = () => {
        finishElection();
    }

    return (
        <div>
            <Button type="submit" color="secondary" variant="contained" disabled={isFinishElectionMining} onClick={() => finishElectionF()}>
                {isFinishElectionMining ? <CircularProgress size={26} /> : "ZAKOŃCZ WYBORY"}
            </Button>
        </div>
    )
}