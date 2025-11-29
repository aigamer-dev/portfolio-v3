// Contact information and form data
export const contactData = {
  title: "Get In Touch",
  subtitle: "Let's discuss your next project or opportunity",
  
  contactInfo: {
    email: "contact@example.com", // Replace with actual email
    phone: "+1 (555) 123-4567", // Replace with actual phone
    location: "India",
    availability: "Available for freelance and full-time opportunities"
  },
  
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername", // Replace with actual URL
      icon: "github"
    },
    {
      platform: "LinkedIn", 
      url: "https://linkedin.com/in/yourusername", // Replace with actual URL
      icon: "linkedin"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/yourusername", // Replace with actual URL  
      icon: "twitter"
    },
    {
      platform: "Email",
      url: "mailto:contact@example.com", // Replace with actual email
      icon: "email"
    }    
  ],
  
  formFields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      name: "email", 
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email address"
    },
    {
      name: "subject",
      label: "Subject",
      type: "text", 
      required: true,
      placeholder: "What's this about?"
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
      placeholder: "Tell me about your project or inquiry"
    }
  ],
  
  submitButton: {
    text: "Send Message",
    loadingText: "Sending...",
    successText: "Message Sent!"
  }
};
