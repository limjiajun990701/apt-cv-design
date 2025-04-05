
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Save, XCircle } from "lucide-react";

const ActivitiesForm: React.FC = () => {
  const { resumeData, addActivity, updateActivity, removeActivity } = useResumeContext();
  const { activities } = resumeData;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editId) {
      updateActivity(editId, { name, description });
      setEditId(null);
    } else {
      addActivity({ name, description });
    }

    setName("");
    setDescription("");
  };

  const handleEdit = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (activity) {
      setName(activity.name);
      setDescription(activity.description || "");
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="activityName">Activity Name</Label>
          <Input
            id="activityName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Volunteer Work, Community Organization, Hackathon"
          />
        </div>
        
        <div>
          <Label htmlFor="activityDescription">Description</Label>
          <Textarea
            id="activityDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your role and contributions in this activity..."
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Activity
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
        <h3 className="text-lg font-medium mb-3">Your Activities</h3>
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No activities added yet. Add extracurricular activities, volunteer work, or other engagements.
          </p>
        ) : (
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-50 p-3 rounded-md"
              >
                <h4 className="font-medium">{activity.name}</h4>
                {activity.description && (
                  <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                )}
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(activity.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeActivity(activity.id)}>
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

export default ActivitiesForm;
