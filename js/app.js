
// آدرس سرور مرکزی سامانه
const API_BASE_URL = "http://localhost:3000/api";

// بررسی ارتباط با سرور
async function checkServerConnection() {
    const statusElement = document.getElementById("server-status");
    const messageElement = document.getElementById("api-message");

    try {
        const response = await fetch(`${API_BASE_URL}/health`);

        if (!response.ok) {
            throw new Error("Server response error");
        }

        const data = await response.json();

        statusElement.textContent = "سرور متصل است";
        statusElement.style.color = "green";

        messageElement.textContent = data.message;

        console.log("Server response:", data);

    } catch (error) {
        statusElement.textContent = "عدم ارتباط با سرور";
        statusElement.style.color = "red";

        messageElement.textContent =
            "ارتباط با سرور برقرار نشد.";

        console.error("Connection error:", error);
    }
}

// اجرای بررسی هنگام بارگذاری صفحه
document.addEventListener("DOMContentLoaded", () => {
    checkServerConnection();
});
// فعال‌سازی دکمه جمع و باز کردن منوی کناری
