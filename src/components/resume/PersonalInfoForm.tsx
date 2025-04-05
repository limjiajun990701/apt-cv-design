
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as any);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-resume-blue">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={personalInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="middleName" className="text-resume-blue">Middle Name</Label>
              <Input
                id="middleName"
                name="middleName"
                value={personalInfo.middleName}
                onChange={handleChange}
                placeholder="Middle Name (optional)"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="title" className="text-resume-blue">Professional Title</Label>
            <Input
              id="title"
              name="title"
              value={personalInfo.title}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="email" className="text-resume-blue">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-resume-blue">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="location" className="text-resume-blue">Location</Label>
            <Input
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="linkedin" className="text-resume-blue">LinkedIn URL</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={personalInfo.linkedin}
                onChange={handleChange}
                placeholder="linkedin.com/in/johndoe"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="github" className="text-resume-blue">GitHub URL (optional)</Label>
              <Input
                id="github"
                name="github"
                value={personalInfo.github}
                onChange={handleChange}
                placeholder="github.com/johndoe"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;
