import { Global } from "@emotion/react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import "./DrawerBottom.scss";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

function DrawerBottom(props) {
  const {id, window, toggleDrawer, openBottomDrawer, content } = props;
  // const [openBottomDrawer, setOpenBottomDrawer] = React.useState(false);

  // const toggleDrawer = (newOpen) => () => {
  //   setOpenBottomDrawer(newOpen);
  // };

  // console.log("openBottomDrawer", openBottomDrawer);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        className={openBottomDrawer == false ? " active" : " sm:p-590 kkkkkkkkk123"}
        // id="drawer-bottom"
        id={id ? id : "drawer-bottom" }
        container={container}
        anchor="bottom"
        open={openBottomDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {content}
          </Typography>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

DrawerBottom.propTypes = {
  window: PropTypes.func,
};

export default DrawerBottom;
