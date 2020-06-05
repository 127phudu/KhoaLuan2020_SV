// Các api map với chương trình

var mappingApi = {
    Master:{
        urlLogin: "http://dkt.vnu.edu.vn:8080/api/auth/login",    
        urlChangePassword: "",
    },
    Students:{ // Sinh viên
        urlGetData: "http://dkt.vnu.edu.vn:8080/student/exam/all/semester/{0}", 
        urlGetDataResult: "http://dkt.vnu.edu.vn:8080/student/student_subject_exam/registered/semester/{0}",      
        urlUpdate: "http://dkt.vnu.edu.vn:8080/student/",      
        urlDelete: "http://dkt.vnu.edu.vn:8080/student//list", 
        urlCheckDuplicate: ""
    }
}