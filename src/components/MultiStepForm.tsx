"use client";

import { useState, useRef } from "react";
import { Check, Upload, ArrowLeft, ArrowRight, Send, FileText, User, Building2, Phone, Briefcase, X } from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "file" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

interface FormStep {
  title: string;
  description: string;
  icon: React.ElementType;
  fields: FormField[];
}

interface MultiStepFormProps {
  title: string;
  steps: FormStep[];
  onSubmit: (data: Record<string, string | File[]>) => Promise<void> | void;
  submitLabel?: string;
  onClose?: () => void;
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                i < current
                  ? "bg-[var(--blue)] text-white"
                  : i === current
                  ? "border-2 border-[var(--blue)] bg-white text-[var(--blue)]"
                  : "border border-[var(--border)] bg-white text-slate-400"
              }`}
            >
              {i < current ? <Check size={16} /> : i + 1}
            </div>
            {i < total - 1 && (
              <div
                className={`mx-2 h-0.5 w-8 sm:w-16 transition-colors duration-300 ${
                  i < current ? "bg-[var(--blue)]" : "bg-[var(--border)]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FileUpload({ accept, multiple, onChange }: { accept?: string; multiple?: boolean; onChange: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(dropped);
    onChange(dropped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(selected);
      onChange(selected);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
        dragOver
          ? "border-[var(--blue)] bg-[var(--blue)]/5"
          : files.length > 0
          ? "border-emerald-400 bg-emerald-50/30"
          : "border-[var(--border)] hover:border-[var(--blue)]/40 hover:bg-[var(--soft)]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      {files.length > 0 ? (
        <div className="space-y-2">
          <FileText size={24} className="mx-auto text-emerald-500" />
          <p className="text-sm font-bold text-emerald-600">{files.length} file(s) selected</p>
          <ul className="text-xs text-slate-500">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="space-y-2">
          <Upload size={24} className="mx-auto text-slate-400" />
          <p className="text-sm font-bold text-slate-600">Drop files here or click to browse</p>
          <p className="text-xs text-slate-400">Upload resumes, certificates, or supporting documents</p>
        </div>
      )}
    </div>
  );
}

