
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Save, XCircle, Link, Briefcase } from "lucide-react";

const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeContext();
  const { projects } = resumeData;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editId) {
      updateProject(editId, { title, description, url });
      setEditId(null);
    } else {
      addProject({ title, description, url });
    }

    setTitle("");
    setDescription("");
    setUrl("");
  };

  const handleEdit = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setUrl(project.url || "");
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Personal Portfolio, E-commerce App"
          />
        </div>
        
        <div>
          <Label htmlFor="projectDescription">Description</Label>
          <Textarea
            id="projectDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project, technologies used, and your role..."
          />
        </div>
        
        <div>
          <Label htmlFor="projectUrl">Project URL (Optional)</Label>
          <Input
            id="projectUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://github.com/username/project"
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!title.trim() || !description.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Project
          </Button>
          {editId && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-3">Your Projects</h3>
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No projects added yet. Add your portfolio work, side projects, or relevant work.
          </p>
        ) : (
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 p-3 rounded-md"
              >
                <h4 className="font-medium">{project.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                
                {project.url && (
                  <div className="text-gray-600 text-sm mt-1 flex items-center">
                    <Link className="h-3 w-3 mr-1" /> 
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-resume-blue hover:underline">
                      View Project
                    </a>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(project.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;
