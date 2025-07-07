import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const Contact = () => (
  <Box display="flex" justifyContent="center">
    <Card sx={{ maxWidth: 600 }}>
      <CardMedia
        component="img"
        height="200"
        image="https://via.placeholder.com/600x200"
        alt="Contact"
      />
      <CardContent>
        <Typography variant="h6">Contact Me</Typography>
        <Typography>Email: example@mail.com</Typography>
        <Typography>Phone: +32 123 456 789</Typography>
        <Typography>LinkedIn: linkedin.com/in/yourname</Typography>
        <Typography>Location: Antwerp, Belgium</Typography>
      </CardContent>
    </Card>
  </Box>
);

export default Contact;