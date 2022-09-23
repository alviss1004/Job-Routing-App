import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import api from "../data/fetchData";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 700 },
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "none",
};

function JobDetailModal() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getJob(id);
      setJob(data);
    };
    fetchData();
  });

  const handleClose = () => {
    navigate(-1);
  };
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            sx={{
              border: "none",
              boxShadow: 0,
              padding: 3,
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "white",
                }}
                gutterBottom
              >
                {job?.title}
              </Typography>
              <Divider sx={{ borderBottomWidth: 3 }} />
              <Typography sx={{ mt: 2, textAlign: "center" }}>
                {job?.description}
              </Typography>
              <Typography
                sx={{
                  textDecoration: "underline",
                  fontSize: 24,
                  mt: 1,
                  textAlign: "center",
                }}
              >
                Skills:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ my: 1, display: "flex", justifyContent: "center" }}
              >
                {job?.skills.slice(0, 4).map((skill) => (
                  <Chip
                    label={skill}
                    size="medium"
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
              <Typography sx={{ fontSize: 19, mt: 2, textAlign: "center" }}>
                City: {job?.city}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default JobDetailModal;
