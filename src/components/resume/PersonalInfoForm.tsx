
import React from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResumeContext();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value } as any);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={personalInfo.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
