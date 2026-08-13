'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/validations';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding content-max"
      aria-label="Contact and Commission Form"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between"
        >
          <div>
            <p className="label-caps text-[#E63946] mb-3">Inquiries</p>
            <h2 className="display-text text-[clamp(2.5rem,6vw,5rem)] text-[#F5F5F0] leading-tight mb-6">
              Let's create something together.
            </h2>
            <p className="text-[#6B7280] text-sm md:text-base leading-relaxed max-w-md mb-12">
              Currently accepting commissions for characters, fan art, and commercial illustrations. 
              Fill out the form with your project details, and I'll get back to you within 48 hours.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="label-caps text-[10px] mb-2">Email</p>
              <a 
                href="mailto:contact@kaizen-art.com" 
                className="text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200"
              >
                contact@kaizen-art.com
              </a>
            </div>
            <div>
              <p className="label-caps text-[10px] mb-2">Socials</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/kaizen_arts/?hl=en" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200">Instagram</a>
                <a href="#" className="text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200">Twitter/X</a>
                <a href="#" className="text-[#F5F5F0] hover:text-[#E63946] transition-colors duration-200">ArtStation</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#111111] border border-[#2A2A2A] p-6 md:p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#111111]"
              >
                <div className="w-16 h-16 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center mb-6 text-[#E63946]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-medium text-[#F5F5F0] mb-2">Inquiry Received</h3>
                <p className="text-[#6B7280] text-sm mb-8">Thank you for your interest. I'll review your project details and respond within 48 hours.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="px-6 py-3 border border-[#2A2A2A] text-[#F5F5F0] text-xs font-medium tracking-widest uppercase hover:border-[#E63946] transition-colors duration-200"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-medium text-[#F5F5F0]">Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`bg-[#0A0A0A] border ${errors.name ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E63946] transition-colors duration-200`}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span className="text-[#E63946] text-xs" role="alert">{errors.name.message}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-medium text-[#F5F5F0]">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`bg-[#0A0A0A] border ${errors.email ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E63946] transition-colors duration-200`}
                      placeholder="your@email.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span className="text-[#E63946] text-xs" role="alert">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="text-xs font-medium text-[#F5F5F0]">Project Type</label>
                    <select
                      id="projectType"
                      defaultValue=""
                      {...register('projectType')}
                      className={`bg-[#0A0A0A] border ${errors.projectType ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E63946] transition-colors duration-200 appearance-none cursor-pointer`}
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="" disabled>Select a type...</option>
                      <option value="commission">Illustration Commission</option>
                      <option value="character-design">Character Design</option>
                      <option value="fan-art">Fan Art</option>
                      <option value="other">Other / Commercial</option>
                    </select>
                    {errors.projectType && <span className="text-[#E63946] text-xs" role="alert">{errors.projectType.message}</span>}
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="text-xs font-medium text-[#F5F5F0]">Budget Range</label>
                    <select
                      id="budget"
                      defaultValue=""
                      {...register('budget')}
                      className={`bg-[#0A0A0A] border ${errors.budget ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#E63946] transition-colors duration-200 appearance-none cursor-pointer`}
                      aria-invalid={!!errors.budget}
                    >
                      <option value="" disabled>Select budget...</option>
                      <option value="under-50">Under $50 (Sketch only)</option>
                      <option value="50-150">$50 – $150</option>
                      <option value="150-300">$150 – $300</option>
                      <option value="300-plus">$300+</option>
                    </select>
                    {errors.budget && <span className="text-[#E63946] text-xs" role="alert">{errors.budget.message}</span>}
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="deadline" className="text-xs font-medium text-[#F5F5F0]">Deadline / Timeframe</label>
                  <input
                    id="deadline"
                    type="text"
                    {...register('deadline')}
                    className={`bg-[#0A0A0A] border ${errors.deadline ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E63946] transition-colors duration-200`}
                    placeholder="e.g. Next month, No strict deadline"
                    aria-invalid={!!errors.deadline}
                  />
                  {errors.deadline && <span className="text-[#E63946] text-xs" role="alert">{errors.deadline.message}</span>}
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-medium text-[#F5F5F0]">Project Details</label>
                  <textarea
                    id="description"
                    {...register('description')}
                    rows={5}
                    className={`bg-[#0A0A0A] border ${errors.description ? 'border-[#E63946]' : 'border-[#2A2A2A]'} px-4 py-3 text-sm text-[#F5F5F0] placeholder:text-[#6B7280] focus:outline-none focus:border-[#E63946] transition-colors duration-200 resize-none`}
                    placeholder="Describe your character, pose, background, mood, or specific requirements..."
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && <span className="text-[#E63946] text-xs" role="alert">{errors.description.message}</span>}
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs" role="alert">
                    Something went wrong. Please try again later or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-4 w-full py-4 bg-[#E63946] text-[#F5F5F0] text-xs font-medium tracking-widest uppercase transition-all duration-200 flex justify-center items-center h-[50px] ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#C1121F]'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-[#F5F5F0]/30 border-t-[#F5F5F0] rounded-full"
                    />
                  ) : (
                    'Send Inquiry'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
