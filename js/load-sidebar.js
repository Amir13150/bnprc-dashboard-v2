
document.addEventListener("DOMContentLoaded", async () => {

    const sidebarContainer = document.getElementById("sidebar-container");

    if (!sidebarContainer) return;

    const isPagesDirectory = window.location.pathname.includes("/pages/");

    const componentPath = isPagesDirectory
        ? "../components/sidebar.html"
        : "components/sidebar.html";

    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error("Sidebar file could not be loaded");
        }

        const sidebarHTML = await response.text();

        sidebarContainer.innerHTML = sidebarHTML;

        // اصلاح مسیر لینک‌ها در صفحات داخلی
        if (isPagesDirectory) {
            const links = sidebarContainer.querySelectorAll(".main-menu a");

            links.forEach(link => {
                const href = link.getAttribute("href");

                if (href && href.startsWith("pages/")) {
                    link.setAttribute("href", "../" + href);
                }
            });

            const dashboardLink = sidebarContainer.querySelector(
                '.main-menu a[title="داشبورد مدیریتی"]'
            );

            if (dashboardLink) {
                dashboardLink.setAttribute("href", "../index.html");
            }
        }

        // فعال‌سازی دکمه جمع و باز کردن منو
        const toggleButton = document.getElementById("sidebar-toggle");
        const appContainer = document.querySelector(".app-container");

        if (toggleButton && appContainer) {
            toggleButton.addEventListener("click", () => {
                appContainer.classList.toggle("sidebar-collapsed");
            });
        }

    } catch (error) {
        console.error("Sidebar loading error:", error);
    }

});
