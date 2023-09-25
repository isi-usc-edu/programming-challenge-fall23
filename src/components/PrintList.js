import React, {useRef} from "react";
import {Button} from "@mui/material";
import {useReactToPrint} from "react-to-print";
const PrintList = ({componentRef}) => {

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Button onClick={() => handlePrint()}>Print</Button>


        </>
    )
}

export {
    PrintList
}