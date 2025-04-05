
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeContext();
  const { education } = resumeData;

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleAddEducation = () => {
    addEducation(newEducation);
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const handleNewEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewEducation((prev) => ({ ...prev, current: checked }));
  };

  const handleEducationChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateEducation(id, { [name]: value } as any);
  };

  const handleEducationCheckboxChange = (id: string, checked: boolean) => {
    updateEducation(id, { current: checked });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
        <h3 className="text-lg font-medium">Add New Education</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleNewEducationChange}
              placeholder="University Name"
            />
          </div>
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleNewEducationChange}
              placeholder="Bachelor's, Master's, etc."
            />
          </div>
          <div>
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              name="field"
              value={newEducation.field}
              onChange={handleNewEducationChange}
              placeholder="Computer Science"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={newEducation.startDate}
              onChange={handleNewEducationChange}
            />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="month"
                value={newEducation.endDate}
                onChange={handleNewEducationChange}
                disabled={newEducation.current}
              />
            </div>
            <div className="flex items-center h-10 space-x-2 pt-2">
              <Checkbox
                id="currentEducation"
                checked={newEducation.current}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="currentEducation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Progress
              </label>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newEducation.description}
            onChange={handleNewEducationChange}
            placeholder="Achievements, activities, coursework..."
            className="h-24"
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={handleAddEducation} 
            disabled={!newEducation.institution || !newEducation.degree || !newEducation.field}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Education</h3>
        {education.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No education added yet. Add your education history above.
          </p>
        ) : (
          <div className="space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">
                      {edu.degree} in {edu.field} at {edu.institution}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`${edu.id}-institution`}>Institution</Label>
                      <Input
                        id={`${edu.id}-institution`}
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${edu.id}-degree`}>Degree</Label>
                      <Input
                        id={`${edu.id}-degree`}
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${edu.id}-field`}>Field of Study</Label>
                      <Input
                        id={`${edu.id}-field`}
                        name="field"
                        value={edu.field}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${edu.id}-startDate`}>Start Date</Label>
                      <Input
                        id={`${edu.id}-startDate`}
                        name="startDate"
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(edu.id, e)}
                      />
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <Label htmlFor={`${edu.id}-endDate`}>End Date</Label>
                        <Input
                          id={`${edu.id}-endDate`}
                          name="endDate"
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => handleEducationChange(edu.id, e)}
                          disabled={edu.current}
                        />
                      </div>
                      <div className="flex items-center h-10 space-x-2 pt-2">
                        <Checkbox
                          id={`${edu.id}-current`}
                          checked={edu.current}
                          onCheckedChange={(checked) =>
                            handleEducationCheckboxChange(edu.id, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`${edu.id}-current`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          In Progress
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor={`${edu.id}-description`}>Description</Label>
                    <Textarea
                      id={`${edu.id}-description`}
                      name="description"
                      value={edu.description}
                      onChange={(e) => handleEducationChange(edu.id, e)}
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

export default EducationForm;
