import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const EmailDialog = ({ onclose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    type: "",
    email: "",
    comment: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xvoeezrj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Formulario enviado con éxito!");
        setFormData({ fullName: "", type: "", email: "", comment: "" });
      } else {
        setStatus("Hubo un error al enviar el formulario.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <>
      <Box position="absolute" right={0} p={1}>
        <IconButton onClick={onclose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={3}>
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          Contact
        </Typography>
        <Typography variant="body2" component="h2" gutterBottom>
          Write your details here and they will be sent to my email so I can get
          in touch with you. If you want to contact me, leave a comment, or
          report a bug.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Tipo</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value={"bug"}>Bug</MenuItem>
              <MenuItem value={"contact"}>Contac</MenuItem>
              <MenuItem value={"comment"}>Comment</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="comment"
            name="comment"
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={formData.comment}
            onChange={handleChange}
          />
          <Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              Enviar
            </Button>
          </Stack>
        </form>
        {status && (
          <Typography variant="body2" color="error">
            {status}
          </Typography>
        )}
      </Box>
    </>
  );
};

EmailDialog.propTypes = {
  onclose: PropTypes.func,
};

export default EmailDialog;
