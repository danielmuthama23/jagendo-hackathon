'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { useNFT } from "@/lib/web3/nft"

interface SkillBadgeProps {
  tokenId: string
  className?: string
}

export function SkillBadge({ tokenId, className }: SkillBadgeProps) {
  const { metadata, loading, error } = useNFT(tokenId)

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-jagedo-surface/30 bg-jagedo-surface/20 p-4 backdrop-blur-sm",
        "transition-all hover:border-primary/30",
        className
      )}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          {metadata?.image && (
            <Image
              src={metadata.image}
              alt={metadata.name || "Skill badge"}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-jagedo-surface/60" />
        </div>
        
        <div className="flex-1 space-y-1">
          <h3 className="font-display font-medium text-primary">
            {metadata?.name || "Unverified Skill"}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {metadata?.issuer || "Unknown Issuer"}
            </span>
            {metadata?.expiry && (
              <span className="text-xs text-orange-300">
                Expires: {new Date(metadata.expiry).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-jagedo-surface/50 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}

      <div className="absolute -right-4 -top-4 opacity-10 transition-opacity group-hover:opacity-20">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          className="h-16 w-16 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12" />
        </svg>
      </div>
    </motion.div>
  )
}