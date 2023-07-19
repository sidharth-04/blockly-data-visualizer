const CSVFileNames = ['icecream.csv', 'airtravel.csv', "biostats.csv"];

for (let i = 0; i < CSVFileNames.length; i ++) {
    let fileName = `./csv/${CSVFileNames[i]}`;
    $.get(fileName)
    .done(data => {
        const lines = data.split('\n');
        const headers = lines[0].split(',');

        const table = createTable(headers);
        table.addClass('table table-hover col-md-6');

        const tableBody = $('<tbody>');
        for (let i = 1; i < lines.length; i ++) {
            const rowData = lines[i].split(',');

            if (rowData.length === headers.length) {
                const tableRow = $('<tr>');

                rowData.forEach(value => {
                const tableCell = $('<td>').text(value.trim());
                tableRow.append(tableCell);
                });

                tableBody.append(tableRow);
            }
        }
        table.append(tableBody);
        const tableHolder = $('<div>');
        tableHolder.addClass("table-wrapper-scroll-y my-custom-scrollbar");
        tableHolder.append(table);

        const span = $('<span>');
        span.addClass("badge text-bg-primary");
        span.text(CSVFileNames[i]);

        const column = $('<div>');
        column.addClass("col mb-2");
        column.append(span);
        column.append(tableHolder);
        $('#table-holder').append(column)
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        console.error('Error fetching CSV files:', errorThrown);
    });
}

function createTable(headers) {
  const table = $('<table>');

  // Create table header
  const tableHeader = $('<thead>');
  const headerRow = $('<tr>');
  headers.forEach(header => {
    const tableHeaderCell = $('<th>').text(header.trim());
    headerRow.append(tableHeaderCell);
  });

  tableHeader.append(headerRow);
  table.append(tableHeader);

  return table;
}
