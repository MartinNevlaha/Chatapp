import React, {useRef, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
                <div className={classes.sideDrawer_content_title}>
                    <FontAwesomeIcon icon={faTimes} size="2x" cursor="pointer" onClick={props.closeSideDrawer}/>
                </div>
            </div>
        </aside>
    )
}

export default SideDrawer
