// Các api map với chương trình

var mappingApi = {
    Master:{
        urlLogin: "http://admin.dkt.vnu.edu.vn:8881/admin/auth/login",    
        urlChangePassword: "",
    },
    Students:{ // Sinh viên
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/student/all", 
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",      
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",      
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/student/list", 
        urlCheckDuplicate: ""
    }
}