import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PersonalInfo {
  name: string;
  middleName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
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
  projects: string;
  scope: string;
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

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  url?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  url?: string;
  project?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  url?: string;
  project?: string;
}

export interface Badge {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  project?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  achievements: Achievement[];
  certifications: Certification[];
  activities: Activity[];
  badges: Badge[];
  projects: Project[];
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "John Doe",
    middleName: "",
    title: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
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
      projects: "Redesigned company's main product, increasing user engagement by 30%.",
      scope: "Full-stack development, team leadership, architecture design",
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
      projects: "Built customer portal that reduced support tickets by 25%.",
      scope: "Frontend development, API integration, performance optimization",
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
  languages: [
    { id: "lang1", name: "English", proficiency: "Native" },
    { id: "lang2", name: "Spanish", proficiency: "Intermediate" },
  ],
  achievements: [
    { id: "ach1", title: "Employee of the Year", description: "Recognized for outstanding contributions to company projects", date: "2022-12" },
  ],
  certifications: [
    { id: "cert1", name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2021-05", expiry: "2024-05" },
  ],
  activities: [
    { id: "act1", name: "Tech Meetup Organizer", description: "Organize monthly tech meetups for local developers" },
  ],
  badges: [
    { id: "badge1", name: "Top Contributor", issuer: "GitHub", date: "2023-01" },
  ],
  projects: [
    { id: "proj1", title: "Personal Portfolio Website", description: "A responsive website showcasing my work, built with React and Tailwind CSS." },
  ]
};

interface ResumeContextType {
  resumeData: ResumeData;
  template: string;
  setTemplate: (template: string) => void;
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
  addLanguage: (language: Omit<Language, "id">) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, "id">) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  addCertification: (certification: Omit<Certification, "id">) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addActivity: (activity: Omit<Activity, "id">) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  removeActivity: (id: string) => void;
  addBadge: (badge: Omit<Badge, "id">) => void;
  updateBadge: (id: string, badge: Partial<Badge>) => void;
  removeBadge: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
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
  const [template, setTemplate] = useState<string>("Classic");

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

  const addLanguage = (language: Omit<Language, "id">) => {
    const id = `lang${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, { ...language, id }],
    }));
  };

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, ...language } : lang
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, "id">) => {
    const id = `ach${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { ...achievement, id }],
    }));
  };

  const updateAchievement = (id: string, achievement: Partial<Achievement>) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...achievement } : ach
      ),
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }));
  };

  const addCertification = (certification: Omit<Certification, "id">) => {
    const id = `cert${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { ...certification, id }],
    }));
  };

  const updateCertification = (id: string, certification: Partial<Certification>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, ...certification } : cert
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  const addActivity = (activity: Omit<Activity, "id">) => {
    const id = `act${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      activities: [...prev.activities, { ...activity, id }],
    }));
  };

  const updateActivity = (id: string, activity: Partial<Activity>) => {
    setResumeData((prev) => ({
      ...prev,
      activities: prev.activities.map((act) =>
        act.id === id ? { ...act, ...activity } : act
      ),
    }));
  };

  const removeActivity = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      activities: prev.activities.filter((act) => act.id !== id),
    }));
  };

  const addBadge = (badge: Omit<Badge, "id">) => {
    const id = `badge${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      badges: [...prev.badges, { ...badge, id }],
    }));
  };

  const updateBadge = (id: string, badge: Partial<Badge>) => {
    setResumeData((prev) => ({
      ...prev,
      badges: prev.badges.map((b) =>
        b.id === id ? { ...b, ...badge } : b
      ),
    }));
  };

  const removeBadge = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      badges: prev.badges.filter((b) => b.id !== id),
    }));
  };

  const addProject = (project: Omit<Project, "id">) => {
    const id = `proj${Date.now()}`;
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id }],
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...project } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        template,
        setTemplate,
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
        addLanguage,
        updateLanguage,
        removeLanguage,
        addAchievement,
        updateAchievement,
        removeAchievement,
        addCertification,
        updateCertification,
        removeCertification,
        addActivity,
        updateActivity,
        removeActivity,
        addBadge,
        updateBadge,
        removeBadge,
        addProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
