import React, { useState } from 'react';


const PracticeContext = React.createContext();

const PraticeProvider = ({children}) =>
{
    const [code1, setCode1] = useState('')
    return(
        <PracticeContext.Provider value={{code1, setCode1}} >
            {children}
        </PracticeContext.Provider>
    )
}

export {PracticeContext , PraticeProvider}