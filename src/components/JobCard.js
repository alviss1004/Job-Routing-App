import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function JobCard({ job }) {
  let location = useLocation();
  return (
    <Card sx={{ backgroundColor: "#252424", vw: "55%" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 16, fontWeight: 600, textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          {job.title}
        </Typography>
        <Divider />
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          {job.skills.slice(0, 4).map((skill) => (
            <Chip
              label={skill}
              size="small"
              sx={{
                backgroundColor: "#DD4146",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: 11,
              }}
            />
          ))}
        </Stack>
        <Typography
          sx={{
            color: "#D6D0D0",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {job.description.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/job/${job.id}`}
          state={{ backgroundLocation: location }}
          size="small"
          sx={{
            margin: "auto",
            color: "black",
            backgroundColor: "#E6A21E",
            mt: 5,
            mb: 1,
            px: 1,
            boxShadow: 3,
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
