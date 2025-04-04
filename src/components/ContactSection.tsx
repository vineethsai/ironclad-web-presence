
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create form data to send
      const formData = new FormData();
      formData.append('to_email', 'abcvineeth.sai@gmail.com');
      formData.append('from_name', data.name);
      formData.append('from_email', data.email);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      
      // Use emailjs-like service or formspree for serverless email sending
      const response = await fetch('https://formspree.io/f/abcvineeth.sai@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
      
      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon.",
          duration: 5000,
        });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-cyber-blue mx-auto"></div>
          <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
            Want to get a coffee? Feel free to reach out and I'll get back to you as soon as possible.
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
                  <a href="mailto:abcvineeth.sai@gmail.com" className="text-gray-300 hover:text-cyber-blue transition-colors">
                    abcvineeth.sai@gmail.com
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
                    New York, NY, United States
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Your Email" 
                            className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject" 
                          className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your Message" 
                          rows={6} 
                          className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue focus:ring-cyber-blue/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full cyber-button flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
