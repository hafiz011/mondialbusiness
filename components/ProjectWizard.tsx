"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import axios from "@/lib/axios";


// --- Types ---

type FormData = {
  prenom: string
  email: string
  pays: string
  typeProjet: string
  idee: string
  pourquoi: string
  peur: string
  temps: string
  budget: string
  conditions: boolean
}

type Submission = FormData & {
  id: string
  timestamp: string
  status: "new" | "reviewed" | "contacted"
}

// --- Backend Submit ---
const submitToApi = async (
  data: FormData
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axios.post("/Formdata/submit", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("API submit error:", error);
    const message = error?.response?.data?.message || "Failed to submit";
    throw new Error(message);
  }
};



// --- Main Component ---

export default function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    prenom: "",
    email: "",
    pays: "",
    typeProjet: "",
    idee: "",
    pourquoi: "",
    peur: "",
    temps: "",
    budget: "",
    conditions: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: val }))

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    let isValid = true

    if (step === 1) {
      if (!formData.prenom.trim()) { newErrors.prenom = "Name required"; isValid = false; }
      if (!formData.email.trim() || !formData.email.includes('@')) { newErrors.email = "Valid email required"; isValid = false; }
      if (!formData.pays) { newErrors.pays = "Country required"; isValid = false; }
    }

    if (step === 2) {
      if (!formData.typeProjet) { newErrors.typeProjet = "Select a type"; isValid = false; }
      if (!formData.idee.trim()) { newErrors.idee = "Describe your idea"; isValid = false; }
      if (!formData.pourquoi.trim()) { newErrors.pourquoi = "Explain why"; isValid = false; }
    }

    if (step === 3) {
      if (!formData.temps) { newErrors.temps = "Select time"; isValid = false; }
      if (!formData.budget) { newErrors.budget = "Select budget"; isValid = false; }
      if (!formData.conditions) { newErrors.conditions = "Please agree to rules"; isValid = false; }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitToApi(formData)
      // await submitToGoogleSheets(formData)
      setSubmitSuccess(true)
    } catch (error) {
      console.error("Submission error", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepLabels = ["You", "Idea", "Reality", "Launch"]

  // Helper to get label for select values in recap
  const getLabel = (field: keyof FormData, options: { value: string, label: string }[]) => {
    const val = formData[field] as string
    const opt = options.find(o => o.value === val)
    return opt ? opt.label : val
  }

  return (
    <div className="page-container font-sans text-white">
      <style jsx global>{`
        :root {
          --hex-cyan: #36E0F8;
          --hex-red: #DA2824;
          --hex-dark-blue: #151821;
          --hex-black: #0C0F12;
          --bg-overlay: rgba(12, 15, 18, 0.90); 
          --card-bg: rgba(21, 24, 33, 0.95); 
          --card-border: rgba(54, 224, 248, 0.3);
          --text-main: #ffffff;
          --text-muted: #cbd5e1;
          --accent-primary: var(--hex-cyan);
          --accent-secondary: var(--hex-red);
          --accent-gradient: linear-gradient(135deg, var(--hex-red) 0%, var(--hex-cyan) 100%);
          --input-bg: rgba(12, 15, 18, 0.8);
          --input-border: rgba(54, 224, 248, 0.2);
          --error: var(--hex-red);
          --success: var(--hex-cyan);
        }

        .page-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 900px) {
          .content-wrapper {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 80px;
          }
          .hero-section {
            text-align: left;
          }
          .hero-title {
            font-size: 48px;
          }
        }

        .hero-section {
          width: 100%;
          max-width: 600px;
          text-align: left;
          animation: fadeIn 0.8s ease-out;
        }

        .hero-title {
          font-size: 32px;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 24px;
          color: #fff;
        }

        .hero-title span {
            color: #fff;
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .hero-desc strong {
            color: var(--text-main);
        }

        .hero-footer {
          margin-top: 20px;
          font-size: 14px;
          color: var(--text-muted);
          font-style: italic;
          border-left: 3px solid var(--accent-secondary);
          padding-left: 12px;
        }

        .form-section {
          width: 100%;
          max-width: 450px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          animation: slideUp 0.8s ease-out;
        }

        .progress-header {
          margin-bottom: 20px;
        }

        .step-indicator {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent-gradient);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .step-title {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }

        .step-subtitle {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          color: #e2e8f0;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }

        .form-control:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(54, 224, 248, 0.2);
          background: var(--hex-black);
        }

        .form-control::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }

        textarea.form-control {
          min-height: 80px;
          resize: vertical;
        }
        
        small {
            display: block;
            margin-top: 4px;
            font-size: 11px;
            color: var(--text-muted);
        }

        .error-msg {
          color: var(--error);
          font-size: 11px;
          margin-top: 4px;
          min-height: 14px;
        }

        .btn-group {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .btn-primary {
          flex: 1;
          background: var(--accent-gradient);
          color: #fff;
          box-shadow: 0 4px 15px rgba(54, 224, 248, 0.3);
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(54, 224, 248, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .recap-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 12px;
          font-size: 12px;
          border: 1px solid var(--input-border);
        }

        .recap-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .recap-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .recap-label { 
            color: var(--text-muted); 
            min-width: 80px;
        }
        .recap-val { 
            font-weight: 500; 
            color: #fff; 
            text-align: right; 
            max-width: 65%;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="content-wrapper">
        {/* LEFT SIDE: HERO TEXT */}
        <section className="hero-section">
          <h1 className="hero-title">
            Got an idea?<br />
            <span>We help you take it seriously.</span>
          </h1>
          <p className="hero-desc">
            Here, you can be <strong>young</strong>, not &quot;perfect&quot;.
            You outline what&apos;s on your mind and in your heart, step by step.
            We don&apos;t ask for expertise, just <strong>authenticity</strong>.
          </p>
          <div className="hero-footer">
            You answer. We think with you. We structure it afterward.
          </div>
        </section>

        {/* RIGHT SIDE: FORM */}
        <section className="form-section">
          <div className="progress-header">
            <div className="step-indicator">
              <span>Step <span>{currentStep}</span> of 4</span>
              <span>{stepLabels[currentStep - 1]}</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="step-content animate-in fade-in">
                <div className="step-title">Who You Are</div>
                <div className="step-subtitle">We start with the basics. You have the right to have an idea.</div>

                <div className="form-group">
                  <label>Your First Name *</label>
                  <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Ex: Lina, Yanis..." />
                  <div className="error-msg">{errors.prenom}</div>
                </div>

                <div className="form-group">
                  <label>Your Email *</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="you@mail.com" />
                  <small>We&apos;ll send feedback here.</small>
                  <div className="error-msg">{errors.email}</div>
                </div>

                <div className="form-group">
                  <label>Where do you live? *</label>
                  <select className="form-control" name="pays" value={formData.pays} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="France">France</option>
                    <option value="Belgique">Belgium</option>
                    <option value="Suisse">Switzerland</option>
                    <option value="Canada">Canada</option>
                    <option value="Autre">Other</option>
                  </select>
                  <div className="error-msg">{errors.pays}</div>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="step-content animate-in fade-in">
                <div className="step-title">Your Idea</div>
                <div className="step-subtitle">It can be vague or strange. Creativity is welcome.</div>

                <div className="form-group">
                  <label>Project Type *</label>
                  <select className="form-control" name="typeProjet" value={formData.typeProjet} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="business_local">Physical (Shop, Activity)</option>
                    <option value="en_ligne">Digital (App, Site)</option>
                    <option value="mixte">Both</option>
                    <option value="je_ne_sais_pas">Unknown</option>
                  </select>
                  <div className="error-msg">{errors.typeProjet}</div>
                </div>

                <div className="form-group">
                  <label>Explain your idea *</label>
                  <textarea className="form-control" name="idee" value={formData.idee} onChange={handleChange} placeholder="Describe it simply..."></textarea>
                  <div className="error-msg">{errors.idee}</div>
                </div>

                <div className="form-group">
                  <label>Why it matters to you? *</label>
                  <textarea className="form-control" name="pourquoi" value={formData.pourquoi} onChange={handleChange} placeholder="Your motivation..."></textarea>
                  <div className="error-msg">{errors.pourquoi}</div>
                </div>

                <div className="form-group">
                  <label>Biggest fear? (Optional)</label>
                  <input type="text" className="form-control" name="peur" value={formData.peur} onChange={handleChange} placeholder="Ex: Failure, money..." />
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="step-content animate-in fade-in">
                <div className="step-title">Reality & Rules</div>
                <div className="step-subtitle">What&apos;s possible for you today?</div>

                <div className="form-group">
                  <label>Time per week *</label>
                  <select className="form-control" name="temps" value={formData.temps} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="-5h">&lt; 5 hours</option>
                    <option value="5-10h">5 - 10 hours</option>
                    <option value="+10h">10+ hours</option>
                  </select>
                  <div className="error-msg">{errors.temps}</div>
                </div>

                <div className="form-group">
                  <label>Initial Budget *</label>
                  <select className="form-control" name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option value="0-500">0 - 500€</option>
                    <option value="500-2000">500 - 2,000€</option>
                    <option value="+2000">2,000€ +</option>
                  </select>
                  <div className="error-msg">{errors.budget}</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px", fontSize: "11px", color: "#cbd5e1", marginBottom: "10px" }}>
                  <ul style={{ paddingLeft: "15px", margin: 0 }}>
                    <li>Creation & analysis are <strong>free</strong>.</li>
                    <li>You own your idea.</li>
                    <li>Mondial.eco may take 3% equity if we find you funding.</li>
                  </ul>
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12px", color: "#cbd5e1" }}>
                  <input type="checkbox" id="conditions" name="conditions" checked={formData.conditions} onChange={handleChange} style={{ marginTop: "3px" }} />
                  <label htmlFor="conditions" style={{ fontSize: "12px", fontWeight: 400, color: "#cbd5e1", display: "inline" }}>
                    I agree to the rules.
                  </label>
                </div>
                <div className="error-msg">{errors.conditions}</div>

                <div className="btn-group">
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>Continue</button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="step-content animate-in fade-in">
                <div className="step-title">Launch</div>
                <div className="step-subtitle">Review before sending.</div>

                <div className="recap-box">
                  <div className="recap-row"><span className="recap-label">Name</span><span className="recap-val">{formData.prenom}</span></div>
                  <div className="recap-row"><span className="recap-label">Email</span><span className="recap-val">{formData.email}</span></div>
                  <div className="recap-row"><span className="recap-label">Country</span><span className="recap-val">{formData.pays}</span></div>
                  <div className="recap-row"><span className="recap-label">Project</span><span className="recap-val">{
                    getLabel("typeProjet", [
                      { value: "business_local", label: "Physical" },
                      { value: "en_ligne", label: "Digital" },
                      { value: "mixte", label: "Both" },
                      { value: "je_ne_sais_pas", label: "Unknown" }
                    ])
                  }</span></div>
                  <div className="recap-row"><span className="recap-label">Idea</span><span className="recap-val">{formData.idee}</span></div>
                  <div className="recap-row"><span className="recap-label">Why</span><span className="recap-val">{formData.pourquoi}</span></div>
                  <div className="recap-row"><span className="recap-label">Fear</span><span className="recap-val">{formData.peur || "-"}</span></div>
                  <div className="recap-row"><span className="recap-label">Time</span><span className="recap-val">{
                    getLabel("temps", [
                      { value: "-5h", label: "< 5 hours" },
                      { value: "5-10h", label: "5 - 10 hours" },
                      { value: "+10h", label: "10+ hours" }
                    ])
                  }</span></div>
                  <div className="recap-row"><span className="recap-label">Budget</span><span className="recap-val">{
                    getLabel("budget", [
                      { value: "0-500", label: "0 - 500€" },
                      { value: "500-2000", label: "500 - 2,000€" },
                      { value: "+2000", label: "2,000€ +" }
                    ])
                  }</span></div>
                </div>

                {submitSuccess && (
                  <div style={{ marginTop: "15px", padding: "12px", borderRadius: "10px", fontSize: "13px", background: "rgba(54, 224, 248, 0.15)", border: "1px solid var(--hex-cyan)", color: "var(--hex-cyan)" }}>
                    <strong>Sent!</strong> We&apos;ll be in touch soon.
                  </div>
                )}

                {!submitSuccess && (
                  <div className="btn-group">
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}
