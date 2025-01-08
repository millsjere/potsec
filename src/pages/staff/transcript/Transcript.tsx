import React from 'react'
import PageHeader from '../../../components/shared/PageHeader'
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import AdmissionPDFViewer from './AdmissionPDF'



const Transcript = () => {
    return (
        <div>
            <PageHeader title={'Transcript'} breadcrumbs={[{ label: 'Documents', link: '#' }]} />
            <AdmissionPDFViewer />
        </div>
    )
}

export default Transcript