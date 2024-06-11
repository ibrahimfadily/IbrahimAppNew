import React, { useState } from "react";
import IbrahimaAppContext from './ibrahimAppContext'
const IbrahimAppProvider = (props) => {

    const [scree1_c, setScreen1_c] = useState(0)
    const [scree2_c, setScreen2_c] = useState(0)
    

    const providerValue = {
        // scree1_c,
        // setScreen1_c,
        // scree2_c,
        // setScreen2_c
    }

    return (
        <IbrahimaAppContext.Provider value={providerValue}>
            {props.children}
        </IbrahimaAppContext.Provider>
    )

}

export default IbrahimAppProvider;