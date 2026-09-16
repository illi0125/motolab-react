import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";
// import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import {
  Modal,
  Backdrop,
  Fade,
  Stack,
  TextField,
  Fab,
  Box,
} from "@mui/material";
import type { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import type { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      // saving authenticated user
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault(); // Stop default event focus handling

    // Blur active element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      // 1. Remove focus from the active button/input inside the modal
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // 2. Close modal first, then update auth state
      handleLoginClose();
      setAuthMember(result);

      // saving authenticated user
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* ─── SIGNUP MODAL ───────────────────────────────────────────── */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "800px" },
              bgcolor: "#0b0f17",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              overflow: "hidden",
              outline: "none",
            }}
          >
            {/* Left Side Banner Image */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                minHeight: "200px",
                backgroundImage: `url("/img/brand1.jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(11,15,23,0.1) 0%, rgba(11,15,23,0.8) 100%)",
                },
              }}
            />

            {/* Right Side Form Inputs */}
            <Stack
              sx={{
                width: { xs: "100%", sm: "60%" },
                p: { xs: 3, sm: 5 },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  margin: "0 0 20px 0",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                }}
              >
                Signup Form
              </h2>

              <TextField
                fullWidth
                label="username"
                variant="outlined"
                onChange={handleUsername}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    backgroundColor: "#111827",
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                    "&:hover fieldset": { borderColor: "#06b6d4" },
                    "&.Mui-focused fieldset": { borderColor: "#06b6d4" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    "&.Mui-focused": { color: "#06b6d4" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="phone number"
                variant="outlined"
                onChange={handlePhone}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    backgroundColor: "#111827",
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                    "&:hover fieldset": { borderColor: "#06b6d4" },
                    "&.Mui-focused fieldset": { borderColor: "#06b6d4" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    "&.Mui-focused": { color: "#06b6d4" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    backgroundColor: "#111827",
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                    "&:hover fieldset": { borderColor: "#06b6d4" },
                    "&.Mui-focused fieldset": { borderColor: "#06b6d4" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    "&.Mui-focused": { color: "#06b6d4" },
                  },
                }}
              />

              <Fab
                variant="extended"
                onClick={handleSignupRequest}
                sx={{
                  width: "140px",
                  bgcolor: "#06b6d4",
                  color: "#000000",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "#22d3ee" },
                }}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/* ─── LOGIN MODAL ────────────────────────────────────────────── */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        disableRestoreFocus
        disableEnforceFocus
        disableAutoFocus
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={loginOpen}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "700px" },
              bgcolor: "#0b0f17",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              overflow: "hidden",
              outline: "none",
            }}
          >
            {/* Left Side Banner Image */}
            <Box
              sx={{
                width: { xs: "100%", sm: "40%" },
                minHeight: "200px",
                backgroundImage: `url("/img/brand1.jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(11,15,23,0.1) 0%, rgba(11,15,23,0.8) 100%)",
                },
              }}
            />

            {/* Right Side Form Inputs */}
            <Stack
              sx={{
                width: { xs: "100%", sm: "60%" },
                p: { xs: 3, sm: 5 },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  margin: "0 0 20px 0",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                }}
              >
                Login Form
              </h2>

              <TextField
                fullWidth
                label="username"
                variant="outlined"
                onChange={handleUsername}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    backgroundColor: "#111827",
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                    "&:hover fieldset": { borderColor: "#06b6d4" },
                    "&.Mui-focused fieldset": { borderColor: "#06b6d4" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    "&.Mui-focused": { color: "#06b6d4" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    backgroundColor: "#111827",
                    borderRadius: "10px",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.12)" },
                    "&:hover fieldset": { borderColor: "#06b6d4" },
                    "&.Mui-focused fieldset": { borderColor: "#06b6d4" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    "&.Mui-focused": { color: "#06b6d4" },
                  },
                }}
              />

              <Fab
                variant="extended"
                onClick={handleLoginRequest}
                sx={{
                  width: "140px",
                  bgcolor: "#06b6d4",
                  color: "#000000",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "#22d3ee" },
                }}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
