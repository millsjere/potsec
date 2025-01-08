import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const AdmissionDocument = () => {
    const styles = StyleSheet.create({
        page: { padding: 30, fontSize: 12 },
        header: { fontSize: 18, textAlign: 'center', marginBottom: 20, fontWeight: 'extrabold', lineHeight: 0.5 },
        section: { marginBottom: 10 },
        text: { marginBottom: 5 },
        stack: { display: 'flex', flexDirection: 'row' },
        footer: { marginTop: 30, textAlign: 'center', fontSize: 10 },
    });

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.header}>Prince Osei-Tutu Skills and Entrepreneurial College</Text>
                <Text style={styles.header}>Admission Letter</Text>

                <View style={styles.section}>
                    <Text style={styles.text}>Date: November 28th, 2024</Text>
                    <Text style={styles.text}>Student Name: Adiza Salifu</Text>
                    <Text style={styles.text}>Index Number: EA-1822-8111</Text>
                    <Text style={styles.text}>Location: Ejisu, Ashanti Region</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        Dear Salifu, We are pleased to inform you that the admission board for Prince
                        Osei-Tutu Skills and Entrepreneurial College, Accra Campus has offered you admission to
                        pursue Three (3) years Diploma in COSMETOLOGY (Hair and Beauty) Programme on regular
                        option starting from 6th January, 2025.
                    </Text>
                    <Text style={styles.text}>
                        You are required to make a nonrefundable fees payment of GH₵2,500 before December 20th,
                        2024, if you accept this offer of admission. Payment must be made to the college
                        account or mobile money details provided.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        Please note that your hall of affiliation is Majesty. Contact the administrator for
                        accommodation details.
                    </Text>
                    <Text style={styles.text}>
                        Adherence to all college rules and regulations is mandatory. Students are on probation
                        throughout their program and may face dismissal for misconduct.
                    </Text>
                </View>

                <Text style={styles.footer}>Creating a Skilled World</Text>
            </Page>
        </Document>
    );
};

const AdmissionPDFViewer = () => {
    return (
        <PDFViewer width="100%" height="600">
            <AdmissionDocument />
        </PDFViewer>
    );
};

export default AdmissionPDFViewer;
