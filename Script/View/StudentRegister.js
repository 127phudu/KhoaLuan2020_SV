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
            url = mappingApi.Students.urlGetData.format(semesterId),
            urlFull = url + Constant.urlPaging.format(1000, 1);

        if(url && semesterId != 0){
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    let data  = me.customData(response.data["Exams"]);

                    me.originData = JSON.parse(JSON.stringify(data));
                    me.cacheData =JSON.parse(JSON.stringify(data));
                    me.renderAgainTableData();
                }
            });
        }
    }
   
    // Custom dữ liệu trước khi binding
    customData(data){
        let me = this;

        data = data.filter(function(item, index){
            item.TimeExam = item.StartTime.substr(11,5) + '-' + item.EndTime.substr(11,5);
            item.NumberOfStudent = item.NumberOfStudentSubscribe + "/" + item.NumberOfStudent;
            return item;
        });

        return data;
    }

    // Tạo dữ liệu render
    renderAgainTableData(){
        let me = this,
            detail = studentRegisterDetail;
        
        me.cacheData = me.originData.filter(function(item){
            item.Checked = false;
            item.Disable = false;

            detail.cacheData.filter(function(itemDetail){
                // Kiểm tra đã được chọn chưa
                if(item.StartTime == itemDetail.StartTime && item.LocationId == itemDetail.LocationId && item.SubjectSemesterId == itemDetail.SubjectSemesterId){
                    item.Checked = true;
                }
                // Kiểm tra có bị trùng môn không
                if(item.SubjectSemesterId == itemDetail.SubjectSemesterId && (item.StartTime != itemDetail.StartTime || item.LocationId != itemDetail.LocationId)){
                    item.Disable = true;
                }
            });

            // Kiểm tra có bị trùng thời gian không
            if(!item.Checked && !me.validateTimeRange(detail.cacheData, item)){
                item.Disable = true;
            }

            return item;
        });

        me.loadData(me.cacheData);
    }

    // Validate list time
    validateTimeRange(listData, itemData){
        let me = this,
            isValid = true,
            check = true;

            listData.filter(function(item){
                check = me.checkValidTwoDateRange(item, itemData);

                if(check == false){
                    isValid = false;
                }
            });

        return isValid;
    }

    // Kiểm tra hai khoảng thời gian xem có bị giao nhau không
    checkValidTwoDateRange(Range1, Range2){
        let start1 = convertDate(Range1.StartTime),
            end1 = convertDate(Range1.EndTime),
            start2 = convertDate(Range2.StartTime),
            end2 = convertDate(Range2.EndTime);

        if(start1 > end2 || end1 < start2){
            return true;
        }

        return false;
    }

    // Hàm xử lý khi chọn học phần
    submitRow(dataRow){
        let me = this,
            detail = studentRegisterDetail;

        detail.cacheData.push(dataRow);
        detail.loadData(detail.cacheData);
        me.renderAgainTableData();
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







