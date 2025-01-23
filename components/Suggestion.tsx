"use client"

import * as React from "react"
import { AudioLines } from "lucide-react"
import { ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import AudioVisualizer from "./AudioVisualizer"



export function DrawerDemo({ ref, suggestion, score, audioPath }) {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);


    const playAudio = (path: string) => {
        console.log("play fn")
        if (!audioRef.current) {
            audioRef.current = new Audio(`http://localhost:8000/${path}`);
            audioRef.current.onended = () => setIsPlaying(false); // Reset state when audio ends
        }
        audioRef.current.play();
        setIsPlaying(true);
    };

    const stopAudio = () => {
        console.log("stop fn")
        if (audioRef.current) {
            audioRef.current.pause(); // Pause the audio
            audioRef.current.currentTime = 0; // Reset the audio to the beginning
            setIsPlaying(false);
        }
    };


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button ref={ref} variant="outline">Suggest improvements</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-[90%]">
                    <DrawerHeader>
                        <DrawerTitle>Resume Improvement Suggestions</DrawerTitle>
                        <DrawerDescription>Key Areas for Enhancement</DrawerDescription>
                        {
                            !isPlaying ? <Button onClick={() => playAudio(audioPath)} className="w-fit">
                            <AudioLines size={36} absoluteStrokeWidth />
                        </Button> : <Button onClick={() => stopAudio()} className="w-fit">
                            <AudioLines className="text-blue-600 font-bold" absoluteStrokeWidth />
                        </Button>
                        }
                        
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {score}
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    score
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <h1>{suggestion}</h1>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
