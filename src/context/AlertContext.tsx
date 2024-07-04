import React, { createContext, useContext, useState } from "react"

type AlertProps = {
    open: boolean, message: string, status: string
    successAlert: (val?: string) => void;
    errorAlert: (val?: string) => void;
    resetAlert: () => void
}

const initState = {
    open: false,
    status: '',
    message: '',
    successAlert: () => { },
    errorAlert: () => { },
    resetAlert: () => { }
}

const AlertContext = createContext<AlertProps>(initState)

export const useAlert = () => useContext(AlertContext)

export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<{ open: boolean, status: string, message: string }>({ open: false, status: '', message: '' })

    const successAlert = (val?: string) => {
        setValue({ open: true, status: 'success', message: val! })
    }
    const errorAlert = (val?: string) => {
        setValue(() => ({ open: true, status: 'error', message: val! }))
    }
    const resetAlert = () => {
        setValue((prev) => ({ ...prev, open: false, }))
    }

    return (
        <AlertContext.Provider value={{ ...value, successAlert, errorAlert, resetAlert }}>
            {children}
        </AlertContext.Provider>
    )
}


