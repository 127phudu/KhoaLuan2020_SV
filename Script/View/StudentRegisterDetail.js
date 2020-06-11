// Trang đăng ký thi
class StudentRegisterDetail extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.originData = null;
        this.cacheData = null;
        this.getSemesterId();
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
            }
        }, false);
    }
   
    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.Students.urlGetDataResult.format(semesterId),
            urlFull = url + Constant.urlPaging.format(1000, 1);

        if(url && semesterId != 0){
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

    // Hàm xử lý xóa dòng trên grid
    removeRowGrid(indexRow){
        let me = this,
            master = studentRegister;
            
        me.cacheData.splice(indexRow,1);
        master.renderAgainTableData();
        me.loadData(me.cacheData);
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






