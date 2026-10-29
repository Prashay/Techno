const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

const sectionsData = [
  {
    id: "section-01",
    num: "01",
    title: "Career story & transitions",
    theme: "Build a positive narrative around your early upskilling, your move to CGI, and your growth ambitions at Lowe's.",
    badgeClass: "badge-career",
    questions: [
      {
        num: "Q01",
        q: "Tell me about yourself.",
        spoken: "Sure. I'm a backend software engineer with over eight years of experience, primarily working with Java, Spring Boot, microservices, and distributed systems.\n\nI started my career at STIXIS and later worked with CGI, HCLTech, IBM, and currently Lowe's India.\n\nAt Lowe's, I'm working on enterprise retail platforms where I contribute to backend architecture, microservices development, code reviews, and mentoring eight engineers. One of my key achievements was reducing API p99 latency from eight seconds to around 170 milliseconds using distributed Redis caching.\n\nI've also worked with Kafka, PostgreSQL, Kubernetes, Azure, and CI/CD technologies. Alongside backend development, I've gained production experience with AI agents and MCP integrations.\n\nAt this stage, I'm looking for an opportunity where I can contribute hands-on while taking greater technical ownership and progressing toward a stronger technical leadership role."
      },
      {
        num: "Q02",
        q: "Why did you leave STIXIS after just six months?",
        spoken: "STIXIS was my first professional experience, where I worked on developing a customer-facing B2B portal. During that time, I was also upgrading my skills by completing a course focused on Java, Spring Boot, and microservices.\n\nAfter completing that training, I explored opportunities through off-campus recruitment and successfully secured a position at CGI. CGI offered me the opportunity to work on enterprise banking applications, which aligned with my career interests.\n\nI subsequently spent nearly three years there, so that early move was an important step in building my long-term career in Java backend development."
      },
      {
        num: "Q03",
        q: "Why did you join CGI?",
        spoken: "After completing my Java, Spring Boot, and microservices training, I wanted to apply those skills in an enterprise development environment.\n\nI cleared CGI's off-campus recruitment process and received an opportunity to work on banking applications. It was a valuable transition because I gained experience working with Java backend systems, REST APIs, enterprise business logic, and production support."
      },
      {
        num: "Q04",
        q: "Why is there a gap between STIXIS and CGI?",
        spoken: "My STIXIS employment ended in August 2018, and I joined CGI in November 2018 after clearing the off-campus recruitment process.\n\nDuring that transition period, I was [explain your actual activities during September and October 2018].",
        note: "Confirm the real reason for the September-October 2018 interval. Do not invent training, interviews, or any other activity."
      },
      {
        num: "Q05",
        q: "Why have you changed companies multiple times?",
        spoken: "My career moves have helped me develop experience across different enterprise domains and backend technologies.\n\nAt CGI, I spent nearly three years working on banking applications. At HCLTech, I worked on mobility-related microservices, and at IBM, I gained experience leading engineers and developing a Kubernetes-based CI/CD platform.\n\nCurrently, at Lowe's, my responsibilities include distributed systems, technical leadership, and production ownership. Each experience has contributed to my technical development.\n\nAt this stage, I'm looking for greater alignment between my responsibilities, career progression, and compensation, with the intention of building a longer-term career in the right organization."
      },
      {
        num: "Q06",
        q: "Why do you want to leave Lowe's before completing two years?",
        spoken: "I've had a positive experience at Lowe's and learned a lot while working on large-scale distributed systems.\n\nI'm currently involved in backend architecture, mentoring engineers, reviewing code, and leading feature development. Over time, my responsibilities have grown beyond my current Senior Software Engineer designation.\n\nAt this stage of my career, I'm looking for an opportunity where my technical responsibilities, professional growth, designation, and compensation are better aligned.\n\nSo my decision isn't based on any negative experience. I'm looking for the right long-term opportunity to continue growing."
      },
      {
        num: "Q07",
        q: "Why can't you get career growth at Lowe's?",
        spoken: "Lowe's has provided me with good learning opportunities, and I genuinely value my experience here.\n\nHowever, while exploring my next career step, I want to consider opportunities that offer a stronger progression path, greater architectural ownership, and compensation aligned with my responsibilities.\n\nI believe exploring external opportunities is a reasonable part of career planning, provided the decision is thoughtful and based on long-term goals."
      },
      {
        num: "Q08",
        q: "Have you discussed your promotion with your manager?",
        conditional: {
          label: "Choose depending on your real situation:",
          branches: [
            {
              tag: "IF YES (Discussed)",
              text: "Yes, I've had discussions about my responsibilities and career development. I understand that promotions depend on organizational requirements, available opportunities, and internal processes. Meanwhile, I'm also exploring roles where the responsibilities and progression path align with my career objectives."
            },
            {
              tag: "IF NO (Not yet discussed)",
              text: "I haven't had a formal promotion discussion yet, although my responsibilities have grown considerably. I'm evaluating my career direction and exploring opportunities where I can take greater technical ownership."
            }
          ]
        },
        note: "Use only the version that matches your actual discussion with your manager."
      },
      {
        num: "Q09",
        q: "If Lowe's offers you a promotion or counteroffer, will you stay?",
        spoken: "I value my current organization, and I would certainly treat any internal opportunity respectfully.\n\nHowever, my decision to explore new roles is based on several factors, including technical responsibilities, career progression, long-term growth, and compensation.\n\nI don't want to make a career decision based only on a counteroffer. If I accept an external opportunity, it would be after carefully evaluating the role and my long-term career goals."
      },
      {
        num: "Q10",
        q: "Why should we believe you will stay with us long-term?",
        spoken: "I understand your concern.\n\nIf you look at my experience, I spent nearly three years at CGI and have consistently developed my expertise in enterprise Java backend engineering.\n\nAt this stage, I have a clear understanding of the type of role I want: hands-on technical work, architecture ownership, and opportunities to grow as a technical leader.\n\nI'm not looking to change organizations frequently. I'm evaluating opportunities carefully because I want to find an environment where I can contribute and grow over the long term."
      },
      {
        num: "Q11",
        q: "What if we offer the same Senior Software Engineer designation?",
        spoken: "I'm open to the same designation if the role provides the right technical challenges, responsibilities, and opportunities for growth.\n\nFor me, career progression isn't only about the title. It also involves technical ownership, architectural responsibilities, the complexity of systems, opportunities to mentor engineers, and compensation.\n\nIf the role aligns with those expectations and offers a clear growth path, I'd definitely be interested."
      },
      {
        num: "Q12",
        q: "Why do you want to join our organization?",
        spoken: "I'm interested in this opportunity because the role aligns closely with my core experience in Java, Spring Boot, microservices, and distributed systems.\n\nI'm looking for an environment where I can work on challenging backend systems, take ownership of important features, and contribute to engineering decisions.\n\nI'd also like to understand your technical roadmap and team responsibilities because those are important factors in my long-term career decision.",
        note: "For a real interview, add a specific, verified reason about that employer or team."
      }
    ]
  },
  {
    id: "section-02",
    num: "02",
    title: "Java expertise & technical leadership",
    theme: "Reinforce that Java backend engineering is your core specialization and support leadership claims with your real project experience.",
    badgeClass: "badge-tech",
    questions: [
      {
        num: "Q13",
        q: "We're hiring for Java and microservices only. Are you comfortable without AI work?",
        spoken: "Absolutely. My core expertise is Java backend development, and that's where I've spent most of my professional career.\n\nI've worked with Java 8, Java 17, and Java 21, along with Spring Boot, REST APIs, Kafka, Redis, and distributed systems.\n\nAlthough I've gained additional experience with AI agents and MCP, I consider those complementary skills. I genuinely enjoy backend engineering, particularly solving challenges related to system performance, scalability, reliability, and architecture.\n\nSo I'm completely comfortable with a role focused entirely on Java and microservices."
      },
      {
        num: "Q14",
        q: "If you're interested in AI, won't you leave for an AI role later?",
        spoken: "I see AI as an additional capability rather than a replacement for backend engineering.\n\nEven AI-driven enterprise applications require secure APIs, scalable microservices, databases, event-driven systems, and reliable backend infrastructure.\n\nMy primary professional strength remains Java backend engineering. I want to continue developing that expertise, regardless of whether the application includes AI functionality."
      },
      {
        num: "Q15",
        q: "You are a Senior Software Engineer. How are you already performing technical lead responsibilities?",
        spoken: "Although my official designation is Senior Software Engineer, my responsibilities include mentoring eight engineers, participating in backend architecture decisions, conducting code reviews, and coordinating feature delivery.\n\nI remain hands-on with implementation while supporting the team with technical decisions, code quality, and production issues.\n\nThis combination of individual technical contribution and team mentorship has helped me develop leadership capabilities."
      },
      {
        num: "Q16",
        q: "Do you prefer hands-on coding or management?",
        spoken: "My preference is hands-on technical leadership.\n\nI enjoy designing and implementing backend systems, reviewing code, solving difficult technical problems, and mentoring engineers.\n\nI don't want to move into a purely people-management role at this stage. I want to continue contributing technically while taking ownership of system design and delivery."
      },
      {
        num: "Q17",
        q: "Tell me about your biggest achievement at Lowe's.",
        spoken: "One of my significant achievements was improving the performance of our inventory and lookup APIs.\n\nWe were experiencing high tail latency, with p99 response times reaching approximately eight seconds. I worked on implementing distributed Redis caching, which helped reduce p99 latency to approximately 170 milliseconds.\n\nThis was an important improvement in application responsiveness and backend performance. It also reinforced the importance of measuring performance and choosing suitable architectural optimizations."
      },
      {
        num: "Q18",
        q: "How many engineers have you led?",
        spoken: "At Lowe's, I've mentored eight engineers and contributed to architecture, code reviews, and technical delivery.\n\nPreviously, at IBM, I led a team of ten engineers working on a Kubernetes-based CI/CD control plane.\n\nMy leadership approach focuses on remaining technically involved while helping engineers deliver maintainable, reliable solutions."
      },
      {
        num: "Q19",
        q: "How do you handle disagreements during code review?",
        spoken: "I try to keep technical discussions objective and focused on engineering requirements.\n\nI first understand the reasoning behind the proposed implementation. Then I evaluate aspects such as maintainability, performance, security, testing, and consistency with our architecture.\n\nIf there are multiple valid approaches, I prefer discussing the trade-offs and agreeing on a solution based on technical evidence. My goal is to maintain code quality while supporting constructive collaboration."
      },
      {
        num: "Q20",
        q: "How do you handle production incidents?",
        spoken: "My first priority is to understand the impact and restore service stability.\n\nI start by checking monitoring dashboards, logs, error patterns, and the affected services. I coordinate with the relevant engineers to identify the issue and determine the safest mitigation.\n\nAfter service recovery, I focus on root-cause analysis and preventive improvements. At Lowe's, I've worked on production incident response and monitoring using Grafana, Kibana, and Prometheus."
      },
      {
        num: "Q21",
        q: "Tell me about handling high transaction volumes.",
        spoken: "At Lowe's, I was involved in supporting production operations during the Black Friday and Cyber Monday event.\n\nThe retail platform processed approximately 2.3 million transactions across the entire event. My responsibilities included on-call incident response and supporting the reliability of backend services.\n\nThis gave me valuable experience working with business-critical systems where monitoring, incident coordination, and reliability are especially important."
      },
      {
        num: "Q22",
        q: "What is your biggest technical strength?",
        spoken: "My biggest strength is solving backend engineering problems with a practical and structured approach.\n\nI have experience developing Java microservices, working with distributed systems, improving API performance, and handling production issues.\n\nI also bring the ability to mentor engineers and contribute to architectural decisions while remaining hands-on with implementation."
      },
      {
        num: "Q23",
        q: "What is one area you want to improve?",
        spoken: "I want to continue deepening my expertise in large-scale distributed system architecture.\n\nAlthough I already work with microservices, Kafka, Redis, and production systems, I believe there's always room to improve in areas such as resilience, system design trade-offs, and performance engineering.\n\nI actively try to improve through hands-on implementation, architecture discussions, and continuous learning."
      },
      {
        num: "Q24",
        q: "Why should we hire you?",
        spoken: "I believe I bring a combination of strong Java backend engineering experience, production ownership, and technical leadership capabilities.\n\nI've worked with Spring Boot microservices, distributed systems, Kafka, Redis, and enterprise applications across multiple domains.\n\nI've also delivered measurable improvements in performance and engineering quality, while mentoring teams and supporting production systems.\n\nI can contribute hands-on from the beginning and also support technical design, code quality, and team delivery as responsibilities grow."
      }
    ]
  },
  {
    id: "section-03",
    num: "03",
    title: "Compensation, offers & logistics",
    theme: "Stay consistent on current CTC, communicate a reasoned expectation, and ask for fixed-versus-variable details.",
    badgeClass: "badge-salary",
    questions: [
      {
        num: "Q25",
        q: "What is your current CTC?",
        spoken: "My current total CTC is ₹29 LPA, which includes ₹26.5 LPA fixed compensation and ₹2.5 LPA variable pay."
      },
      {
        num: "Q26",
        q: "What is your expected CTC?",
        spoken: "Considering my eight-plus years of experience, technical responsibilities, and expertise in Java microservices and distributed systems, I'm targeting approximately ₹40 to ₹42 LPA.\n\nHowever, I'm open to discussing the overall package depending on the role's responsibilities, fixed compensation, and career growth opportunities."
      },
      {
        num: "Q27",
        q: "You're expecting almost a 40-45% hike. Why?",
        spoken: "I understand that it's a significant increase compared to my current compensation.\n\nHowever, my expectation is based on the responsibilities and experience I bring rather than only a percentage increase. My current role includes backend architecture, mentoring engineers, feature delivery, performance optimization, and production ownership.\n\nI've also worked on measurable improvements in API performance and engineering quality. I'm looking for compensation that reflects my experience and the responsibilities of the new role.\n\nThat said, I'm open to a reasonable discussion based on your compensation structure."
      },
      {
        num: "Q28",
        q: "Why should we pay ₹40-42 LPA for your experience?",
        spoken: "I believe the value I bring goes beyond implementing assigned development tasks.\n\nI've contributed to designing distributed backend systems, improving API performance, reviewing and maintaining code quality, mentoring engineers, and supporting production applications.\n\nFor example, at Lowe's, I contributed to reducing API p99 latency from eight seconds to 170 milliseconds and improving automated testing coverage from 46% to 80%.\n\nI believe these experiences position me to contribute to both technical delivery and engineering quality. I'm open to discussing the package based on the scope and expectations of the role."
      },
      {
        num: "Q29",
        q: "Our maximum budget is ₹35 LPA. Are you comfortable?",
        spoken: "Thank you for sharing the budget.\n\nI'm genuinely interested in the opportunity, particularly because of its alignment with my Java and microservices experience. My current expectation is closer to ₹40 LPA, considering the responsibilities and my experience.\n\nWould there be any flexibility in the fixed compensation or overall package? I'd be happy to understand the full compensation structure before making a decision."
      },
      {
        num: "Q30",
        q: "Is compensation more important than career growth?",
        spoken: "I consider both important.\n\nA challenging technical role with meaningful responsibilities and a clear progression path is essential for my long-term career. At the same time, I believe compensation should be reasonably aligned with the responsibilities and experience expected from the position.\n\nI'm looking for the right balance rather than prioritizing only one factor."
      },
      {
        num: "Q31",
        q: "What is your minimum expected salary?",
        spoken: "I'd prefer to evaluate the overall offer rather than commit to an absolute minimum upfront.\n\nMy current target is around ₹40-42 LPA, but I'm happy to discuss the fixed component, role responsibilities, and long-term opportunities before making a decision."
      },
      {
        num: "Q32",
        q: "Are you comfortable with variable compensation?",
        spoken: "Yes, I'm open to a reasonable variable component.\n\nHowever, I would prefer a strong fixed component, since that provides more predictable compensation.\n\nI'd also like to understand how variable pay is determined and whether it depends on individual performance, company performance, or both."
      },
      {
        num: "Q33",
        q: "Do you currently have any other offers?",
        conditional: {
          label: "Choose depending on your real situation:",
          branches: [
            {
              tag: "IF NO OFFER",
              text: "I'm actively exploring opportunities, but I don't have a confirmed offer at this stage. My priority is finding a role that aligns with my technical experience and career goals."
            },
            {
              tag: "IF YOU HAVE AN OFFER",
              text: "Yes, I'm evaluating another opportunity as well. However, I'm looking at each role based on responsibilities, technical alignment, compensation, and long-term career growth rather than making a decision only on salary."
            }
          ]
        },
        note: "Choose the truthful version based on your actual offer status."
      },
      {
        num: "Q34",
        q: "What is your notice period?",
        spoken: "My official notice period is [insert the notice period stated in your employment agreement].\n\nIf selected, I'll ensure a professional transition and proper knowledge transfer. I'll also discuss the joining timeline with my current organization if an earlier release is needed.",
        note: "Confirm your official notice period before the interview."
      },
      {
        num: "Q35",
        q: "Are you comfortable with hybrid working?",
        spoken: "Yes, I'm comfortable with a hybrid work environment.\n\nI believe in-person collaboration is valuable for architecture discussions, technical planning, mentoring, and team coordination.\n\nI'm also comfortable working independently and collaborating with distributed teams. I'd be happy to understand the office location and required number of in-office days.",
        note: "Use this only if you can meet the actual office attendance and location requirements."
      },
      {
        num: "Q36",
        q: "Are you willing to relocate?",
        spoken: "Yes, I'm open to relocation for the right opportunity.\n\nMy decision would depend on the work location, responsibilities, compensation, and overall career prospects. I'm flexible and willing to discuss relocation requirements."
      },
      {
        num: "Q37",
        q: "When can you join?",
        spoken: "I would be able to join after completing my contractual notice period and handing over my current responsibilities professionally.\n\nOnce we reach the offer stage, I can discuss the joining timeline and explore whether any flexibility is possible."
      },
      {
        num: "Q38",
        q: "Do you have any questions for us?",
        spoken: "Yes, thank you. I'd like to understand a few things about this opportunity:\n\n1. What are the main technical challenges the team is currently working on?\n2. How much ownership would this role have in architecture and technical decision-making?\n3. What does the career progression path look like for a Senior Software Engineer who demonstrates technical leadership?\n4. And finally, how do you measure success for someone in this role during the first six months?"
      }
    ]
  },
  {
    id: "section-04",
    num: "04",
    title: "Competing-offer scenarios",
    theme: "Use this section if you genuinely have another offer. Be transparent about the status, terms, deadlines, and decisions; never bluff.",
    badgeClass: "badge-offer",
    questions: [
      {
        num: "Q39",
        q: "You already have an offer. Why are you still looking for other opportunities?",
        spoken: "Yes, I currently have an offer, and I'm grateful for that opportunity. However, I'm not making a career decision based only on the first offer I receive or on compensation alone.\n\nAt this stage, I want the right combination of technical responsibilities, career progression, organizational stability, and compensation. My core expertise is Java, Spring Boot, microservices, and distributed systems, so meaningful technical ownership matters to me.\n\nThat's why I'm evaluating opportunities carefully before making a final decision. If your role aligns well with my goals, I would absolutely consider it seriously.",
        note: "Use this only if you actually hold an offer. If you don't, use the honest 'no confirmed offer' answer in Q33."
      },
      {
        num: "Q40",
        q: "If your other offer is ₹40 LPA, why should we offer you more?",
        spoken: "I appreciate that compensation is important, but I'm not trying to create a bidding competition. I evaluate roles based on engineering challenges, responsibilities, growth opportunities, and the overall compensation structure.\n\nIf the role is a strong match, I'd be happy to discuss a competitive package that is appropriate for its scope and expectations.",
        note: "The ₹40 LPA figure is a hypothetical interviewer question, not a claim about your actual offer. Never invent or inflate a competing offer."
      },
      {
        num: "Q41",
        q: "If we match your existing offer, would you choose us?",
        spoken: "Yes, I would definitely consider your opportunity. If compensation is comparable, my decision would depend on the technical ownership, the systems I'd be working on, the team's engineering culture, and the long-term growth path.\n\nI'd want to make a well-informed commitment rather than choose based only on the number in the offer letter."
      },
      {
        num: "Q42",
        q: "Are you using our offer to negotiate with another company?",
        spoken: "I'm evaluating opportunities seriously because I want to make the right long-term move. I'm interested in the role itself, not just in collecting offers.\n\nMy decision would be based on the complete opportunity - the technical scope, team, career progression, and compensation - and I'd communicate my decision professionally and within the agreed timeline.",
        note: "Do not categorically deny negotiating if you are in fact using offers for that purpose. Be truthful about your process."
      },
      {
        num: "Q43",
        q: "Have you already accepted your other offer?",
        conditional: {
          label: "Choose depending on your real situation:",
          branches: [
            {
              tag: "IF NOT ACCEPTED",
              text: "I haven't accepted it yet. I'm reviewing the opportunity and its terms before making a final commitment."
            },
            {
              tag: "IF ACCEPTED",
              text: "Yes, I've accepted an offer, but I'm still reassessing whether it's the right long-term fit. I recognize the commitment involved, so I'm handling this carefully and would make any decision transparently and professionally."
            }
          ]
        },
        note: "Use only the version matching the real status. Never claim you have not accepted if you already have."
      },
      {
        num: "Q44",
        q: "What is the offered CTC, which company is it from, and what is your joining date?",
        spoken: "I can share the relevant details of the offer and my availability accurately. The offered total CTC is [actual amount], with [actual fixed/variable breakdown], and the proposed joining date is [actual date].\n\nRegarding the company name, I'd prefer to keep the other employer's identity confidential at this stage, if that's acceptable. I'm happy to focus on my expectations, availability, and genuine interest in this role.",
        note: "Fill in only verified offer terms. If comfortable sharing the employer's name, you may do so. If you have not received an offer, say that instead."
      },
      {
        num: "Q45",
        q: "Can you share your offer letter, and how long do you have to decide?",
        spoken: "I understand why you're asking. I can discuss the genuine offer terms and the date by which I need to respond. My current decision deadline is [actual date].\n\nI'd prefer not to circulate another employer's confidential offer letter during an early discussion, but I'm happy to understand what verification your process requires at a later stage. Could you also share the expected timeline for your interview and offer process?",
        note: "Do not share confidential or personal documents unless you are comfortable and permitted to do so. Give a real deadline, not one invented to pressure a recruiter."
      }
    ]
  }
];

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderQuestionCard(qObj, sec) {
  let contentHtml = '';
  
  if (qObj.conditional) {
    const tabsHeader = qObj.conditional.branches.map((b, i) => `
      <button class="branch-pill-btn ${i === 0 ? 'active' : ''}" data-branch-target="${qObj.num}-b${i}">
        ${escapeHtml(b.tag)}
      </button>
    `).join('');

    const tabsBody = qObj.conditional.branches.map((b, i) => `
      <div class="branch-tab-content ${i === 0 ? 'active' : ''}" id="${qObj.num}-b${i}">
        <div class="spoken-quote-bubble">
          <div class="quote-header">
            <span class="quote-voice-tag"><i class="ti-microphone mr-1"></i> Spoken Response (${escapeHtml(b.tag)})</span>
            <button class="btn-copy-quote" data-copy-text="${escapeHtml(b.text)}" title="Copy to clipboard">
              <i class="ti-files mr-1"></i> Copy
            </button>
          </div>
          <p class="quote-text">${escapeHtml(b.text).replace(/\n\n/g, '</p><p class="quote-text">')}</p>
        </div>
      </div>
    `).join('');

    contentHtml = `
      <div class="conditional-answer-box">
        <div class="conditional-label">
          <i class="ti-split-v mr-1"></i> ${escapeHtml(qObj.conditional.label)}
        </div>
        <div class="branch-pills-row">
          ${tabsHeader}
        </div>
        <div class="branch-panels-wrap">
          ${tabsBody}
        </div>
      </div>
    `;
  } else if (qObj.spoken) {
    contentHtml = `
      <div class="spoken-quote-bubble">
        <div class="quote-header">
          <span class="quote-voice-tag"><i class="ti-microphone mr-1"></i> Suggested Spoken Answer</span>
          <button class="btn-copy-quote" data-copy-text="${escapeHtml(qObj.spoken)}" title="Copy to clipboard">
            <i class="ti-files mr-1"></i> Copy
          </button>
        </div>
        <p class="quote-text">${escapeHtml(qObj.spoken).replace(/\n\n/g, '</p><p class="quote-text">')}</p>
      </div>
    `;
  }

  let noteHtml = '';
  if (qObj.note) {
    noteHtml = `
      <div class="prep-note-callout">
        <div class="prep-note-icon"><i class="ti-alert"></i></div>
        <div class="prep-note-body">
          <strong>PREPARATION NOTE:</strong> ${escapeHtml(qObj.note)}
        </div>
      </div>
    `;
  }

  return `
    <div class="col-12 mb-4 q-card-item" data-qnum="${qObj.num}" data-secid="${sec.id}">
      <div class="interview-q-card">
        <div class="q-card-header">
          <div class="q-num-pill">${qObj.num}</div>
          <div class="q-title-wrap">
            <span class="q-sec-badge ${sec.badgeClass}">${sec.num} &bull; ${escapeHtml(sec.title)}</span>
            <h3 class="q-heading">${escapeHtml(qObj.q)}</h3>
          </div>
        </div>
        <div class="q-card-body">
          ${contentHtml}
          ${noteHtml}
        </div>
      </div>
    </div>
  `;
}

