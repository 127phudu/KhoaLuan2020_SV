// Trang đăng ký thi
class StudentRegisterDetail extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.originData = null;
        this.cacheData = null;
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
        
        me.loadData(createExams2);
    }

    // Thiết lập các config
    getConfig() {
        let object = {
            role: "Student",
            entityName: "studentRegisterDetails"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var studentRegisterDetail = new StudentRegisterDetail("#GridStudentRegisterDetail");
    studentRegisterDetail.loadAjaxData();






