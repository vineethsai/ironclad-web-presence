/**
 * SEO Helper functions for blog content
 */

/**
 * Tag mapping for internal linking
 * Maps common cybersecurity terms to their corresponding tag pages
 */
export const SEO_TAG_MAPPING: Record<string, string> = {
  'ai security': '/blog/tag/ai-security',
  'genai': '/blog/tag/genai',
  'generative ai': '/blog/tag/genai',
  'prompt injection': '/blog/tag/prompt-injection',
  'cloud security': '/blog/tag/cloud-security',
  'aws': '/blog/tag/aws',
  'big data': '/blog/tag/big-data',
  'security architecture': '/blog/tag/security-architecture',
  'enterprise security': '/blog/tag/enterprise-security',
  'data protection': '/blog/tag/data-protection',
  'zero trust': '/blog/tag/zero-trust',
  'cybersecurity': '/blog/tag/cybersecurity',
};

/**
 * Generates SEO-friendly slug from a string
 * @param text String to convert to slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Extracts keywords from content for SEO meta tags
 * @param content Blog post content
 * @param existingTags Existing tags to combine with
 */
export function extractKeywords(content: string, existingTags: string[] = []): string[] {
  const uniqueKeywords = new Set<string>(existingTags.map(tag => tag.toLowerCase()));
  
  // Common SEO keywords in cybersecurity
  const keywordPatterns = [
    /\bcybersecurity\b/gi,
    /\bsecurity architecture\b/gi,
    /\bcloud security\b/gi,
    /\bAWS\b/gi,
    /\bazure\b/gi,
    /\bgcp\b/gi,
    /\bsecurity controls\b/gi,
    /\bai security\b/gi,
    /\bgenerative ai\b/gi,
    /\bprompt injection\b/gi,
    /\bdata protection\b/gi,
    /\bcompliance\b/gi,
    /\bregulation\b/gi,
    /\bsecurity posture\b/gi,
    /\bthreat model\b/gi,
    /\bvulnerability\b/gi,
    /\bzero trust\b/gi,
    /\benterprise security\b/gi,
    /\bdata lake\b/gi,
    /\bbig data\b/gi,
  ];
  
  // Extract keywords from content
  keywordPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        uniqueKeywords.add(match.toLowerCase());
      });
    }
  });
  
  return Array.from(uniqueKeywords);
}

/**
 * Generates JSON-LD schema.org FAQ data from a markdown content with Q&A sections
 * @param content Markdown content with potential FAQ sections
 */
export function extractFAQSchema(content: string): {question: string, answer: string}[] | null {
  // Look for patterns like ## FAQ or ## Frequently Asked Questions
  const faqSectionRegex = /^##\s+(FAQ|Frequently Asked Questions)/mi;
  const faqSectionMatch = content.match(faqSectionRegex);
  
  if (!faqSectionMatch) return null;
  
  // Extract the FAQ section
  const faqSectionStart = faqSectionMatch.index || 0;
  const faqSection = content.substring(faqSectionStart);
  
  // Look for question and answer patterns
  // Typically questions are h3 (###) and answers are paragraphs
  const qaRegex = /###\s+(.+?)(?=\n)([^#]+?)(?=###|$)/gs;
  const faqs: {question: string, answer: string}[] = [];
  
  let match;
  while ((match = qaRegex.exec(faqSection)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  
  return faqs.length > 0 ? faqs : null;
}

/**
 * Creates auto-linking keywords in content for better internal linking
 * @param content HTML content to process
 */
export function createSeoLinks(content: string): string {
  let processedContent = content;
  
  // Process each keyword-to-tag mapping
  Object.entries(SEO_TAG_MAPPING).forEach(([keyword, tagUrl]) => {
    // Create a regex that matches the keyword but not if it's already in a link
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${keyword})\\b(?![^<]*<\\/a>)`, 'gi');
    
    // Replace instances with links, limiting to first occurrence only
    let replaced = false;
    processedContent = processedContent.replace(regex, (match) => {
      if (replaced) return match; // Only replace first occurrence
      replaced = true;
      return `<a href="${tagUrl}" class="text-cyber-green">${match}</a>`;
    });
  });
  
  return processedContent;
} 