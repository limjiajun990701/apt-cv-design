
import React from "react";
import { ResumeProvider } from "@/contexts/ResumeContext";
import Header from "@/components/resume/Header";
import ResumeEditor from "@/components/resume/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";

const Index = () => {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">
          <div className="w-full md:w-1/2 flex flex-col">
            <ResumeEditor />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default Index;
