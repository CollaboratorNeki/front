import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from 'react-i18next'
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CreateIcon from '@mui/icons-material/Create';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundImage : "linear-gradient(to bottom , #2d939c, #68C7CF)",
  boxShadow:"0px 1px 10px #777",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navegaçao({ drawerOpen, handleDrawerToggle }) {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <HomeIcon style={{ color: '#2D939C' }}/>
              </ListItemIcon>
              <ListItemText primary={t("Home")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/NewProject")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <AddBoxIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Novo Projeto")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/NewTask")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <AddTaskIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Nova Tarefa")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/Reports")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <AnalyticsIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Relatórios")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/Registrations")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <CreateIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Cadastro")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/settings")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <SettingsApplicationsIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Configurações")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/about")}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: drawerOpen ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : "auto", justifyContent: "center" }}>
                <GroupsIcon style={{ color: '#2D939C' }} />
              </ListItemIcon>
              <ListItemText primary={t("Sobre")} sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
