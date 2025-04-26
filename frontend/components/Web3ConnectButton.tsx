'use client'

import { Button } from "@/components/ui/button"
import { useWeb3Modal } from "@web3modal/react"
import { useAccount, useDisconnect } from "wagmi"
import { motion } from "framer-motion"
import { CheckCircle, Wallet } from "lucide-react"

export function Web3ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const truncatedAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Button
        variant={isConnected ? "outline" : "default"}
        className="gap-2"
        onClick={() => isConnected ? disconnect() : open()}
      >
        {isConnected ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="hidden sm:inline">{truncatedAddress}</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </>
        )}
      </Button>
    </motion.div>
  )
}