let allCardsHtml = '';
for (const sec of sectionsData) {
  allCardsHtml += `
    <div class="section-anchor-wrap" id="${sec.id}">
      <div class="section-divider-banner">
        <div class="sec-banner-meta">
          <span class="sec-banner-num">SECTION ${sec.num}</span>
          <h2 class="sec-banner-title">${sec.title}</h2>
          <p class="sec-banner-theme"><i class="ti-light-bulb mr-1 text-warning"></i> ${sec.theme}</p>
        </div>
      </div>
      <div class="row">
        ${sec.questions.map(q => renderQuestionCard(q, sec)).join('\n')}
      </div>
    </div>
  `;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Personal Interview &amp; HR Playbook - Techno</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="Personalized HR Interview Questions &amp; Answers for Prashant Kumar Jha - Senior Java Backend Engineer &amp; Technical Lead. 45 curated questions, spoken answers, career transition narratives, and salary negotiation tactics.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="author" content="Prashant jha">
  <meta name="generator" content="Techno">
  <meta name="theme-name" content="Techno" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Poppins:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Plugins -->
  <link rel="stylesheet" href="plugins/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="plugins/slick/slick.css">
  <link rel="stylesheet" href="plugins/themify-icons/themify-icons.css">
  <link rel="stylesheet" href="plugins/animate/animate.css">
  <link rel="stylesheet" href="plugins/aos/aos.css">
  <link rel="stylesheet" href="plugins/venobox/venobox.css">

  <!-- Main Stylesheet -->
  <link href="css/style.css" rel="stylesheet">
  <link href="css/modern-opening.css" rel="stylesheet">

  <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
  <link rel="icon" href="images/favicon-16x16.png" type="image/x-icon">

  <style>
    :root {
      --hr-primary: #0284c7;
      --hr-primary-dark: #0369a1;
      --hr-amber: #f59e0b;
      --hr-emerald: #10b981;
      --hr-violet: #6366f1;
      --hr-rose: #f43f5e;
      --hr-slate: #0f172a;
      --hr-card-bg: #ffffff;
      --hr-border: #e2e8f0;
    }

    /* Executive Stats Header Ribbon */
    .executive-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 35px;
    }
    .exec-stat-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 20px 22px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
      position: relative;
      overflow: hidden;
      transition: all 0.25s ease;
    }
    .exec-stat-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
    }
    .exec-stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }
    .exec-stat-card.c-blue::before { background: linear-gradient(90deg, #0284c7, #38bdf8); }
    .exec-stat-card.c-violet::before { background: linear-gradient(90deg, #6366f1, #818cf8); }
    .exec-stat-card.c-emerald::before { background: linear-gradient(90deg, #10b981, #34d399); }
    .exec-stat-card.c-amber::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

    .exec-stat-val {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      font-family: 'Poppins', sans-serif;
      margin-bottom: 4px;
    }
    .exec-stat-label {
      font-size: 13.5px;
      font-weight: 700;
      color: #475569;
      margin-bottom: 2px;
    }
    .exec-stat-sub {
      font-size: 12px;
      color: #64748b;
    }

    /* Interactive Filter Bar */
    .playbook-control-bar {
      background: #ffffff;
      border-radius: 18px;
      padding: 16px 20px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }
    .search-input-wrap {
      position: relative;
      flex: 1 1 280px;
    }
    .search-input-wrap i {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 15px;
    }
    .playbook-search-input {
      width: 100%;
      padding: 10px 14px 10px 38px;
      border-radius: 12px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
      font-family: inherit;
      color: #0f172a;
      background: #f8fafc;
      transition: all 0.2s ease;
    }
    .playbook-search-input:focus {
      outline: none;
      background: #ffffff;
      border-color: #0284c7;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }
    .filter-pills-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .filter-tab-pill {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      color: #475569;
      padding: 7px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-tab-pill:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #cbd5e1;
    }
    .filter-tab-pill.active {
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }
    .filter-count-badge {
      display: inline-block;
      margin-left: 5px;
      padding: 1px 6px;
      font-size: 11px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.25);
    }
    .filter-tab-pill:not(.active) .filter-count-badge {
      background: #e2e8f0;
      color: #475569;
    }

    /* Section Banner */
    .section-anchor-wrap {
      margin-bottom: 40px;
    }
    .section-divider-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-radius: 16px;
      padding: 24px 28px;
      color: #ffffff;
      margin-bottom: 24px;
      box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
      position: relative;
      overflow: hidden;
    }
    .section-divider-banner::after {
      content: '';
      position: absolute;
      right: -30px;
      bottom: -30px;
      width: 140px;
      height: 140px;
      background: radial-gradient(circle, rgba(2, 132, 199, 0.25), transparent 70%);
      border-radius: 50%;
    }
    .sec-banner-num {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      padding: 3px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .sec-banner-title {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
      text-transform: capitalize;
    }
    .sec-banner-theme {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 0;
      line-height: 1.5;
    }

    /* Question Card */
    .interview-q-card {
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      padding: 24px 26px;
      transition: all 0.25s ease;
    }
    .interview-q-card:hover {
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
      border-color: #cbd5e1;
    }
    .q-card-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 18px;
    }
    .q-num-pill {
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      font-family: 'Fira Code', monospace;
      padding: 6px 12px;
      border-radius: 10px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
    }
    .q-title-wrap {
      flex: 1;
    }
    .q-sec-badge {
      display: inline-block;
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 8px;
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .badge-career { background: #e0f2fe; color: #0369a1; }
    .badge-tech { background: #ede9fe; color: #5b21b6; }
    .badge-salary { background: #fef3c7; color: #92400e; }
    .badge-offer { background: #fce7f3; color: #9d174d; }

    .q-heading {
      font-size: 19px;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.35;
      margin-bottom: 0;
    }

    /* Spoken Answer Bubble */
    .spoken-quote-bubble {
      background: linear-gradient(to right, #f8fafc, #ffffff);
      border-radius: 14px;
      border-left: 4px solid #0284c7;
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      padding: 18px 22px;
      margin-top: 10px;
    }
    .quote-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .quote-voice-tag {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #0284c7;
      display: inline-flex;
      align-items: center;
    }
    .btn-copy-quote {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-copy-quote:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .btn-copy-quote.copied {
      background: #10b981;
      color: #ffffff;
      border-color: #10b981;
    }
    .quote-text {
      font-size: 15px;
      line-height: 1.8;
      color: #1e293b;
      margin-bottom: 12px;
      font-weight: 450;
    }
    .quote-text:last-child {
      margin-bottom: 0;
    }

    /* Conditional branches */
    .conditional-answer-box {
      margin-top: 10px;
    }
    .conditional-label {
      font-size: 13px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .branch-pills-row {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }
    .branch-pill-btn {
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 700;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .branch-pill-btn.active {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
    }
    .branch-tab-content {
      display: none;
    }
    .branch-tab-content.active {
      display: block;
    }

    /* Preparation Note Callout */
    .prep-note-callout {
      margin-top: 14px;
      background: #fffbeb;
      border-radius: 12px;
      border: 1px solid #fde68a;
      padding: 12px 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .prep-note-icon {
      color: #d97706;
      font-size: 17px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .prep-note-body {
      font-size: 13.5px;
      color: #78350f;
      line-height: 1.55;
    }

    /* Section 05: Fact Sheet & Revision */
    .revision-box-hero {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
      border-radius: 20px;
      padding: 30px 32px;
      color: #ffffff;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(30, 27, 75, 0.2);
    }
    .revision-hero-title {
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .revision-pitch-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      padding: 20px 22px;
    }
    .revision-pitch-text {
      font-size: 16px;
      line-height: 1.8;
      color: #e0e7ff;
      margin-bottom: 14px;
      font-style: italic;
    }

    /* Avoid vs Say Table */
    .avoid-say-grid {
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      margin-bottom: 30px;
    }
    .avoid-say-table {
      width: 100%;
      border-collapse: collapse;
    }
    .avoid-say-table th {
      padding: 14px 20px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: #f8fafc;
      border-bottom: 2px solid #e2e8f0;
    }
    .avoid-say-table th.th-avoid { color: #dc2626; }
    .avoid-say-table th.th-say { color: #059669; }
    .avoid-say-table td {
      padding: 16px 20px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14.5px;
      line-height: 1.6;
    }
    .avoid-say-table tr:last-child td { border-bottom: none; }
    .avoid-pill {
      background: #fee2e2;
      color: #991b1b;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      margin-right: 8px;
    }
    .say-pill {
      background: #d1fae5;
      color: #065f46;
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 12px;
      margin-right: 8px;
    }

    /* Key Figures Table */
    .key-figures-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 30px;
    }
    .figure-pill-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 14px 16px;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
    }
    .figure-param {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .figure-val {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
    }

    /* Fact Sheet Form */
    .fact-sheet-card {
      background: #ffffff;
      border-radius: 18px;
      padding: 26px 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
      margin-bottom: 30px;
    }
    .fact-sheet-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .fact-sheet-sub {
      font-size: 13.5px;
      color: #64748b;
      margin-bottom: 22px;
    }
    .fact-form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
    .fact-field-label {
      font-size: 13px;
      font-weight: 700;
      color: #334155;
      margin-bottom: 6px;
      display: block;
    }
    .fact-input {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 14px;
      color: #0f172a;
      background: #f8fafc;
      transition: all 0.2s ease;
    }
    .fact-input:focus {
      outline: none;
      border-color: #0284c7;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }

    /* Checklist */
    .checklist-container {
      background: #f8fafc;
      border-radius: 14px;
      padding: 20px 22px;
      border: 1px solid #e2e8f0;
      margin-bottom: 30px;
    }
    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px dashed #e2e8f0;
    }
    .checklist-item:last-child { border-bottom: none; }
    .checklist-checkbox {
      width: 19px;
      height: 19px;
      accent-color: #10b981;
      margin-top: 3px;
      cursor: pointer;
    }
    .checklist-text {
      font-size: 14.5px;
      color: #1e293b;
      font-weight: 500;
      line-height: 1.5;
    }

    /* High Priority practice chips */
    .priority-chips-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    .priority-chip {
      background: #fef3c7;
      border: 1px solid #fde68a;
      color: #92400e;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .priority-chip:hover {
      background: #fde68a;
      color: #78350f;
      text-decoration: none;
      transform: translateY(-1px);
    }

    /* Toast */
    .playbook-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 30px;
      font-size: 13.5px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 99999;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .playbook-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    @media print {
      .header, .page-title-section, .playbook-control-bar, footer, .preloader, #techno-floating-app-hub {
        display: none !important;
      }
      .interview-q-card {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        page-break-inside: avoid;
      }
    }
  </style>
</head>

<body>
  <!-- preloader start -->
  <div class="preloader">
    <div class="ai-loader-container">
      <div class="ai-loader-orb">
        <div class="ai-ring ai-ring-1"></div>
        <div class="ai-ring ai-ring-2"></div>
        <div class="ai-core">
          <svg class="ai-spark-svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="url(#aiGrad)"/>
            <defs>
              <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7"/>
                <stop offset="50%" stop-color="#6366f1"/>
                <stop offset="100%" stop-color="#f59e0b"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div class="ai-loader-title">
        <span class="ai-sparkle">✦</span> Techno <span class="ai-badge">AI GUIDE</span>
      </div>
      <div class="ai-loader-bar">
        <div class="ai-loader-bar-fill"></div>
      </div>
      <div class="ai-loader-sub">Personalized HR Interview Playbook &bull; 2026</div>
    </div>
  </div>
  <!-- preloader end -->

<script>
  (function(){
    function dismissAiLoader(){
      var p = document.querySelector('.preloader');
      if (p) {
        p.classList.add('loaded');
        p.style.opacity = '0';
        p.style.pointerEvents = 'none';
        setTimeout(function(){ if (p && p.parentNode) p.parentNode.removeChild(p); }, 350);
      }
    }
    if (document.readyState === 'complete') {
      setTimeout(dismissAiLoader, 300);
    } else {
      window.addEventListener('load', function(){ setTimeout(dismissAiLoader, 300); });
      setTimeout(dismissAiLoader, 800);
    }
  })();
</script>

<!-- header -->
<header class="fixed-top header">
  <div class="navigation w-100">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <a class="navbar-brand" href="index.html"><img class="site-logo" src="images/logo.svg" alt="Techno"></a>
        <button class="navbar-toggler rounded-0" type="button" data-toggle="collapse" data-target="#navigation"
          aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav ml-auto text-center">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="backend.html">Backend</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="frontend.html">Frontend</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="cloud.html">Cloud</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="database.html">Database</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="ai.html">AI</a>
            </li>
            <li class="nav-item dropdown view">
              <a class="nav-link dropdown-toggle" href="programmin.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Interview program
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="ArrayPrograms.html">Array</a></li>
                <li><a class="dropdown-item" href="numberprograms.html">Numbers</a></li>
                <li><a class="dropdown-item" href="Stringprograms.html">String</a></li>
                <li><a class="dropdown-item" href="java8programs.html">Java8 Programs</a></li>
                <li><a class="dropdown-item" href="topicwiseprogram.html">Topicwise Programs</a></li>
                <li><a class="dropdown-item" href="personal-interview.html" style="color: #f59e0b; font-weight: 600;"><i class="ti-user mr-1"></i>Personal Interview</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown view active">
              <a class="nav-link dropdown-toggle" href="personal-interview.html" id="navbarDropdownPersonal" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Personal Interview
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownPersonal">
                <li><a class="dropdown-item" href="personal-interview.html">📋 Full HR Playbook</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-01">01. Career Story &amp; Transitions</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-02">02. Java &amp; Leadership</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-03">03. Salary &amp; Logistics</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-04">04. Competing Offers</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-05">05. Quick Revision &amp; Checklist</a></li>
              </ul>
            </li>
            <li class="nav-item @@contact">
              <a class="nav-link" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn-scanner-link" href="javascript:void(0)" style="color: #10b981 !important; font-weight: 700;"><i class="ti-mobile mr-1"></i>Mobile App</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</header>
<!-- /header -->

<!-- page title -->
<section class="page-title-section overlay" data-background="images/backgrounds/page-title.jpg">
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <ul class="list-inline custom-breadcrumb mb-2">
          <li class="list-inline-item"><a class="h2 text-primary font-secondary" href="index.html">Home</a></li>
          <li class="list-inline-item text-white h3 font-secondary nasted">Personal Interview Playbook</li>
        </ul>
        <h1 class="text-white font-weight-bold mb-2" style="font-size: 32px;">HR Interview Questions &amp; Answers</h1>
        <p class="text-lighten mb-0">Java &bull; Spring Boot &bull; Microservices &bull; Senior Software Engineer / Technical Lead</p>
        <div class="mt-2 text-warning" style="font-size: 13.5px; font-weight: 600;">
          <i class="ti-user mr-1"></i> Personalized Preparation for Prashant Kumar Jha &bull; 45 Verified Recruiter &amp; Hiring Manager Scripts
        </div>
      </div>
    </div>
  </div>
</section>
<!-- /page title -->

<!-- section -->
<section class="section-sm">
  <div class="container">

    <!-- Executive Highlights Cards -->
    <div class="executive-stats-grid">
      <div class="exec-stat-card c-blue">
        <div class="exec-stat-val">8+ Years</div>
        <div class="exec-stat-label">Java Backend Experience</div>
        <div class="exec-stat-sub">Spring Boot &bull; Microservices &bull; Distributed Systems</div>
      </div>
      <div class="exec-stat-card c-violet">
        <div class="exec-stat-val">8 / 10 Engineers</div>
        <div class="exec-stat-label">Mentorship &amp; Leadership</div>
        <div class="exec-stat-sub">8 at Lowe's India &bull; 10 at IBM Kubernetes Control Plane</div>
      </div>
      <div class="exec-stat-card c-emerald">
        <div class="exec-stat-val">₹29 LPA</div>
        <div class="exec-stat-label">Current Total CTC</div>
        <div class="exec-stat-sub">₹26.5L Fixed + ₹2.5L Variable Component (~9%)</div>
      </div>
      <div class="exec-stat-card c-amber">
        <div class="exec-stat-val">₹40–42 LPA</div>
        <div class="exec-stat-label">Suggested Opening Expectation</div>
        <div class="exec-stat-sub">Justified by API optimization (8s &rarr; 170ms) &amp; leadership</div>
      </div>
    </div>

    <!-- Important Guidance Alert -->
    <div class="alert alert-info border-0 shadow-sm rounded-lg mb-4" style="background: #f0f9ff; border-left: 4px solid #0284c7 !important; color: #0c4a6e;">
      <div class="d-flex align-items-center">
        <i class="ti-info-alt text-primary mr-3" style="font-size: 20px;"></i>
        <div style="font-size: 14px; line-height: 1.6;">
          <strong>Candidate Advisory:</strong> Some questions include conditional sample answers (such as promotion discussions or competing offer status). Use only statements that match your actual experience. The salary target is an informed opening negotiation position.
        </div>
      </div>
    </div>

    <!-- Interactive Control Bar -->
    <div class="playbook-control-bar">
      <div class="search-input-wrap">
        <i class="ti-search"></i>
        <input type="text" class="playbook-search-input" id="search-input" placeholder="Search questions (e.g. Lowe's, salary, Redis, STIXIS, AI, notice)...">
      </div>
      <div class="filter-pills-wrap">
        <button class="filter-tab-pill active" data-filter="all">
          All Questions <span class="filter-count-badge" id="count-all">45</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-01">
          01 Career Story <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-02">
          02 Java &amp; Leadership <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-03">
          03 Salary &amp; Logistics <span class="filter-count-badge">14</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-04">
          04 Competing Offers <span class="filter-count-badge">7</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-05">
          05 Revision &amp; Facts
        </button>
      </div>
      <div>
        <button class="btn btn-outline-primary btn-sm" id="btn-print-playbook" style="border-radius: 20px; font-weight: 600;">
          <i class="ti-printer mr-1"></i> Print / PDF
        </button>
      </div>
    </div>

    <!-- Sections 01 to 04 -->
    <div id="questions-container">
      ${allCardsHtml}
    </div>

    <!-- SECTION 05: Quick Revision Sheet & Interview Checklist -->
    <div class="section-anchor-wrap" id="section-05">
      <div class="section-divider-banner" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);">
        <div class="sec-banner-meta">
          <span class="sec-banner-num" style="color: #c7d2fe; background: rgba(199, 210, 254, 0.15);">SECTION 05</span>
          <h2 class="sec-banner-title">Quick revision sheet &amp; interview checklist</h2>
          <p class="sec-banner-theme"><i class="ti-check-box mr-1 text-success"></i> Review this page before the interview call; use the full answers only as a preparation guide.</p>
        </div>
      </div>

      <!-- 30-Second Positioning Statement -->
      <div class="revision-box-hero">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h3 class="revision-hero-title mb-0">
            <i class="ti-timer text-warning"></i> Your 30-Second Positioning
          </h3>
          <button class="btn btn-sm btn-light font-weight-bold" id="btn-copy-pitch" style="border-radius: 8px;">
            <i class="ti-files mr-1"></i> Copy Pitch
          </button>
        </div>
        <div class="revision-pitch-card">
          <p class="revision-pitch-text" id="pitch-text">
            &ldquo;I'm a hands-on Java backend engineer with over eight years of experience in Spring Boot, microservices, and distributed systems. At Lowe's, I support architecture, feature delivery, production reliability, and mentoring. I'm looking for long-term growth, technical ownership, and compensation aligned with my responsibilities.&rdquo;
          </p>
        </div>
      </div>

      <!-- Key Figures to Remember -->
      <div class="fact-sheet-card">
        <h4 class="fact-sheet-title mb-3"><i class="ti-stats-up text-primary mr-2"></i>Key Figures to Remember</h4>
        <div class="key-figures-grid">
          <div class="figure-pill-card">
            <span class="figure-param">Experience</span>
            <span class="figure-val">8+ Years</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Current Fixed CTC</span>
            <span class="figure-val">₹26.5 LPA</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Current Variable</span>
            <span class="figure-val">₹2.5 LPA (~9%)</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Current Total CTC</span>
            <span class="figure-val">₹29 LPA</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Negotiation Opening</span>
            <span class="figure-val text-primary">₹40–42 LPA</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Lowe's Mentorship</span>
            <span class="figure-val">8 Engineers</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">IBM Leadership</span>
            <span class="figure-val">10 Engineers</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">API p99 Latency Drop</span>
            <span class="figure-val text-success">8s &rarr; 170ms</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Automated Test Coverage</span>
            <span class="figure-val text-success">46% &rarr; 80%</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">BFCM Event Volume</span>
            <span class="figure-val">2.3M Transactions</span>
          </div>
          <div class="figure-pill-card">
            <span class="figure-param">Retail Platform Reach</span>
            <span class="figure-val">1,621 Stores</span>
          </div>
        </div>
      </div>

      <!-- What to Avoid vs Say Instead -->
      <div class="avoid-say-grid">
        <table class="avoid-say-table">
          <thead>
            <tr>
              <th class="th-avoid" style="width: 45%;"><i class="ti-close mr-1"></i> AVOID (Pitfall Phrasing)</th>
              <th class="th-say" style="width: 55%;"><i class="ti-check mr-1"></i> SAY INSTEAD (Winning Framing)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="avoid-pill">Avoid</span> &ldquo;I'm stuck at Lowe's.&rdquo;</td>
              <td><span class="say-pill">Say Instead</span> &ldquo;I'm looking for stronger career progression.&rdquo;</td>
            </tr>
            <tr>
              <td><span class="avoid-pill">Avoid</span> &ldquo;My salary is very low.&rdquo;</td>
              <td><span class="say-pill">Say Instead</span> &ldquo;I want compensation aligned with my responsibilities.&rdquo;</td>
            </tr>
            <tr>
              <td><span class="avoid-pill">Avoid</span> &ldquo;I just want a lead title.&rdquo;</td>
              <td><span class="say-pill">Say Instead</span> &ldquo;I want greater technical ownership and a clear growth path.&rdquo;</td>
            </tr>
            <tr>
              <td><span class="avoid-pill">Avoid</span> &ldquo;I'll never change jobs again.&rdquo;</td>
              <td><span class="say-pill">Say Instead</span> &ldquo;I'm evaluating opportunities with long-term growth in mind.&rdquo;</td>
            </tr>
            <tr>
              <td><span class="avoid-pill">Avoid</span> &ldquo;AI is my future; Java is fine.&rdquo;</td>
              <td><span class="say-pill">Say Instead</span> &ldquo;Java backend engineering remains my core expertise.&rdquo;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pre-Interview Checklist -->
      <div class="checklist-container">
        <h4 class="font-weight-bold text-dark mb-3"><i class="ti-clipboard text-primary mr-2"></i>Confirm Before an Actual Interview</h4>
        <div class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" id="chk-1">
          <label for="chk-1" class="checklist-text mb-0">1. What you were doing in September-October 2018 between STIXIS and CGI.</label>
        </div>
        <div class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" id="chk-2">
          <label for="chk-2" class="checklist-text mb-0">2. Whether you have formally discussed promotion with your current manager.</label>
        </div>
        <div class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" id="chk-3">
          <label for="chk-3" class="checklist-text mb-0">3. Your official notice period and realistic joining date.</label>
        </div>
        <div class="checklist-item">
          <input type="checkbox" class="checklist-checkbox" id="chk-4">
          <label for="chk-4" class="checklist-text mb-0">4. Your actual other-offer status, offer amount, acceptance, decision deadline and joining date.</label>
        </div>

        <div class="mt-4 pt-3 border-top">
          <span class="font-weight-bold text-dark d-block mb-2"><i class="ti-target text-danger mr-1"></i> Highest-Priority Practice Questions:</span>
          <div class="priority-chips-wrap">
            <a href="#section-01" class="priority-chip" data-jump="Q01">Q01 (Introduction)</a>
            <a href="#section-01" class="priority-chip" data-jump="Q02">Q02 (STIXIS Move)</a>
            <a href="#section-01" class="priority-chip" data-jump="Q06">Q06 (Lowe's Move)</a>
            <a href="#section-01" class="priority-chip" data-jump="Q09">Q09 (Counteroffer)</a>
            <a href="#section-01" class="priority-chip" data-jump="Q10">Q10 (Stability)</a>
            <a href="#section-02" class="priority-chip" data-jump="Q13">Q13 (Java-only Role)</a>
            <a href="#section-03" class="priority-chip" data-jump="Q26">Q26-Q27 (Salary Negotiation)</a>
            <a href="#section-04" class="priority-chip" data-jump="Q39">Q39-Q45 (Competing Offers)</a>
          </div>
        </div>
      </div>

      <!-- Interactive Personal Interview Fact Sheet -->
      <div class="fact-sheet-card">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <h4 class="fact-sheet-title mb-0"><i class="ti-id-badge text-primary mr-2"></i>Personal Interview Fact Sheet</h4>
          <span class="badge badge-success px-3 py-1" style="border-radius: 12px;"><i class="ti-save mr-1"></i> Auto-saves in browser</span>
        </div>
        <p class="fact-sheet-sub">Fill in your verified details before the interview call. Values are persisted automatically on your device.</p>

        <form id="fact-sheet-form">
          <div class="fact-form-row">
            <div>
              <label class="fact-field-label">STIXIS-to-CGI Gap Explanation:</label>
              <input type="text" class="fact-input" id="fs-gap" placeholder="e.g. Cleared CGI off-campus recruitment drive...">
            </div>
            <div>
              <label class="fact-field-label">Promotion Discussion Status:</label>
              <input type="text" class="fact-input" id="fs-promotion" placeholder="e.g. Discussed responsibilities / pending cycle...">
            </div>
          </div>

          <div class="fact-form-row">
            <div>
              <label class="fact-field-label">Official Notice Period:</label>
              <input type="text" class="fact-input" id="fs-notice" placeholder="e.g. 90 days / 60 days (negotiable to 30 days)">
            </div>
            <div>
              <label class="fact-field-label">Actual Offer Status:</label>
              <select class="fact-input" id="fs-offer-status">
                <option value="none">None (Actively exploring)</option>
                <option value="received">Received (Evaluating offer)</option>
                <option value="accepted">Accepted (Reassessing fit)</option>
              </select>
            </div>
          </div>

          <div class="fact-form-row">
            <div>
              <label class="fact-field-label">Offer CTC Breakdown (if held):</label>
              <input type="text" class="fact-input" id="fs-ctc" placeholder="e.g. Fixed: ₹36L, Variable: ₹4L, Total: ₹40L">
            </div>
            <div>
              <label class="fact-field-label">Offer Deadline / Joining Date:</label>
              <input type="text" class="fact-input" id="fs-deadline" placeholder="e.g. Decision deadline: Nov 15, Joining: Jan 02">
            </div>
          </div>

          <div class="fact-form-row">
            <div>
              <label class="fact-field-label">Hybrid Location / Office Days:</label>
              <input type="text" class="fact-input" id="fs-hybrid" placeholder="e.g. Bangalore / 3 days in office, 2 days remote">
            </div>
            <div>
              <label class="fact-field-label">Decision Priority Ranking:</label>
              <input type="text" class="fact-input" id="fs-rank" placeholder="e.g. 1. Architecture, 2. Hands-on Java, 3. Salary">
            </div>
          </div>
        </form>
      </div>

      <!-- Decision Matrix & Note -->
      <div class="alert alert-secondary border-0 rounded-lg p-4" style="background: #f8fafc; border: 1px solid #e2e8f0 !important; color: #475569;">
        <h5 class="font-weight-bold text-dark mb-2"><i class="ti-direction text-primary mr-1"></i> Decide Before the Interview: What Matters Most to You?</h5>
        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
          Rank the following factors for yourself to answer competing-offer questions consistently:
          <br><strong>(a)</strong> Hands-on Java engineering &bull; 
          <strong>(b)</strong> Architectural ownership &bull; 
          <strong>(c)</strong> Team culture &bull; 
          <strong>(d)</strong> Clear promotion path &bull; 
          <strong>(e)</strong> Fixed salary &bull; 
          <strong>(f)</strong> Work location.
        </p>
        <hr style="border-color: #cbd5e1;">
        <div style="font-size: 12.5px; color: #64748b; line-height: 1.6;">
          <strong>Source Note:</strong> Career dates, project descriptions, scope, and performance metrics are based on the candidate's verified professional profile. STIXIS training and compensation figures reflect personalized coaching data. Offer-related scripts are conditional coaching models to be adapted to verified circumstances.
        </div>
      </div>
    </div>

  </div>
</section>

<!-- Playbook Toast Notification -->
<div class="playbook-toast" id="playbook-toast">
  <i class="ti-check text-success"></i> <span id="toast-msg">Text copied to clipboard!</span>
</div>

<!-- footer -->
<footer class="bg-secondary">
  <div class="section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-sm-8 mb-5 mb-lg-0">
          <a class="logo-footer" href="index.html"><img class="img-fluid mb-4 site-logo" src="images/logo.svg" alt="Techno"></a>
          <p class="text-light">Curated technical interview notes, real-world coding problems, architecture playbooks, and HR negotiation strategies.</p>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
          <h4>COURSES</h4>
          <ul class="list-unstyled">
            <li class="mb-3"><a class="text-color" href="backend.html">Backend</a></li>
            <li class="mb-3"><a class="text-color" href="frontend.html">Frontend</a></li>
            <li class="mb-3"><a class="text-color" href="cloud.html">Cloud</a></li>
            <li class="mb-3"><a class="text-color" href="database.html">Database</a></li>
            <li class="mb-3"><a class="text-color" href="ai.html">AI</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
          <h4>PLAYBOOKS</h4>
          <ul class="list-unstyled">
            <li class="mb-3"><a class="text-color" href="personal-interview.html">Personal Interview</a></li>
            <li class="mb-3"><a class="text-color" href="springboot.html">Spring Boot</a></li>
            <li class="mb-3"><a class="text-color" href="microservice.html">Microservices</a></li>
            <li class="mb-3"><a class="text-color" href="java8theory.html">Java 8 Streams</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-5 mb-md-0">
          <h4>INTERVIEW PROGRAMS</h4>
          <ul class="list-unstyled">
            <li class="mb-3"><a class="text-color" href="Stringprograms.html">String</a></li>
            <li class="mb-3"><a class="text-color" href="ArrayPrograms.html">Array</a></li>
            <li class="mb-3"><a class="text-color" href="numberprograms.html">Number</a></li>
            <li class="mb-3"><a class="text-color" href="java8programs.html">Java 8 Programs</a></li>
            <li class="mb-3"><a class="text-color" href="topicwiseprogram.html">Topicwise Programs</a></li>
            <li class="mb-3"><a class="text-color" href="personal-interview.html">Personal Interview (HR)</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright-modern">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-sm-7 text-sm-left text-center">
          <p class="mb-0">Copyright &copy;
            <script>
              var CurrentYear = new Date().getFullYear()
              document.write(CurrentYear)
            </script> 
            , designed &amp; developed by <a href="https://jprashant.in" class="text-muted">Prashant jha</a>
          </p>
        </div>
        <div class="col-sm-5 text-sm-right text-center mt-3 mt-sm-0">
          <div class="social-icons-modern">
            <a href="https://github.com/Prashay"><i class="ti-github"></i></a>
            <a href="https://www.linkedin.com/in/prashant-jha-5b504b185/"><i class="ti-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<!-- /footer -->

<!-- jQuery -->
<script src="plugins/jQuery/jquery.min.js"></script>
<!-- Bootstrap JS -->
<script src="plugins/bootstrap/bootstrap.min.js"></script>
<!-- slick slider -->
<script src="plugins/slick/slick.min.js"></script>
<!-- aos -->
<script src="plugins/aos/aos.js"></script>
<!-- venobox popup -->
<script src="plugins/venobox/venobox.min.js"></script>

<!-- Main Scripts -->
<script src="js/script.js"></script>
<script src="js/online-compiler.js"></script>
<script src="js/jarvis-ai.js"></script>
<script src="js/suggest-questions.js"></script>
<script src="js/mobile-download.js"></script>

<!-- Interactive Logic for Personal Interview Page -->
<script>
  (function(){
    // 1. Toast Notification
    var toast = document.getElementById('playbook-toast');
    var toastMsg = document.getElementById('toast-msg');
    var toastTimer = null;

    function showToast(msg) {
      if (!toast) return;
      toastMsg.innerText = msg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function(){
        toast.classList.remove('show');
      }, 2800);
    }

    // 2. Copy Quote / Pitch
    document.addEventListener('click', function(e){
      var btn = e.target.closest('.btn-copy-quote');
      if (btn) {
        var text = btn.getAttribute('data-copy-text') || '';
        navigator.clipboard.writeText(text).then(function(){
          var origHtml = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = '<i class="ti-check mr-1"></i> Copied!';
          showToast('Answer copied to clipboard!');
          setTimeout(function(){
            btn.classList.remove('copied');
            btn.innerHTML = origHtml;
          }, 2000);
        });
      }

      var pitchBtn = e.target.closest('#btn-copy-pitch');
      if (pitchBtn) {
        var pitchText = document.getElementById('pitch-text').innerText.trim();
        navigator.clipboard.writeText(pitchText).then(function(){
          showToast('30-Second Positioning pitch copied!');
        });
      }

      // Branch Tab Pill switching
      var pill = e.target.closest('.branch-pill-btn');
      if (pill) {
        var targetId = pill.getAttribute('data-branch-target');
        var parentBox = pill.closest('.conditional-answer-box');
        if (parentBox) {
          parentBox.querySelectorAll('.branch-pill-btn').forEach(function(b){ b.classList.remove('active'); });
          parentBox.querySelectorAll('.branch-tab-content').forEach(function(c){ c.classList.remove('active'); });
          pill.classList.add('active');
          var targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.classList.add('active');
        }
      }

      // Priority Jump Chips
      var chip = e.target.closest('.priority-chip');
      if (chip) {
        var qNum = chip.getAttribute('data-jump');
        if (qNum) {
          var targetCard = document.querySelector('[data-qnum="' + qNum + '"]');
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.querySelector('.interview-q-card').style.outline = '3px solid #0284c7';
            setTimeout(function(){
              targetCard.querySelector('.interview-q-card').style.outline = 'none';
            }, 2500);
          }
        }
      }
    });

    // 3. Search & Filter
    var searchInput = document.getElementById('search-input');
    var filterPills = document.querySelectorAll('.filter-tab-pill');
    var currentFilter = 'all';

    function applyFilter() {
      var query = (searchInput.value || '').toLowerCase().trim();
      var qCards = document.querySelectorAll('.q-card-item');
      var visibleCount = 0;

      qCards.forEach(function(card){
        var secId = card.getAttribute('data-secid');
        var cardText = card.innerText.toLowerCase();

        var matchesSection = (currentFilter === 'all') || (secId === currentFilter);
        var matchesSearch = !query || cardText.indexOf(query) !== -1;

        if (matchesSection && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide section banners
      document.querySelectorAll('.section-anchor-wrap').forEach(function(secWrap){
        var secId = secWrap.id;
        if (secId === 'section-05') {
          secWrap.style.display = (currentFilter === 'all' || currentFilter === 'section-05') ? 'block' : 'none';
        } else {
          var anyVisible = secWrap.querySelectorAll('.q-card-item:not([style*="display: none"])').length > 0;
          secWrap.style.display = anyVisible ? 'block' : 'none';
        }
      });

      var countEl = document.getElementById('count-all');
      if (countEl) countEl.innerText = visibleCount;
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }

    filterPills.forEach(function(pill){
      pill.addEventListener('click', function(){
        filterPills.forEach(function(p){ p.classList.remove('active'); });
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        applyFilter();

        if (currentFilter !== 'all') {
          var anchor = document.getElementById(currentFilter);
          if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // 4. Print / PDF Button
    var printBtn = document.getElementById('btn-print-playbook');
    if (printBtn) {
      printBtn.addEventListener('click', function(){
        // Reset filters for full print
        filterPills.forEach(function(p){ p.classList.remove('active'); });
        var allPill = document.querySelector('[data-filter="all"]');
        if (allPill) allPill.classList.add('active');
        currentFilter = 'all';
        if (searchInput) searchInput.value = '';
        applyFilter();
        setTimeout(function(){ window.print(); }, 200);
      });
    }

    // 5. Fact Sheet Persistence with localStorage
    var factFields = ['fs-gap', 'fs-promotion', 'fs-notice', 'fs-offer-status', 'fs-ctc', 'fs-deadline', 'fs-hybrid', 'fs-rank'];
    factFields.forEach(function(id){
      var el = document.getElementById(id);
      if (el) {
        var saved = localStorage.getItem('techno_' + id);
        if (saved !== null) el.value = saved;
        el.addEventListener('input', function(){
          localStorage.setItem('techno_' + id, el.value);
        });
        el.addEventListener('change', function(){
          localStorage.setItem('techno_' + id, el.value);
        });
      }
    });

    // Checklist persistence
    ['chk-1', 'chk-2', 'chk-3', 'chk-4'].forEach(function(chkId){
      var chk = document.getElementById(chkId);
      if (chk) {
        var saved = localStorage.getItem('techno_' + chkId);
        if (saved === 'true') chk.checked = true;
        chk.addEventListener('change', function(){
          localStorage.setItem('techno_' + chkId, chk.checked ? 'true' : 'false');
        });
      }
    });

  })();
</script>

</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'personal-interview.html'), html, 'utf8');
console.log('Successfully generated personal-interview.html! Total length: ' + html.length + ' chars');
