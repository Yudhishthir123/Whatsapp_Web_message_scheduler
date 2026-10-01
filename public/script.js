const form = document.getElementById("scheduleForm");

const contactInput = document.getElementById("contact");
const messageInput = document.getElementById("message");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

const previewContact = document.getElementById("previewContact");
const previewMessage = document.getElementById("previewMessage");

const characterCount = document.getElementById("characterCount");

const messageList = document.getElementById("messageList");
const emptyState = document.getElementById("emptyState");

const scheduledCount = document.getElementById("scheduledCount");
const pendingCount = document.getElementById("pendingCount");
const sentCount = document.getElementById("sentCount");
const connectButton = document.querySelector(".connect-btn");
const connectionLabel = document.querySelector(".connection-status p");
const API_BASE = "/api/v1";

let scheduledMessages = [];

connectButton.addEventListener("click", async () => {
    connectButton.disabled = true;
    connectButton.textContent = "Connecting...";
    try {
        const response = await fetch(`${API_BASE}/browser/connect`, { method: "POST" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to connect WhatsApp");
        connectionLabel.textContent = "Connected";
        connectButton.textContent = "WhatsApp Connected";
    } catch (error) {
        connectionLabel.textContent = error.message;
        connectButton.textContent = "Connect WhatsApp";
    } finally {
        connectButton.disabled = false;
    }
});

contactInput.addEventListener("input", () => {
    previewContact.textContent = contactInput.value.trim() || "Contact";
});

messageInput.addEventListener("input", () => {
    previewMessage.textContent = messageInput.value.trim() || "Your message will appear here...";
    characterCount.textContent = messageInput.value.length;
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const scheduledAt = new Date(`${dateInput.value}T${timeInput.value}`);

    const contact = contactInput.value.trim();
    if (!contact || !/^[+\d\s().-]+$/.test(contact) || !/^\d{10,15}$/.test(contact.replace(/\D/g, ""))) {
        showError("Enter a WhatsApp phone number with country code.");
        return;
    }

    if (!messageInput.value.trim() || Number.isNaN(scheduledAt.getTime())) {
        showError("Enter a message, date, and time.");
        return;
    }

    submitButton.disabled = true;

    try {
        const response = await fetch(`${API_BASE}/schedules`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contact: contactInput.value.trim(),
                message: messageInput.value.trim(),
                scheduledAt: scheduledAt.toISOString(),
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Unable to create schedule");
        }

        form.reset();
        previewContact.textContent = "Contact";
        previewMessage.textContent = "Your message will appear here...";
        characterCount.textContent = "0";
        await loadSchedules();
    } catch (error) {
        showError(error.message);
    } finally {
        submitButton.disabled = false;
    }
});

messageList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button) return;
    if (!window.confirm("Remove this schedule from your view?")) return;

    button.disabled = true;
    try {
        const response = await fetch(`${API_BASE}/schedules/${button.dataset.deleteId}`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to cancel schedule");
        await loadSchedules();
    } catch (error) {
        showError(error.message);
        button.disabled = false;
    }
});

async function loadSchedules() {
    try {
        const response = await fetch(`${API_BASE}/schedules`, {
            cache: "no-store",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load schedules");

        scheduledMessages = result.data || [];
        renderMessages();
    } catch (error) {
        scheduledMessages = [];
        renderMessages();
        showError(error.message);
    }
}

function renderMessages() {
    const activeMessages = scheduledMessages.filter((item) => item.status !== "cancelled");
    const pendingMessages = activeMessages.filter((item) => item.status === "pending").length;
    const sentMessages = activeMessages.filter((item) => item.status === "sent").length;

    messageList.innerHTML = "";
    emptyState.style.display = activeMessages.length === 0 ? "block" : "none";

    activeMessages.forEach((item) => {
        const element = document.createElement("div");
        element.className = "message-item";
        const scheduledDate = new Date(item.scheduledAt);
        const dateLabel = Number.isNaN(scheduledDate.getTime())
            ? "Invalid date"
            : scheduledDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

        element.innerHTML = `
            <div class="message-info">
                <strong>${escapeHTML(item.contact)}</strong>
                <p>${escapeHTML(item.message)}</p>
            </div>
            <div class="message-time">
                ${escapeHTML(dateLabel)}
                <br>
                <span class="status-${escapeHTML(item.status)}">${escapeHTML(item.status)}</span>
                <button type="button" class="cancel-btn" data-delete-id="${escapeHTML(item._id)}">Delete</button>
            </div>
        `;
        messageList.appendChild(element);
    });

    scheduledCount.textContent = activeMessages.length;
    pendingCount.textContent = pendingMessages;
    if (sentCount) sentCount.textContent = sentMessages;
}

function showError(message) {
    let errorElement = document.getElementById("formError");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.id = "formError";
        errorElement.className = "form-error";
        form.prepend(errorElement);
    }
    errorElement.textContent = message;
}

function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = String(value ?? "");
    return div.innerHTML;
}

const today = new Date();
dateInput.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");

loadSchedules();
setInterval(loadSchedules, 10000);