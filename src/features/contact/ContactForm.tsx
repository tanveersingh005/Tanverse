import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useAudio } from '../../context/AudioContext'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must contain at least 2 characters.' }),
  email: z.string().email({ message: 'Provide a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must contain at least 3 characters.' }),
  message: z.string().min(8, { message: 'Message must contain at least 8 characters.' })
})

type ContactFormData = z.infer<typeof contactSchema>

export const ContactForm: React.FC = () => {
  const { playClick, playSuccess, playError } = useAudio()
  const [loading, setLoading] = useState(false)
  const [sentStatus, setSentStatus] = useState<'success' | 'error' | null>(null)
  const [mockMode, setMockMode] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmitForm = async (data: ContactFormData) => {
    playClick()
    setLoading(true)
    setSentStatus(null)
    setMockMode(false)

    // Check if EmailJS keys are provided
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

    if (!serviceId || !templateId || !publicKey) {
      // Run mock sending animation for 1.8 seconds if keys are missing
      setTimeout(() => {
        setLoading(false)
        setSentStatus('success')
        setMockMode(true)
        playSuccess()
        reset()
      }, 1500)
      return
    }

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message
      }

      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      if (res.status === 200) {
        setLoading(false)
        setSentStatus('success')
        playSuccess()
        reset()
      } else {
        throw new Error('Non-200 response from EmailJS')
      }
    } catch (err) {
      console.error('EmailJS send failure', err)
      setLoading(false)
      setSentStatus('error')
      playError()
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-6 bg-[#0a0a0c]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-[10px] font-bold font-display uppercase tracking-widest text-accent-400">
            09 &bull; Connectivity
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 font-display mt-2">
            Establish Connection
          </h2>
          <div className="h-0.5 w-12 bg-accent-500 mt-4 mx-auto md:mx-0 rounded-full" />
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Info panels */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-950/20 glassmorphism p-5 rounded-2xl border border-white/5 text-left">
              <h3 className="text-2xs font-bold font-display uppercase tracking-wider text-slate-400 mb-2">Primary Mail</h3>
              <p className="text-xs text-slate-200">tanveercloud005@gmail.com</p>
            </div>
            
            <div className="bg-slate-950/20 glassmorphism p-5 rounded-2xl border border-white/5 text-left">
              <h3 className="text-2xs font-bold font-display uppercase tracking-wider text-slate-400 mb-2">Location</h3>
              <p className="text-xs text-slate-200">Kota, Rajasthan</p>
            </div>

            <div className="text-[10px] text-slate-500 font-matrix leading-relaxed">
              * SECURE ENCRYPTED FORM SUBMISSION TUNNEL CONNECTED VIA HTTPS PROXIES.
            </div>
          </div>

          {/* Form field */}
          <div className="md:col-span-8 bg-slate-950/20 glassmorphism p-6 md:p-8 rounded-3xl border border-white/5">
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-5 text-xs text-left">
              {/* Row 1 (Name & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-display">Your Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Tanveer Singh"
                    disabled={loading}
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-accent-500 transition-colors"
                  />
                  {errors.name && (
                    <span className="text-3xs text-rose-500 font-matrix mt-1 block">{errors.name.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-display">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="tanveer@example.com"
                    disabled={loading}
                    className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-accent-500 transition-colors"
                  />
                  {errors.email && (
                    <span className="text-3xs text-rose-500 font-matrix mt-1 block">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-display">Subject / Query</label>
                <input
                  type="text"
                  {...register('subject')}
                  placeholder="Collaborative Opportunities"
                  disabled={loading}
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-accent-500 transition-colors"
                />
                {errors.subject && (
                  <span className="text-3xs text-rose-500 font-matrix mt-1 block">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-400 mb-1.5 font-display">Message Content</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  placeholder="Detail Message..."
                  disabled={loading}
                  className="w-full bg-slate-950/60 border border-white/5 rounded-xl px-4 py-3 text-slate-100 outline-none focus:border-accent-500 transition-colors resize-none"
                />
                {errors.message && (
                  <span className="text-3xs text-rose-500 font-matrix mt-1 block">{errors.message.message}</span>
                )}
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-semibold text-xs text-white bg-gradient-to-r from-accent-600 to-accent-400 hover:from-accent-500 hover:to-accent-300 transition-all cursor-pointer shadow-lg shadow-accent-600/10 disabled:opacity-75"
                data-cursor="SUBMIT"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Transmitting message signals...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send Message
                  </>
                )}
              </button>
            </form>

            {/* Notification alert states */}
            {sentStatus === 'success' && (
              <div className="mt-5 p-4 bg-emerald-950/35 border border-emerald-500/20 rounded-xl flex items-start gap-3 text-left">
                <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-xs font-bold text-slate-100">Message Delivered Successfully</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    Your transmission was processed. I will reply shortly.
                  </p>
                  {mockMode && (
                    <div className="flex items-center gap-1.5 mt-2 bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded text-[8px] font-matrix text-amber-300 w-fit">
                      <AlertTriangle size={8} /> DEMO MOCK: Configure EmailJS env variables for live sending.
                    </div>
                  )}
                </div>
              </div>
            )}

            {sentStatus === 'error' && (
              <div className="mt-5 p-4 bg-rose-950/35 border border-rose-500/20 rounded-xl flex items-start gap-3 text-left">
                <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-xs font-bold text-slate-100">Transmission Signal Error</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                    There was an issue processing EmailJS. Please contact direct email contact@engineer.io.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
export default ContactForm
