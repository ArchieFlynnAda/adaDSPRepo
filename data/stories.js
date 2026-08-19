/* ============================================================
   Ada Voices - seed persona database (mock DB)
   ------------------------------------------------------------
   15 seed personas for the MVP. All personas are fictional and
   written for demonstration; real stories enter the platform
   through POST /api/stories/submit with explicit GDPR consent
   (see design doc, content pipeline).

   Interim-content adaptation from the hackathon risk review:
   three personas carry campus:'London' so the wall launches
   with credible depth while the Manchester cohort grows.
   ============================================================ */
const STORIES = [
  {
    id:'maryam', ini:'M', name:'Maryam', age:17, borough:'Salford', route:'support', runtime:'2:14',
    quote:'I thought everyone would already know how to code and I\u2019d be the one falling behind.',
    now:'Cyber Security apprentice at HSBC',
    tags:['behind','women','firstfam','fit'],
    interests:['Cyber security','Keeping people safe online','GCSE Computer Science'],
    ch1:'I\u2019m from Salford and no one in my family had done anything in tech, so I genuinely thought I\u2019d turn up on day one and be the only person who didn\u2019t already know how to code. I almost didn\u2019t apply because of that.',
    ch1q:'Turns out half my class felt exactly the same. You\u2019re taught it from the start \u2014 nobody expects you to arrive knowing it.',
    ch2:'My placement was with a security team. Real work \u2014 not making tea. I shadowed people responding to actual threats, then started doing bits myself. It\u2019s the first time tech felt like something I could really do.',
    ch3:'I got a cyber security apprenticeship at HSBC straight out of my T Level. I\u2019m earning, I\u2019m still learning, and I\u2019m doing it five minutes from where I grew up.',
    path:[{t:'GCSEs in Salford',s:'incl. Computer Science',muted:true},{t:'Digital Support Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'security team'},{t:'Cyber apprentice',s:'HSBC',now:true}],
    parent:'Maryam went from a Salford comprehensive to a cyber security apprenticeship at HSBC \u2014 a paid, structured role with one of the world\u2019s biggest banks, with no university debt.'
  },
  {
    id:'daniel', ini:'D', name:'Daniel', age:18, borough:'Oldham', route:'build', runtime:'1:58',
    quote:'I was set on A Levels, because that\u2019s what everyone said was the \u201cproper\u201d route.',
    now:'Junior Developer at ClearScore',
    tags:['alevels'],
    interests:['Building apps','Front-end','Problem-solving'],
    ch1:'Everyone around me \u2014 teachers, family \u2014 talked about A Levels like they were the only serious option. I almost went that way without really thinking about whether I\u2019d enjoy it.',
    ch1q:'I didn\u2019t want to study three subjects I half-liked. I wanted to build things. So I took the risk.',
    ch2:'On placement I was committing real code to a real product. Scary at first, then addictive. I learned more in six weeks there than I\u2019d have guessed in a year.',
    ch3:'I\u2019m a junior developer at ClearScore now. The thing that felt like a gamble at 16 is the reason I\u2019ve got the job I wanted at 18.',
    path:[{t:'GCSEs in Oldham',s:'',muted:true},{t:'Production, Design & Development T Level',s:'Ada Manchester'},{t:'45-day placement',s:'product team'},{t:'Junior Developer',s:'ClearScore',now:true}],
    parent:'Daniel chose this route over A Levels and is now a junior developer at a well-known fintech \u2014 evidence that the technical route can lead straight to a skilled, paid job.'
  },
  {
    id:'aaliyah', ini:'A', name:'Aaliyah', age:17, borough:'Bolton', route:'analyse', runtime:'2:31',
    quote:'I didn\u2019t think a T Level could actually get me into a good university.',
    now:'Studying Data Science at Queen Mary, London',
    tags:['uni','women'],
    interests:['Data','Spotting patterns','Maths'],
    ch1:'I wanted to go to a good university, and I\u2019d heard T Levels \u201cdon\u2019t count\u201d for that. That nearly put me off completely.',
    ch1q:'I checked the actual UCAS points. They count. I just had to look past the rumours.',
    ch2:'I worked with real datasets on placement \u2014 finding patterns that changed what a team actually did. That\u2019s when data clicked for me as a career, not just a subject.',
    ch3:'I\u2019m now doing Data Science at Queen Mary in London. The T Level got me the points and a portfolio of real work to talk about in my application.',
    path:[{t:'GCSEs in Bolton',s:'',muted:true},{t:'Digital Business Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'data team'},{t:'BSc Data Science',s:'Queen Mary, London',now:true}],
    parent:'Aaliyah progressed from a T Level to a Data Science degree at Queen Mary, University of London \u2014 proof the route is compatible with strong university destinations.'
  },
  {
    id:'reece', ini:'R', name:'Reece', age:19, borough:'Wigan', route:'support', runtime:'1:47',
    quote:'Money was tight at home. I needed something that led to a real job, fast.',
    now:'IT Infrastructure at Airbus',
    tags:['money','lowincome'],
    interests:['Networks','Fixing things','Hardware'],
    ch1:'University meant three more years and a lot of debt my family couldn\u2019t take on. I needed a route that paid off quickly and didn\u2019t cost us.',
    ch1q:'The course is free, and the placement basically became a job interview. That mattered to us.',
    ch2:'I was on an infrastructure team keeping critical systems running. They trusted me with real tasks, and I realised I was good at staying calm when things broke.',
    ch3:'I work in IT infrastructure at Airbus now. No debt, earning, and doing something that genuinely matters.',
    path:[{t:'GCSEs in Wigan',s:'',muted:true},{t:'Digital Support Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'infrastructure team'},{t:'IT Infrastructure',s:'Airbus',now:true}],
    parent:'For families worried about cost, Reece\u2019s route was free and led directly to employment at Airbus \u2014 no tuition debt, earning early.'
  },
  {
    id:'priya', ini:'P', name:'Priya', age:18, borough:'Trafford', route:'analyse', runtime:'2:05',
    quote:'I\u2019m not a maths genius, so I assumed data wasn\u2019t for someone like me.',
    now:'Business Analyst apprentice at Deloitte',
    tags:['fit','women'],
    interests:['Data','Explaining things clearly','Business'],
    ch1:'I had this idea that data meant being brilliant at maths, and I\u2019m not. I nearly ruled the whole thing out before I understood what it actually involved.',
    ch1q:'It\u2019s less about being a genius and more about being curious and explaining what you find. That I could do.',
    ch2:'On placement I was the person turning messy numbers into something a team could actually use. Being able to explain it clearly turned out to be the valuable bit.',
    ch3:'I\u2019m a business analyst apprentice at Deloitte now \u2014 a job I\u2019d never have applied for if I\u2019d believed the \u201cyou have to be a maths genius\u201d thing.',
    path:[{t:'GCSEs in Trafford',s:'',muted:true},{t:'Digital Business Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'analytics team'},{t:'Business Analyst apprentice',s:'Deloitte',now:true}],
    parent:'Priya is a business analyst apprentice at Deloitte \u2014 a route into a leading professional-services firm without a traditional university-first path.'
  },
  {
    id:'jordan', ini:'J', name:'Jordan', age:17, borough:'Tameside', route:'build', runtime:'2:22',
    quote:'I\u2019m dyslexic, and I was scared I\u2019d struggle with all the written work.',
    now:'On a design placement at a Manchester studio',
    tags:['support-need','send'],
    interests:['Design','UX','Drawing'],
    ch1:'School had been hard because of my dyslexia, and I assumed any college course would be wall-to-wall essays. I thought I\u2019d be set up to fail.',
    ch1q:'I got a proper support plan and assistive tech from week one. For once the support was actually there before I had to ask twice.',
    ch2:'My placement was at a design studio, working on real interfaces. It\u2019s visual, hands-on work that plays to how my brain actually works.',
    ch3:'I\u2019m finishing a design placement at a Manchester studio and I\u2019m planning to keep going in UX. The support made the difference between dropping out and thriving.',
    path:[{t:'GCSEs in Tameside',s:'',muted:true},{t:'Production, Design & Development T Level',s:'Ada Manchester'},{t:'45-day placement',s:'design studio'},{t:'UX / design route',s:'in progress',now:true}],
    parent:'Jordan has SEND and received a support plan, assistive tech and exam access arrangements from the start \u2014 a concrete example of the college\u2019s SEND provision in practice.'
  },
  {
    id:'sofia', ini:'S', name:'Sofia', age:18, borough:'Rochdale', route:'support', runtime:'1:52',
    quote:'I was really shy and hated the idea of an interview for a placement.',
    now:'Studying Computer Science at Newcastle',
    tags:['fit','women'],
    interests:['Networks','Systems','Quiet focus'],
    ch1:'I\u2019m quite shy and the idea of having to interview for a placement terrified me. I genuinely thought it would be the thing that stopped me.',
    ch1q:'They prepared us for it properly. By the interview I\u2019d practised so much it actually felt okay.',
    ch2:'On placement I found my feet on a systems team \u2014 methodical work where I could focus and quietly get good. My confidence grew without me noticing.',
    ch3:'I\u2019m doing Computer Science at Newcastle now. The shy version of me from two years ago wouldn\u2019t believe it.',
    path:[{t:'GCSEs in Rochdale',s:'',muted:true},{t:'Digital Support Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'systems team'},{t:'BSc Computer Science',s:'Newcastle',now:true}],
    parent:'Sofia was supported through placement interviews and has progressed to a Computer Science degree at Newcastle \u2014 with the college building confidence along the way.'
  },
  {
    id:'kwame', ini:'K', name:'Kwame', age:19, borough:'Manchester', route:'build', runtime:'2:09',
    quote:'I didn\u2019t see people who looked like me in tech, so I didn\u2019t see myself there.',
    now:'Junior Developer in fintech',
    tags:['fit','firstfam'],
    interests:['Building apps','Back-end','Community'],
    ch1:'Every image of \u201ca developer\u201d I\u2019d ever seen looked nothing like me or where I\u2019m from. It\u2019s hard to picture a future you\u2019ve never seen.',
    ch1q:'My cohort actually looked like Manchester. That on its own made me believe I belonged.',
    ch2:'Placement put me on a real engineering team building features people use. Once I\u2019d shipped something real, the doubt mostly went away.',
    ch3:'I\u2019m a junior developer in fintech now, and I go back to talk to students who feel how I felt. Representation is half the battle.',
    path:[{t:'GCSEs in Manchester',s:'',muted:true},{t:'Production, Design & Development T Level',s:'Ada Manchester'},{t:'45-day placement',s:'engineering team'},{t:'Junior Developer',s:'fintech',now:true}],
    parent:'Kwame is a junior developer in fintech and now mentors current students \u2014 part of Ada\u2019s focus on building a tech workforce that reflects the city it\u2019s in.'
  },
  {
    id:'tyler', ini:'T', name:'Tyler', age:18, borough:'Rochdale', route:'build', runtime:'2:22',
    quote:'I have dyslexia and I assumed a technical course meant walls of text I couldn\u2019t get through.',
    now:'Apprentice Software Tester at Royal London',
    tags:['send','support-need','fit'],
    interests:['Testing and breaking things','Games','Logic puzzles'],
    ch1:'School was a slog for me because of my dyslexia, so the idea of a heavy technical qualification honestly put me off. I pictured endless reading and me falling further behind.',
    ch1q:'I told Ada about my dyslexia at the open day. They\u2019d already thought about it \u2014 that was the moment I relaxed.',
    ch2:'On placement I found out testing suits how my brain works. I spot the thing that\u2019s off. My placement supervisor said I found bugs the devs had walked past for weeks.',
    ch3:'I\u2019m an apprentice software tester now. The support I got \u2014 extra time, materials in the format I needed \u2014 meant the course tested my skills, not my reading speed.',
    path:[{t:'GCSEs in Rochdale',s:'with SEND support',muted:true},{t:'Production, Design & Development T Level',s:'Ada Manchester'},{t:'45-day placement',s:'QA team'},{t:'Apprentice Software Tester',s:'Royal London',now:true}],
    parent:'Tyler has dyslexia and worried a technical route would work against him. With the right support in place he found a strength \u2014 software testing \u2014 and moved straight into a paid apprenticeship.'
  },
  {
    id:'chloe', ini:'C', name:'Chloe', age:17, borough:'Bury', route:'build', runtime:'1:52',
    quote:'My whole friendship group went to sixth form. Choosing differently felt like disappearing.',
    now:'Second-year T Level student, on placement at a Manchester agency',
    tags:['fit','women','behind'],
    interests:['Design','Front-end','Art and tech together'],
    ch1:'Everyone I knew was going to the same sixth form. Picking Ada meant walking in on day one knowing nobody, and I nearly didn\u2019t because of that.',
    ch1q:'Within two weeks I had a new group \u2014 people who were into the same things as me, which my old mates never really were.',
    ch2:'I\u2019m on placement at a design agency in town right now, building actual pages for actual clients. My friends at sixth form are writing practice essays.',
    ch3:'I\u2019m still on the course, so ask me again in a year \u2014 but I already have a portfolio, an employer reference, and a much clearer idea of what I want than anyone I know.',
    path:[{t:'GCSEs in Bury',s:'',muted:true},{t:'Production, Design & Development T Level',s:'Ada Manchester',now:true},{t:'45-day placement',s:'design agency, ongoing'}],
    parent:'Chloe is a current student, not a graduate \u2014 her story is what the course feels like from the inside right now, including the social worry most teenagers won\u2019t say out loud.'
  },
  {
    id:'amir', ini:'A', name:'Amir', age:19, borough:'Manchester', route:'analyse', runtime:'2:08',
    quote:'Nobody in my family had a clue what to advise me. We were all guessing.',
    now:'Data apprentice at PwC',
    tags:['firstfam','money','lowincome'],
    interests:['Numbers that tell a story','Football stats','Excel, honestly'],
    ch1:'My parents wanted the best for me but they\u2019d never been through the English system past sixteen. Every choice fell on me, and I didn\u2019t know what half the words meant.',
    ch1q:'Ada explained the route to my dad in plain language, in one conversation. That did more than any brochure.',
    ch2:'My placement was with a data team \u2014 real reports that real managers used to make decisions. Seeing my work change what a business did was a proper shock, in a good way.',
    ch3:'I\u2019m a data apprentice at PwC now, earning while my old classmates take out loans. My little brother\u2019s already asking me about it \u2014 and this time the family has someone to ask.',
    path:[{t:'GCSEs in Manchester',s:'',muted:true},{t:'Digital Business Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'data team'},{t:'Data apprentice',s:'PwC',now:true}],
    parent:'Amir\u2019s family had no route map for post-16 choices. The T Level gave him structure, a placement and a paid apprenticeship at PwC \u2014 with no student debt.'
  },
  {
    id:'leah', ini:'L', name:'Leah', age:18, borough:'Stockport', route:'support', runtime:'1:46',
    quote:'I was a young carer. I needed a course that understood my life isn\u2019t just college.',
    now:'IT Service Desk apprentice at Bank of America',
    tags:['support-need','money','women'],
    interests:['Fixing things fast','Helping people','Keeping calm'],
    ch1:'I look after my mum, so timetables and flexibility genuinely decide what I can and can\u2019t do. A course that ignored that was never going to work for me.',
    ch1q:'I didn\u2019t have to fight for the support \u2014 the pastoral team asked me what I needed before I\u2019d worked up the nerve to ask them.',
    ch2:'Service desk placement suited me straight away. It\u2019s people plus problems under a bit of pressure \u2014 which, as a carer, is basically my life anyway.',
    ch3:'I\u2019m an IT service desk apprentice at a global bank now. Earning matters in my house, and this route got me there two years faster than uni would have.',
    path:[{t:'GCSEs in Stockport',s:'young carer',muted:true},{t:'Digital Support Services T Level',s:'Ada Manchester'},{t:'45-day placement',s:'service desk'},{t:'IT Service Desk apprentice',s:'Bank of America',now:true}],
    parent:'Leah is a young carer. Ada\u2019s pastoral support meant her responsibilities at home were planned for, not just tolerated \u2014 and she\u2019s now earning in a structured apprenticeship.'
  },
  {
    id:'nadia', ini:'N', name:'Nadia', age:20, borough:'Hackney, London', route:'support', runtime:'2:19', campus:'London',
    quote:'I\u2019d never met a network engineer who looked like me. So I decided to be the first one I knew.',
    now:'Network engineer at Bank of America',
    tags:['women','fit','firstfam'],
    interests:['Networks','How the internet actually works','Mentoring'],
    ch1:'At sixteen I could not name a single woman working in infrastructure. Everything I saw said this job belonged to somebody else.',
    ch1q:'My cohort at Ada had more girls in it than my GCSE computing class. It stops feeling like a statement and starts feeling normal fast.',
    ch2:'My placement put me inside a real network operations team. The first time I traced a fault across a live estate and fixed it, the imposter feeling packed up and left.',
    ch3:'I\u2019m a network engineer at Bank of America now, and I mentor two Ada students. Manchester\u2019s cohort is new \u2014 mine wasn\u2019t \u2014 and this is where the route leads.',
    path:[{t:'GCSEs in Hackney',s:'',muted:true},{t:'Digital Support Services T Level',s:'Ada, London campus'},{t:'45-day placement',s:'network ops'},{t:'Network engineer',s:'Bank of America',now:true}],
    parent:'Nadia studied at Ada\u2019s established London campus \u2014 the same course now offered in Manchester \u2014 and progressed to a network engineering role at a global bank.'
  },
  {
    id:'josh', ini:'J', name:'Josh', age:21, borough:'Croydon, London', route:'build', runtime:'2:27', campus:'London',
    quote:'My school flat-out told me A Levels were the only serious option. They were wrong.',
    now:'Software Engineer degree apprentice',
    tags:['alevels','behind'],
    interests:['Building products end to end','Clean code','Teaching juniors'],
    ch1:'My sixth form ran an assembly about A Level choices and never once mentioned technical routes existed. I found Ada myself, online, at eleven at night.',
    ch1q:'The teachers meant well. They just recommended the only route they\u2019d ever taken themselves.',
    ch2:'Placement meant shipping real features with code review from actual senior engineers. My mates doing A Level Computer Science were still writing pseudocode in exercise books.',
    ch3:'I\u2019m three years into a software engineering degree apprenticeship \u2014 a degree, a salary and four years of experience, and I\u2019ll finish without a penny of tuition debt.',
    path:[{t:'GCSEs in Croydon',s:'',muted:true},{t:'Production, Design & Development T Level',s:'Ada, London campus'},{t:'45-day placement',s:'product team'},{t:'Software Engineer degree apprentice',s:'',now:true}],
    parent:'Josh\u2019s school never mentioned technical routes. Via Ada\u2019s London campus he is now completing a fully funded software engineering degree apprenticeship \u2014 degree plus salary, no debt.'
  },
  {
    id:'femi', ini:'F', name:'Femi', age:20, borough:'Tower Hamlets, London', route:'analyse', runtime:'2:03', campus:'London',
    quote:'Everyone said pick the safe route if you want a good uni. The \u201crisky\u201d route got me there anyway.',
    now:'Studying Computer Science at the University of Manchester',
    tags:['uni','firstfam'],
    interests:['Machine learning','Maths','Basketball'],
    ch1:'I wanted a top computer science degree, and every adult around me insisted A Levels were the only door in. Choosing a T Level felt like betting against the house.',
    ch1q:'Universities care about what you can actually do. I turned up to my interview with a portfolio of real work instead of predicted grades.',
    ch2:'My placement had me cleaning and analysing real datasets \u2014 the exact skills my degree assumes you\u2019ve never touched. First term felt like revision.',
    ch3:'I\u2019m at the University of Manchester doing Computer Science. Funny way round: I did the T Level in London and it brought me up here. The route works in both directions.',
    path:[{t:'GCSEs in Tower Hamlets',s:'',muted:true},{t:'Digital Business Services T Level',s:'Ada, London campus'},{t:'45-day placement',s:'analytics team'},{t:'BSc Computer Science',s:'University of Manchester',now:true}],
    parent:'Femi went from a London T Level to a Russell Group computer science degree in Manchester \u2014 direct evidence the route keeps strong universities firmly on the table.'
  }
];

module.exports = STORIES;
