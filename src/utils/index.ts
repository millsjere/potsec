import swal from "sweetalert";

interface FieldProps {
  type: string;
  label: string;
  action: string;
  options?: Array<any>;
  placeholder?: string;
  isRequired?: boolean | undefined;
}

interface FormDataProps {
  title: string;
  check?: string;
  fields: Array<FieldProps>;
}

export const getYearRange = (startYear: number) => {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

export const getApplicationForm = (selectProgrammes?: any): FormDataProps[] => {
  return [
    {
      title: "Application",
      fields: [
        {
          type: "select",
          label: "Application Type",
          action: "ENROLL_TYPE",
          options: ["Local (Ghana)", "Foreign"],
          isRequired: true,
        },
        {
          type: "select",
          label: "Month of Enrollment",
          action: "ENROLL_MONTH",
          options: allMonths,
          isRequired: true,
        },
        {
          type: "select",
          label: "Year of Enrollment",
          action: "ENROLL_YEAR",
          options: getYearRange(2019 - 19),
          isRequired: true,
        },
        {
          type: "text",
          label: "Index No.",
          action: "ENROLL_INDEX",
          isRequired: true,
        },
      ],
    },
    {
      title: "Personal Details",
      fields: [
        { type: "text", label: "Surname", action: "SURNAME", isRequired: true },
        {
          type: "text",
          label: "Othernames",
          action: "OTHERNAMES",
          isRequired: true,
        },
        { type: "email", label: "Email", action: "EMAIL", isRequired: true },
        {
          type: "tel",
          label: "Phone",
          action: "PHONE_MOBILE",
          isRequired: true,
        },
        {
          type: "tel",
          label: "WhatsApp",
          action: "PHONE_WHATSAPP",
          isRequired: true,
        },
        {
          type: "select",
          label: "Gender",
          action: "GENDER",
          options: ["Male", "Female"],
          isRequired: true,
        },
        {
          type: "date",
          label: "Date of Birth",
          action: "DOB",
          isRequired: true,
        },
        { type: "number", label: "Age", action: "AGE", isRequired: true },
        {
          type: "select",
          label: "Educational Level",
          action: "EDU_LEVEL",
          options: [
            "Graduate",
            "SHS Leaver",
            "JHS Leaver",
            "Mature Applicant",
            "Others",
          ],
          isRequired: true,
        },
        {
          type: "text",
          label: "Language Spoken",
          action: "LANGUAGE_SPOKEN",
          placeholder: "English, Fante, Ewe",
          isRequired: true,
        },
        {
          type: "text",
          label: "Language Written",
          action: "LANGUAGE_WRITTEN",
          placeholder: "English, Fante, Ewe",
          isRequired: true,
        },
        {
          type: "select",
          label: "National ID",
          action: "NATIONAL_ID",
          options: ["Ghana Card", "Drivers License", "Passport"],
          isRequired: true,
        },
        {
          type: "text",
          label: "ID Number",
          action: "NATIONAL_ID_NUMBER",
          isRequired: true,
        },
        {
          type: "text",
          label: "Residence Address",
          action: "RESIDENCE",
          isRequired: true,
        },
        {
          type: "text",
          label: "Town",
          action: "RESIDENCE_TOWN",
          isRequired: true,
        },
        {
          type: "text",
          label: "District",
          action: "RESIDENCE_DISTRICT",
          isRequired: true,
        },
        {
          type: "select",
          label: "Region",
          action: "RESIDENCE_REGION",
          options: [
            "Ashanti",
            "Brong Ahafo",
            "Central",
            "Eastern",
            "Greater Accra",
            "Volta",
            "Western",
            "Northern",
            "Upper East",
            "Upper West",
            "Oti",
            "Savannah",
            "Bono East",
            "Ahafo",
            "North East",
          ],
          isRequired: true,
        },
      ],
    },
    {
      title: "Payment Method",
      fields: [
        {
          type: "select",
          label: "Payment",
          action: "PAYMENT",
          options: ["Mobile Money"],
          isRequired: true,
        },
        {
          type: "text",
          label: "Reference",
          action: "PAYMENT_REF",
          isRequired: true,
        },
        {
          type: "text",
          label: "Transaction ID",
          action: "PAYMENT_TRANSACTION_ID",
          isRequired: true,
        },
      ],
    },
    {
      title: "Employment",
      fields: [
        {
          type: "select",
          label: "Are you currently employed?",
          action: "EMPLOYMENT",
          options: ["Yes", "No"],
          isRequired: true,
        },
        {
          type: "text",
          label: "What is your current job",
          action: "CURRENT_EMPLOYMENT",
          isRequired: true,
        },
        {
          type: "select",
          label: "Do you need employment after completion",
          action: "EMPLOYMENT_NEEDED",
          options: ["Yes", "No"],
          isRequired: true,
        },
      ],
    },
    {
      title: "Health",
      fields: [
        {
          type: "select",
          label: "Do you have any health conditions?",
          action: "HEALTH_CONDITION",
          options: ["Yes", "No"],
          isRequired: true,
        },
        {
          type: "textarea",
          label: "If yes, please provide details of the condition",
          action: "HEALTH_DETAILS",
          isRequired: false,
        },
      ],
    },
    {
      title: "Guardian",
      fields: [
        {
          type: "text",
          label: "Name",
          action: "GUARDIAN_NAME",
          isRequired: true,
        },
        {
          type: "text",
          label: "Phone Number",
          action: "GUARDIAN_PHONE",
          isRequired: true,
        },
        {
          type: "text",
          label: "Relationship",
          action: "GUARDIAN_RELATIONSHIP",
          isRequired: false,
        },
      ],
    },
    {
      title: "Sponsor",
      check: "Same as Guardian",
      fields: [
        {
          type: "text",
          label: "Name",
          action: "SPONSOR_NAME",
          isRequired: false,
        },
        {
          type: "text",
          label: "Phone Number",
          action: "SPONSOR_PHONE",
          isRequired: false,
        },
        {
          type: "text",
          label: "Relationship",
          action: "SPONSOR_RELATIONSHIP",
          isRequired: false,
        },
      ],
    },
    {
      title: "Emergency",
      check: "Same as Guardian",
      fields: [
        {
          type: "text",
          label: "Name",
          action: "EMERGENCY_NAME",
          isRequired: false,
        },
        {
          type: "text",
          label: "Phone Number",
          action: "EMERGENCY_PHONE",
          isRequired: false,
        },
        // { type: 'text', label: 'Location', action: 'EMERGENCY_LOCATION', isRequired: false },
      ],
    },
    {
      title: "Programme & Certification",
      fields: [
        {
          type: "select",
          label: "Certification",
          action: "ENROLL_CERTIFICATION",
          options: ["HND/DIPLOMA", "ADVANCED CERTIFICATE", "CERTIFICATE"],
          isRequired: true,
        },
        {
          type: "select",
          label: "Certification Level",
          action: "ENROLL_CERTIFICATION_LEVEL",
          options: [
            "BEGINNER - (has no Foundation)",
            "INTER-MEDIATE - (has the Basic knowledge)",
            "ADVANCED - (has at least 50% knowledge)",
          ],
          isRequired: true,
        },
        {
          type: "select",
          label: "Select Programme",
          action: "ENROLL_PROGRAMME",
          options: selectProgrammes || [],
          isRequired: true,
        },
        {
          type: "select",
          label: "Mode of Education",
          action: "ENROLL_TUITION_MODE",
          options: programmeTrainings,
          isRequired: true,
        },
        {
          type: "select",
          label: "Select Session",
          action: "ENROLL_SESSION",
          options: programmeSessions,
          isRequired: true,
        },
        {
          type: "select",
          label: "Campus",
          action: "CAMPUS",
          options: ["Accra", "Kumasi"],
          isRequired: true,
        },
      ],
    },
  ];
};

export const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const programmes = [
  "FASHION DESIGN AND TEXTILES SCHOOL",
  "CATERING AND HOSPITALITY SCHOOL",
  "COSMETOLOGY SCHOOL",
  "BEAUTY THERAPY SCHOOL",
  "BEAUTY SPECIALIST SCHOOL",
  "HAIR TECHNOLOGY SCHOOL",
  "ELECTRICAL AND ELECTRONICS SCHOOL",
  "WELDING AND FABRICATION SCHOOL",
  "ALUMINUM & GLASS FABRICATION SCHOOL",
  "COMPUTER SCIENCE SCHOOL",
  "PLUMBING AND TILLING ENGINEERING SCHOOL",
];

export const programmeTrainings = [
  "Formal Education (85% Practical and 15% theory (written)",
  "Non-Formal Education (85% Practical and 15% theory (Oral)",
  "Informal Education (100% Practical)",
];

export const programmeSessions = [
  "Regular (Monday-Friday)",
  "Part-Time (3 Times A Week)",
  "Private Tuition (Applicant Determines Time)",
];

export const certificationLevels = {
  beginner: [
    "HND/DIPLOMA THREE (3) YEARS",
    "ADVANCED CERTIFICATE TWO (2) YEARS",
    "CERTIFICATE ONE (1) YEAR",
  ],
  intermediate: [
    "HND/DIPLOMA TWO (2) YEARS",
    "ADVANCED CERTIFICATE ONE (1) YEARS",
    "CERTIFICATE EIGHT (8) MONTHS",
  ],
  advanced: [
    "HND/DIPLOMA EIGHTEEN (18) MONTHS",
    "ADVANCED CERTIFICATE EIGHT (8) MONTHS",
    "CERTIFICATE SIX (6) MONTHS",
  ],
};

export const certifications = {
  HND: [
    "GARMENT CONSTRUCTION (BRIDAL WEAR & SUIT INCLUSIVE)",
    "MACHINERY, TOOLS & EQUIPMENT",
    "FASHION DESIGN & ILLUSTRATION",
    "DIGITAL ILLUSTRATION",
    "EMBELLISHMENT TECHNOLOGY",
    "MILLINERY & ACCESSORIES",
    "PATTERN DRAFTING",
    "TEXTILE TECHNOLOGY",
    "MODELING",
    "EMBROIDERY TECHNOLOGY",
    "EVENT DECORATION & EVENT MANAGEMENT",
    "BEAUTY AND CARE",
    "PASTRIES AND BEVERAGES",
    "I. C. T. IN FASHION INDUSTRY",
    "ENTREPRENEURSHIP",
  ],
  ADVANCED: [
    "GARMENT CONSTRUCTION (BRIDAL WEAR & SUIT INCLUSIVE)",
    "MACHINERY, TOOLS & EQUIPMENT",
    "FASHION DESIGN & ILLUSTRATION",
    "EMBELLISHMENT TECHNOLOGY",
    "MILLINERY & ACCESSORIES",
    "PATTERN DRAFTING",
    "TEXTILE TECHNOLOGY",
    "MODELING",
    "EVENT DECORATION",
    "I. C. T. IN FASHION INDUSTRY",
    "ENTREPRENEURSHIP",
  ],
  CERTIFICATE: [
    "GARMENT CONSTRUCTION",
    "MACHINERY, TOOLS & EQUIPMENT",
    "FASHION DESIGN & ILLUSTRATION",
    "MILLINERY & ACCESSORIES",
    "PATTERN DRAFTING",
    "TEXTILE TECHNOLOGY",
    "MODELING",
    "I. C. T. IN FASHION INDUSTRY",
    "ENTREPRENEURSHIP",
  ],
};

export const initState = {
  surname: "",
  othernames: "",
  email: "",
  phone: {
    mobile: "",
    whatsapp: "",
  },
  gender: "",
  dob: "",
  age: "",
  educationalLevel: "",
  payment: {
    type: "",
    reference: "",
    transaction_id: "",
  },
  language: {
    spoken: "",
    written: "",
  },
  nationalID: {
    type: "",
    number: "",
  },
  address: {
    residence: "",
    town: "",
    district: "",
    region: "",
  },
  employment: {
    isEmployed: "",
    currentJob: "",
    afterCompletion: "",
  },
  health: {
    anyCondition: "",
    details: "",
  },
  guardian: {
    name: "",
    phone: "",
    relationship: "",
  },
  sponsor: {
    name: "",
    phone: "",
    relationship: "",
  },
  emergency: {
    name: "",
    phone: "",
    // location: "",
  },
  enrollment: {
    index: "",
    type: "",
    month: "",
    year: "",
    duration: "",
    programme: "",
    department: "",
    modeofTuition: "",
    certification: "",
    certificationLevel: "",
    session: "",
  },
  campus: "",
};

export const studentReducerFn = (state: typeof initState, action: any) => {
  switch (action.type) {
    case "CAMPUS":
      return {
        ...state,
        campus: action?.payload,
      };
    case "SURNAME":
      return {
        ...state,
        surname: action?.payload,
      };
    case "OTHERNAMES":
      return {
        ...state,
        othernames: action?.payload,
      };
    case "EMAIL":
      return {
        ...state,
        email: action?.payload,
      };
    case "PHONE_MOBILE":
      return {
        ...state,
        phone: { ...state?.phone, mobile: action?.payload },
      };
    case "PHONE_WHATSAPP":
      return {
        ...state,
        phone: { ...state?.phone, whatsapp: action?.payload },
      };
    case "GENDER":
      return {
        ...state,
        gender: action?.payload,
      };
    case "DOB":
      return {
        ...state,
        dob: action?.payload,
      };
    case "AGE":
      return {
        ...state,
        age: action?.payload,
      };
    case "EDU_LEVEL":
      return {
        ...state,
        educationalLevel: action?.payload,
      };
    case "LANGUAGE_SPOKEN":
      return {
        ...state,
        language: { ...state?.language, spoken: action?.payload },
      };
    case "LANGUAGE_WRITTEN":
      return {
        ...state,
        language: { ...state?.language, written: action?.payload },
      };
    case "NATIONAL_ID":
      return {
        ...state,
        nationalID: { ...state?.nationalID, type: action?.payload },
      };
    case "NATIONAL_ID_NUMBER":
      return {
        ...state,
        nationalID: { ...state?.nationalID, number: action?.payload },
      };
    case "PAYMENT":
      return {
        ...state,
        payment: { ...state?.payment, type: action?.payload },
      };
    case "PAYMENT_REF":
      return {
        ...state,
        payment: { ...state?.payment, reference: action?.payload },
      };
    case "PAYMENT_TRANSACTION_ID":
      return {
        ...state,
        payment: { ...state?.payment, transaction_id: action?.payload },
      };
    case "RESIDENCE":
      return {
        ...state,
        address: { ...state?.address, residence: action?.payload },
      };
    case "RESIDENCE_TOWN":
      return {
        ...state,
        address: { ...state?.address, town: action?.payload },
      };
    case "RESIDENCE_DISTRICT":
      return {
        ...state,
        address: { ...state?.address, district: action?.payload },
      };
    case "RESIDENCE_REGION":
      return {
        ...state,
        address: { ...state?.address, region: action?.payload },
      };

    case "HEALTH_CONDITION":
      return {
        ...state,
        health: { ...state?.health, anyCondition: action?.payload },
      };
    case "HEALTH_DETAILS":
      return {
        ...state,
        health: { ...state?.health, details: action?.payload },
      };
    case "EMPLOYMENT":
      return {
        ...state,
        employment: { ...state?.employment, isEmployed: action?.payload },
      };
    case "CURRENT_EMPLOYMENT":
      return {
        ...state,
        employment: { ...state?.employment, currentJob: action?.payload },
      };
    case "EMPLOYMENT_NEEDED":
      return {
        ...state,
        employment: { ...state?.employment, afterCompletion: action?.payload },
      };
    case "GUARDIAN_NAME":
      return {
        ...state,
        guardian: { ...state?.guardian, name: action?.payload },
      };
    case "GUARDIAN_PHONE":
      return {
        ...state,
        guardian: { ...state?.guardian, phone: action?.payload },
      };
    case "GUARDIAN_RELATIONSHIP":
      return {
        ...state,
        guardian: { ...state?.guardian, relationship: action?.payload },
      };
    case "SPONSOR_NAME":
      return {
        ...state,
        sponsor: { ...state?.sponsor, name: action?.payload },
      };
    case "SPONSOR_PHONE":
      return {
        ...state,
        sponsor: { ...state?.sponsor, phone: action?.payload },
      };
    case "SPONSOR_RELATIONSHIP":
      return {
        ...state,
        sponsor: { ...state?.sponsor, relationship: action?.payload },
      };
    case "EMERGENCY_NAME":
      return {
        ...state,
        emergency: { ...state?.emergency, name: action?.payload },
      };
    case "EMERGENCY_PHONE":
      return {
        ...state,
        emergency: { ...state?.emergency, phone: action?.payload },
      };
    case "ENROLL_TYPE":
      return {
        ...state,
        enrollment: { ...state?.enrollment, type: action?.payload },
      };
    case "ENROLL_MONTH":
      return {
        ...state,
        enrollment: { ...state?.enrollment, month: action?.payload },
      };
    case "ENROLL_YEAR":
      return {
        ...state,
        enrollment: { ...state?.enrollment, year: action?.payload },
      };
    case "ENROLL_DURATION":
      return {
        ...state,
        enrollment: { ...state?.enrollment, duration: action?.payload },
      };
    case "ENROLL_PROGRAMME":
      return {
        ...state,
        enrollment: { ...state?.enrollment, programme: action?.payload },
      };
    case "ENROLL_DEPARTMENT":
      return {
        ...state,
        enrollment: { ...state?.enrollment, department: action?.payload },
      };
    case "ENROLL_CERTIFICATION":
      return {
        ...state,
        enrollment: {
          ...state?.enrollment,
          certification: action?.payload,
          programme: "",
        },
      };
    case "ENROLL_CERTIFICATION_LEVEL":
      return {
        ...state,
        enrollment: {
          ...state?.enrollment,
          certificationLevel: action?.payload,
        },
      };
    case "ENROLL_TUITION_MODE":
      return {
        ...state,
        enrollment: { ...state?.enrollment, modeofTuition: action?.payload },
      };
    case "ENROLL_SESSION":
      return {
        ...state,
        enrollment: { ...state?.enrollment, session: action?.payload },
      };
    case "ENROLL_INDEX":
      return {
        ...state,
        enrollment: {
          ...state?.enrollment,
          index: action?.payload?.toUpperCase(),
        },
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
};

export const validateFile = (file: File, type: string) => {
  let ext: any = file?.name?.split(".");
  let fileSize = file?.size / 1024 / 1024; // file size in MB

  if (type === "image") {
    if (
      !(
        ext[ext?.length - 1]?.startsWith("jpeg") ||
        ext[ext?.length - 1]?.startsWith("jpg") ||
        ext[ext?.length - 1]?.startsWith("png")
      )
    )
      return swal(
        "Invalid",
        "You have selected a wrong file. Only .jpg, .jpeg and .png files are allowed",
        "error"
      );
    if (fileSize > 0.5) {
      return swal({
        title: "Invalid",
        text: "File size exceeds 0.5MB.",
        icon: "error",
      }).then(() => false);
    }
  }
  if (type === "excel") {
    if (
      !(
        ext[ext?.length - 1]?.startsWith("xls") ||
        ext[ext?.length - 1]?.startsWith("csv") ||
        ext[ext?.length - 1]?.startsWith("numbers")
      )
    )
      return swal(
        "Invalid",
        "You have selected a wrong file. Only .xlsx, .xls, .csv and .numbers files are allowed",
        "error"
      );
    if (fileSize > 1) return swal("Invalid", "File size exceeds 1MB.", "error");
  }
  if (type === "pdf") {
  }
  return file;
};
