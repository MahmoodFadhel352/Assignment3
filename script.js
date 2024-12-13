// API URL
const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

// Function to fetch and display the data
async function fetchAndDisplayData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const results = data.results;

        if (!results || results.length === 0) {
            throw new Error('No results found in the API response.');
        }

        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = ''; // Clear previous content

        // Populate the table with rows
        results.forEach(record => {
            const { 
                year, 
                semester, 
                the_programs, 
                nationality, 
                colleges, 
                number_of_students 
            } = record;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${year || 'N/A'}</td>
                <td>${semester || 'N/A'}</td>
                <td>${the_programs || 'N/A'}</td>
                <td>${nationality || 'N/A'}</td>
                <td>${colleges || 'N/A'}</td>
                <td>${number_of_students || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error:', error);
        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = <tr><td colspan="6">Error loading data: ${error.message}</td></tr>;
    }
}

// Call the function to fetch and display data
window.addEventListener('DOMContentLoaded', fetchAndDisplayData);