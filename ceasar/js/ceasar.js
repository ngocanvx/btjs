// Hàm thực hiện bỏ dấu tiếng Việt
function boDau(str) {
    // Thực hiện phân tách chuỗi tiếng Việt thành các ký tự không dấu kèm với các dấu
    // Chuyển đổi chuỗi thành chữ hoa, loại bỏ dấu và trả về chuỗi không dấu
    // Sử dụng normalize để chuẩn hóa chuỗi và replace để loại bỏ các dấu
    var strKhongDau = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    strKhongDau = strKhongDau.replace(/Đ/g, "D").replace(/đ/g, "d");
    return strKhongDau;
}

// Hàm thực hiện chuyển tiếng Việt có dấu sang dãy ký tự theo kiểu gõ TELEX
function chuyenDauTelex(str) {
    // Ánh xạ các ký tự tiếng Việt có dấu (cả hoa và thường) sang Telex
    const telexMap = {
        'đ': 'dd', 'Đ': 'DD',
        'á': 'as', 'Á': 'AS',
        'à': 'af', 'À': 'AF',
        'ả': 'ar', 'Ả': 'AR',
        'ã': 'ax', 'Ã': 'AX',
        'ạ': 'aj', 'Ạ': 'AJ',

        'â': 'aa', 'Â': 'AA',
        'ấ': 'aas', 'Ấ': 'AAS',
        'ầ': 'aaf', 'Ầ': 'AAF',
        'ẩ': 'aar', 'Ẩ': 'AAR',
        'ẫ': 'aax', 'Ẫ': 'AAX',
        'ậ': 'aaj', 'Ậ': 'AAJ',

        'ă': 'aw', 'Ă': 'AW',
        'ắ': 'aws', 'Ắ': 'AWS',
        'ằ': 'awf', 'Ằ': 'AWF',
        'ẳ': 'awr', 'Ẳ': 'AWR',
        'ẵ': 'awx', 'Ẵ': 'AWX',
        'ặ': 'awj', 'Ặ': 'AWJ',

        'é': 'es', 'É': 'ES',
        'è': 'ef', 'È': 'EF',
        'ẻ': 'er', 'Ẻ': 'ER',
        'ẽ': 'ex', 'Ẽ': 'EX',
        'ẹ': 'ej', 'Ẹ': 'EJ',

        'ê': 'ee', 'Ê': 'EE',
        'ế': 'ees', 'Ế': 'EES',
        'ề': 'eef', 'Ề': 'EEF',
        'ể': 'eer', 'Ể': 'EER',
        'ễ': 'eex', 'Ễ': 'EEX',
        'ệ': 'eej', 'Ệ': 'EEJ',

        'í': 'is', 'Í': 'IS',
        'ì': 'if', 'Ì': 'IF',
        'ỉ': 'ir', 'Ỉ': 'IR',
        'ĩ': 'ix', 'Ĩ': 'IX',
        'ị': 'ij', 'Ị': 'IJ',

        'ó': 'os', 'Ó': 'OS',
        'ò': 'of', 'Ò': 'OF',
        'ỏ': 'or', 'Ỏ': 'OR',
        'õ': 'ox', 'Õ': 'OX',
        'ọ': 'oj', 'Ọ': 'OJ',

        'ô': 'oo', 'Ô': 'OO',
        'ố': 'oos', 'Ố': 'OOS',
        'ồ': 'oof', 'Ồ': 'OOF',
        'ổ': 'oor', 'Ổ': 'OOR',
        'ỗ': 'oox', 'Ỗ': 'OOX',
        'ộ': 'ooj', 'Ộ': 'OOJ',

        'ơ': 'ow', 'Ơ': 'OW',
        'ớ': 'ows', 'Ớ': 'OWS',
        'ờ': 'owf', 'Ờ': 'OWF',
        'ở': 'owr', 'Ở': 'OWR',
        'ỡ': 'owx', 'Ỡ': 'OWX',
        'ợ': 'owj', 'Ợ': 'OWJ',

        'ú': 'us', 'Ú': 'US',
        'ù': 'uf', 'Ù': 'UF',
        'ủ': 'ur', 'Ủ': 'UR',
        'ũ': 'ux', 'Ũ': 'UX',
        'ụ': 'uj', 'Ụ': 'UJ',

        'ư': 'uw', 'Ư': 'UW',
        'ứ': 'uws', 'Ứ': 'UWS',
        'ừ': 'uwf', 'Ừ': 'UWF',
        'ử': 'uwr', 'Ử': 'UWR',
        'ữ': 'uwx', 'Ữ': 'UWX',
        'ự': 'uwj', 'Ự': 'UWJ',

        'ý': 'ys', 'Ý': 'YS',
        'ỳ': 'yf', 'Ỳ': 'YF',
        'ỷ': 'yr', 'Ỷ': 'YR',
        'ỹ': 'yx', 'Ỹ': 'YX',
        'ỵ': 'yj', 'Ỵ': 'YJ' // Ký tự Ỵ (Y có dấu nặng) thường không có trong bộ gõ Telex chuẩn nhưng có thể thêm vào
    };

    // Duyệt qua từng cặp key-value trong telexMap và thực hiện thay thế
    for (const key in telexMap) {
        // Tạo một RegExp object để thay thế toàn bộ (global flag)
        const regex = new RegExp(key, 'g');
        str = str.replace(regex, telexMap[key]);
    }

    return str;
}

function maHoa() {
    // Lấy giá trị từ input và thực hiện mã hóa
    var inputText = document.getElementById("input-txt").value;
    var shift = parseInt(document.getElementById("shift").value);
    var bodau = document.getElementById("bodau").checked;
    var chuyenTELEX = document.getElementById("chuyenTELEX").checked;
    var result = "";

    if (bodau) {
        inputText = boDau(inputText);
    }
    if (chuyenTELEX) {
        inputText = chuyenDauTelex(inputText);
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

// Thực hiện vô hiệu 2 tùy chọn bỏ dấu và dịch ra TELEX
function disableBoDau() {
    var bodau = document.getElementById("bodau");
    if (bodau.checked) {
        document.getElementById("chuyenTELEX").checked = false;
    }
}
function disableDichTelex() {
    var chuyenTELEX = document.getElementById("chuyenTELEX");
    if (chuyenTELEX.checked) {
        document.getElementById("bodau").checked = false;
    }
}

// Gắn sự kiện cho các nút
document.getElementById("bodau").addEventListener("change", disableBoDau);
document.getElementById("chuyenTELEX").addEventListener("change", disableDichTelex);
document.getElementById("mahoa-btn").addEventListener("click", maHoa);
document.getElementById("giaima-btn").addEventListener("click", giaiMa);