import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import Logo from '../../../assets/images/logo.png';

// Register local fonts
Font.register({
    family: "Roboto",
    fonts: [
        { src: "/public/fonts/Roboto-Regular.ttf" }, // Regular font
        { src: "/public/fonts/Roboto-Bold.ttf", fontWeight: "bold" }, // Bold font
    ],
});

// Define styles
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Roboto", },
    header: { fontFamily: "Roboto", fontSize: 11, fontWeight: 'extrabold', lineHeight: 1.3 },
    section: { marginBottom: 10 },
    studentInfo: { marginBottom: 5, fontSize: 11, lineHeight: 1 },
    table: { display: "flex", width: "100%", borderWidth: 1, borderColor: "#000" },
    row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#000" },
    cell: { flex: 1, padding: 5, fontSize: 10, textAlign: "center" },
    bold: { fontWeight: "bold" },
    footer: { textAlign: "center", marginTop: 20, fontSize: 10 },
    imageStyle: { width: 80 },
    centerText: { textAlign: 'center' },
    upperCaseText: { textTransform: 'uppercase' },
    stack: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    semesterTitle: { fontSize: 11, fontWeight: "bold", marginTop: 10, marginBottom: 5 },
    totalGpa: { fontSize: 11, fontWeight: "bold", textAlign: "right", marginTop: 2 }
});

const ResultTranscript = ({ student, semesters }: { student: any, semesters: any[] }) => {
    // Function to calculate total GPA for a semester
    const calculateSemesterGPA = (courses: any[]) => {
        const totalGPA = courses.reduce((sum, course) => sum + course.gpa, 0) / courses.length;
        return totalGPA.toFixed(2); // Keep 2 decimal places
    };

    // Function to calculate cumulative GPA
    const calculateCumulativeGPA = () => {
        const allCourses = semesters?.flatMap((semester: any) => semester.courses);
        const totalGPA = allCourses.reduce((sum, course) => sum + course.gpa, 0) / allCourses.length;
        return totalGPA.toFixed(2);
    };

    return (
        <Document>
            <Page style={styles.page}>
                {/* Header */}
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

                {/* Student Information */}
                <View style={[styles.section, styles.stack]}>
                    <View>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Name:</Text> {student.name}</Text>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Index Number:</Text> {student.indexNumber}</Text>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Programme:</Text> {student.programme}</Text>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Academic Year:</Text> {student.year}</Text>
                    </View>
                    <View>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Date Issued:</Text> {new Date()?.toDateString()}</Text>
                        <Text style={styles.studentInfo}><Text style={[styles.bold]}>Issued To:</Text> {student.name}</Text>
                    </View>
                </View>

                {/* Results for Each Semester */}
                {semesters?.map((semester: any, index: number) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                        <Text style={styles.semesterTitle}>{semester?.name} </Text>
                        <View style={styles.table}>
                            <View style={[styles.row, styles.bold]}>
                                <Text style={styles.cell}>Course Code</Text>
                                <Text style={styles.cell}>Course Title</Text>
                                <Text style={styles.cell}>Credit</Text>
                                <Text style={styles.cell}>Grade</Text>
                                <Text style={styles.cell}>GPA</Text>
                            </View>
                            {semester?.courses?.map((course: any, i: number) => (
                                <View key={i} style={styles.row}>
                                    <Text style={styles.cell}>{course?.code}</Text>
                                    <Text style={styles.cell}>{course?.name}</Text>
                                    <Text style={styles.cell}>{course?.credit}</Text>
                                    <Text style={styles.cell}>{course?.grade}</Text>
                                    <Text style={styles.cell}>{course?.gpa}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.totalGpa}>Total GPA : {calculateSemesterGPA(semester.courses)}</Text>
                    </View>
                ))}

                {/* Footer */}
                <Text style={styles.footer}>This document is system-generated and does not require a signature.</Text>
            </Page>
        </Document>
    );
};

export default ResultTranscript; 
