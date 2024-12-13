const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    console.log(data); // Inspect the response structure
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderTable(data.records);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to retrieve data. Check the API or your network connection.');
  }
}

function renderTable(records) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = ''; // Clear existing content

  if (records.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6">No data available</td></tr>';
    return;
  }

  records.forEach(record => {
    const fields = record.record.fields;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${fields.year || 'N/A'}</td>
      <td>${fields.semester || 'N/A'}</td>
      <td>${fields.the_programs || 'N/A'}</td>
      <td>${fields.nationality || 'N/A'}</td>
      <td>${fields.colleges || 'N/A'}</td>
      <td>${fields.students_count || 'N/A'}</td>
    `;
    console.log(fields); // Check the actual field names in each record

    tableBody.appendChild(row);
  });
}

// Fetch and display data on page load
document.addEventListener('DOMContentLoaded', fetchData);
