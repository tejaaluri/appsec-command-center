
const vulnerabilityFindings = [
    {
        id: "APP-1024",
        name: "SQL Injection",
        application: "Customer Portal",
        owasp: "A03: Injection",
        cvss: 9.8,
        severity: "Critical",
        status: "Open",
        description: "User input is included in database queries without proper validation or parameterization.",
        impact: "An attacker could manipulate database queries and potentially access, modify, or delete sensitive customer information.",
        remediation: "Use parameterized queries or prepared statements. Validate input on the server side and restrict database account permissions."
    },
    {
        id: "APP-1025",
        name: "Stored Cross-Site Scripting",
        application: "Claims Management",
        owasp: "A03: Injection",
        cvss: 8.2,
        severity: "High",
        status: "In Progress",
        description: "The application stores user-supplied content and later displays it without proper output encoding.",
        impact: "Malicious scripts could execute in another user's browser and potentially expose session information or perform actions on their behalf.",
        remediation: "Apply context-aware output encoding, validate user input, and use an appropriate Content Security Policy."
    },
    {
        id: "API-2041",
        name: "Broken Object Level Authorization",
        application: "Payment API",
        owasp: "A01: Broken Access Control",
        cvss: 9.1,
        severity: "Critical",
        status: "Open",
        description: "The API does not properly verify whether the requesting user is authorized to access a specific object.",
        impact: "Users could access or modify payment records belonging to other customers by changing object identifiers.",
        remediation: "Enforce object-level authorization checks on every API request. Verify ownership and access permissions on the server side."
    },
    {
        id: "APP-1026",
        name: "Missing Security Headers",
        application: "Customer Portal",
        owasp: "A05: Security Misconfiguration",
        cvss: 5.3,
        severity: "Medium",
        status: "Fixed",
        description: "The application response was missing recommended HTTP security headers.",
        impact: "The absence of security headers could increase exposure to browser-based attacks such as clickjacking and certain content injection attacks.",
        remediation: "Configure appropriate headers such as Content-Security-Policy, X-Content-Type-Options and frame protection. Verify the configuration after deployment."
    },
    {
        id: "API-2042",
        name: "Weak JWT Configuration",
        application: "Authentication API",
        owasp: "A07: Identification and Authentication Failures",
        cvss: 8.1,
        severity: "High",
        status: "Open",
        description: "JSON Web Token validation and configuration do not enforce all required security checks.",
        impact: "Improper token validation could allow unauthorized access if an attacker can exploit weak signing or validation settings.",
        remediation: "Enforce approved signing algorithms, validate token signatures, issuer, audience and expiration, and manage signing keys securely."
    },
    {
        id: "APP-1027",
        name: "Information Disclosure",
        application: "Employee Portal",
        owasp: "A02: Cryptographic Failures",
        cvss: 3.1,
        severity: "Low",
        status: "Fixed",
        description: "Application responses exposed internal information that was not required by the user.",
        impact: "Exposed technical details could help an attacker understand the application and identify other potential weaknesses.",
        remediation: "Remove unnecessary details from responses, disable verbose error messages in production and review logging configuration."
    },
    {
        id: "API-2043",
        name: "Insufficient Rate Limiting",
        application: "Payment API",
        owasp: "API4: Unrestricted Resource Consumption",
        cvss: 6.5,
        severity: "Medium",
        status: "In Progress",
        description: "The API does not enforce sufficient request limits for certain operations.",
        impact: "Repeated requests could consume application resources, affect service availability or increase the risk of automated abuse.",
        remediation: "Apply rate limits based on user, IP address and endpoint. Add request throttling, monitoring and appropriate abuse controls."
    },
    {
        id: "APP-1028",
        name: "Insecure Direct Object Reference",
        application: "Claims Management",
        owasp: "A01: Broken Access Control",
        cvss: 7.5,
        severity: "High",
        status: "Fixed",
        description: "The application allowed access to resources through direct identifiers without sufficient authorization checks.",
        impact: "An authenticated user could potentially view or modify another user's claim information.",
        remediation: "Verify user permissions for every requested resource. Apply server-side access checks instead of relying on hidden or unpredictable identifiers."
    }
];

