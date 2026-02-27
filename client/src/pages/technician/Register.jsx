import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const AVAILABLE_SKILLS = [
  'AC Repair', 'Plumber', 'Electrician',
  'Bike Repair', 'CCTV Installation', 'Carpenter',
  'Painting', 'Cleaning'
]

const STEPS = ['Basic Info', 'Skills', 'Documents']

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', experienceYears: '',
  })
  const [skills, setSkills] = useState([])
  const [citizenshipFront, setCitizenshipFront] = useState(null)
  const [citizenshipBack, setCitizenshipBack] = useState(null)
  const [selfie, setSelfie] = useState(null)

  const toggleSkill = (skill) => {
    setSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const handleNext = () => {
    if (step === 0 && (!form.name || !form.email || !form.phone || !form.password)) {
      alert('Sabai fields fill gara!'); return
    }
    if (step === 1 && skills.length === 0) {
      alert('Kam se kam ek skill select gara!'); return
    }
    setStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    if (!citizenshipFront || !citizenshipBack || !selfie) {
      alert('Sabai documents upload gara!'); return
    }
    setSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      formData.append('skills', JSON.stringify(skills))
      formData.append('citizenshipFront', citizenshipFront)
      formData.append('citizenshipBack', citizenshipBack)
      formData.append('selfie', selfie)
      await api.post('/auth/technician/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Registration successful! Admin approval ko lagi wait gara.')
      navigate('/technician/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed!')
    }
    setSubmitting(false)
  }

  const inp = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontFamily: 'DM Sans, sans-serif',
    width: '100%',
    borderRadius: '10px',
    padding: '15px 19px',
    fontSize: '13px',
    outline: 'none',
  }

  return (
    <div style={{ background: '#020817', fontFamily: 'DM Sans, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 50%, rgba(249,115,22,0.07), transparent)' }} className="absolute inset-0" />
      </div>

      {/* Main Grid — fills remaining height */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>

        {/* LEFT */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 13, boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}>
              TB
            </div>
            <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 16 }}>
              Tech<span style={{ color: '#f97316' }}>Book</span>
              <span style={{ color: '#334155', fontWeight: 400, fontSize: 13, marginLeft: 4 }}>Nepal</span>
            </span>
          </div>

          {/* Middle content */}
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
              Technician Portal
            </p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 40, color: '#fff', lineHeight: 1.1, marginBottom: 12 }}>
              Join as<br />
              <span style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Technician
              </span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, maxWidth: 300, marginBottom: 32 }}>
              Enter your details correctly.otherwise you will denied !!
            </p>

            {/* Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, fontFamily: 'Syne, sans-serif',
                    background: i < step ? 'rgba(74,222,128,0.15)' : i === step ? 'rgba(249,115,22,0.2)' : 'rgba(255,255,255,0.04)',
                    border: i < step ? '1px solid rgba(74,222,128,0.4)' : i === step ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    color: i < step ? '#4ade80' : i === step ? '#f97316' : '#475569',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 600,
                    color: i === step ? '#fff' : i < step ? '#4ade80' : '#475569',
                    transition: 'all 0.3s',
                  }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p style={{ color: '#475569', fontSize: 13 }}>
            Already registered?{' '}
            <Link to="/technician/login" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
              Login gara →
            </Link>
          </p>
        </div>

        {/* RIGHT — Form */}
        <div style={{ padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ width: '100%', maxWidth: 620 }}>

            {/* Step 0 */}
            {step === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Step 1 — Basic Information
                </p>
                {[
                  { label: 'Naam', key: 'name', type: 'text', placeholder: 'Ram Bahadur' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com' },
                  { label: 'Phone', key: 'phone', type: 'text', placeholder: '+977 98XXXXXXXX' },
                  { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
                  { label: 'Experience (Years)', key: 'experienceYears', type: 'number', placeholder: '3' },
                ].map(field => (
                  <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      min={field.type === 'number' ? 0 : undefined}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      style={inp}
                    />
                  </div>
                ))}
                <button
                  onClick={handleNext}
                  style={{ width: '100%', padding: '11px', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(249,115,22,0.25)', marginTop: 4 }}
                >
                  Next — Select Skills →
                </button>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Step 2 — Skills Select Gara
                </p>
                <p style={{ color: '#64748b', fontSize: 13 }}>Timile garna sakne sabai skills select gara</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {AVAILABLE_SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      style={{
                        padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: 'Syne, sans-serif', cursor: 'pointer', transition: 'all 0.2s',
                        background: skills.includes(skill) ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                        border: skills.includes(skill) ? '1px solid rgba(249,115,22,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: skills.includes(skill) ? '#f97316' : '#94a3b8',
                      }}
                    >
                      {skills.includes(skill) ? '✓ ' : ''}{skill}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button onClick={() => setStep(0)} style={{ flex: 1, padding: '11px', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button onClick={handleNext} style={{ flex: 1, padding: '11px', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(249,115,22,0.25)' }}>
                    Next — Documents →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Step 3 — Verification Documents
                </p>
                <p style={{ color: '#64748b', fontSize: 13 }}>Citizenship ra selfie upload gara — admin le manually verify garcha</p>
                {[
                  { label: 'Citizenship Front Photo', setter: setCitizenshipFront, state: citizenshipFront },
                  { label: 'Citizenship Back Photo', setter: setCitizenshipBack, state: citizenshipBack },
                  { label: 'Selfie Photo', setter: setSelfie, state: selfie },
                ].map(doc => (
                  <div key={doc.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontFamily: 'Syne, sans-serif', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {doc.label}
                    </label>
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: doc.state ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#475569', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                        {doc.state ? `✓ ${doc.state.name}` : 'Koi file select bhako chaina'}
                      </span>
                      <label style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700, fontFamily: 'Syne, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        Browse
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => doc.setter(e.target.files[0])} />
                      </label>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '11px', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button onClick={handleSubmit} disabled={submitting} style={{ flex: 1, padding: '11px', borderRadius: 12, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', background: 'linear-gradient(135deg, #f97316, #ea580c)', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(249,115,22,0.25)', opacity: submitting ? 0.5 : 1 }}>
                    {submitting ? 'Submitting...' : 'Submit →'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register