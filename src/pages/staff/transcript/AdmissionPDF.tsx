import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Font } from "@react-pdf/renderer";
import Logo from '../../../assets/images/logo.png'

// Register local fonts
Font.register({
    family: "Roboto",
    fonts: [
        { src: "/fonts/Roboto-Regular.ttf" }, // Regular font
        { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" }, // Bold font
    ],
});

const AdmissionDocument = ({ student, enrollment, bankDetails }: { student: any, enrollment: any, bankDetails: any }) => {
    const { programme, session } = enrollment
    const { accountName, accountNo, bank, startDate, endDate, utilities } = bankDetails

    const formatDate = (date: string) => {
        return new Date(date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
    const styles = StyleSheet.create({
        page: { fontFamily: "Roboto", padding: 30, fontSize: 12 },
        header: { fontFamily: "Roboto", fontSize: 11, fontWeight: 'extrabold', lineHeight: 1.3 },
        title: { fontFamily: "Roboto", fontSize: 12, textAlign: 'center', marginBottom: 20, fontWeight: 'extrabold', lineHeight: 0.9 },
        section: { marginBottom: 10 },
        text: { fontFamily: "Roboto", marginBottom: 8, lineHeight: 1.3, textAlign: 'justify', fontSize: 11 },
        paras: { fontFamily: "Roboto", marginBottom: 0, lineHeight: 1.3, fontSize: 11 },
        footer: { marginTop: 30, textAlign: 'center', fontSize: 10 },
        boldText: { fontFamily: "Roboto", fontWeight: 'bold' },
        underlineText: { textDecoration: 'underline' },
        upperCaseText: { textTransform: 'uppercase' },
        stack: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
        centerText: { textAlign: 'center' },
        imageStyle: { width: 80 },
    });

    return (
        <Document>
            <Page style={styles.page}>
                <View style={[styles.section, styles.stack]}>
                    <Image src={Logo} style={styles.imageStyle} />
                    <View>
                        <View style={styles.centerText}>
                            <Text style={[styles.header, styles.upperCaseText]}>Prince Osei-Tutu Skills and Entrepreneurial College</Text>
                            <Text style={[styles.header, styles.centerText]}>KUMASI, AE-0017-2882 | ACCRA,GW-0117-4851</Text>
                            <Text style={styles.header}>TEL: 0247142800 | 0207767777</Text>
                            <Text style={styles.header}>Website: https://potsec.edu.gh</Text>
                        </View>
                    </View>
                    <Image src={Logo} style={styles.imageStyle} />
                </View>
                <Text style={{ height: .8, backgroundColor: '#000', marginBottom: 10 }}></Text>

                <View style={styles.section}>
                    <View style={styles.stack}>
                        <Text style={styles.text}>POTSEC/ADMS/JAN/25</Text>
                        <Text style={styles.text}></Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.paras}>Date: <Text style={styles.boldText}>{new Date()?.toDateString()}</Text></Text>
                    <Text style={styles.paras}>Student Name: <Text style={styles.boldText}>{student?.fullname || ''}</Text></Text>
                    <Text style={styles.paras}>Student Mobile: <Text style={styles.boldText}>{student?.phone?.mobile || ''}</Text></Text>
                    <Text style={styles.paras}>Location: <Text style={styles.boldText}>{student?.address?.residence}</Text></Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}></Text>
                    <Text style={[styles.text, styles.boldText, { textTransform: 'capitalize' }]}>
                        Dear {student?.surname},
                    </Text>
                    <Text style={[styles.title, styles.boldText, styles.underlineText]}>ADMISSION TO POTSEC – {enrollment?.year} ACADEMIC YEAR</Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>1.</Text> We are pleased to inform you that the admission board for Prince Osei-Tutu Skills and Entrepreneurial College, <Text style={styles.boldText}>{student?.campus || '--'}</Text> Campus has offered you admission to pursue <Text style={styles.boldText}>{programme?.duration?.number || 0} {programme?.duration?.type || 'Years'}</Text> in <Text style={styles.boldText}>{programme?.name || '--'}</Text> Programme on <Text style={styles.boldText}>{session || '--'}</Text> option starting from <Text style={styles.boldText}>{formatDate(startDate)}</Text>. Our Tuition is 85% practical; you are informed to prepare both in finance and in mind for active participation
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>2.</Text> You are required to make nonrefundable Fees payment of <Text style={styles.boldText}>{programme?.tuition?.words || '--'} (GHS{programme?.tuition?.amount || 0})</Text> before <Text style={styles.boldText}>{formatDate(endDate)}</Text>, if you accept this offer of admission. The Amount covers your Admission Fees and Tuition Fees for the First Semester. Payment must be made at any <Text style={styles.boldText}>{bank}</Text> branch into the college account <Text style={styles.boldText}>{accountNo}</Text> all bearing the name <Text style={styles.boldText}>{accountName}</Text>, where there is no <Text style={styles.boldText}>{bank}</Text>, you may buy Bankers drafts at any Bank except rural banks or may pay into College MTN Mobile Money account <Text style={styles.boldText}>0549262879</Text> with the name <Text style={styles.boldText}>PRINCE OSEI-TUTU</Text>. Your Tuition fees for each of the subsequence Semester is <Text style={styles.boldText}>GHS700</Text>. Attached is the copy your prospectus
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>3.</Text> Note that, the space for accommodation on campus for students is limited. Contact the College administrator on 0247142800 if you wish to be considered for accommodation. {utilities}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>4.</Text> The College reserves the right to revise its fees and other arrangements without prior notice, and this letter may be corrected or revoked if a mistake is detected or if it was issued in error
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>5.</Text> Your admission is for the First quarter of {enrollment?.year} academic year only and if you fail to enroll or withdraw from the program, you forfeit the admission automatically. You will require to complete a fresh set of an application form if you want to be considered for admission in subsequent admissions
                    </Text>
                    <Text style={styles.text}>
                        <Text style={styles.boldText}>6.</Text> You will be required to adhere to all College rules and regulations as contained in Students’ Handbooks. Students are considered to be on probation for the duration of their program and they will be dismissed at any time for misconduct without refund
                    </Text>
                    <Text style={styles.text}>
                        Please, accept our congratulations
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>Yours Sincerely,</Text>
                    <Text style={styles.text}></Text>
                    <Text style={[styles.text, styles.boldText, { marginBottom: '0px' }]}>Mr. Samuel Darko</Text>
                    <Text style={[styles.text, styles.boldText]}>College Principal</Text>
                </View>

                <Text style={styles.footer}>POTSEC: Creating a Skilled World</Text>
            </Page>
        </Document>
    );
};


export default AdmissionDocument;
