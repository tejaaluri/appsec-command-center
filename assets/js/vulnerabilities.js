
const vulnerabilityFindings = [
    {
        id: "APP-1024",
        name: "SQL Injection",
        application: "Customer Portal",
        owasp: "A03: Injection",
        cvss: 9.8,
        severity: "Critical",
        status: "Open"
    },
    {
        id: "APP-1025",
        name: "Stored Cross-Site Scripting",
        application: "Claims Management",
        owasp: "A03: Injection",
        cvss: 8.2,
        severity: "High",
        status: "In Progress"
    },
    {
        id: "API-2041",
        name: "Broken Object Level Authorization",
        application: "Payment API",
        owasp: "A01: Broken Access Control",
        cvss: 9.1,
        severity: "Critical",
        status: "Open"
    },
    {
        id: "APP-1026",
        name: "Missing Security Headers",
        application: "Customer Portal",
        owasp: "A05: Security Misconfiguration",
        cvss: 5.3,
        severity: "Medium",
        status: "Fixed"
    },
    {
        id: "API-2042",
        name: "Weak JWT Configuration",
        application: "Authentication API",
        owasp: "A07: Identification and Authentication Failures",
        cvss: 8.1,
        severity: "High",
        status: "Open"
    },
    {
        id: "APP-1027",
        name: "Information Disclosure",
        application: "Employee Portal",
        owasp: "A02: Cryptographic Failures",
        cvss: 3.1,
        severity: "Low",
        status: "Fixed"
    },
    {
        id: "API-2043",
        name: "Insufficient Rate Limiting",
        application: "Payment API",
        owasp: "API4: Unrestricted Resource Consumption",
        cvss: 6.5,
        severity: "Medium",
        status: "In Progress"
    },
    {
        id: "APP-1028",
        name: "Insecure Direct Object Reference",
        application: "Claims Management",
        owasp: "A01: Broken Access Control",
        cvss: 7.5,
        severity: "High",
        status: "Fixed"
    }
];

function loadVulnerabilityTable() {
    const table = document.getElementById("vulnerabilityTable");

    if (!table) return;

    table.innerHTML = "";

    vulnerabilityFindings.forEach(finding => {
        const row = document.createElement("tr");

        const values = [
            finding.id,
            finding.name,
            finding.application,
            finding.owasp,
            finding.cvss.toFixed(1),
            finding.severity,
            finding.status
        ];

        values.forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = value;

            if (index === 5) {
                const badge = document.createElement("span");
                badge.className = `severity ${finding.severity.toLowerCase()}`;
                badge.textContent = value;
                cell.textContent = "";
                cell.appendChild(badge);
            }

            if (index === 6) {
                const badge = document.createElement("span");
                badge.className = `status ${finding.status.toLowerCase().replace(/\s+/g, "-")}`;
                badge.textContent = value;
                cell.textContent = "";
                cell.appendChild(badge);
            }

            row.appendChild(cell);
        });

        table.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadVulnerabilityTable();
});
