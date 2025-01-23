"use client"
import React, { useRef, useState } from 'react'
import { JobLists } from '@/lib/types';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { BriefcaseBusiness, Hourglass, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { DrawerDemo } from './Suggestion';
import axios from 'axios';
import { Loader2 } from "lucide-react"

type JobListProps = {
  jobs: JobLists;
};

const JobListings: React.FC<JobListProps> = ({ jobs }) => {
  const first = useRef(null);
  const [suggestion, setsuggestion] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [score, setscore] = useState(0);
  const [audioPath, setaudioPath] = useState(null);
  async function handleClick() {
    try {
      console.log(first.current);
      if (suggestion && score) {
        if (first.current) {
          first.current.click();
        }
        return
      }
      setisLoading(true);
      const data = await axios.get("http://localhost:8000/suggest", { withCredentials: true });
      setisLoading(false);
      const parsedData = JSON.parse(data.data.suggestion);
      setsuggestion(parsedData.suggestion);
      setscore(parsedData.score);
      setaudioPath(data.data.audioPath);
      if (first.current) {
        first.current.click();
      }
    }
    catch (err) {
      setisLoading(false);
      console.log(err)
    }
  }
  return (
    <div className='flex gap-4 flex-col relative'>

      {
        jobs.length > 0 ?
          <div>
            <div className='absolute'>
              {
                isLoading ? <Button className='w-52' disabled>
                  <Loader2 className="animate-spin" />
                  Please wait <Sparkles className='text-blue-500' />
                </Button> :
                  <Button className='w-52' onClick={handleClick}>Suggest improvements <Sparkles className='text-blue-500' /></Button>

              }
              <span className='hidden'>
                <DrawerDemo audioPath={audioPath} suggestion={suggestion} score={score} ref={first} />
              </span>
            </div>
            <div className='grid grid-cols-4 mt-10 gap-y-2'>
              {
                jobs.map((job) => {
                  return (
                    <div key={job.id} className="w-[350px] shadow-2xl mt-2 p-3 border border-solid">
                      <AspectRatio className='relative' ratio={16 / 11}>
                        <h1 className='mb-2 text-center font-sans font-bold text-lg'>{job.company}</h1>
                        <span className='flex gap-3'>
                          <div>
                            <BriefcaseBusiness size={18} />
                          </div>
                          <p className='underline underline-offset-2 decoration-green-700 decoration-2'>{job.title}</p>
                        </span>
                        <span className='flex gap-2'>
                          <MapPin size={18} />
                          <p>{job.location}</p>
                        </span>
                        <span className='flex gap-2'>
                          <Hourglass size={18} />
                          <p>{job.employmentType}</p>
                        </span>
                        <p className='mt-1'>Posted: {job.datePosted || "unavailable"}</p>
                        <div className='w-full mt-2'>
                          <Link className='absolute bottom-1' target='_blank' href={job.jobProviders[0].url} >
                            <Button>Apply</Button>
                          </Link>
                        </div>
                      </AspectRatio>
                    </div>
                  )
                })
              }


            </div> </div> : <p className=' dark:text-gray-400 text-gray-500 mt-6 text-center'>Please upload your resume first to view job recommendations</p>
      }
    </div>
  )
}

export default JobListings