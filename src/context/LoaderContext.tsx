import React, { createContext, useContext, useState } from "react"

type LoaderProps = {
    open: boolean,
    message: string,
    startLoading: (val?: string) => void;
    stopLoading: () => void;
}

const initState = {
    open: false,
    message: '',
    startLoading: () => { },
    stopLoading: () => { },
}

const LoaderContext = createContext<LoaderProps>(initState)

export const useLoader = () => useContext(LoaderContext)

export const LoaderContextprovider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<{ open: boolean, message: string }>({ open: false, message: '' })

    const startLoading = (val?: string) => {
        setValue({ open: true, message: val! })
    }
    const stopLoading = () => {
        setValue(() => ({ open: false, message: '' }))
    }

    return (
        <LoaderContext.Provider value={{ ...value, startLoading, stopLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}