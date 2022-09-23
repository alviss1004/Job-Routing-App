import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../data/fetchData";
import JobCard from "../components/JobCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [pagesTotal, setPagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("filter");

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getJobs(page, q);
      setJobs(data.jobs);
      setPagesTotal(data.pagesTotal);
      console.log(page, q);
    };
    fetch();
  }, [page, q]);

  return (
    <>
      <Box
        sx={{
          maxWidth: "65%",
          margin: "auto",
          display: "flex",
          flexGrow: 1,
          flexWrap: "wrap",
        }}
      >
        <Grid
          container
          spacing={6}
          sx={{
            mt: 2,
          }}
        >
          {jobs.slice(0, 5).map((job) => (
            <Grid key={job.id} item xs={12} md={4}>
              <Paper elevation={16}>
                <JobCard job={job} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={pagesTotal}
          onChange={(event, value) => {
            setPage(value);
          }}
          color="error"
          sx={{ marginX: "auto", mt: 7 }}
        />
      </Stack>
    </>
  );
}

export default HomePage;
