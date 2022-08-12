import { Box, Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";

import { setValue } from "./slice";

export const Form: React.FC<{ login(user: string, cb: () => void): void }> = ({ login }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: Types.State) => state.form.value);
  const message = useSelector((state: Types.State) => state.app.message);
  const loading = useSelector((state: Types.State) => !message && state.app.user && !state.app.isLoggedIn);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(value, () => dispatch(setValue("")));
  }

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <TextField
              sx={{ width: { md: "330px" } }}
              type="text"
              label="Student Name"
              value={value}
              disabled={!!loading}
              onChange={(e) => dispatch(setValue(e.target.value))}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, flexDirection: "column", alignItems: "center" }}>
            <Button type="submit" disabled={!!loading} variant="outlined">
              Log In
            </Button>
            <Box sx={{ mt: 2 }}>
              {" "}
              {(message || loading) && <span style={{ color: "red" }}>{message || <PropagateLoader />}</span>}
            </Box>
          </Box>{" "}
        </form>
      </Box>
    </>
  );
};

export { default as formReducer } from "./slice";
