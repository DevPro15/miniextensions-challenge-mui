import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

export const StudentDetails: React.FC<{ logout(): void }> = ({ logout }) => {
  const user = useSelector((state: Types.State) => state.app.user);
  const classes = useSelector((state: Types.State) => state.app.classes);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", p: 3 }}>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
      </Box>{" "}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card>
          <Card sx={{ minWidth: 275 }}>
            {classes?.map((item) => (
              <CardContent key={item.name}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6">Name</Typography>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="h6">Students</Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography>
                    {item.students.join(", ")},{user}
                  </Typography>
                </Box>
              </CardContent>
            ))}
          </Card>
        </Card>
      </Box>
    </>
  );
};
