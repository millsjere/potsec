import swal from "sweetalert";
import { base } from "../config/appConfig";

export const onDeleteHandler = async (
  id: string,
  text: string,
  urlString: string,
  startLoading: (val: string) => void,
  stopLoading: () => void,
  fetchData: () => void
) => {
  swal({
    title: "Are You Sure?",
    text: `This action will delete this ${text?.toLowerCase()}`,
    icon: "warning",
    buttons: ["Cancel", "Delete"],
    dangerMode: true,
    closeOnClickOutside: false,
  }).then(async (del) => {
    if (del) {
      try {
        startLoading(`Removing ${text?.toLowerCase()}. Please wait..`);
        await base.delete(`/api/staff/${urlString}/${id}`);
        swal("Success", `${text} deleted successfully`, "success").then(
          fetchData
        );
      } catch (error: any) {
        console.log(error?.response);
        swal("Error", `Sorry could not delete ${text}`, "error");
      } finally {
        stopLoading();
      }
    }
  });
};

interface FieldProps {
  type: string;
  label: string;
  action: string;
  options?: Array<any>;
  keys?: Array<string>;
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
  startYear = startYear || 2020;
  while (startYear <= currentYear) {
    years.push(startYear++ + 1);
  }
  return years;
};

export const formatDateTime = (date: string) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const newTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${newDate}, ${newTime}`;
};

export const emailValidation = (email: string): boolean => {
  const isValid = email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  return Boolean(isValid);
};

export const getRegions = () => [
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
];

export const getApplicationForm = (selectProgrammes?: any): FormDataProps[] => {
  return [
    {
      title: "Application",
      fields: [
        {
          type: "select",
          label: "Application Type",
          action: "ENROLL_TYPE",
          options: ["Local", "Foreign"],
          isRequired: true,
          keys: ["enrollment", "type"],
        },
        {
          type: "select",
          label: "Month of Enrollment",
          action: "ENROLL_MONTH",
          options: allMonths,
          isRequired: true,
          keys: ["enrollment", "month"],
        },
        {
          type: "select",
          label: "Year of Enrollment",
          action: "ENROLL_YEAR",
          options: getYearRange(2023),
          isRequired: true,
          keys: ["enrollment", "year"],
        },
        // {
        //   type: "text",
        //   label: "Index No.",
        //   action: "ENROLL_INDEX",
        //   isRequired: true,
        //   keys: ['enrollment','index']
        // },
      ],
    },
    {
      title: "Personal Details",
      fields: [
        {
          type: "text",
          label: "Surname",
          action: "SURNAME",
          isRequired: true,
          keys: ["surname"],
        },
        {
          type: "text",
          label: "Othernames",
          action: "OTHERNAMES",
          isRequired: true,
          keys: ["othernames"],
        },
        {
          type: "email",
          label: "Email",
          action: "EMAIL",
          isRequired: true,
          keys: ["email"],
        },
        {
          type: "number",
          label: "Phone",
          action: "PHONE_MOBILE",
          isRequired: true,
          keys: ["phone", "mobile"],
        },
        {
          type: "number",
          label: "WhatsApp",
          action: "PHONE_WHATSAPP",
          isRequired: true,
          keys: ["phone", "whatsapp"],
        },
        {
          type: "select",
          label: "Gender",
          action: "GENDER",
          options: ["Male", "Female"],
          isRequired: true,
          keys: ["gender"],
        },
        {
          type: "date",
          label: "Date of Birth",
          action: "DOB",
          isRequired: true,
          keys: ["dob"],
        },
        {
          type: "number",
          label: "Age",
          action: "AGE",
          isRequired: true,
          keys: ["age"],
        },
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
          keys: ["educationalLevel"],
        },
        {
          type: "text",
          label: "Language Spoken",
          action: "LANGUAGE_SPOKEN",
          placeholder: "English, Fante, Ewe",
          isRequired: true,
          keys: ["language", "spoken"],
        },
        {
          type: "text",
          label: "Language Written",
          action: "LANGUAGE_WRITTEN",
          placeholder: "English, Fante, Ewe",
          isRequired: true,
          keys: ["language", "written"],
        },
        {
          type: "select",
          label: "National ID",
          action: "NATIONAL_ID",
          options: ["Ghana Card", "Drivers License", "Passport"],
          isRequired: true,
          keys: ["nationalID", "type"],
        },
        {
          type: "text",
          label: "ID Number",
          action: "NATIONAL_ID_NUMBER",
          isRequired: true,
          keys: ["nationalID", "number"],
        },
        {
          type: "text",
          label: "Residence Address",
          action: "RESIDENCE",
          isRequired: false,
          keys: ["address", "residence"],
        },
        {
          type: "text",
          label: "Town",
          action: "RESIDENCE_TOWN",
          isRequired: false,
          keys: ["address", "town"],
        },
        {
          type: "text",
          label: "District",
          action: "RESIDENCE_DISTRICT",
          isRequired: false,
          keys: ["address", "district"],
        },
        {
          type: "select",
          label: "Region",
          action: "RESIDENCE_REGION",
          options: getRegions(),
          isRequired: false,
          keys: ["address", "region"],
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
          keys: ["employment", "isEmployed"],
        },
        {
          type: "text",
          label: "What is your current job",
          action: "CURRENT_EMPLOYMENT",
          isRequired: true,
          keys: ["employment", "currentJob"],
        },
        {
          type: "select",
          label: "Do you need employment after completion",
          action: "EMPLOYMENT_NEEDED",
          options: ["Yes", "No"],
          isRequired: true,
          keys: ["employment", "afterCompletion"],
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
          keys: ["health", "anyCondition"],
        },
        {
          type: "textarea",
          label: "If yes, please provide details of the condition",
          action: "HEALTH_DETAILS",
          isRequired: false,
          keys: ["health", "details"],
        },
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
          keys: ["enrollment", "certification"],
        },
        {
          type: "select",
          label: "Certification Level",
          action: "ENROLL_CERTIFICATION_LEVEL",
          options: [
            "BEGINNER - Advanced(has no Foundation)",
            "INTER-MEDIATE - Advanced(has the Basic knowledge)",
            "ADVANCED - (has over 50% knowledge)",
          ],
          isRequired: true,
          keys: ["enrollment", "certificationLevel"],
        },
        {
          type: "select",
          label: "Select Programme",
          action: "ENROLL_PROGRAMME",
          options: programmes || [],
          isRequired: true,
          keys: ["enrollment", "programme"],
        },
        {
          type: "select",
          label: "Mode of Education",
          action: "ENROLL_TUITION_MODE",
          options: programmeTrainings,
          isRequired: true,
          keys: ["enrollment", "modeofTuition"],
        },
        {
          type: "select",
          label: "Select Training session",
          action: "ENROLL_SESSION",
          options: programmeSessions,
          isRequired: true,
          keys: ["enrollment", "session"],
        },
        {
          type: "select",
          label: "Campus",
          action: "CAMPUS",
          options: ["Accra", "Kumasi"],
          isRequired: true,
          keys: ["campus"],
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
          isRequired: false,
          keys: ["guardian", "name"],
        },
        {
          type: "text",
          label: "Phone Number",
          action: "GUARDIAN_PHONE",
          isRequired: false,
          keys: ["guardian", "phone"],
        },
        {
          type: "text",
          label: "Relationship",
          action: "GUARDIAN_RELATIONSHIP",
          isRequired: false,
          keys: ["guardian", "relationship"],
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
          keys: ["sponsor", "name"],
        },
        {
          type: "text",
          label: "Phone Number",
          action: "SPONSOR_PHONE",
          isRequired: false,
          keys: ["sponsor", "phone"],
        },
        {
          type: "text",
          label: "Relationship",
          action: "SPONSOR_RELATIONSHIP",
          isRequired: false,
          keys: ["sponsor", "relationship"],
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
          keys: ["emergency", "name"],
        },
        {
          type: "text",
          label: "Phone Number",
          action: "EMERGENCY_PHONE",
          isRequired: false,
          keys: ["emergency", "phone"],
        },
        // { type: 'text', label: 'Location', action: 'EMERGENCY_LOCATION', isRequired: false },
      ],
    },
  ];
};

export const getStaffForm = (): FormDataProps[] => [
  {
    title: "Academics",
    fields: [
      {
        type: "select",
        label: "Department",
        action: "DEPARTMENT",
        options: ["HND/DIPLOMA", "ADVANCED CERTIFICATE", "CERTIFICATE"],
        isRequired: true,
        keys: ["academics", "department"],
      },
      {
        type: "email",
        label: "Staff Email",
        action: "STAFF_EMAIL",
        isRequired: true,
        keys: ["academics", "staffEmail"],
      },
      {
        type: "select",
        label: "Campus",
        action: "CAMPUS",
        options: ["Accra", "Kumasi"],
        isRequired: true,
        keys: ["academics", "campus"],
      },
      {
        type: "select",
        label: "Role",
        action: "ROLE",
        options: ["Staff", "Admin"],
        isRequired: true,
        keys: ["role"],
      },
    ],
  },
  {
    title: "Personal Details",
    fields: [
      {
        type: "text",
        label: "Surname",
        action: "SURNAME",
        isRequired: true,
        keys: ["surname"],
      },
      {
        type: "text",
        label: "Other Names",
        action: "OTHER_NAMES",
        isRequired: true,
        keys: ["othernames"],
      },
      {
        type: "email",
        label: "Email",
        action: "EMAIL",
        isRequired: true,
        keys: ["email"],
      },
      {
        type: "tel",
        label: "Phone",
        action: "PHONE_MOBILE",
        isRequired: true,
        keys: ["phone"],
      },
      {
        type: "select",
        label: "Gender",
        action: "GENDER",
        options: ["Male", "Female"],
        isRequired: true,
        keys: ["gender"],
      },
      {
        type: "select",
        label: "National ID",
        action: "NATIONAL_ID",
        options: ["Ghana Card", "Drivers License", "Passport"],
        isRequired: true,
        keys: ["nationalID", "type"],
      },
      {
        type: "text",
        label: "ID Number",
        action: "NATIONAL_ID_NUMBER",
        isRequired: true,
        keys: ["nationalID", "number"],
      },
      {
        type: "text",
        label: "Residence Address",
        action: "RESIDENCE",
        isRequired: true,
        keys: ["address"],
      },
    ],
  },
];

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
  "CATERING AND HOSPITALITY",
  "FASHION DESIGN AND TEXTILES",
  "COSMETOLOGY (HAIR & BEAUTY)",
  "HAIR TECHNOLOGY ONLY",
  "BEAUTY THERAPY ONLY",
  "COMPUTER SCIENCE",
  "MECHANICAL ENGINEERING",
  "ELECTRICAL AND ELECTRONIC ENGINEERING",
  "WELDING AND FABRICATION",
  "ALUMINIUM FABRICATION",
  "PLUMBING & TILLING",
  "INTEGRATED CATERING AND HOSPITALITY",
  "INTEGRATED FASHION DESIGN AND TEXTILES SCHOOL",
  "INTEGRATED COSMETOLOGY",
  "CAKE PRODUCTION",
  "EVENT DECORATION",
  "BREAD PRODUCTION",
  "PASTRIES PRODUCTION",
  "MAKE-UP ARTISTRY",
  "NAILS TECHNOLOGY",
  "WIGS MAKING (HAND & MACHINE)",
  "HAIR BRAIDING",
  "BARBERING",
  "GRAPHICS DESIGN",
  "PHOTO-VIDEOGRAPHY",
  "SOUND ENGINEERING",
  "WEBSITE DEVELOPMENT",
  "PHONE REPAIRS",
  "COMPUTER REPAIRS",
  "NETWORKING",
  "SATELLITE TECH. (CCTV, MULTI-TV, DSTV, ETC)",
  "SUIT DESIGN",
  "BRIDAL WEAR DESIGN",
  "SUIT DESIGN",
];

export const programmeTrainings = [
  "Formal Education (85% Practical and 15% theory (written)",
  "Non-Formal Education (85% Practical and 15% theory (Oral)",
  "Informal Education (100% Practical)",
];

export const programmeSessions = [
  "Regular (Monday - Friday)",
  "Evening; 5pm-7:30pm (Monday -Thursday)",
  "Weekends (Saturday evening & Sunday Afternoon)",
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
    transactionID: "",
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
        payment: { ...state?.payment, transactionID: action?.payload },
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
    case "UPDATE":
      return {
        surname: action?.payload?.surname || "",
        othernames: action?.payload?.othernames || "",
        email: action?.payload?.email || "",
        phone: {
          mobile: action?.payload?.phone?.mobile || "",
          whatsapp: action?.payload?.phone?.whatsapp || "",
        },
        gender: action?.payload?.gender || "",
        dob: action?.payload?.dob || "",
        age: action?.payload?.age || "",
        educationalLevel: action?.payload?.educationalLevel || "",
        payment: {
          type: action?.payload?.payment?.type || "",
          reference: action?.payload?.payment?.reference || "",
          transactionID: action?.payload?.payment?.transactionID || "",
        },
        language: {
          spoken: action?.payload?.language?.spoken || "",
          written: action?.payload?.language?.written || "",
        },
        nationalID: {
          type: action?.payload?.nationalID?.type || "",
          number: action?.payload?.nationalID?.number || "",
        },
        address: {
          residence: action?.payload?.address?.residence || "",
          town: action?.payload?.address?.town || "",
          district: action?.payload?.address?.district || "",
          region: action?.payload?.address?.region || "",
        },
        employment: {
          isEmployed: action?.payload?.employment?.isEmployed || "",
          currentJob: action?.payload?.employment?.currentJob || "",
          afterCompletion: action?.payload?.employment?.afterCompletion || "",
        },
        health: {
          anyCondition: action?.payload?.health?.anyCondition || "",
          details: action?.payload?.health?.details || "",
        },
        guardian: {
          name: action?.payload?.guardian?.name || "",
          phone: action?.payload?.guardian?.phone || "",
          relationship: action?.payload?.guardian?.relationship || "",
        },
        sponsor: {
          name: action?.payload?.sponsor?.name || "",
          phone: action?.payload?.sponsor?.phone || "",
          relationship: action?.payload?.sponsor?.relationship || "",
        },
        emergency: {
          name: action?.payload?.emergency?.name || "",
          phone: action?.payload?.emergency?.phone || "",
          // location: "",
        },
        enrollment: {
          type: action?.payload?.enrollment?.type || "",
          month: action?.payload?.enrollment?.month || "",
          year: action?.payload?.enrollment?.year || "",
          duration: action?.payload?.enrollment?.duration || "",
          programme: action?.payload?.enrollment?.programme?.name || "",
          department: action?.payload?.enrollment?.department || "",
          modeofTuition: action?.payload?.enrollment?.modeofTuition || "",
          certification: action?.payload?.enrollment?.certification || "",
          certificationLevel:
            action?.payload?.enrollment?.certificationLevel || "",
          session: action?.payload?.enrollment?.session || "",
        },
        campus: action?.payload?.campus || "",
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
};

export const staffData = {
  role: "",
  surname: "",
  othernames: "",
  email: "",
  phone: "",
  gender: "",
  nationalID: {
    type: "",
    number: "",
  },
  address: "",
  academics: {
    department: "",
    staffID: "",
    staffEmail: "",
    campus: "",
  },
};

export const staffReducerFn = (state: typeof staffData, action: any) => {
  switch (action?.type) {
    case "ROLE":
      return { ...state, role: action?.payload?.toLowerCase() };
    case "SURNAME":
      return { ...state, surname: action?.payload };
    case "OTHER_NAMES":
      return { ...state, othernames: action?.payload };
    case "EMAIL":
      return { ...state, email: action?.payload };
    case "PHONE_MOBILE":
      return { ...state, phone: action?.payload };
    case "GENDER":
      return { ...state, gender: action?.payload };
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
    case "RESIDENCE":
      return {
        ...state,
        address: action?.payload,
      };
    case "DEPARTMENT":
      return {
        ...state,
        academics: { ...state?.academics, department: action?.payload },
      };
    case "STAFF_EMAIL":
      return {
        ...state,
        academics: { ...state?.academics, staffEmail: action?.payload },
      };
    case "CAMPUS":
      return {
        ...state,
        academics: { ...state?.academics, campus: action?.payload },
      };
    case "UPDATE":
      return {
        role: action?.payload?.role || "",
        surname: action?.payload?.surname || "",
        othernames: action?.payload?.othernames || "",
        email: action?.payload?.email || "",
        phone: action?.payload?.phone || "",
        gender: action?.payload?.gender || "",
        nationalID: {
          type: action?.payload?.nationalID?.type || "",
          number: action?.payload?.nationalID?.number || "",
        },
        address: action?.payload?.address || "",
        academics: {
          department: action?.payload?.academics?.department?.name || "",
          staffID: action?.payload?.academics?.staffID || "",
          staffEmail: action?.payload?.academics?.staffEmail || "",
          campus: action?.payload?.academics?.campus || "",
        },
      };
    case "RESET":
      return staffData;
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
  if (type === "doc") {
    if (
      !(
        ext[ext?.length - 1]?.startsWith("pdf") ||
        ext[ext?.length - 1]?.startsWith("doc") ||
        ext[ext?.length - 1]?.startsWith("docx")
      )
    )
      return swal(
        "Invalid",
        "You have selected a wrong file. Only .doc, .docx and .pdf files are allowed",
        "error"
      );
    if (fileSize > 1) return swal("Invalid", "File size exceeds 1MB.", "error");
  }
  return file;
};

export const validateFormData = (formInput: typeof initState, photo: File) => {
  if (
    formInput?.enrollment?.type === "" ||
    formInput?.enrollment?.month === "" ||
    formInput?.enrollment?.year === "" ||
    formInput?.enrollment?.index === ""
  )
    return swal(
      "Invalid",
      "Provide all required fields under Application",
      "error"
    ).then(() => false);
  if (
    formInput?.surname === "" ||
    formInput?.othernames === "" ||
    formInput?.email === "" ||
    !formInput?.email?.includes("@") ||
    formInput?.phone?.mobile === "" ||
    formInput?.phone?.whatsapp === "" ||
    formInput?.gender === "" ||
    formInput?.dob === "" ||
    formInput?.age === "" ||
    formInput?.educationalLevel === "" ||
    formInput?.language?.spoken === "" ||
    formInput?.language?.written === "" ||
    formInput?.nationalID?.type === "" ||
    formInput?.nationalID?.number === ""
    // formInput?.address?.residence === "" ||
    // formInput?.address?.town === "" ||
    // formInput?.address?.district === "" ||
    // formInput?.address?.region === ""
  )
    return swal(
      "Invalid",
      "Provide all required fields under Personal Details",
      "error"
    ).then(() => false);
  if (
    formInput?.employment?.isEmployed === "" ||
    formInput?.employment?.currentJob === "" ||
    formInput?.employment?.afterCompletion === ""
  )
    return swal(
      "Invalid",
      "Provide all required fields under Employment",
      "error"
    ).then(() => false);
  if (
    formInput?.health?.anyCondition === "" ||
    formInput?.employment?.currentJob === ""
  )
    return swal(
      "Invalid",
      "Provide all required fields under Health",
      "error"
    ).then(() => false);

  if (
    formInput?.enrollment?.certification === "" ||
    formInput?.campus === "" ||
    formInput?.enrollment?.certificationLevel === "" ||
    formInput?.enrollment?.programme === "" ||
    formInput?.enrollment?.session === "" ||
    formInput?.enrollment?.modeofTuition === ""
  )
    return swal(
      "Invalid",
      "Provide all required fields under Programme & Certification",
      "error"
    ).then(() => false);
  if (!photo)
    return swal("Invalid", "Provide profile photo", "error").then(() => false);

  return true;
};

export const uploadPhoto = async (
  file: File,
  setPreview: (val: any) => void,
  setPhoto: (val: any) => void
) => {
  // console.log(file)
  const res = await validateFile(file, "image");
  if (res) {
    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      setPreview(dataURL);
    };
    reader.readAsDataURL(file);
    setPhoto(file);
  }
};

export const reload = () => window.location.reload();
