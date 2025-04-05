
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeContext();
  const { experience } = resumeData;

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    projects: "",
    scope: "",
  });

  const handleAddExperience = () => {
    addExperience(newExperience);
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      projects: "",
      scope: "",
    });
  };

  const handleNewExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewExperience((prev) => ({ ...prev, current: checked }));
  };

  const handleExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateExperience(id, { [name]: value } as any);
  };

  const handleExperienceCheckboxChange = (id: string, checked: boolean) => {
    updateExperience(id, { current: checked });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
        <h3 className="text-lg font-medium">Add New Experience</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={newExperience.title}
              onChange={handleNewExperienceChange}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleNewExperienceChange}
              placeholder="Company Name"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newExperience.location}
              onChange={handleNewExperienceChange}
              placeholder="San Francisco, CA"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={newExperience.startDate}
              onChange={handleNewExperienceChange}
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newExperience.endDate}
                onChange={handleNewExperienceChange}
                disabled={newExperience.current}
              />
            </div>
            <div className="flex items-center h-10 space-x-2 pt-2">
              <Checkbox
                id="currentJob"
                checked={newExperience.current}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="currentJob"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Current Job
              </label>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleNewExperienceChange}
            placeholder="Describe your responsibilities and achievements..."
            className="h-24"
          />
        </div>
        <div>
          <Label htmlFor="scope">Scope</Label>
          <Input
            id="scope"
            name="scope"
            value={newExperience.scope}
            onChange={handleNewExperienceChange}
            placeholder="Full-stack development, team leadership, etc."
          />
        </div>
        <div>
          <Label htmlFor="projects">Projects</Label>
          <Textarea
            id="projects"
            name="projects"
            value={newExperience.projects}
            onChange={handleNewExperienceChange}
            placeholder="Notable projects you worked on..."
            className="h-24"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleAddExperience} disabled={!newExperience.title || !newExperience.company}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Experience</h3>
        {experience.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No experience added yet. Add your first job experience above.
          </p>
        ) : (
          <div className="space-y-4">
            {experience.map((exp) => (
              <Card key={exp.id} className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">{exp.title} at {exp.company}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${exp.id}-title`}>Job Title</Label>
                      <Input
                        id={`${exp.id}-title`}
                        name="title"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${exp.id}-company`}>Company</Label>
                      <Input
                        id={`${exp.id}-company`}
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${exp.id}-location`}>Location</Label>
                      <Input
                        id={`${exp.id}-location`}
                        name="location"
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${exp.id}-startDate`}>Start Date</Label>
                      <Input
                        id={`${exp.id}-startDate`}
                        name="startDate"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, e)}
                      />
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <Label htmlFor={`${exp.id}-endDate`}>End Date</Label>
                        <Input
                          id={`${exp.id}-endDate`}
                          name="endDate"
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(exp.id, e)}
                          disabled={exp.current}
                        />
                      </div>
                      <div className="flex items-center h-10 space-x-2 pt-2">
                        <Checkbox
                          id={`${exp.id}-current`}
                          checked={exp.current}
                          onCheckedChange={(checked) =>
                            handleExperienceCheckboxChange(exp.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`${exp.id}-current`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Current Job
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor={`${exp.id}-description`}>Job Description</Label>
                    <Textarea
                      id={`${exp.id}-description`}
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      className="h-24"
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor={`${exp.id}-scope`}>Scope</Label>
                    <Input
                      id={`${exp.id}-scope`}
                      name="scope"
                      value={exp.scope}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      placeholder="Full-stack development, team leadership, etc."
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor={`${exp.id}-projects`}>Projects</Label>
                    <Textarea
                      id={`${exp.id}-projects`}
                      name="projects"
                      value={exp.projects}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      placeholder="Notable projects you worked on..."
                      className="h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
