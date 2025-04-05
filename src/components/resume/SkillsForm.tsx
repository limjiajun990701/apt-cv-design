
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResumeContext();
  const { skills } = resumeData;

  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill({ name: newSkill.trim() });
      setNewSkill("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="skill">Add a Skill</Label>
            <Input
              id="skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., JavaScript, Project Management, Customer Service"
            />
          </div>
          <div className="pt-7">
            <Button onClick={handleAddSkill} disabled={!newSkill.trim()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Press Enter to add a skill, or click the Add button.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No skills added yet. Add skills that are relevant to your target position.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-resume-blue-light text-resume-blue px-3 py-1.5 rounded-full flex items-center text-sm group hover:bg-resume-blue hover:text-white transition-colors"
              >
                {skill.name}
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="ml-1.5 text-resume-blue group-hover:text-white/80 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
