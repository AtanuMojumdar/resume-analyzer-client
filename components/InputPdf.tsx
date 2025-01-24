"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { ButtonLoading } from "./LoadingButton"
import JobListings from "./JobListings"
import { JobLists } from '@/lib/types';
import LoadingJobs from "./LoadingJobs"
import { Settings } from "./CustomTuning"
import { useToast } from "@/hooks/use-toast"

type resumeDetails = {
    job: string,
    city: string,
}

export function InputFile() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [suggestionIsLoading, setSuggestionIsLoading] = useState(false);
    const [jobs, setJobs] = useState<JobLists>([]);
    const [nextPage, setNextPage] = useState("");
    const [resume, setResume] = useState<resumeDetails>({})
    const { toast } = useToast()

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setisLoading(true);
        if (!file) {
            setisLoading(false);
            toast({
                variant: "destructive",
                title: "Pdf missing!",
                description: "Please provide your resume in pdf"
            })
            return;
        }
        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
        if (fileExtension !== "pdf") {
            toast({
                variant: "destructive",
                title: "Pdf missing!",
                description: "Please provide your resume in pdf"
            })
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);
        console.log(file)

        try {
            const data = await axios.post("http://localhost:8000/resume", formData, {
                withCredentials: true
            })
            setisLoading(false);
            const parsedJSON = await JSON.parse(data.data.jobs);
            const parsedResume = await JSON.parse(data.data.details);
            console.log(parsedResume);
            console.log(parsedJSON.jobs);
            setResume(parsedResume)
            setJobs(parsedJSON.jobs)
            setNextPage(parsedJSON.nextPage);
        }
        catch (err) {
            toast({
                variant: "destructive",
                title: "Error 500: Server Error",
                description: "An error occurred while fetching job listings. Please try again."
            });
            setisLoading(false);
            console.log(err)
        }

    }

    return (
        <div className="flex flex-col">
            <div className="absolute right-4 top-4">
                <Settings setSuggestionIsLoading={setSuggestionIsLoading} jobTitle={resume.job} location={resume.city} setJobs={setJobs} />
            </div>

            <div className="mx-auto w-[75%] flex justify-center">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="resume">Upload Resume</Label>
                    <Input onChange={handleFileChange} id="resume" type="file" name="resume" accept="application/pdf" />
                    {
                        isLoading ? <ButtonLoading /> : <Button type="submit">Upload</Button>
                    }


                </form>
            </div>
            <div className="mx-4 mt-20">
                <h1 className='text-2xl text-center'>Matching Opportunities</h1>
                { !isLoading ?
                    <span>
                        {
                            isLoading || suggestionIsLoading ? <div> <div><LoadingJobs /></div> <div className="hidden"><JobListings jobs={jobs} /></div></div> : <div> <div className="hidden"><LoadingJobs /></div> <div><JobListings jobs={jobs} /></div></div>
                        }
                    </span> : <span>
                        {
                            isLoading || suggestionIsLoading ? <LoadingJobs/> : <JobListings jobs={jobs}/>
                        }
                    </span>
                }


            </div>
        </div>
    )
}
