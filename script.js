document.addEventListener("DOMContentLoaded", () => {
            const maxFiles = 1; // Adjust this based on the number of JSON files you have
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
                        data.forEach(item => {
                            const card = `
                                <tr>
                                    <td><b>${item.name}</b></td>
                                    <td><i class="bi bi-${item.icons}"></i></td>
                                    <td><a href="${item.link}">Join the server</a></td>
                                </tr>
                            `;
                            itemList.innerHTML += card;
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
                        itemList.innerHTML += errorRow;
                    }
                });
        }