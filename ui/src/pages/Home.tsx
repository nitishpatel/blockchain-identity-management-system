import { Box, Card, Container, Grid, Typography } from "@mui/material";
import HomeCard from "../components/home/HomeCard";

function Home() {
  return (
    <>
      <Container>
        <Grid container>
          <Grid item lg={4} xl={4}>
            <HomeCard
              title="Universities"
              description="Blockchain Based Identity Management System for Universities to manage their students and alumni."
              image="https://www.educationunlimited.com/blog/wp-content/uploads/2019/08/Webp.net-compress-image.jpg"
            />
          </Grid>
          <Grid item lg={4} xl={4}>
            <HomeCard
              title="Individuals"
              description="Blockchain Based Identity Management System for Individuals to manage their education and work experience."
              image="https://www.educationunlimited.com/blog/wp-content/uploads/2019/08/Webp.net-compress-image.jpg"
            />
          </Grid>
          <Grid item lg={4} xl={4}>
            <HomeCard
              title="Organizations"
              image="https://www.educationunlimited.com/blog/wp-content/uploads/2019/08/Webp.net-compress-image.jpg"
              description="Blockchain Based Identity Management System for Organizations to manage their employees and alumni."
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
