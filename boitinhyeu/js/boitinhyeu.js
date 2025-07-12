
// Hàm tính kết quả bói tình yêu
function boiTinhYeu(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy thông tin họ tên người từ các trường nhập liệu
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var result = document.getElementById("result");

    // Gọi hàm giải mã số mệnh và hiển thị kết quả
    GiaiMaSoMenh(name1, name2, result);

};

// Hàm loại bỏ dấu tiếng Việt trong tên
function boiTinhYeuBoDau(name) {
    name = name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    name = name.replace(/Đ/g, "D");
    return name;
}

// Tính số tình yêu giữa hai người dựa trên tên
function tinhSoTinhYeu(name1, name2) {
    var tenchung = boiTinhYeuBoDau(name1) + boiTinhYeuBoDau(name2);
    var somenh = 0;

    // Lấy ra tổng các số Pythagore của từng ký tự trong tên chung
    for (var i = 0; i < tenchung.length; i++) {
        somenh += SoPythagoreKyTu(tenchung[i]);
    }

    // Tính số mệnh bằng cách giảm về một chữ số
    while (somenh > 9) {
        var temp = somenh;
        somenh = 0;
        while (temp > 0) {
            somenh += temp % 10;
            temp = Math.floor(temp / 10);
        }
    }

    // Trả về số mệnh
    console.log("Số mệnh của hai bạn là: " + somenh);
    return somenh;
}

// Hàm gọi giải mã số mệnh
function GiaiMaSoMenh(name1, name2, resultElement) {
    // Giải mã số mệnh
    // (Ví dụ: trả về một thông điệp dựa trên số mệnh)
    // Thực hiện lấy kết quả và hiển thị
    var somenh = tinhSoTinhYeu(name1, name2);

    fetch('./js/boitinhyeu.json')
        .then(response => response.json())
        .then(data => {
            // Tìm thông điệp tương ứng với số mệnh
            const ketqua = data.find(item => parseInt(item.so) === somenh);
            if (ketqua) {
                resultElement.innerHTML = `<h3>Số ý nghĩa của hai bạn: ${somenh}</h3> \n ${ketqua.nd}`;
            } else {
                resultElement.innerHTML = `<h3>Không tìm thấy thông tin cho số mệnh: ${somenh}</h3>`;
            }

            // Hiển thị ý nghĩa số chữ cái
            ynghiaSoChuCai(name1, name2, resultElement);
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu:', error);
            alert("Đã xảy ra lỗi khi lấy thông tin số mệnh.");
        });
}

// Xác định tính cách dựa trên ký tự đầu của tên
function XacDinhTinhCach(hoten) {
    // Bỏ dấu tiếng Việt và chuyển về chữ hoa
    hoten = hoten.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    hoten = hoten.trim(); // Xóa khoảng trắng đầu/cuối

    let tu = hoten.split(/\s+/); // Tách thành mảng các từ
    let ten = tu[tu.length - 1]; // Lấy từ cuối cùng
    switch (ten.charAt(0).toUpperCase()) {
        case 'A': case 'D': case 'O':
            return "Mạnh mẽ, quyết đoán nhưng đôi khi hơi bảo thủ.";
        case 'B': case 'K': case 'T':
            return "Lãng mạn, nhẹ nhàng, dễ bị tổn thương trong tình yêu.";
        case 'C': case 'L': case 'U':
            return "Hòa đồng, vui vẻ, thích một tình yêu đầy màu sắc.";
        case 'E': case 'N': case 'W':
            return "Trí tuệ, sáng tạo, đôi khi thích kiểm soát đối phương.";
        case 'F': case 'O': case 'X':
            return "Đam mê, mãnh liệt, luôn hết mình vì tình yêu.";
        case 'G': case 'P': case 'Y':
            return "Thông minh, lý trí, thích một tình yêu bền vững.";
        case 'H': case 'Q': case 'Z':
            return "Chung thủy, chân thành, đôi khi hơi khô khan.";
        case 'I': case 'R':
            return "Nhạy cảm, dễ xúc động nhưng rất sâu sắc trong tình cảm.";
    }
}


// Ý nghĩa số chữ cái trong tên của 2 người
function ynghiaSoChuCai(name1, name2, resultElement) {
    var soChuCai = 0;

    var tenchung = boiTinhYeuBoDau(name1) + boiTinhYeuBoDau(name2);
    tenchung = boiTinhYeuBoDau(tenchung).toUpperCase().replace(/\s/g, "");

    if (tenchung.length % 2 === 0) {
        // Nếu tổng số ký tự là chẵn, cộng tất cả các ký tự
        resultElement.innerHTML += `<br>Hai bạn có mối quan hệ cân bằng, hòa hợp.`;
        console.log("Số ký tự là chẵn: " + tenchung.length);
    } else {
        resultElement.innerHTML += `<br>Hai bạn có mối quan hệ có nhiều thử thách nhưng cũng đầy đam mê.`;
        console.log("Số ký tự là lẻ: " + tenchung.length);
    }
}


// Trả về số Pythagore của ký tự
function SoPythagoreKyTu(kyTu) {
    const pythagoreMap = {
        A: 1, J: 1, S: 1,
        B: 2, K: 2, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 4,
        E: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, R: 9
    }
    // Trả về giá trị Pythagore tương ứng với ký tự, nếu không có thì trả về 0
    kyTu = kyTu.toUpperCase(); // Chuyển ký tự về chữ hoa để so sánh
    return pythagoreMap[kyTu] || 0;
}

// Hàm xóa kết quả khi người dùng nhập lại thông tin
function xoaKetQua() {
    // Lấy phần tử kết quả
    result = document.getElementById("result");
    // Xóa nội dung của phần tử kết quả
    result.innerHTML = "";
};

// Gán sự kiện click cho các đối tượng cần thiết
window.onload = function () {
    //document.getElementById("submit").addEventListener("click", boiTinhYeu);
    document.getElementById("name1").addEventListener("input", xoaKetQua);
    document.getElementById("name2").addEventListener("input", xoaKetQua);
};