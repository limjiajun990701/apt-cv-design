
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResumeContext } from "@/contexts/ResumeContext";
import PersonalInfoForm from "./PersonalInfoForm";
import SummaryForm from "./SummaryForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import LanguagesForm from "./LanguagesForm";
import AchievementsForm from "./AchievementsForm";
import CertificationsForm from "./CertificationsForm";
import ActivitiesForm from "./ActivitiesForm";
import BadgesForm from "./BadgesForm";
import ProjectsForm from "./ProjectsForm";
import ImportExportButtons from "./ImportExportButtons";

const ResumeEditor: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Your Resume</h2>
        <div className="flex items-center gap-3">
          <ImportExportButtons />
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-2">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-4">
          <PersonalInfoForm />
        </TabsContent>
        <TabsContent value="summary" className="mt-4">
          <SummaryForm />
        </TabsContent>
        <TabsContent value="experience" className="mt-4">
          <ExperienceForm />
        </TabsContent>
        <TabsContent value="education" className="mt-4">
          <EducationForm />
        </TabsContent>
        <TabsContent value="skills" className="mt-4">
          <SkillsForm />
        </TabsContent>
        <TabsContent value="projects" className="mt-4">
          <ProjectsForm />
        </TabsContent>
        <TabsContent value="languages" className="mt-4">
          <LanguagesForm />
        </TabsContent>
        <TabsContent value="achievements" className="mt-4">
          <AchievementsForm />
        </TabsContent>
        <TabsContent value="certifications" className="mt-4">
          <CertificationsForm />
        </TabsContent>
        <TabsContent value="activities" className="mt-4">
          <ActivitiesForm />
        </TabsContent>
        <TabsContent value="badges" className="mt-4">
          <BadgesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
