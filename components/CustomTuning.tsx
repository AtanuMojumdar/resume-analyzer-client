import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings2 } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import axios from "axios"
import { JobLists } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"



export function Settings({ jobTitle, location, setJobs, setSuggestionIsLoading }: { jobTitle: string, location: string, setJobs: Dispatch<SetStateAction<JobLists>>, setSuggestionIsLoading: Dispatch<SetStateAction<boolean>> }) {
    const [job, setJob] = useState(jobTitle || "")
    const [place, setPlace] = useState(location || "");
    const [remoteOnly, setRemoteOnly] = useState("option-two")
    const [internOnly, setInternOnly] = useState("option-two")
    const [saved, setSaved] = useState<boolean>(false)
    const { toast } = useToast()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setJob(jobTitle);
        setPlace(location);
        setInternOnly("option-two");
        setRemoteOnly("option-two");
        setSaved(false);
    }, [jobTitle, location])
    



    async function handleSubmit() {
        try {
            if(!job || !place){
                toast({
                    variant: "destructive",
                    title: "Error 400",
                    description: "Please provide correct parameters"
                })
                return;
            }
            setSuggestionIsLoading(true);
            setSaved(true);
            const data = await axios.post("http://localhost:8000/custom-parameters", {
                jobTitle: job,
                location: place,
                remoteOnly: remoteOnly == "option-two" ? false : true,
                internship: internOnly == "option-two" ? false : true,
            }, { withCredentials: true })
            setSuggestionIsLoading(false);
            const parsedJSON = await JSON.parse(data.data.jobs);
            console.log(parsedJSON.jobs);
            setJobs(parsedJSON.jobs)

        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error 400",
                description: "An error occurred while fetching job listings. Please check provided parameters and try again."
            })
            setSuggestionIsLoading(false);
            console.log(err)

        }

    }
    function handleOpen(){
        if(!saved){
            setJob(jobTitle);
            setPlace(location);
            setRemoteOnly("option-two");
            setInternOnly("option-two")
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleOpen} variant="outline"><Settings2 /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Customize Parameters</DialogTitle>
                    <DialogDescription>
                        Tailor the analysis to your needs by adjusting the parameters
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="job" className="text-right">
                            JobTitle
                        </Label>
                        <Input
                        required
                            id="job"
                            placeholder="Job Title"
                            value={job || ""}
                            onChange={(e) => setJob(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                            Location
                        </Label>
                        <Input
                        required
                            id="location"
                            placeholder="City"
                            value={place || ""}
                            onChange={(e) => setPlace(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="remote" className="text-right">
                            Remote
                        </Label>
                        <RadioGroup className="grid grid-cols-2 gap-5 justify-center" defaultValue={remoteOnly} value={remoteOnly} onValueChange={(val) => setRemoteOnly(val)}>
                            <div className="flex items-center gap-1" >
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Yes</Label>
                            </div>
                            <div className="flex items-center gap-1" >
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>Default</TooltipTrigger>
                                            <TooltipContent>
                                                <p>Search all types of jobs</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                </Label>
                            </div>
                        </RadioGroup>


                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fresher" className="text-right">
                            Internship
                        </Label>
                        <RadioGroup className="grid grid-cols-2 gap-5 justify-center" defaultValue={internOnly} value={internOnly} onValueChange={(val) => setInternOnly(val)}>
                            <div className="flex items-center gap-1" >
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">Yes</Label>
                            </div>
                            <div className="flex items-center gap-1" >
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>Default</TooltipTrigger>
                                            <TooltipContent>
                                                <p>Search all types of jobs</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                </Label>
                            </div>
                        </RadioGroup>

                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button onClick={handleSubmit} type="submit">Search</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
