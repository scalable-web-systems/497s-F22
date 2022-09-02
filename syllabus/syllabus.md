# COMPSCI 497S
## Scalable Web Systems

Syllabus / Fall 2022

## Description

The web has become a large and complex area for application development. Access to an abundance of open source languages, libraries, and frameworks has led to the quick and easy construction of a variety of applications with several moving parts working in coordination to present to the user the illusion of a single program. In reality, web applications are extremely difficult to get right. They involve a large collection of coordinated services, multiple databases, complicated user interfaces, security and performance issues, and ever changing 3rd party services, spread across physical and virtual machines. These complications are further stressed by the large number of concurrent users that access these applications every second. This course will investigate several well known web-based applications and the technology and software architecture used to scale these applications. We will also study a specific topic related to scalability in software design in the context of web application architecture.

## Prerequisites

- COMPSCI 326 Web Programming
- COMPSCI 320 Software Engineering
- Or equivalent background

You must have a strong background in the fundamentals of web programming. You should be familiar with at least the following concepts/tools:

- JavaScript
- Document Object Model (DOM)
- Node.js
- NPM
- Express
- Hypertext Transfer Protocol (HTTP)
- Client/Server Architecture
- Single Page Applications (SPA)
- Git and GitHub
- Markdown

In general, this course expects you to have a solid grasp of JavaScript programming, both in the browser and the server, and single-server full stack web development. We also expect that you are very familiar with Git and GitHub as we will use both extensively. We will begin the course with a brief review of these topics if you are a little rusty. However, if you are not familiar with these topics, you will likely struggle to keep up with the course material.

**Notes**: It is recommended to have (COMPSCI 220 Programming Methodology and COMPSCI 230 Computer Systems Principles) or 377 Operating Systems, however, this is not required but it will make your experience more rich. (e.g., basic security concepts, network protocols, processes, concurrency, client/server architecture, and general operating systems concepts).

## Major Applicability

- This course counts as a 400-level Computer Science Major elective.
- This course counts as a 400-level Informatics elective.

## Textbook

There is no required textbook for this course. However, you may find the following texts useful for deeper reading. I use these books as base material for this course and often code examples and diagrams are taken from them.

- Distributed Systems with Node.js: Building Enterprise-Ready Backend Services, Thomas Hunter II, O'Reilly Media, 2018 (I use this book extensively for the course material)
- Node.js Design Patterns, Mario Casciaro, Packt Publishing, 2014
- Docker in Action, 2nd Edition, Jeff Nickoloff, Manning Publications, 2019
- Programming TypeScript, Boris Cherny, O'Reilly Media, 2018
- Building Microservices - Designing Fine-Grained Systems, 2nd Edition, Sam Newman, O'Reilly Media, 2022

I also reference and use many other resources that other educators have created, but you do not need to purchase these books or other resources.

## Required Materials

- A laptop with a modern web browser (e.g., Chrome, Firefox, Safari, Edge). Although we can't officially require you to have a laptop, it will allow you to participate more effectively in class.
- A GitHub account. You will be using GitHub for all of your assignments.

## Software Platforms

We use the following software platforms for this course:

- **Moodle**: Moodle is used to communicate course materials. You will be able to find the course syllabus, lecture material, recorded lectures, and other links on Moodle. We also use Moodle for assignment scheduling, submission (links to GitHub repositories), and grades.

- **Piazza**: Piazza is used to communicate with the instructor and other students. You can ask questions, post answers, and discuss course material. You can also use Piazza to communicate with the instructor privately.

- **GitHub Classroom**: GitHub Classroom is also used to distribute and collect assignments. You will be using GitHub for all of your assignments. You will need to create a GitHub account if you do not already have one.

- **Other**: As part of this course you will be completing a group semester project. It will be necessary to communicate with others in your group. You will decide the best communication mechanism for your group (e.g., Slack, Discord, FaceTime, Facebook).

## Software Tools

