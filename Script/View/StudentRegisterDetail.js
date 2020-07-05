// Trang đăng ký thi
class StudentRegisterDetail extends Grid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.originData = null; // Dữ liệu ban đầu
        this.cacheData = null; // Dữ liệu thay đổi theo người dùng
        this.initEventOther();
    }
    
    // Khởi tạo sự kiện
    initEventOther(){
        let me = this;

        $("#saveRegister").click(me.saveData.bind(this));
    }

    // Lưu kết quả đăng kí
    saveData(){
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.Students.urlRegister.format(semesterId),
            dataSubmit = {
                Register: me.getDataNotInArray(me.cacheData, me.originData, true),
                Cancel: me.getDataNotInArray(me.originData, me.cacheData, false)
            };

            me.saveDataOnDifferentServers(dataSubmit, semesterId);
            return;
            CommonFn.PostPutAjax("POST", url, dataSubmit, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.showMessageSuccess("Lưu kết quả thành công");
                    me.loadAjaxData();
                }
            });
    }

    saveDataOnDifferentServers(dataSubmit, semesterId) {
        let me = this;
        let promises = [];
        dataSubmit.Register.forEach(function (subjectSemesterInfo) {
            let p = new Promise(function (resolve) {
                let dataSplit = {
                    Register: [subjectSemesterInfo],
                    Cancel: []
                };
                let url;
                if (typeof studentRegister.mapping[subjectSemesterInfo.SubjectSemesterId] == "undefined") {
                    url = mappingApi.Students.defaultServer + mappingApi.Students.pathToRegister
                } else {
                    url = studentRegister.mapping[subjectSemesterInfo.SubjectSemesterId] + mappingApi.Students.pathToRegister
                }
                let fullUrl = url.format(semesterId);
                CommonFn.PostPutAjax("POST", fullUrl, dataSplit, function(response) {
                    if(response.status == Enum.StatusResponse.Success){
                        resolve();
                    }
                });
            })
            promises.push(p);
        })
        dataSubmit.Cancel.forEach(function (subjectSemesterInfo) {
            let p = new Promise(function (resolve) {
                let dataSplit = {
                        Register: [],
                        Cancel: [subjectSemesterInfo]
                };
                let url;
                if (typeof studentRegister.mapping[subjectSemesterInfo.SubjectSemesterId] == "undefined") {
                    url = mappingApi.Students.defaultServer + mappingApi.Students.pathToRegister;
                } else {
                    url = studentRegister.mapping[subjectSemesterInfo.SubjectSemesterId] + mappingApi.Students.pathToRegister;
                }
                let fullUrl = url.format(semesterId);
                CommonFn.PostPutAjax("POST", fullUrl, dataSplit, function(response) {
                    if(response.status == Enum.StatusResponse.Success){
                        resolve();
                    }
                });
            })
            promises.push(p);
        })

        Promise.all(promises).then(function () {
            me.showMessageSuccess("Lưu kết quả thành công");
            me.loadAjaxData();
        })
    }

    // Hiển thị thông báo cất thành công
    showMessageSuccess(customMessage){
        let message = customMessage || "Cất dữ liệu thành công!";

        $("#success-alert strong").text(message);

        $("#success-alert").fadeTo(2500, 800).slideUp(800, function(){
            $("#success-alert").slideUp(800);
        });
    }


    // Lấy các phần tử ở mảng from không tồn tại trong mảng to
    getDataNotInArray(fromArr, toArr, isCreate){
        let me = this,
            arrResult = [];

            fromArr.filter(function(item){
                let check = false;

                toArr.filter(function(itemSub){
                    if(item.LocationId == itemSub.LocationId && item.SubjectSemesterId == itemSub.SubjectSemesterId && item.StartTime == itemSub.StartTime){
                        check = true;
                    }
                });

                if(!check){
                    let obj = {
                        LocationId: item.LocationId,
                        SubjectSemesterId: item.SubjectSemesterId,
                        StartTime: item.StartTime
                    };

                    if(!isCreate){
                        obj = {
                            SubjectSemesterId: item.SubjectSemesterId
                        };
                    }

                    arrResult.push(obj);
                }
            });

        return arrResult;
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






