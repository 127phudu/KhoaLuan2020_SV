// Trang đăng ký thi
class StudentRegister extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.originData = null;
        this.cacheData = null;
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.Students.urlGetData.format(1),
            urlFull = url + Constant.urlPaging.format(1000, 1);
debugger
        if(url && semesterId){
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data["Exams"]);
                }
            });
        }
    }

    // Thiết lập các config
    getConfig() {
        let object = {
            role: "Student",
            entityName: "Exams"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var studentRegister = new StudentRegister("#GridStudentRegister");







