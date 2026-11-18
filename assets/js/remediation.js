
const remediationRecords = [
    {
        id: "APP-1024",
        name: "SQL Injection",
        application: "Customer Portal",
        owner: "Rahul Sharma",
        priority: "Critical",
        status: "Open",
        targetDate: "2026-11-25"
    },
    {
        id: "APP-1025",
        name: "Stored Cross-Site Scripting",
        application: "Claims Management",
        owner: "Priya Nair",
        priority: "High",
        status: "In Progress",
        targetDate: "2026-11-28"
    },
    {
        id: "API-2041",
        name: "Broken Object Level Authorization",
        application: "Payment API",
        owner: "Arjun Rao",
        priority: "Critical",
        status: "Open",
        targetDate: "2026-11-23"
    },
    {
        id: "APP-1026",
        name: "Missing Security Headers",
        application: "Customer Portal",
        owner: "Sneha Patel",
        priority: "Medium",
        status: "Fixed",
        targetDate: "2026-11-12"
    },
    {
        id: "API-2042",
        name: "Weak JWT Configuration",
        application: "Authentication API",
        owner: "Kiran Kumar",
        priority: "High",
        status: "Open",
        targetDate: "2026-11-27"
    },
    {
        id: "APP-1027",
        name: "Information Disclosure",
        application: "Employee Portal",
        owner: "Meera Reddy",
        priority: "Low",
        status: "Fixed",
        targetDate: "2026-11-10"
    },
    {
        id: "API-2043",
        name: "Insufficient Rate Limiting",
        application: "Payment API",
        owner: "Vikram Singh",
        priority: "Medium",
        status: "In Progress",
        targetDate: "2026-11-30"
    },
    {
        id: "APP-1028",
        name: "Insecure Direct Object Reference",
        application: "Claims Management",
        owner: "Ananya Das",
        priority: "High",
        status: "Fixed",
        targetDate: "2026-11-15"
    }
];

// Display remediation records
function loadRemediationTable() {
    const table = document.getElementById("remediationTable");

    if (!table) return;

    table.innerHTML = "";

    remediationRecords.forEach(record => {
        const row = document.createElement("tr");

        const values = [
            record.id,
            record.name,
            record.application,
            record.owner
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Priority badge
        const priorityCell = document.createElement("td");
        const priorityBadge = document.createElement("span");

        priorityBadge.className =
            `severity ${record.priority.toLowerCase()}`;
        priorityBadge.textContent = record.priority;

        priorityCell.appendChild(priorityBadge);
        row.appendChild(priorityCell);

        // Status badge
        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className =
            `status ${record.status.toLowerCase().replace(/\s+/g, "-")}`;
        statusBadge.textContent = record.status;

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // Target date
        const dateCell = document.createElement("td");

        dateCell.textContent = new Date(
            record.targetDate + "T00:00:00"
        ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        row.appendChild(dateCell);

        // Edit button
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.className = "edit-button";

        editButton.addEventListener("click", function () {
            openRemediationModal(record);
        });

        actionCell.appendChild(editButton);
        row.appendChild(actionCell);

        table.appendChild(row);
    });

    updateRemediationSummary();
}

// Open edit popup with existing record details
function openRemediationModal(record) {
    document.getElementById("editFindingId").value = record.id;
    document.getElementById("editOwner").value = record.owner;
    document.getElementById("editStatus").value = record.status;
    document.getElementById("editTargetDate").value = record.targetDate;

    document.getElementById("remediationModal").style.display = "flex";
}

// Close edit popup
function closeRemediationModal() {
    document.getElementById("remediationModal").style.display = "none";
}

// Save remediation changes
function saveRemediationChanges(event) {
    event.preventDefault();

    const findingId = document.getElementById("editFindingId").value;

    const record = remediationRecords.find(
        item => item.id === findingId
    );

    if (!record) return;

    record.owner = document.getElementById("editOwner").value.trim();
    record.status = document.getElementById("editStatus").value;
    record.targetDate = document.getElementById("editTargetDate").value;

    loadRemediationTable();
    closeRemediationModal();
}

// Update summary cards
function updateRemediationSummary() {
    const total = remediationRecords.length;

    const open = remediationRecords.filter(
        record => record.status === "Open"
    ).length;

    const inProgress = remediationRecords.filter(
        record => record.status === "In Progress"
    ).length;

    const completed = remediationRecords.filter(
        record => record.status === "Fixed"
    ).length;

    document.getElementById("totalAssigned").textContent = total;
    document.getElementById("openCount").textContent = open;
    document.getElementById("progressCount").textContent = inProgress;
    document.getElementById("completedCount").textContent = completed;
}

// Initialize remediation page
document.addEventListener("DOMContentLoaded", function () {
    loadRemediationTable();

    const form = document.getElementById("remediationForm");
    const closeButton = document.getElementById("closeRemediationModal");
    const modal = document.getElementById("remediationModal");

    if (form) {
        form.addEventListener("submit", saveRemediationChanges);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeRemediationModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeRemediationModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeRemediationModal();
        }
    });
});
