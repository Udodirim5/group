document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector('[data-drawer-toggle="logo-sidebar"]');
    const sidebar = document.getElementById('logo-sidebar');
    const dropdownToggle = document.querySelector('[data-dropdown-toggle="dropdown-user"]');
    const dropdownMenu = document.getElementById('dropdown-user');
    const toggle = document.querySelector('.togglesw');
    const monthlyLog = document.getElementById('monthly-log');
    const allLog = document.getElementById('all-log');
    let all = document.querySelector("h2.all");
    let mon = document.querySelector("h2.mon");

    toggleButton.addEventListener('click', function () {
        sidebar.classList.toggle('hidden'); // Assuming 'hidden' class will hide the sidebar
    });

    dropdownToggle.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden'); // Assuming 'hidden' class will hide the dropdown
    });
    

    // Close dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    toggle.addEventListener('change', function () {
        if (this.checked) {
            monthlyLog.style.display = 'none';
            allLog.style.display = 'block';
            all.classList.add("glow");
            mon.classList.remove("glow");
        } else {
            all.classList.remove("glow");
            mon.classList.add("glow");
            allLog.style.display = 'none';
            monthlyLog.style.display = 'block'; // or whatever initial display value you want
        }
    });


    // Get the table body of the first table
    const tableBody = document.querySelector("#data-table tbody");
    const rows = tableBody.querySelectorAll("tr");
    // Loop through each row and add the S/N to the first table
    rows.forEach((row, index) => {
        if (index >= 0) {
            const serialNumberCell = document.createElement("td");
            serialNumberCell.classList.add("px-6", "py-4", "font-medium", "whitespace-nowrap");
            serialNumberCell.textContent = index + 1;
            row.insertBefore(serialNumberCell, row.firstElementChild);
        }
    });

    // Get the table body of the second table
    const tableBody2 = document.querySelector("#data-table2 tbody");
    const rows2 = tableBody2.querySelectorAll("tr");
    // Loop through each row and add the S/N to the second table
    rows2.forEach((row2, index) => {
        if (index >= 0) {
            const serialNumberCell = document.createElement("td");
            serialNumberCell.classList.add("px-6", "py-4", "font-medium", "whitespace-nowrap");
            serialNumberCell.textContent = index + 1;
            row2.insertBefore(serialNumberCell, row2.firstElementChild);
        }
    });
});
