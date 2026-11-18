
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

        table.appendChild(row);
    });
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
});
