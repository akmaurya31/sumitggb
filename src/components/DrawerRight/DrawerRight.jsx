import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';
import "./DrawerRight.scss";


export default function DrawerRight(props) {
  const { window, toggleDrawer, openRightDrawer, content, className, id } = props;

  return (
    <div className=' '>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
          className={className + '  drawer-right-custom-style mmmmmmmm123  '}
          id={id ? id : "right-drawer"}
            anchor={anchor}
            open={openRightDrawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {/* {list(anchor)} */}
            {content} 
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
