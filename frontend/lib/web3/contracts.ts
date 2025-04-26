import { Address } from 'viem'
import { SkillNFTAbi } from './abis'

interface ContractConfig {
  address: Address
  abi: typeof SkillNFTAbi
}

export const CONTRACTS = {
  skillNFT: {
    address: process.env.NEXT_PUBLIC_SKILL_NFT_ADDRESS as Address,
    abi: SkillNFTAbi,
  },
} as const satisfies Record<string, ContractConfig>

export function getContract(chainId: number, name: keyof typeof CONTRACTS) {
  return CONTRACTS[name]
}