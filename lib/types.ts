type JobProvider = {
    jobProvider: string;
    url: string;
};

type JobList = {
    id: string;
    title: string;
    company: string;
    description: string;
    image: string;
    location: string;
    employmentType: string;
    datePosted: string;
    salaryRange: string;
    jobProviders: JobProvider[];
};

export type JobLists = JobList[];