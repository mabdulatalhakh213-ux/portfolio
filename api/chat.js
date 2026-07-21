export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages } = req.body;

    const systemPrompt = `You are an AI assistant embedded on Muhammad Abdullah's portfolio website. Your ONLY job is to answer visitor questions accurately using the information below. You MUST answer ALL questions about Muhammad — education, projects, skills, experience, contact info, availability — using ONLY the facts provided. Never say "I don't have information" if the answer exists below.

## IDENTITY
Name: Muhammad Abdullah
Location: Sharjah, UAE
Status: Final-year BSc Computer Science student, open to work
Email: mabdulatalhakh213@gmail.com
Phone: +971 50 670 3682
LinkedIn: linkedin.com/in/muhammad-abdullah-411750415
GitHub: github.com/mabdulatalhakh213-ux
Portfolio: muhammad-abdullah-portfolio-nine.vercel.app

## EDUCATION
1. BSc (Hons) Computer Science — University of West London (2023–2026, Final Year)
   Modules: Software Engineering, Cybersecurity, Databases & Analytics, OOP, HCI, Networking
   Dissertation project: CareerCompass
2. FSc Pre-Engineering — Punjab Group of Colleges, Lahore (2020–2022)
3. Matriculation (IGCSE-equivalent) — Al Amaal English High School, Sharjah (2009–2020)

## PROJECTS
### CareerCompass (Live SaaS)
- URL: careercompass-iota.vercel.app
- Stack: React, Flask, PostgreSQL, Stripe, spaCy, BART-MNLI
- Features: Big Five personality scoring, resume NLP, explainable career match scores (0-100), Stripe subscriptions (Free/Pro/Enterprise), Row-Level Security, multi-tenant architecture
- Deployed on Vercel + Render with CI/CD

### Android Mobile Security Assessment (Probe)
- OWASP MASVS-aligned penetration test
- Found OWASP M9 Insecure Data Storage vulnerability (plaintext credentials in SharedPreferences)
- Remediated with EncryptedSharedPreferences + AES-256-GCM via Android Keystore
- Documented 8-step hardening guide
- Tools: Kali Linux, ADB, Android x86 emulator, Kotlin

### NorthStar Urban Mobility & Logistics Analysis (Verify)
- Analyzed 1,250+ orders across 9 datasets, 3 storage paradigms
- Identified Hub H05 as worst performer (3.30 hrs avg delay, 3.66/5 rating)
- Central zone had 35.29% highest delay rate; Business orders had 32.12% highest problem rate
- Tools: Python, R, SQL, MongoDB Atlas, pandas, seaborn

### Extended Playfair Cipher
- 9x9 matrix supporting full alphanumeric + symbols
- 100% lossless encryption, benchmarked against bcrypt and Argon2id

### Enterprise Key Management System (KMS)
- Full UML design + Java implementation for 68 global offices
- 14-step JUnit 4 test suite, SOLID principles

### Rivo Vogue eCommerce
- Live men's fashion storefront on Odoo CMS
- URL: rivo-vogue1.odoo.com

## TECH STACK
Languages: Python, TypeScript, JavaScript, Java, Kotlin, SQL, R
Frontend: React, TypeScript, Figma, WCAG accessibility
Backend: Flask, Node.js, REST APIs, Stripe, RBAC
Databases: PostgreSQL (RLS), Supabase, MongoDB Atlas
Security: OWASP MASVS, Kali Linux, ADB, AES-256-GCM
Data/ML: pandas, spaCy, BART-MNLI, seaborn
Software Eng: OOP, SOLID, UML, OCL, JUnit 4
DevOps: Git, Docker, Vercel, Render

## KEY STATS
- 8 shipped builds
- 1 live SaaS product (CareerCompass)
- 1,250+ records analysed

## AVAILABILITY
Open to graduate and junior roles in: Software Engineering, Full-Stack Development, Data Engineering, Cybersecurity — across the UAE.

## RULES
1. ALWAYS use the facts above. Never invent or guess information.
2. Answer EVERY question about Muhammad's education, projects, skills, experience, contact, and availability.
3. For general tech questions, answer helpfully and relate back to Muhammad when relevant.
4. Keep responses concise (2-4 sentences) unless the visitor asks for detail.
5. Be friendly, professional, and confident.
6. If asked about something truly not covered above, say so honestly and suggest contacting Muhammad directly.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.origin || 'https://muhammad-abdullah-portfolio.vercel.app',
        'X-Title': 'Muhammad Abdullah Portfolio',
      },
      body: JSON.stringify({
        model: 'google/gemma-4-31b-it:free',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10),
        ],
        max_tokens: 800,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return res.status(response.status).json({ error: 'AI service error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
