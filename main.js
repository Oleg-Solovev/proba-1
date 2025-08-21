// URL файла Excel на сервере
const excelFileUrl = 'data.ods'; // Убедитесь, что файл доступен по этому пути

// Загружаем файл с сервера
fetch(excelFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Файл не найден');
        }
        return response.arrayBuffer();
    })
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Преобразуем лист в JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Отображаем данные
        displayData(jsonData);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('output').innerHTML = '<p>Не удалось загрузить файл Excel.</p>';
    });

function displayData(data) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (data.length === 0) {
        output.innerHTML = '<p>Файл пустой.</p>';
        return;
    }

    // Создаём таблицу
    const table = document.createElement('table');

    data.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    output.appendChild(table);
}
