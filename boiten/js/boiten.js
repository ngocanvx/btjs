// Hàm hiển thị thông báo
function ThongBao(noidung) {
    alert(noidung);
}

// Hàm chuyển chuỗi tiếng Việt thành không dấu
function ChuyenTiengVietKhongDau(str) {
    var strKhongDau = str.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    //strKhongDau = strKhongDau.replace(/Đ/g, "D").replace(/đ/g, "d");
    strKhongDau = strKhongDau.replace(/Đ/g, "D");
    return strKhongDau;
}

// Trả về số Pythagore của ký tự
function SoPythagoreKyTu(kyTu) {
    switch (kyTu) {
        case 'A': case 'J': case 'S':
            return 1;
        case 'B': case 'K': case 'T':
            return 2;
        case 'C': case 'L': case 'U':
            return 3;
        case 'D': case 'M': case 'V':
            return 4;
        case 'E': case 'N': case 'W':
            return 5;
        case 'F': case 'O': case 'X':
            return 6;
        case 'G': case 'P': case 'Y':
            return 7;
        case 'H': case 'Q': case 'Z':
            return 8;
        case 'I': case 'R':
            return 9;
        default:
            return 0;
    }
}

// Hàm tính số mệnh dựa trên họ tên
function TinhSoMenh(hoten) {
    // Tính toán số mệnh dựa trên họ tên
    // (Ví dụ: tính tổng số ký tự, hoặc thực hiện một phép toán nào đó)
    var somenh = 0;

    for (var i = 0; i < hoten.length; i++) {
        somenh += SoPythagoreKyTu(hoten[i]);
    }

    // Giảm số mệnh về một chữ số
    while (somenh > 9) {
        var temp = somenh;
        somenh = 0;
        while (temp > 0) {
            somenh += temp % 10;
            temp = Math.floor(temp / 10);
        }
    }

    return somenh;
}

// Hàm gọi giải mã số mệnh
function GiaiMaSoMenh(somenh) {
    // Giải mã số mệnh
    // (Ví dụ: trả về một thông điệp dựa trên số mệnh)
    var message = "Số mệnh của bạn là: " + somenh;
    return message;
}
