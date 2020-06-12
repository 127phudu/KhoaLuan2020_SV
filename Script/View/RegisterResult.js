// Trang kết quả đăng kí
class RegisterResult extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);
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
                    me.loadData(data);
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
}

// Trang kết quả đăng kí
var registerResult = new RegisterResult("#GridStudentRegisterResult");
    registerResult.loadAjaxData();