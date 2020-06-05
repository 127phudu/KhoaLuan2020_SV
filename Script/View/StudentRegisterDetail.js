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
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.Students.urlGetDataResult.format(1),
            urlFull = url + Constant.urlPaging.format(1000, 1);

        if(url && semesterId){
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    let data  = me.customData(response.data["RegisterResults"]);
                    
                    me.originData = JSON.parse(JSON.stringify(data));
                    me.cacheData = JSON.parse(JSON.stringify(data));
                    me.loadData(me.cacheData);
                    studentRegister.loadAjaxData();
                }
            });
        }
    }
    
    // Custom dữ liệu trước khi binding
    customData(data){
        let me = this;

        data = data.filter(function(item, index){
            item.TimeExam = item.StartTime.substr(11,5) + '-' + item.EndTime.substr(11,5);
            return item;
        });

        return data;
    }

    // Thiết lập các config
    getConfig() {
        let object = {
            role: "Student",
            entityName: "RegisterResults"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var studentRegisterDetail = new StudentRegisterDetail("#GridStudentRegisterDetail");
    studentRegisterDetail.loadAjaxData();






