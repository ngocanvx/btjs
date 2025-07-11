// Hàm thực hiện bỏ dấu tiếng Việt
function boDau(str) {
    // Thực hiện phân tách chuỗi tiếng Việt thành các ký tự không dấu kèm với các dấu
    // Chuyển đổi chuỗi thành chữ hoa, loại bỏ dấu và trả về chuỗi không dấu
    // Sử dụng normalize để chuẩn hóa chuỗi và replace để loại bỏ các dấu
    var strKhongDau = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    strKhongDau = strKhongDau.replace(/Đ/g, "D").replace(/đ/g, "d");
    return strKhongDau;
}

function maHoa() {
    // Lấy giá trị từ input và thực hiện mã hóa
    var inputText = document.getElementById("input-txt").value;
    var shift = parseInt(document.getElementById("shift").value);
    var bodau = document.getElementById("bodau").checked;
    var result = "";

    if (bodau) {
        inputText = boDau(inputText);
    }

    for (var i = 0; i < inputText.length; i++) {
        var char = inputText.charAt(i);
        // Kiểm tra nếu ký tự là chữ cái
        // Nếu là chữ cái, thực hiện mã hóa Ceasar
        // Nếu không phải chữ cái, giữ nguyên ký tự
        // Sử dụng charCodeAt để lấy mã ASCII của ký tự
        // Tính toán mã mới dựa trên mã ASCII và độ dịch chuyển
        // Chuyển đổi lại thành ký tự bằng String.fromCharCode
        if (char.match(/[a-z]/i)) {
            var code = inputText.charCodeAt(i);
            var base = (char === char.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode(((code - base + shift) % 26) + base);
        } else {
            result += char;
        }
    }
    document.getElementById("result-txt").value = result;
}

function giaiMa() {
    var inputText = document.getElementById("input-txt").value;
    var shift = parseInt(document.getElementById("shift").value);
    var result = "";

    for (var i = 0; i < inputText.length; i++) {
        var char = inputText.charAt(i);
        if (char.match(/[a-z]/i)) {
            var code = inputText.charCodeAt(i);
            var base = (char === char.toUpperCase()) ? 65 : 97;
            result += String.fromCharCode(((code - base - shift + 26) % 26) + base);
        } else {
            result += char;
        }
    }
    document.getElementById("result-txt").value = result;
}

// Gắn sự kiện cho các nút
document.getElementById("mahoa-btn").addEventListener("click", maHoa);
document.getElementById("giaima-btn").addEventListener("click", giaiMa);