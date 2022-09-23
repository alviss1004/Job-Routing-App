import { FormControlLabel, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AuthContext from "../auth/AuthContext";
import Modal from "@mui/material/Modal";

function LoginForm({ callback }) {
  const [email] = useState("abc.xyz.com");
  const [password] = useState("123");
  let auth = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.from?.pathname || "/";

  const style = {
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    width: "600px",
    border: "1px solid",
    padding: "40px",
    borderRadius: "5px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const methods = useForm();
  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setError("afterSubmit", { message: "Server Response Error" });
  };

  const handleLogin = () => {
    auth.signin(email, callback);
    navigate(from, { replace: true });
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h3" textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}

            <TextField
              required
              label="Email Address"
              default={email}
              value={email}
              fullWidth
            />

            <TextField
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} />
                  )}
                />
              }
            />
          </Stack>

          <Button
            onClick={handleLogin}
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#F75B83", fontSize: 16, fontWeight: 700 }}
          >
            LOGIN
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default LoginForm;