export default function MultiStepForm({ title, steps, onSubmit, submitLabel = "Submit", onClose }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | File[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (name: string, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (): boolean => {
    const step = steps[currentStep];
    const newErrors: Record<string, string> = {};

    step.fields.forEach((field) => {
      const value = formData[field.name];
      if (field.required && (!value || (typeof value === "string" && !value.trim()) || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && typeof value === "string" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = "Please enter a valid email";
      }
      if (field.type === "tel" && typeof value === "string" && value && !/^[\d\s+\-()]{7,15}$/.test(value)) {
        newErrors[field.name] = "Please enter a valid phone number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        await onSubmit(formData);
        setSubmitted(true);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="card relative p-8 text-center md:p-12">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-slate-500 transition hover:bg-[var(--soft)] hover:text-[var(--navy)]"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        )}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Check size={32} className="text-emerald-600" />
        </div>
        <h3 className="text-2xl font-black text-[var(--navy)]">Thank You!</h3>
        <p className="mt-3 text-slate-600">Your {title.toLowerCase()} has been submitted successfully. Our team will review and get back to you shortly.</p>
        <button
          onClick={() => { setSubmitted(false); setCurrentStep(0); setFormData({}); }}
          className="btn-primary mt-6"
        >
          Submit Another
        </button>
      </div>
    );
  }

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="card p-6 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <StepIcon size={24} className="text-[var(--blue)]" />
          <div>
            <h3 className="text-xl font-black text-[var(--navy)]">{title}</h3>
            <p className="text-sm text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-slate-500 transition hover:bg-[var(--soft)] hover:text-[var(--navy)]"
            aria-label="Close form"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <StepIndicator current={currentStep} total={steps.length} />

      <div className="mb-8">
        <h4 className="text-lg font-bold text-[var(--navy)]">{step.title}</h4>
        <p className="mt-1 text-sm text-slate-500">{step.description}</p>
      </div>

      <div className="space-y-5">
        {step.fields.map((field) => {
          const value = formData[field.name] as string || "";
          const error = errors[field.name];

          if (field.type === "file") {
            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-bold text-[var(--navy)]">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <FileUpload
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  multiple
                  onChange={(files) => updateField(field.name, files)}
                />
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-bold text-[var(--navy)]">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <textarea
                  value={value}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`min-h-28 w-full rounded-xl border p-4 text-sm transition focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/20 ${
                    error ? "border-red-400" : "border-[var(--border)]"
                  }`}
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={field.name}>
                <label className="mb-2 block text-sm font-bold text-[var(--navy)]">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <select
                  value={value}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  className={`w-full rounded-xl border p-4 text-sm transition focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/20 ${
                    error ? "border-red-400" : "border-[var(--border)]"
                  }`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label className="mb-2 block text-sm font-bold text-[var(--navy)]">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  value={value}
                  onChange={(e) => updateField(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full rounded-xl border p-4 text-sm transition focus:border-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/20 ${
                    error ? "border-red-400" : "border-[var(--border)]"
                  }`}
                />
              </div>
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-bold text-[var(--navy)] transition hover:bg-[var(--soft)] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          onClick={isLastStep ? handleSubmit : handleNext}
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLastStep ? (
            <><Send size={16} /> {isSubmitting ? "Sending..." : submitLabel}</>
          ) : (
            <><span>Next</span> <ArrowRight size={16} /></>
          )}
        </button>
      </div>
      {submitError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{submitError}</p>}
    </div>
  );
}

export const contractorSteps: FormStep[] = [
  {
    title: "Business Information",
    description: "Tell us about your company and expertise areas.",
    icon: Building2,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter your company name", required: true },
      { name: "businessType", label: "Business Type", type: "select", placeholder: "Select business type", required: true, options: ["Individual Proprietor", "Partnership", "Private Limited", "LLP", "Public Limited"] },
      { name: "specialization", label: "Area of Specialization", type: "select", placeholder: "Select specialization", required: true, options: ["Retail Fixtures", "Furniture Manufacturing", "Signage & Graphics", "Facade Systems", "Civil Works", "Electrical", "General Contracting"] },
      { name: "experience", label: "Years of Experience", type: "text", placeholder: "e.g. 5+ years" },
    ],
  },
  {
    title: "Contact Details",
    description: "How can we reach you for project discussions?",
    icon: User,
    fields: [
      { name: "contactPerson", label: "Contact Person Name", type: "text", placeholder: "Full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true },
      { name: "city", label: "City / Base Location", type: "text", placeholder: "Mumbai, Delhi, etc.", required: true },
    ],
  },
  {
    title: "Supporting Documents",
    description: "Upload your credentials for verification.",
    icon: FileText,
    fields: [
      { name: "documents", label: "Upload Documents (GST, MSME, Work Orders)", type: "file" },
      { name: "notes", label: "Additional Notes", type: "textarea", placeholder: "Tell us about your past projects or capabilities..." },
    ],
  },
];

export const vendorSteps: FormStep[] = [
  {
    title: "Vendor Profile",
    description: "Share your company and supply capabilities.",
    icon: Building2,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter your company name", required: true },
      { name: "supplyCategory", label: "Supply Category", type: "select", placeholder: "Select category", required: true, options: ["Raw Materials", "Hardware & Fittings", "Electrical Components", "Packaging Materials", "Glass & Aluminum", "Paint & Finishes", "Lighting", "IT & Electronics", "Logistics Services"] },
      { name: "yearsInBusiness", label: "Years in Business", type: "text", placeholder: "e.g. 10+ years" },
    ],
  },
  {
    title: "Contact Information",
    description: "Your primary contact details for procurement.",
    icon: Phone,
    fields: [
      { name: "contactPerson", label: "Contact Person", type: "text", placeholder: "Full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "vendor@company.com", required: true },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true },
      { name: "address", label: "Office Address", type: "textarea", placeholder: "Full address with pincode" },
    ],
  },
  {
    title: "Credentials",
    description: "Upload company credentials and references.",
    icon: FileText,
    fields: [
      { name: "documents", label: "Upload Certificates (GST, ISO, etc.)", type: "file" },
      { name: "reference", label: "Past Client References", type: "textarea", placeholder: "Names of brands or companies you've worked with..." },
    ],
  },
];

export const careerSteps: FormStep[] = [
  {
    title: "Personal Details",
    description: "Tell us about yourself and the role you're seeking.",
    icon: User,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true },
      { name: "position", label: "Position Applying For", type: "select", placeholder: "Select position", required: true, options: ["Project Manager", "Design Engineer", "Production Supervisor", "Fabrication Specialist", "Quality Control", "Installation Team Lead", "Sales - Business Development", "Administration", "Finance & Accounts", "Other"] },
    ],
  },
  {
    title: "Professional Background",
    description: "Share your experience and qualifications.",
    icon: Briefcase,
    fields: [
      { name: "experience", label: "Total Work Experience", type: "select", placeholder: "Select experience", required: true, options: ["0-1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"] },
      { name: "currentCompany", label: "Current / Last Company", type: "text", placeholder: "Company name" },
      { name: "qualification", label: "Highest Qualification", type: "text", placeholder: "e.g. B.E. Mechanical" },
      { name: "skills", label: "Key Skills", type: "textarea", placeholder: "List your relevant skills, certifications, and expertise areas..." },
    ],
  },
  {
    title: "Documents",
    description: "Upload your resume and supporting documents.",
    icon: FileText,
    fields: [
      { name: "resume", label: "Upload Resume (PDF/DOC)", type: "file", required: true },
      { name: "coverNote", label: "Cover Note", type: "textarea", placeholder: "Why do you want to join JMS Universal Technologies?" },
    ],
  },
];
