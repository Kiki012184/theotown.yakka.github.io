document.addEventListener("DOMContentLoaded", () => {
    const maxFiles = 3; // Adjust this based on the number of JSON files you have
    for (let i = 1; i <= maxFiles; i++) {
        fetchData(i);
    }
});

function fetchData(i) {
    fetch(`data${i}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data${i}.json`);
            }
            return response.json();
        })
        .then(data => {
            const itemList = document.getElementById(`itemList${i}`);
            if (itemList) {
                itemList.innerHTML = ''; // Clear previous content before adding new data
                data.forEach(item => {
                    const card = `
                        <a href="${item.link}" class="btn btn-sm mb-1 ${getStyleClass(i)}"> ${item.name} <i class="bi bi-${item.icons}"></i></a>
                    `;
                    itemList.insertAdjacentHTML('beforeend', card); // Safely append without re-parsing
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const itemList = document.getElementById(`itemList${i}`);
            if (itemList) {
                const errorRow = `
                    <tr>
                        <td colspan="3" class="text-danger">Error loading data${i}.json: ${error.message}</td>
                    </tr>
                `;
                itemList.insertAdjacentHTML('beforeend', errorRow); // Append the error row
            }
        });
}

function getStyleClass(i) {
    switch (i) {
        case 1:
            return 'btn-outline-success'; // Define your class names in CSS
        case 2:
            return 'btn-outline-success'; // Define your class names in CSS
        case 3:
            return 'btn-warning'; // Define your class names in CSS
        // Add more cases if needed
        default:
            return '';
    }
}