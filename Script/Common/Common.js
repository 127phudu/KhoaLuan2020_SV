//////////////////////// Các hàm chung //////////////////////////////
// Hàm dùng để parse dữ liệu từ Jwt sang json
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Hàm dùng format chuỗi
String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
};

// Hàm dùng để chuyển một chuỗi Date dạng dd/MM/yyyy sang Date object
function convertDate(dateStr){
    let day = dateStr.substr(0,2),
        month = dateStr.substr(3,2),
        year = dateStr.substr(6,4),
        time = dateStr.substr(10,6),
        newDateStr = year + '-' + month + '-' + day + time;

    return new Date(newDateStr);
}

// Parse dữ liệu từ chuỗi sang số
function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;

    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }

    return retValue > 0 ? retValue : defaultValue;
}

var CommonFn = CommonFn || {};

// Hàm dùng login
CommonFn.LoginAjax = function(param, fnCallBack){
    let url = mappingApi.Master.urlLogin;

    $.ajax({
        url: url,
        data: JSON.stringify(param),
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

// Ajax gọi phương thức get
CommonFn.GetAjax = function(url, fnCallBack, async = true){
    var authorization = localStorage.getItem("Authorization");

    if(authorization){
        $.ajax({
            url: url,
            type: "GET",
            async: async,
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                fnCallBack(response);
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }else{
        window.location.replace(Constant.url["Login"]);
    }
}

// ajax gọi phương thức post/put
CommonFn.PostPutAjax = function(type, url, param, fnCallBack, async = true){
    var authorization = localStorage.getItem("Authorization");

    if(authorization){
        $.ajax({
            url: url,
            data: JSON.stringify(param),
            async: async,
            type: type,
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                fnCallBack(response);
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }else{
        window.location.replace(Constant.url["Login"]);
    }
}

///////////////////////// Các hằng số ///////////////////////////////
var Constant = Constant || {};

// Các url để chuyển hướng
Constant.url = {
    Login: "file:///D:/KhoaLuan2020_SV/Index.html",

    StudentRegister: "file:///D:/KhoaLuan2020_SV/View/StudentRegister.html",
    RegisterResult: "file:///D:/KhoaLuan2020_SV/View/RegisterResult.html",
    Home: "file:///D:/KhoaLuan2020_SV/View/Home.html"
}

// pagin phân trang
Constant.urlPaging = "?Size={0}&Page={1}";

///////////////////////// Các Enum //////////////////////////////////
var Enum = Enum || {};

// Enum các loại lỗi
Enum.TypeError = {
    RequireUserName: 0,
    RequirePassWord:1,
    LoginInvalid:2,
    RequireAll:3
}

// Các trạng thái lỗi khi gọi ajax
Enum.StatusResponse = {
    Success: 200,
    NotFound: 404,
    BadRequest: 500
}

// Enum giới tính
Enum.Gender = ["Giới tính","Nam","Nữ","Khác"];

// Text thông báo lỗi
Enum.TypeErrorMessage = ["Tên đăng nhập không được để trống!","Mật khẩu không được để trống!","Tên đăng nhập hoặc mật khẩu không chính xác!",""];

