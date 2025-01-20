import React, { createContext, useContext, useState } from "react"

type UploadProps = {
    upload: boolean,
    openUpload: () => void;
    closeUpload: () => void;
}

const initState = {
    upload: false,
    openUpload: () => { },
    closeUpload: () => { },
}

const UploadContext = createContext<UploadProps>(initState)

export const useUploader = () => useContext(UploadContext)

export const UploadContextprovider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<{ upload: boolean }>({ upload: false })

    const openUpload = () => {
        console.log('upload opened ---')
        setValue({ upload: true })
    }
    const closeUpload = () => {
        setValue(() => ({ upload: false }))
    }

    return (
        <UploadContext.Provider value={{ ...value, openUpload, closeUpload }}>
            {children}
        </UploadContext.Provider>
    )
}