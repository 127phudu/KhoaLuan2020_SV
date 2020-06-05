// Các api map với chương trình

var mappingApi = {
    Master:{
        urlLogin: "http://dkt.vnu.edu.vn:8080/api/auth/login",    
        urlChangePassword: "",
    },
    Students:{ // Sinh viên
        urlGetData: "http://dkt.vnu.edu.vn:8080/admin/student/all", 
        urlCreate: "http://dkt.vnu.edu.vn:8080/admin/student",      
        urlUpdate: "http://dkt.vnu.edu.vn:8080/admin/student",      
        urlDelete: "http://dkt.vnu.edu.vn:8080/admin/student/list", 
        urlCheckDuplicate: ""
    }
}