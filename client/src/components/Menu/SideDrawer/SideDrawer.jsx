import React, {useRef, useEffect} from 'react';

import classes from "./SideDrawer.module.scss"; 

const SideDrawer = (props) => {
    const sideRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClose);

        return () => {
            document.removeEventListener("mousedown", handleClose);
        }
    }, [sideRef])

    const handleClose = (event) => {
        if (sideRef.current && !sideRef.current.contains(event.target)) {
            props.closeSideDrawer();
        }
      }
    return (
        <aside className={classes.sideDrawer}>
            <div ref={sideRef} className={props.isOpen ? [classes.sideDrawer_content, classes.open].join(" ") : classes.sideDrawer_content}>
                side
            </div>
        </aside>
    )
}

export default SideDrawer
