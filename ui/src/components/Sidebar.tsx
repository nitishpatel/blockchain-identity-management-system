import {
  AppBar,
  Box,
  Container,
  Button,
  IconButton,
  Tooltip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import ListIcon from "@mui/icons-material/List";

const ListItemComponent = ({ to, text, icon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={location.pathname === to}
        onClick={() => navigate(to)}
      >
        <ListItemIcon
          sx={{
            color: "#fff",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                fontWeight: "500",
              }}
            >
              {text}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

const SideBar = ({ location }) => {
  return (
    <Box>
      <ListItemComponent to="/user/" text="Dashboard" icon={<ListIcon />} />
      <ListItemComponent
        to="/user/add-education"
        text="Add Education"
        icon={<ListIcon />}
      />
      <ListItemComponent
        to="/user/add-employment"
        text="Add Employment"
        icon={<ListIcon />}
      />
    </Box>
  );
};

export default SideBar;
