import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Award, Briefcase, Shield, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { PageHeader } from '@/components/motion';
import { ScrollTimeline, TimelineItem } from '@/components/motion/ScrollTimeline';
import { workExperience, education, academicExperience, projects, awsLaunches } from '@/content/experience';

const ExperienceFull = () => {
  const [expandedJobs, setExpandedJobs] = useState<Record<number, boolean>>({
    0: true, // First job expanded by default
  });

  const [expandedEducation, setExpandedEducation] = useState<Record<number, boolean>>({
    0: false, // Education collapsed by default
  });

  const toggleJob = (index: number) => {
    setExpandedJobs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleEducation = (index: number) => {
    setExpandedEducation(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-cyber-dark text-white">
        <Helmet>
          <title>Experience & Career | Vineeth Sai Narajala</title>
          <meta name="description" content="Work experience, projects, and education of Vineeth Sai Narajala." />
        </Helmet>
        
        <Navbar />
        <main>
          <PageHeader
            kicker="Career"
            title="Experience & Career"
            subtitle="Work history, projects, and education."
          />
          <section className="py-20 bg-cyber-darker relative overflow-hidden">
            <div className="absolute inset-0 bg-grid"></div>

            <div className="container mx-auto px-4 relative z-10">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center mb-8">
                    <Briefcase className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Work Experience</h3>
                  </div>

                  <ScrollTimeline>
                    {workExperience.map((job, index) => (
                      <TimelineItem key={index} icon={<Calendar className="h-4 w-4 text-cyber-green" />} side={index % 2 === 0 ? 'right' : 'left'}>
                        <div className="cyber-card p-6 bg-cyber-grey/80">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                            <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm border border-cyber-green/20">
                              {job.period}
                            </span>
                          </div>
                          <h5 className="text-lg text-cyber-green mb-4">{job.company}</h5>

                          <button
                            onClick={() => toggleJob(index)}
                            className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors"
                          >
                            {expandedJobs[index] ? (
                              <>
                                <span>Hide Details</span>
                                <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>Show Details</span>
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </button>

                          {expandedJobs[index] && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                              <ul className="text-gray-300 mt-4 space-y-2 list-disc pl-5 marker:text-cyber-green/70">
                                {job.highlights.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-2 mt-4">
                                {job.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TimelineItem>
                    ))}
                  </ScrollTimeline>

                  <div className="flex items-center mt-12 mb-8">
                    <Award className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Education</h3>
                  </div>

                  <ScrollTimeline>
                    {education.map((edu, index) => (
                      <TimelineItem key={index} icon={<Calendar className="h-4 w-4 text-cyber-green" />} side={index % 2 === 0 ? 'right' : 'left'}>
                        <div className="cyber-card p-6 bg-cyber-grey/80">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                            {edu.period && (
                              <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm border border-cyber-green/20">
                                {edu.period}
                              </span>
                            )}
                          </div>
                          <h5 className="text-lg text-cyber-green mb-4">{edu.institution}</h5>

                          <button
                            onClick={() => toggleEducation(index)}
                            className="flex items-center text-cyber-green hover:text-cyber-green-light mb-2 transition-colors"
                          >
                            {expandedEducation[index] ? (
                              <>
                                <span>Hide Details</span>
                                <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>Show Details</span>
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </button>

                          {expandedEducation[index] ? (
                            <p className="text-gray-300 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">{edu.description}</p>
                          ) : (
                            <div className="mt-4">
                              <div className="flex flex-wrap gap-2">
                                {edu.tags.map((tag, tagIndex) => (
                                  <span key={tagIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center mt-4 bg-cyber-darker/80 p-2 rounded">
                                <BookOpen className="h-4 w-4 text-cyber-green mr-2" />
                                <span className="text-gray-300 text-sm">Focus areas: {edu.description.split('.')[0]}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </TimelineItem>
                    ))}
                  </ScrollTimeline>
                </div>

                <div>
                  <div className="flex items-center mb-8">
                    <Award className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Notable Projects</h3>
                  </div>

                  <div className="space-y-6 mb-12">
                    {projects.map((project, index) => (
                      <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                        <h4 className="text-xl font-semibold text-white mb-3">
                          {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-cyber-green transition-colors">
                              {project.title} ↗
                            </a>
                          ) : (
                            project.title
                          )}
                        </h4>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Academic experience */}
                  <div className="flex items-center mb-8">
                    <BookOpen className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">Academic Experience</h3>
                  </div>

                  <div className="space-y-6 mb-12">
                    {academicExperience.map((exp, index) => (
                      <div key={index} className="bg-cyber-grey p-6 rounded-lg border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                          <span className="px-3 py-1 bg-cyber-green/10 text-cyber-green rounded text-sm">
                            {exp.period}
                          </span>
                        </div>
                        <h5 className="text-lg text-cyber-green mb-3">{exp.institution}</h5>
                        <p className="text-gray-300 mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded text-cyber-green text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-cyber-green mr-3" />
                    <h3 className="text-2xl font-bold text-white">AWS Launches I Security-Reviewed</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">
                    A sample of the 150+ AWS Analytics launches I threat modeled and reviewed.
                  </p>
                  <ul className="space-y-3">
                    {awsLaunches.map((launch) => (
                      <li key={launch.link} className="bg-cyber-grey p-4 rounded-lg border border-cyber-green/20">
                        <a
                          href={launch.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-cyber-green transition-colors"
                        >
                          {launch.title} ↗
                        </a>
                        <p className="text-gray-400 text-sm mt-1">{launch.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ExperienceFull;
