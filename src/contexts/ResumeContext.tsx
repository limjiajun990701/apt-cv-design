
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
  },
  summary:
    "Experienced software engineer with a passion for developing innovative solutions. Proven track record in building scalable applications and leading development teams.",
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description:
        "Led the development of cloud-based solutions, improved system performance by 40%, and mentored junior developers.",
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "Digital Solutions LLC",
      location: "San Jose, CA",
      startDate: "2017-06",
      endDate: "2019-12",
      current: false,
      description:
        "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver projects on time.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California",
      degree: "Master's",
      field: "Computer Science",
      startDate: "2015-09",
      endDate: "2017-05",
      current: false,
      description: "Specialized in Artificial Intelligence and Machine Learning.",
    },
    {
      id: "edu2",
      institution: "State University",
      degree: "Bachelor's",
      field: "Computer Engineering",
      startDate: "2011-09",
      endDate: "2015-05",
      current: false,
      description: "Graduated with honors. Active member of the Robotics Club.",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript" },
    { id: "skill2", name: "React" },
    { id: "skill3", name: "Node.js" },
    { id: "skill4", name: "TypeScript" },
    { id: "skill5", name: "Python" },
    { id: "skill6", name: "Git" },
  ],
};

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    const id = `exp${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id }],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = (education: Omit<Education, "id">) => {
    const id = `edu${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id }],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    const id = `skill${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id }],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateSummary,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
