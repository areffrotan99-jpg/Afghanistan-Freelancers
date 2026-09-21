import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FreelancersDirectory } from './components/FreelancersDirectory';
import { FreelancerModal } from './components/FreelancerModal';
import { ContactHireModal } from './components/ContactHireModal';
import { JobsDirectory } from './components/JobsDirectory';
import { ApplyJobModal } from './components/ApplyJobModal';
import { PostJobModal } from './components/PostJobModal';
import { WhyAfghanTalent } from './components/WhyAfghanTalent';
import { EscrowSafetySection } from './components/EscrowSafetySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FREELANCERS, INITIAL_JOBS } from './data/mockData';
import { Currency, Freelancer, Job } from './types';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'talent' | 'jobs' | 'why-afghanistan' | 'escrow' | 'how-it-works'
  >('talent');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [userRole, setUserRole] = useState<'client' | 'freelancer'>('client');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive state
  const [freelancers] = useState<Freelancer[]>(FREELANCERS);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  // Modals state
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [hiringFreelancer, setHiringFreelancer] = useState<Freelancer | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSearchSubmit = () => {
    setActiveTab('talent');
    const directoryEl = document.getElementById('talent-directory');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('talent');
    const directoryEl = document.getElementById('talent-directory');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Job "${newJob.title}" posted successfully!`);
    setActiveTab('jobs');
  };

  const handleSendContract = (details: {
    freelancerId: string;
    projectTitle: string;
    offerAmount: number;
    message: string;
  }) => {
    const fl = freelancers.find((f) => f.id === details.freelancerId);
    showToast(`Invitation & draft contract sent to ${fl ? fl.name : 'freelancer'}!`);
  };

  const handleSubmitProposal = (proposal: {
    jobId: string;
    bidAmount: number;
    coverLetter: string;
    deliveryDays: number;
  }) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === proposal.jobId ? { ...j, proposalsCount: j.proposalsCount + 1 } : j))
    );
    showToast('Proposal submitted successfully to client!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPostJob={() => setIsPostJobOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'talent' && (
          <>
            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onSearchSubmit={handleSearchSubmit}
              onOpenPostJob={() => setIsPostJobOpen(true)}
            />

            {/* Explore by Category */}
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              currency={currency}
            />

            {/* Freelancer Directory */}
            <div id="talent-directory">
              <FreelancersDirectory
                freelancers={freelancers}
                currency={currency}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onViewProfile={(fl) => setSelectedFreelancer(fl)}
                onHire={(fl) => setHiringFreelancer(fl)}
              />
            </div>

            {/* Why Afghan Talent Section */}
            <WhyAfghanTalent
              onExploreTalent={() => {
                const el = document.getElementById('talent-directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Escrow & Security Preview */}
            <EscrowSafetySection
              currency={currency}
              onPostJob={() => setIsPostJobOpen(true)}
            />

            {/* Client Testimonials */}
            <TestimonialsSection />
          </>
        )}

        {activeTab === 'jobs' && (
          <JobsDirectory
            jobs={jobs}
            currency={currency}
            onApplyJob={(job) => setApplyingJob(job)}
            onOpenPostJob={() => setIsPostJobOpen(true)}
          />
        )}

        {activeTab === 'why-afghanistan' && (
          <>
            <WhyAfghanTalent
              onExploreTalent={() => {
                setActiveTab('talent');
                setTimeout(() => {
                  const el = document.getElementById('talent-directory');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            <TestimonialsSection />
          </>
        )}

        {activeTab === 'escrow' && (
          <EscrowSafetySection
            currency={currency}
            onPostJob={() => setIsPostJobOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Freelancer Full Profile Modal */}
      <FreelancerModal
        freelancer={selectedFreelancer}
        currency={currency}
        onClose={() => setSelectedFreelancer(null)}
        onHire={(fl) => setHiringFreelancer(fl)}
      />

      {/* Contact & Hire Modal */}
      <ContactHireModal
        freelancer={hiringFreelancer}
        currency={currency}
        onClose={() => setHiringFreelancer(null)}
        onSendContract={handleSendContract}
      />

      {/* Apply to Job Modal */}
      <ApplyJobModal
        job={applyingJob}
        currency={currency}
        onClose={() => setApplyingJob(null)}
        onSubmitProposal={handleSubmitProposal}
      />

      {/* Post a Job Modal */}
      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        currency={currency}
        onAddJob={handleAddJob}
      />
    </div>
  );
}
