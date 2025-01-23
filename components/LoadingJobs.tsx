import React from 'react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from './ui/skeleton'

const LoadingJobs = () => {
    return (
        <div className='grid grid-cols-4 gap-y-2 mt-4'>
        <div className="w-[350px]">
            <AspectRatio className="flex flex-col space-y-3" ratio={16 / 9}>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[65%]" />
                </div>
            </AspectRatio>
        </div>
        <div className="w-[350px]">
            <AspectRatio className="flex flex-col space-y-3" ratio={16 / 9}>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[65%]" />
                </div>
            </AspectRatio>
        </div>
        <div className="w-[350px]">
            <AspectRatio className="flex flex-col space-y-3" ratio={16 / 9}>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[65%]" />
                </div>
            </AspectRatio>
        </div>
        <div className="w-[350px]">
            <AspectRatio className="flex flex-col space-y-3" ratio={16 / 9}>
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[65%]" />
                </div>
            </AspectRatio>
        </div>
        </div>
    )
}

export default LoadingJobs