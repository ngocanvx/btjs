document.getElementById('excelFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        let table = '<table>';
        jsonData.forEach(row => {
            table += '<tr>';
            row.forEach(cell => {
                table += `<td>${cell || ''}</td>`;
            });
            table += '</tr>';
        });
        table += '</table>';
        document.getElementById('excelData').innerHTML = table;

        // Kích hoạt nút tải PDF sau khi dữ liệu đã hiển thị
        document.getElementById('downloadPDF').disabled = false;
    };

    reader.readAsArrayBuffer(file);
});

document.getElementById('downloadPDF').addEventListener('click', function () {
    const element = document.getElementById('excelData');
    const opt = {
        margin: 0.5,
        filename: 'excel-data.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 1 },
        //jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).save();
});
