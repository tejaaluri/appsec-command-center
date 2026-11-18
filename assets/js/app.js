
const findings = [
    {
        id: "APP-1024",
        name: "SQL Injection",
        application: "Customer Portal",
        severity: "Critical",
        status: "Open",
        cvss: 9.8
    },
    {
        id: "APP-1025",
        name: "Stored Cross-Site Scripting",
        application: "Claims Management",
        severity: "High",
        status: "In Progress",
        cvss: 8.2
    },
    {
        id: "API-2041",
        name: "Broken Object Level Authorization",
        application: "Payment API",
        severity: "Critical",
        status: "Open",
        cvss: 9.1
    },
    {
        id: "APP-1026",
        name: "Missing Security Headers",
        application: "Customer Portal",
        severity: "Medium",
        status: "Fixed",
        cvss: 5.3
    },
    {
        id: "API-2042",
        name: "Weak JWT Configuration",
        application: "Authentication API",
        severity: "High",
        status: "Open",
        cvss: 8.1
    },
    {
        id: "APP-1027",
        name: "Information Disclosure",
        application: "Employee Portal",
        severity: "Low",
        status: "Fixed",
        cvss: 3.1
    },
    {
        id: "API-2043",
        name: "Insufficient Rate Limiting",
        application: "Payment API",
        severity: "Medium",
        status: "In Progress",
        cvss: 6.5
    },
    {
        id: "APP-1028",
        name: "Insecure Direct Object Reference",
        application: "Claims Management",
        severity: "High",
        status: "Fixed",
        cvss: 7.5
    }
];

// Display the findings in the dashboard
function renderFindings(data) {
    const table = document.getElementById("findingsTable");

    if (!table) return;

    if (data.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No matching findings found.</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.application}</td>
            <td>
                <span class="severity ${item.severity.toLowerCase()}">
                    ${item.severity}
                </span>
            </td>
            <td>
                <span class="status ${item.status.toLowerCase().replace(/\s+/g, '-')}">
                    ${item.status}
                </span>
            </td>
        </tr>
    `).join("");
}

// Update dashboard statistics
function updateStatistics() {
    const total = findings.length;

    const critical = findings.filter(
        item => item.severity === "Critical"
    ).length;

    const high = findings.filter(
        item => item.severity === "High"
    ).length;

    const resolved = findings.filter(
        item => item.status === "Fixed"
    ).length;

    document.getElementById("totalFindings").textContent = total;
    document.getElementById("criticalCount").textContent = critical;
    document.getElementById("highCount").textContent = high;
    document.getElementById("resolvedCount").textContent = resolved;
}

// Display severity distribution
function renderSeveritySummary() {
    const container = document.getElementById("severitySummary");

    const levels = ["Critical", "High", "Medium", "Low"];

    container.innerHTML = levels.map(level => {
        const count = findings.filter(
            item => item.severity === level
        ).length;

        const percentage = (count / findings.length) * 100;

        return `
            <div class="summary-item">
                <div class="summary-label">
                    <span>${level}</span>
                    <strong>${count}</strong>
                </div>
                <div class="progress-track">
                    <div class="progress-fill ${level.toLowerCase()}"
                         style="width: ${percentage}%">
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Display remediation status
function renderRemediationSummary() {
    const container = document.getElementById("remediationSummary");

    const statuses = ["Open", "In Progress", "Fixed"];

    container.innerHTML = statuses.map(status => {
        const count = findings.filter(
            item => item.status === status
        ).length;

        return `
            <div class="remediation-item">
                <span>${status}</span>
                <strong>${count}</strong>
            </div>
        `;
    }).join("");
}

// Search findings
function setupSearch() {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();

        const filtered = findings.filter(item =>
            item.id.toLowerCase().includes(searchTerm) ||
            item.name.toLowerCase().includes(searchTerm) ||
            item.application.toLowerCase().includes(searchTerm) ||
            item.severity.toLowerCase().includes(searchTerm) ||
            item.status.toLowerCase().includes(searchTerm)
        );

        renderFindings(filtered);
    });
}

// Export findings as CSV
function exportReport() {
    const headers = [
        "Finding ID",
        "Vulnerability",
        "Application",
        "Severity",
        "Status",
        "CVSS Score"
    ];

    const rows = findings.map(item => [
        item.id,
        item.name,
        item.application,
        item.severity,
        item.status,
        item.cvss
    ]);

    const escapeCSV = value =>
        `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [
        headers,
        ...rows
    ].map(row => row.map(escapeCSV).join(",")).join("\r\n");

    const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "appsec-vulnerability-report.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", function () {
    renderFindings(findings);
    updateStatistics();
    renderSeveritySummary();
    renderRemediationSummary();
    setupSearch();

    document.getElementById("reportBtn")
        .addEventListener("click", exportReport);
});