// Display vulnerability findings
function loadVulnerabilityTable(findings = vulnerabilityFindings) {
    const table = document.getElementById("vulnerabilityTable");

    if (!table) return;

    table.innerHTML = "";

    if (findings.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 7;
        cell.textContent = "No matching vulnerabilities found.";

        row.appendChild(cell);
        table.appendChild(row);
        return;
    }

    findings.forEach(finding => {
        const row = document.createElement("tr");
        row.style.cursor = "pointer";
        row.title = "Click to view vulnerability details";

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

            if (index === 5) {
                const badge = document.createElement("span");
                badge.className = `severity ${finding.severity.toLowerCase()}`;
                badge.textContent = value;
                cell.appendChild(badge);
            } else if (index === 6) {
                const badge = document.createElement("span");
                badge.className = `status ${finding.status.toLowerCase().replace(/\s+/g, "-")}`;
                badge.textContent = value;
                cell.appendChild(badge);
            } else {
                cell.textContent = value;
            }

            row.appendChild(cell);
        });

        row.addEventListener("click", function () {
            openVulnerabilityDetails(finding);
        });

        table.appendChild(row);
    });
}

// Open vulnerability details popup
function openVulnerabilityDetails(finding) {
    const modal = document.getElementById("vulnerabilityModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDetails = document.getElementById("modalDetails");

    if (!modal || !modalTitle || !modalDetails) return;

    modalTitle.textContent = finding.name;
    modalDetails.innerHTML = "";

    const details = [
        ["Finding ID", finding.id],
        ["Application", finding.application],
        ["OWASP Category", finding.owasp],
        ["CVSS Score", finding.cvss.toFixed(1)],
        ["Severity", finding.severity],
        ["Status", finding.status],
        ["Description", finding.description],
        ["Security Impact", finding.impact],
        ["Recommended Remediation", finding.remediation]
    ];

    details.forEach(([label, value]) => {
        const heading = document.createElement("h3");
        heading.textContent = label;

        const paragraph = document.createElement("p");
        paragraph.textContent = value;

        modalDetails.appendChild(heading);
        modalDetails.appendChild(paragraph);
    });

    modal.style.display = "flex";
}

// Close vulnerability details popup
function closeVulnerabilityModal() {
    const modal = document.getElementById("vulnerabilityModal");

    if (modal) {
        modal.style.display = "none";
    }
}

// Search and filter functionality
function filterVulnerabilities() {
    const searchInput = document.getElementById("vulnerabilitySearch");
    const severityFilter = document.getElementById("severityFilter");
    const statusFilter = document.getElementById("statusFilter");

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedSeverity = severityFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredFindings = vulnerabilityFindings.filter(finding => {
        const searchableText = [
            finding.id,
            finding.name,
            finding.application,
            finding.owasp
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchText);
        const matchesSeverity =
            !selectedSeverity || finding.severity === selectedSeverity;
        const matchesStatus =
            !selectedStatus || finding.status === selectedStatus;

        return matchesSearch && matchesSeverity && matchesStatus;
    });

    loadVulnerabilityTable(filteredFindings);
}

// Initialize page functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("vulnerabilitySearch");
    const severityFilter = document.getElementById("severityFilter");
    const statusFilter = document.getElementById("statusFilter");
    const resetButton = document.getElementById("resetFilters");
    const closeButton = document.getElementById("closeModal");
    const modal = document.getElementById("vulnerabilityModal");

    loadVulnerabilityTable();

    if (searchInput) {
        searchInput.addEventListener("input", filterVulnerabilities);
    }

    if (severityFilter) {
        severityFilter.addEventListener("change", filterVulnerabilities);
    }

    if (statusFilter) {
        statusFilter.addEventListener("change", filterVulnerabilities);
    }

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            searchInput.value = "";
            severityFilter.value = "";
            statusFilter.value = "";

            loadVulnerabilityTable();
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeVulnerabilityModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeVulnerabilityModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeVulnerabilityModal();
        }
    });
});
