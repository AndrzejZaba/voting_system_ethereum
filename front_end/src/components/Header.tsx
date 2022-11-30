import { Button } from "@material-ui/core"
import { useEthers, useEtherBalance } from "@usedapp/core"

export const Header = () => {

    const { account, deactivate, chainId } = useEthers()
    const { activateBrowserWallet } = useEthers()

    const isConnected = account !== undefined
    return (
        <div className="Header">
            {isConnected ? (
                <Button variant="contained" onClick={deactivate}>
                    Disconnect
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => activateBrowserWallet()}>
                    Connect
                </Button>
            )}
        </div>
    )
}