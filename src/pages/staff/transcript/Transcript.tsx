import React from 'react'
import PageHeader from '../../../components/shared/PageHeader'
import { PDFViewer } from '@react-pdf/renderer'
import ResultTranscript from './TranscriptTemplate'


export const student = {
    name: "Jeremiah Mills",
    indexNumber: "POTSEC/202/25",
    program: "Fashion Design",
    year: "2025",
};

export const results = [
    { name: "Pattern Making", code: "FD101", grade: "A", gpa: 4.0 },
    { name: "Textile Science", code: "FD102", grade: "B+", gpa: 3.5 },
    { name: "Sewing Techniques", code: "FD103", grade: "A-", gpa: 3.7 },
    { name: "Fashion Marketing", code: "FD104", grade: "B", gpa: 3.0 },
];

export const sems = [
    {
        name: "Semester 1",
        courses: [
            { name: "Pattern Making", code: "FD101", credit: 3, grade: "A", gpa: 4.0 },
            { name: "Sewing Techniques", code: "FD102", credit: 3, grade: "B+", gpa: 3.5 },
            { name: "Fabric Selection", code: "FD103", credit: 3, grade: "A-", gpa: 3.7 }
        ]
    },
    {
        name: "Semester 2",
        courses: [
            { name: "Advanced Tailoring", code: "FD201", credit: 3, grade: "B", gpa: 3.0 },
            { name: "Fashion Marketing", code: "FD202", credit: 3, grade: "A-", gpa: 3.7 },
            { name: "Draping Techniques", code: "FD203", credit: 3, grade: "B+", gpa: 3.5 }
        ]
    }
]

const Transcript = () => {


    return (
        <div>
            <PageHeader title={'Transcript'} breadcrumbs={[{ label: 'Documents', link: '#' }]} />

            <PDFViewer style={{ width: "100%", height: "1000px" }}>
                <ResultTranscript student={student} semesters={sems} />
            </PDFViewer>
        </div>
    )
}

export default Transcript