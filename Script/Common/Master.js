// Lớp dùng cho layout chung các màn hình
class Layout{
    constructor(){
        // Khởi tạo các sự kiện
        this.initEvent();
        this.bindingFullName();
        this.checkRoleUser();
        this.getSemesterId();
    }

    // Hiển thị tên người dùng đăng nhập
    bindingFullName(){
        let fullName = localStorage.getItem("FullName");

        if(fullName){
            $(".fullName-user").text(fullName);
        }
    }

    // Khởi tạo các sự kiện
    initEvent(){
        // Khi click vào thu gọn menu
        $(".header-left").click(this.showMenuBar);

        // Khi bấm đăng xuất
        $(".logout").click(this.logout.bind(this));

        // Khi bấm vào menu
        $(".menu-item").click(this.redirecPage);

        // Khi bấm vào đổi mật khẩu
        $("#menuChangePassword").click(this.changePassword);
    }

    // Hàm xử lý khi đăng xuất
    logout(){
        // Xóa thông tin đăng nhập
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Role");
        // Chuyển tới trang đăng nhập
        window.location.replace(Constant.url["Login"]);
    }

    // Hàm xử lý khi bấm vào menu
    redirecPage(){
        let urlTarget = $(this).attr("key");

        if(urlTarget){
            window.location.replace(Constant.url[urlTarget]);
        }
    }

    // Hàm xử lý khi thay đổi mật khẩu
    changePassword(){
        changePasswordForm.show();
    }

    // Hiển thị và thu gọn menubar
    showMenuBar(){
        $(".body-left").toggleClass("display-none");
    }

    // Kiểm tra quyền truy cập
    checkRoleUser(){
        let role = localStorage.getItem("Role");

        if(role != "Student"){
            window.location.replace(Constant.url["Login"]);
        }
    }

    // Lấy lên ID của kì thi active
    getSemesterId(){
        let me = this,
            url = mappingApi.Students.urlGetSemesterId;

        CommonFn.GetAjax(url, function (response) {
            if(response.status == Enum.StatusResponse.Success){
                if(response.data){
                    localStorage.setItem("SemesterId", response.data.Id);
                }else{
                    localStorage.setItem("SemesterId", 0);
                }

                me.setVisibleLayout(response.data);
            }
        }, false);
    }

    // Set ẩn hiện nếu chưa đến giờ đăng kí
    setVisibleLayout(data){
        if(data){
            $(".layout1").show();
            $(".layout2").hide();
        }else{
            $(".layout1").hide();
            $(".layout2").show();
        }
    }
}

// Khởi tạo một trang layout
var layout = new Layout();
// Danh sách dữ liệu cache
var cacheData = {};

// Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm("#formChangePassword", 500, 233);