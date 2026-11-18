# AppSec Command Center

A web-based Application Security and Vulnerability Management dashboard for reviewing security findings, tracking remediation activities, and presenting application security reports.

**Live Demo:** [Open AppSec Command Center](https://tejaaluri.github.io/appsec-command-center/)

## Project Overview

AppSec Command Center is a front-end portfolio project that demonstrates how application security findings can be organized, reviewed, prioritized, and tracked through a centralized dashboard.

The application brings together vulnerability management, remediation tracking, and security reporting in a single interface. It is designed around common Application Security and DevSecOps workflows.

## Key Features

### Security Dashboard
- View total findings and severity-based summaries.
- Review vulnerability status and security metrics.
- Export dashboard findings to CSV.

### Vulnerability Management
- View application security findings in a structured table.
- Search findings by vulnerability details and application.
- Filter findings by severity and status.
- Open individual findings to review descriptions, security impact, and remediation guidance.

### Remediation Management
- Review remediation owners, priorities, target dates, and statuses.
- Edit remediation details through an interactive form.
- View summary counts for open, in-progress, and completed findings.

### Security Reports
- Review findings grouped by severity and remediation status.
- View application-wise vulnerability distribution.
- Export report data to CSV.

## Technology Stack

- **HTML5** – Page structure and layout
- **CSS3** – Styling and responsive interface
- **JavaScript** – Search, filtering, dashboard calculations, modal interactions, and CSV exports
- **GitHub** – Source code management
- **GitHub Pages** – Static website hosting

## Project Structure

```text
appsec-command-center/
│
├── index.html
├── vulnerabilities.html
├── remediation.html
├── reports.html
├── README.md
│
└── assets/
    ├── css/
    │   └── style.css
    │
    └── js/
        ├── app.js
        ├── vulnerabilities.js
        └── remediation.js
```

## Getting Started

No additional software or external services are required to view the hosted application.

**Online:**  
Open the [live demo](https://tejaaluri.github.io/appsec-command-center/).

**Run locally:**
1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

## Security Concepts Demonstrated

- Application Security and Vulnerability Management
- OWASP Top 10 vulnerability classification
- Vulnerability severity and risk prioritization
- CVSS-based risk assessment concepts
- Security findings validation and tracking
- Remediation ownership and status management
- Secure SDLC and DevSecOps reporting workflows

## Data and Implementation Notes

This is a portfolio demonstration built with static HTML, CSS, and JavaScript.

- The application uses fictional sample vulnerability records for demonstration purposes.
- It is not connected to production applications, vulnerability scanners, client environments, or external security platforms.
- Remediation edits are reflected in the current page session and are not permanently stored.
- CSV exports contain the demonstration data displayed by the application.

No real client information, credentials, or production security findings are included.

## Future Enhancements

- Backend integration and persistent database storage.
- Integration with SAST, DAST, SCA, and vulnerability scanning platforms.
- Automated vulnerability ingestion and synchronization.
- Role-based access control and audit history.
- Advanced security metrics and trend reporting.

---

**Author:** Teja Aluri  
**Project:** AppSec Command Center  
**Hosting:** GitHub Pages
