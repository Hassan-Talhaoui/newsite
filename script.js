function loadMenuDataFromFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch the menu file");
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const menuData = XLSX.utils.sheet_to_json(sheet);

            displayMenu(menuData);
        })
        .catch(error => {
            console.error("Error loading menu data:", error);
        });
}

function displayMenu(menuData) {
    const menuItemsContainer = document.getElementById("menu-items");
    menuItemsContainer.innerHTML = "";

    menuData.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <img src="${item.Image}" alt="${item.Name}">
            <div class="info">
                <h3>${item.Name}</h3>
                <p>${item.Description}</p>
                <p class="price">$${item.Price}</p>
            </div>
        `;
        menuItem.dataset.category = item.Category;
        menuItemsContainer.appendChild(menuItem);
    });
}

function filterMenu(category) {
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.style.display =
            category === "All" || item.dataset.category === category ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const menuFilePath = "menu.xlsx"; // Nom du fichier Excel
    loadMenuDataFromFile(menuFilePath);
});
