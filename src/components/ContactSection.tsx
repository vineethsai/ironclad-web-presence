
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
      duration: 5000,
    });
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-cyber-blue mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            Have a security concern or interested in my services? Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Email</h4>
                  <a href="mailto:contact@cybersecurity-expert.com" className="text-gray-300 hover:text-cyber-blue transition-colors">
                    contact@cybersecurity-expert.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Phone</h4>
                  <a href="tel:+1234567890" className="text-gray-300 hover:text-cyber-blue transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-cyber-blue/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-cyber-blue" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Location</h4>
                  <p className="text-gray-300">
                    San Francisco, CA, United States
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-cyber-blue/20">
              <h4 className="text-xl font-semibold text-white mb-4">Available For</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Security Consulting</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Penetration Testing</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Security Training</span>
                <span className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue">Speaking Engagements</span>
              </div>
            </div>
          </div>

          <div className="bg-cyber-grey rounded-lg p-8 border border-cyber-blue/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your Name" 
                    required 
                    className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-white">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Subject" 
                  required 
                  className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-white">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Your Message" 
                  rows={6} 
                  required 
                  className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                />
              </div>

              <Button type="submit" className="w-full cyber-button flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
