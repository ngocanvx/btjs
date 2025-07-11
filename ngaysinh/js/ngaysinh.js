// Hàm tính số mệnh dựa trên ngày sinh
// Trả về giá trị số mệnh
function TinhSoMenh(ngaysinh) {
    var somenh = parseInt(ngaysinh);
    switch (somenh) {
        case 11:
            // Nếu số mệnh là 11, giữ nguyên
            return somenh;
        case 22:
            // Nếu số mệnh là 22, giữ nguyên
            return somenh;
        default:
            while (somenh > 10) {
                var temp = somenh;
                somenh = 0;
                while (temp > 0) {
                    somenh += temp % 10;
                    temp = Math.floor(temp / 10);
                }
            }
            return somenh;
    }
}

// Hàm thực hiện giải mã số mệnh dựa trên ngày sinh
// Trả về thông điệp dựa trên số mệnh
function GiaiMaSoMenh(somenh) {
    fetch('./js/ngaysinh.json')
        .then(response => response.json())
        .then(data => {
            var ketqua = data.find(item => parseInt(item.so) === somenh);
            if (ketqua) {
                const content = `<h2>Số mệnh của bạn: ${somenh}</h2> \n` +
                    `${ketqua.tomtat}\n${ketqua.ynghia}`;

                document.getElementById('modal-text').innerHTML = content;
                document.getElementById('modal').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching somenh data:', error);
            alert("Đã xảy ra lỗi khi lấy thông tin số mệnh.");
        });
}