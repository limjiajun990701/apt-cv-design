
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "./PersonalInfoForm";
import SummaryForm from "./SummaryForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";

const ResumeEditor: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
      <h2 className="text-xl font-semibold mb-4">Edit Your Resume</h2>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default ResumeEditor;
