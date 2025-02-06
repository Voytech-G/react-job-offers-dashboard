import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobsListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "https://67a100445bcfff4fabe15c92.mockapi.io/jobs";
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        let data = await res.json();
        setJobs(isHome ? data.slice(0, 3) : data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs && Array.isArray(jobs) ? (
              jobs.map((job) => <JobListing key={job.id} job={job} />)
            ) : (
              <p>Loading jobs or no jobs available...</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsListings;
