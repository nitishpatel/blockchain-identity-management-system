const data = [
    {
        college: "RD National College",
        PRN: "1234",
        startYear: "2013",
        endYear: "2019",
        CGPA: "1",
        department: "1",
        degreeName: "1",
        collegeId: "647605d53977ef251afbe175",
        id: "61c31190-fef5-11ed-9ed7-1b8879d4835c",
    },
    {
        college: "RD National College",
        PRN: "12344",
        startYear: "2014",
        endYear: "2014",
        CGPA: "1",
        department: "1",
        degreeName: "1",
        collegeId: "647605d53977ef251afbe175",
        id: "00c28a40-fef7-11ed-ba8f-b1629162b049",
        verified: false,
    },
];

const proofID = "61c31190-fef5-11ed-9ed7-1b8879d4835c";

const proof = data.find((proof) => proof.id === proofID);

console.log(proof);
