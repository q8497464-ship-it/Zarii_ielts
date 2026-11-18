import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SITE_CONFIG } from '../../landing/siteConfig';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback / General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`[Zarii Contact]: ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${SITE_CONFIG.supportEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 sm:py-6 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="teal">Get in Touch</Badge>
          <span className="text-xs text-slate-400 font-medium">Direct Support &amp; Feedback</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contact the Zarii Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Have an idea for a new practice module? Found an error in an answer key? Or just want to share your target band achievement? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <div className="space-y-4">
          <Card className="p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-slate-900 dark:text-white">Direct Email</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              For study plan questions, answer key feedback, and educator inquiries:
            </p>
            <a
              href={`mailto:${SITE_CONFIG.supportEmail}`}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline block break-all"
            >
              {SITE_CONFIG.supportEmail}
            </a>
          </Card>

          <Card className="p-4 space-y-2 border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-950 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs text-slate-900 dark:text-white">Prompt Review</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every learner inquiry and content errata report is logged and reviewed to continuously improve question quality.
            </p>
          </Card>
        </div>

        {/* Message Form */}
        <div className="md:col-span-2">
          <Card className="p-6 border-slate-200 dark:border-slate-800">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Opening Your Email Client
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your message has been formatted. If your email client didn't open automatically, send directly to <strong>{SITE_CONFIG.supportEmail}</strong>.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maria Khan"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maria@example.com"
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option>Feedback / General Inquiry</option>
                    <option>Bug Report / Answer Key Correction</option>
                    <option>New Feature Suggestion</option>
                    <option>Educator / Teacher Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your IELTS preparation journey?"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <Button
                  type="submit"
                  variant="teal"
                  size="md"
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <Link to="/about" className="font-semibold text-teal-600 dark:text-teal-400 hover:underline">
          &larr; About Zarii IELTS
        </Link>
        <Link to="/" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
