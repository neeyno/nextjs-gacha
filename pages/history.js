import Records from "../components/Records"

import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"

import gachaAbi from "../lib/gachaAbi.json"
import contractAddresses from "../lib/contractAddresses.json"

export default function History() {
    const { runContractFunction } = useWeb3Contract()
    const { isWeb3Enabled, chainId: chainIdHex, web3, account } = useMoralis()
    const chainId = parseInt(chainIdHex).toString() || "31337"

    const gachaAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["Gachapon"][0] : null

    const [events, setEvents] = useState([])

    async function getEvents() {
        const contract = new ethers.Contract(gachaAddress, gachaAbi, web3)
        //const filter = contract.filters.PullFulfilled(null, account)

        const fromBlockNum = 1
        const toBlockNum = await web3.getBlockNumber()
        const addressOwner = account

        const filter = {
            address: gachaAddress,
            topics: [
                ethers.utils.id("PullFulfilled(uint256,address,uint256[])"),
                null,
                ethers.utils.hexZeroPad(addressOwner, 32),
            ],
        }
        let log = await getEthersLog(contract, filter, fromBlockNum, toBlockNum)
        setEvents((prev) => {
            if (prev !== log) {
                return log
            }
        })

        // contract.once(filter, async (requestId, owner, nftId) => {
        //     //console.log([requestId.toString(), owner, nftId.toString()])
        //     resolve([requestId, owner, nftId])
        // })
    }

    const parseEtherjsLog = (parsed) => {
        let parsedEvent = {}
        for (let i = 0; i < parsed.args.length; i++) {
            const input = parsed.eventFragment.inputs[i]
            const arg = parsed.args[i]
            const newObj = { ...input, ...{ value: arg } }
            parsedEvent[input["name"]] = newObj
        }
        return parsedEvent
    }
    const getEthersLog = async (contract, filter, fromBlockNum, toBlockNum) => {
        if (contract === undefined || filter === undefined) return
        const events = await contract.queryFilter(filter, fromBlockNum, toBlockNum)
        if (events.length === 0) return

        let parsedEvents = []
        for (let event of events) {
            const ethersParsed = contract.interface.parseLog(event)
            const customParsed = parseEtherjsLog(ethersParsed)
            let eventRecord = {
                blockNumber: event.blockNumber,
                event: event.event,
                args: customParsed,
                transactionHash: event.transactionHash,
            }
            parsedEvents.push(eventRecord)
        }
        return parsedEvents
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            getEvents()
        }
    }, [isWeb3Enabled, account])

    return (
        <div className="">
            <Records events={events} />
        </div>
    )
}
