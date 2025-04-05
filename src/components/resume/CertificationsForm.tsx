
import React, { useState } from "react";
import { useResumeContext } from "@/contexts/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Edit, Save, XCircle, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const CertificationsForm: React.FC = () => {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeContext();
  const { certifications } = resumeData;

  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [expiry, setExpiry] = useState("");
  const [noExpiry, setNoExpiry] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !issuer.trim() || !date.trim()) return;

    const certData = {
      name,
      issuer,
      date,
      expiry: noExpiry ? undefined : expiry,
    };

    if (editId) {
      updateCertification(editId, certData);
      setEditId(null);
    } else {
      addCertification(certData);
    }

    setName("");
    setIssuer("");
    setDate("");
    setExpiry("");
    setNoExpiry(false);
  };

  const handleEdit = (id: string) => {
    const certification = certifications.find((c) => c.id === id);
    if (certification) {
      setName(certification.name);
      setIssuer(certification.issuer);
      setDate(certification.date);
      setExpiry(certification.expiry || "");
      setNoExpiry(!certification.expiry);
      setEditId(id);
    }
  };

  const handleCancel = () => {
    setName("");
    setIssuer("");
    setDate("");
    setExpiry("");
    setNoExpiry(false);
    setEditId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="certificationName">Certification Name</Label>
          <Input
            id="certificationName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., AWS Certified Solutions Architect, PMP"
          />
        </div>
        
        <div>
          <Label htmlFor="certificationIssuer">Issuing Organization</Label>
          <Input
            id="certificationIssuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g., Amazon Web Services, PMI"
          />
        </div>
        
        <div>
          <Label htmlFor="certificationDate">Issue Date (YYYY-MM)</Label>
          <Input
            id="certificationDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g., 2022-06"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="noExpiry" 
              checked={noExpiry} 
              onCheckedChange={(checked) => {
                setNoExpiry(checked === true);
                if (checked) setExpiry("");
              }}
            />
            <label
              htmlFor="noExpiry"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              No Expiration Date
            </label>
          </div>
          
          {!noExpiry && (
            <div>
              <Label htmlFor="certificationExpiry">Expiry Date (YYYY-MM)</Label>
              <Input
                id="certificationExpiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="e.g., 2025-06"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!name.trim() || !issuer.trim() || !date.trim()}>
            {editId ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {editId ? "Update" : "Add"} Certification
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
        <h3 className="text-lg font-medium mb-3">Your Certifications</h3>
        {certifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No certifications added yet. Add your professional certifications and credentials.
          </p>
        ) : (
          <div className="space-y-2">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="bg-gray-50 p-3 rounded-md"
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{certification.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">Issued by: {certification.issuer}</p>
                <div className="text-gray-500 text-sm flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" /> 
                  {certification.date}
                  {certification.expiry && ` to ${certification.expiry}`}
                  {!certification.expiry && " (No Expiration)"}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(certification.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeCertification(certification.id)}>
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

export default CertificationsForm;
