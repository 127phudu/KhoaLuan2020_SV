// Trang đăng ký thi
class StudentRegister extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.originData = null;
        this.cacheData = null;
        this.getMapping();
        this.getListSubjectIds()
    }

    //hàm get mapping
    getMapping(){
        let me = this,
            url = mappingApi.Mapping.urlGetMapping;
        CommonFn.GetAjax(url, function (response) {
            me.mapping = {};
            if(response.status == Enum.StatusResponse.Success){
                response.data.forEach(function (map) {
                    me.mapping[map.subjectSemesterId] = map.handleServer;
                })
            }
        });
    }


    //hàm get ListSubjectIds
    getListSubjectIds(){
        let me = this,
            userId = parseInt(localStorage.getItem("UserId")),
            url = mappingApi.Mapping.urlGetListSubjectsId.format(userId);
        CommonFn.GetAjax(url, function (response) {
            if(response.status == Enum.StatusResponse.Success){
                me.listSubjectSemesterIds = response.data;
            }
        });
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        this.loadAjaxDataOnDifferentServers();
        return

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

    loadAjaxDataOnDifferentServers() {
        let me = this;
        me.waitForMapping(function () {
            let promises = [];
            let exams = []
            me.listSubjectSemesterIds.forEach(function (subjectSemesterId) {
                let p = new Promise(function (resolve) {
                    let url;
                    if (typeof me.mapping[subjectSemesterId] == "undefined") {
                        url = mappingApi.Students.defaultServer + mappingApi.Students.pathToGetSubjectSemesterId;
                    } else {
                        url = me.mapping[subjectSemesterId] + mappingApi.Students.pathToGetSubjectSemesterId;
                    }
                    let fullUrl = url.format(subjectSemesterId);
                    CommonFn.GetAjax(fullUrl, function (response) {
                        if(response.status == Enum.StatusResponse.Success){
                            resolve(response.data);
                        }
                    });
                })
                promises.push(p);
            })
            Promise.all(promises).then(listArrayExam => {
                exams = exams.concat(...listArrayExam)
                let data  = me.customData(exams);
                me.originData = JSON.parse(JSON.stringify(data));
                me.cacheData =JSON.parse(JSON.stringify(data));
                me.renderAgainTableData();
            })
        });
    }
   
    // Custom dữ liệu trước khi binding
    customData(data){
        let me = this,
            arrDistinc = [];

        data = data.filter(function(item, index){
            item.TimeExam = item.StartTime.substr(11,5) + '-' + item.EndTime.substr(11,5);
            item.NumberOfStudent = item.NumberOfStudentSubscribe + "/" + item.NumberOfStudent;

            if(!arrDistinc.includes(item.SubjectSemesterId)){
                arrDistinc.push(item.SubjectSemesterId);
                item.SubjectNameShow = item.SubjectName;
                item.SubjectCodeShow = item.SubjectCode + " - " + item.NumberOfCredit;
            }

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

    //check xem đã lấy mapping xong chưa
    waitForMapping(callback) {
        let me = this;
        if(!(me.mapping && me.listSubjectSemesterIds)) {
            setTimeout(function () {
                me.waitForMapping(callback);
            })
        } else {
            callback();
        }
    }
}

    // Khởi tạo trang quản lý Học phần
var studentRegister = new StudentRegister("#GridStudentRegister");







