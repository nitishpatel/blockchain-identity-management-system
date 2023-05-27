import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export default function HomeCard({
  title = "Live From Space",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Praesent auctor, nunc quis accumsan sagittis, nisl ex ultric",
  image = "https://mui.com/static/images/cards/live-from-space.jpg",
}) {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 320, maxHeight: 320 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Box>
          <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </Box>
      </Box>
    </Card>
  );
}
