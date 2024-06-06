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
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from 'react-i18next';
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
  zIndex: 3,
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
  zIndex: 3,
});

const DrawerHeader = styled("div")(({ theme }) => ({
 
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  zIndex: 3,
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
  zIndex: 3,
}));

export default function Navegaçao({ drawerOpen, handleDrawerToggle }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={drawerOpen}>
        <Divider />
        <DrawerHeader style={{paddingTop:"80px"}}>
          <IconButton
            onClick={handleDrawerToggle}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {[
            { text: t("Home"), icon: <HomeIcon style={{ color: '#2D939C' }} />, path: "/" },
            { text: t("Novo Projeto"), icon: <AddBoxIcon style={{ color: '#2D939C' }} />, path: "/NewProject" },
            { text: t("Nova Tarefa"), icon: <AddTaskIcon style={{ color: '#2D939C' }} />, path: "/NewTask" },
            { text: t("Relatórios"), icon: <AnalyticsIcon style={{ color: '#2D939C' }} />, path: "/Reports" },
            { text: t("Cadastro"), icon: <CreateIcon style={{ color: '#2D939C' }} />, path: "/Registrations" },
            { text: t("Configurações"), icon: <SettingsApplicationsIcon style={{ color: '#2D939C' }} />, path: "/settings" },
            { text: t("Sobre"), icon: <GroupsIcon style={{ color: '#2D939C' }} />, path: "/about" },
          ].map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <Tooltip title={drawerOpen ? "" : item.text} placement="right">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
