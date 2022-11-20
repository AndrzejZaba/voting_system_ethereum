import { Box, Button } from "@material-ui/core"
import { useContractFunction } from "@usedapp/core"
import { Contract, utils } from "ethers"
import VotingSystem from "../chain-info/deployments/5/0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8.json"

export const Main = () => {

    const votingSystemAdress = '0xc6AA48837F8DAA270f5EE9CAE26e60023d6f30C8'
    const contract = new Contract(votingSystemAdress, new utils.Interface(VotingSystem.abi)) as any

    const { state, send } = useContractFunction(contract, 'vote', { transactionName: 'vote', gasLimitBufferPercentage: 10, })

    const { status } = state

    const addVote = () => {
        send("Halina", "Nowak", "90022074332", "Kandydat 2")
    }

    return (
        <Box>
            <div>
                <Button color="primary"
                    variant="contained"
                    onClick={() => addVote()}>VOTE!</Button>
            </div>
        </Box>
    )
}