We will use a variety of software tools in this course. The most important that you will need to install on your computer are:

- **Visual Studio Code (VSCode)**: We highly recommend that you use [VSCode](https://code.visualstudio.com) in this course for designing and developing assignments and the project. The assignments might be distributed with configuration options that will be initialized when you open an assignment. However, if you are more comfortable or proficient with another code editor you are entirely welcome to use it.

- **Node.js**: We will be using [Node.js](https://nodejs.org/en/) extensively in this course. It will be the foundation of the code we cover and used as a tool to demonstrate various topics. You should already know how to install Node as well as use `npm` to install 3rd party libraries.

- **Docker**: We will use [Docker](https://www.docker.com) (a virtualization environment) to develop and run code in this course. We will also be learning about Docker and how it is used as a platform for scalability. It is critical in today's complex software environments to know how to use and configure Docker for scalable applications.
  
- **Git**: Version control is critically important for any software developer. It is also necessary for keeping track of changes in any domain. We will be using Git for assignments and the project. It is part of the scalable domain and will be essential for this course.

**Note**: You need not install this software all at once. Perhaps you already have some or all of it installed from other courses. We will direct you to install the software as we need it for the course.

## Objectives

A student who has successfully completed this course with a C or above will be able to:

- Define concepts of modern distributed web application architecture.
- Explain issues that relate to scalability of modern web systems and possible solutions.
- Explain the asynchronous nature of JavaScript and how it relates to web application scalability.
- Explain the event-loop model of JavaScript in the browser and Node.js and how it relates to web application scalability.
- Explain, design, and implement services that communicate with each other using various communication protocols.
- Define and explain micro-services and their importance in scalability.
- Design and implement a micro-service based web application.
- Describe the role of Docker containers in modern web application architecture.
- Identify libraries and tools that help solve scalability problems.
- Apply languages, libraries, and tools that are important for scalability.
- Use TypeScript as a scalable language for web applications.
- Use React as a modern scalable user interface library.
- Use a modern text editor (VSCode) and terminal for interacting with course material and assignments.
- Analyze an existing web system and identify problems related to and requirements for scalability.
- Give a presentation that effectively communicates the results of a research project.

At the end of this course, you will be able to design and implement a scalable web application using the various technologies and tools that we will cover in this course. You will also be able to analyze an existing web system and identify problems related to scalability and requirements for scalability.

## How to Succeed

### Resources

Your success in this class is important to us. We all learn differently and bring different strengths and needs to the class. If there are aspects of the course that prevent you from learning or make you feel excluded, please let us know as soon as possible. Together we’ll develop strategies to meet both your needs and the requirements of the course. There are also a range of resources on campus, including:

- [Learning Resource Center](http://www.umass.edu/lrc)
- [Center for Counseling and Psychological Health (CCPH)](http://www.umass.edu/counseling)
- [English as a Second Language (ESL) Program](http://www.umass.edu/esl)

## Self Motivation

The structure of this course is different from standard courses. It relies on the self motivation of each student. The more you put into this course the more you will get out of it. Although several topics will be presented, it is expected that students in this course will contribute a substantial amount of research into various topics and technologies in order to be successful. This is not an introductory course, rather it attempts to scaffold and prepare you to investigate the material to be successful in industry and/or graduate school. You will be evaluated on your contributions and dedication to the course material, your own research, and the team you work with on your project.

**If you do not participate in this course and/or its material, you will likely receive a lower grade than you might expect. I take this seriously, so you should as well.**

## Course Structure

- **Lecture**: we will meet twice a week for 75 minutes. The first 30-60 minutes will be a lecture with live coding and demonstrations. The remaining time will be for discussion and/or research. There may be some lecture meeting times where it will be purely team work. The lecture will cover the material for the week and the discussion/research will be for questions and discussion the material or for team study and research. The lecture will be recorded and posted on the course website.

The lectures will be recorded and uploaded to Echo360. We will also be using Zoom for the live lectures. If you are unable to make it to class in-person for any reason, you have the option of joining the lecture via Zoom. The Zoom link will be posted on the course website. If you are unable to make it to class because of a scheduling conflict (e.g., doctor's appointment, work, etc.), you are expected to review the recorded lectures and complete any related in-class activities.

**We provide the recorded lectures for flexibility in your schedule and review purposes, however, please do not abuse this. We do expect you to regularly join in class and participate with the lectures.**

## Access to Course Material

All the material for this course will be available on Moodle in a weekly format. The course material will be released as soon as it is ready and you are expected to complete the readings and assignments that are assigned that week in a timely fashion. In Moodle you will find text and links to various resources including readings, recorded videos, as well as other online resources.

## Assignments and Grading

The final course grade involves assignments that relate to discussion and notes of the material and a semester group project. The breakdown of assignments (some graded, some not) are:

- **(20%) Homework**: Individual or group activities that range from setting up various software components and/or platforms (e.g., git, GitHub, coding environment, docker, AWS/Azure) to programming assignments. These are often started in class.

- **(20%) Developer Notebook**: You will be required to maintain a developer notebook. This will be a Github repository used to record your own research work that you accomplish through out the semester. Each report will consist of a markdown file and possibly code exemplars that you used to explore the material. We will evaluate your notebook periodically and it will be used as part of the final grade assignment and adjustment.

- **(30%) Participation**: This course requires your participation. This is especially important when working on a team with other people. Participation can take many forms, however, we need a mechanism to evaluate that participation. You will be required to complete several surveys and evaluation forms during the semester that records your independent work as well as the work you complete with your team. In addition to your own evaluation, you will be required to evaluate your team members. This will provide the course staff with a good understanding of your participation activities as well as those of your team members.

- **(20%) Project Milestones**: Team-based activities that involve the construction of a scalable web system that your team will design and implement. This will range from a team GitHub repository setup to the construction of various micro-services and front-end UI components.

- **(10%) Project Presentation**: A live or recorded presentation of your team’s project and demonstration of a working prototype.

All grades will be accessible through the Moodle Gradebook and updated at the completion of grading each assessment.

## Assignment Submission and Review

The assignments in this course are often open-ended. This makes it difficult to grade in a reasonable amount of time as we **do not use** an auto-grader. This means that we will be looking at your submissions from a high-level point of view. We want you to explore the material, not simply follow step-by-step instructions. The general submission and grading workflow is:

1. Assignment is posted on Moodle with a due date.
2. You access the assignment and work on it until the due date.
3. You submit your work by the assigned due date. If you did not complete the assignment, you should still submit by the due date.
4. Course staff will review your submission based on the criteria defined and associated with the assignment.
5. Course staff will comment directly on your GitHub repository.
6. Grades will be placed in Moodle.
7. You review your grades and comments. You have two days to request a regrade if there is something you feel was overlooked. We are human, so we can make mistakes. But, we also need to have a timeline. We will strictly follow this and deny any requests after 48 hours.

## Self and Peer Evaluations

Evaluations are a prevalent form of providing feedback in the real-world to managers and team members in the software industry. You will participate in three rounds of evaluations during the semester. Each round consists of two evaluations: you evaluate yourself and you evaluate your team members. These evaluations are valuable opportunities to reflect on your work and the work of your team members in this course.The data from these evaluations is very helpful feedback for the course staff and team members to make any changes that improve your effort and your team's effort.

1. **Self-Evaluation**: you will evaluate your efforts in the course, what you have learned, what you haven't learned, your level or effort and participation, and what your target goals will be until the next evaluation round. This is a short Moodle questionnaire. Please be sure to write feedback in the comment field in addition to the rating questions as that is very useful information for the course staff. This data will only be shared amongst the course staff.

2. **Peer-Evaluation**: You will evaluate yourself and your team members on the level and quality of your/their participation. Peer evaluations are done in the CATME system. A link will be provided on the Moodle site for this course. Some of the categories you will report on in the peer survey include:

   - Contributing to the Team's Work
   - Interacting with Teammates
   - Expecting Quality
   - Team Conflict
   - Team Satisfaction
   - Team Cohesiveness
   - Psychological Safety

You are required to complete BOTH of these evaluations. Because the data from these evaluations is time-critical, there are NO EXTENSIONS to the due dates of these evaluations. Your grade will be affected significantly if you fail to complete any of these evaluations, so make sure you note the due dates for these time-critical evaluations and schedule accordingly.

Note that the peer-evaluation data will be seen by the course staff and team members but in anonymized form; your name will not be associated with the results. This data is important feedback - especially the comment field.

## Final Grades

To evaluate your understanding of the course content we will use scores achieved on each of the above assessment components. Your final grade will convey your demonstration of knowledge of the course material and how well you demonstrate that knowledge. Missing and late assignments can have a dramatic impact on your final grade so it is important that you are attentive to submission deadlines and avoid any missing work. The typical breakdown of percentages and final grades for this course are: 

- A (93-100)
- A- (90-92)
- B+ (87-89)
- B (83-86)
- B- (80-82)
- C+ (77-79)
- C (73-76)
- C- (70-72)
- D+ (67-69)
- D (60-66)
- F (0-59)

This grading scheme may be adjusted based on the overall performance of students in the course.

## Standards-Based Grades

This course is graded on a standards-based grading system. That is, grades in individual assignments and group work are based on specific criteria that you or your group meet. The following is a guide to how you achieve particular grades:

- **A Grade**: The student's performance is *exceeding* the standards of the course and/or assignment. The student has demonstrated a deep understanding of the material and has gone above and beyond the requirements of the assignment. The student has demonstrated a high level of creativity and innovation in their work.

- **B Grade**: The student's performance is *meeting* the standards of the course and/or assignment. You must demonstrate a good understanding of the course material and have completed the assignments showing good quality and is fully satisfactory.
  
- **C Grade**: The student's performance is *approaching* the standards of the course and/or assignment. You must demonstrate a basic understanding of the course material and have completed the assignments showing inconsistent satisfactory quality. It shows an improving level of quality.
  
- **D Grade**: The student's performance is *rudimentary* and just *beginning* to meet the standards of the course and/or assignment. Improvement is necessary to pass the course.
  
- **F Grade**: The student's performance demonstrates minimal understanding of the course material. Quality is poor and/or missing assignments/participation and the student has not met the standards of the course and/or assignment.

**Important**: To be clear, you do not achieve an A grade by simply completing an assignment. You achieve an A if you **complete an assignment fully** and go **above and beyond** what is requested of you. This is what *exceeding* means. To exceed will require you to do some research into a topic that goes beyond what is presented. This research ability is part of what the course tries to achieve. 

As part of your submissions you will be required to grade your own work and justify the grade that you think your work achieves. We may or may not agree with you and provide arguments as to why you should achieve a higher or lower grade.

## Course Schedule

The estimated schedule for this course is as follows (subject to change):

- Week 1 - Introduction and review of web technologies
- Week 2 - Distributed systems, scalability, and the JS event loop
- Week 3 - Protocols (teams are formed)
- Week 4 - Scaling
- Week 5 - Reverse Proxies
- Week 6 - Observability
- Week 7 - Containers (team project work begins)
- Week 8 - Deployments
- Week 9 - Resiliency
- Week 10 - Distributed Primitives
- Week 11 - Security
- Week 12 - Project Work
- Week 13 - Project Work and Presentation

This schedule is subject to change before or during the course based on various factors. The landscape of this material changes frequently. It also depends on the students in the course and the overall flow of the material and how it is received. I may change direction or a topic to improve the learning as we progress.

## Communication

We will be using the Piazza discussion forum system for communication. The discussion forum should be your first choice for asking questions as others most certainly have the same question. You should check the discussion forum before asking your question to see if the same question has already been posted. We will tend not to answer questions directed towards us that have already been answered in the discussion forum. Think before you post. We expect you to do a reasonable amount of thinking to try to solve your problems before posting for help. Make sure you understand the rules and try to be articulate and clear with your post (again, think before you post). You should post questions related to assignments early rather than waiting until the last minute. If you post a question too close to an assignment deadline, you may not receive an answer before that deadline. Course staff are expected to answer questions Monday through Friday. Do not expect prompt answers on Saturday, Sunday, and scheduled holidays and breaks.

## Statement of Inclusivity

The staff for this course support the UMass commitment to diversity, and welcome individuals regardless of age, background, citizenship, disability, sex, education, ethnicity, family status, gender, gender identity, geographical origin, language, military experience, political views, race, religion, sexual orientation, socioeconomic status, and work experience. In this course, each voice in the classroom has something of value to contribute. Please take care to respect the different experiences, beliefs and values expressed by students and staff involved in this course.

## Accommodations

Accommodations are collaborative efforts between students, faculty, and Disability Services (DS). Students with accommodations approved through DS are responsible for contacting the faculty member in charge of the course prior to or during the first week of the term to discuss accommodations. Students who believe they are eligible for accommodations but who have not yet obtained approval through DS should contact DS immediately at (413) 545-0892. If you are a student with a documented disability and are registered with Disability Services, please contact me immediately to facilitate arranging academic accommodations. Reasonable arrangements will be made in accordance with your accommodations provided by DS in the context of this course.

## Course Incompletes

Students who are unable to complete course requirements within the allotted time because of severe medical or personal problems may request a grade of Incomplete from the instructor of the course. Incomplete grades are warranted only if a student is passing the course at the time of the request and if the course requirements can be completed by the end of the following semester. Furthermore, an incomplete will be granted if at least 75% of the work has been completed for the course. Otherwise, the recommended course of action is to withdraw and retake the course in the future. Please see the Academic Regulations Section IV Grading System and Credit Guidelines for further details.

**Note:** an incomplete means you are on your own to complete the material agreed upon by the instructor of this course. Do not expect additional help or one-on-one teaching of the material past the course completion date. It is your responsibility to complete the remaining material.

## Academic Honesty

It is very important in all courses that you be honest in all the work that you complete. In this course you must complete all assignments, quizzes, exams, etc. on your own unless otherwise specified. If you do not, you are doing a disservice to yourself, the instructors for the course, the School of Computer Science, the University of Massachusetts, and your future. We design our courses to provide you the necessary understanding and skill that will make you an excellent computer scientist. Assignments and exams are designed to test your knowledge and understanding of the material. Plagiarism and academic honesty of any sort may seem like an easy way to solve an immediate problem (which it is not), however, it can have a substantial negative impact on your career as a computer science student. There are many computing jobs out there and many more people working hard to get those positions. If you do not know your stuff you will have a very difficult time finding a job. Please take this seriously.

We will carefully review your submissions automatically and manually to verify that "cheating" has not taken place. If you are suspected of plagiarism we will follow an informal path to determine if academic dishonesty has taken place. If you are found guilty you will receive an F for the course and it will go on your permanent record at UMass. This will disrupt your schedule for completing courses and may lead to you not completing your degree in a timely fashion. You should carefully review the [Academic Honesty Policy](http://www.umass.edu/honesty/sites/default/files/pdf/academic_honesty_policy.pdf), [Avoiding Plagiarism](https://blogs.umass.edu/honors291g-cdg/how-to-avoid-plagiarism/), and the [Academic Honesty Flowchart](https://www.umass.edu/honesty/sites/default/files/academic_honesty_faculty_flowchart.pdf) to understand what academic honesty is, how you can avoid it, and the procedure we will follow if you are under suspicion. In general, you should review all documentation described by UMass' [Academic Honesty Policy and Procedures](https://www.umass.edu/honesty/).
