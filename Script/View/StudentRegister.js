// Trang đăng ký thi
class StudentRegister extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this;

        // if(me.config.configUrl.urlGetData && periodExamId){
        //     CommonFn.PostPutAjax("POST", me.config.configUrl.urlGetData, periodExamId, function(response) {
        //         if(response.status == Enum.StatusResponse.Success){
        //             me.loadData(response.Data);
        //         }
        //     });
        // }
        me.loadData(createExams);
    }

    // Thiết lập các config
    getConfig() {
        let object = {
            role: "Student",
            entityName: "studentRegisters",
            formTitle:"Danh sách học phần"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var studentRegister = new StudentRegister("#GridStudentRegister");
    studentRegister.loadAjaxData();







