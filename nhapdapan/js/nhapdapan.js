function showTable(index) {
    const buttons = document.querySelectorAll('.tabs button');
    const tables = document.querySelectorAll('.table-container');

    buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
        tables[i].classList.toggle('active', i === index);
    });
}

function confirmDelete() {
    return confirm("Bạn có chắc chắn muốn xóa hết dữ liệu đáp án đã nhập?");
}