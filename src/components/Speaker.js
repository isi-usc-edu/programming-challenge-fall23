import {Mic} from "@mui/icons-material";
import {Fab} from "@mui/material";
import React from "react";

const SpeakerComponent = ({addProduct}) => {
    return (
        <Fab
            onClick={() => addProduct()}
            style={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
            }}
            size="large"
            color="primary"
            aria-label="add">
            <Mic/>
        </Fab>
    )
}
export {
    SpeakerComponent
}