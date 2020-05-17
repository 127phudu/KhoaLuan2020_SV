// Danh sách sinh viên
var students = [
    {
        Id: "2cec8038-7b92-425f-a47e-1665e69c374a",
        FullName: "Nguyễn Tiến Xuân",
        StudentCode: "STU00001",
        Gender: 1,
        DateOfBirth: "16/08/1998 03:02:09",
        Email: "tienxuantt@gmail.com",
        Course: "K61"
    },
    {
        Id: "67574e8d-d5bc-4ed8-8a70-fa7a2a7608e4",
        FullName: "Nguyễn Mạnh Tùng",
        StudentCode: "STU00002",
        Gender: 1,
        DateOfBirth: "21/01/1997 03:02:09",
        Email: "manhtung@gmail.com",
        Course: "K61"
    },
    {
        Id: "104161c8-8017-4eef-a70f-68a73458739d",
        FullName: "Cao Đức Mạnh",
        StudentCode: "STU00003",
        Gender: 2,
        DateOfBirth: "27/01/1999 03:02:09",
        Email: "caoducmanh@gmail.com",
        Course: "K61"
    },
    {
        Id: "e5c3a07d-22df-4d74-a08b-36d057a6212d",
        FullName: "Đỗ Hoài Thu",
        StudentCode: "STU00004",
        Gender: 2,
        DateOfBirth: "29/02/1998 03:02:09",
        Email: "dohoaithu@gmail.com",
        Course: "K61"
    },
    {
        Id: "a0c6575c-332c-4637-be39-088734e92265",
        FullName: "Nguyễn Đức Tiến",
        StudentCode: "STU00005",
        Gender: 1,
        DateOfBirth: "19/04/1994 03:02:09",
        Email: "ductien@gmail.com",
        Course: "K61"
    }
];

// Các lịch thi
var createExams = [
    {
        Id: 1,
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3304",
        NumberCredit: 3,
        Place: "Đại học ngoại ngữ",
        NumberStudent: 23,
        DateExam: "22/02/2020 01:40",
        TimeExam: "3:30-5:00"
    },
    {
        Id: 2,
        SubjectName: "Đại số",
        SubjectCode: "INT33045",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 21,
        DateExam: "10/02/2020 01:40",
        TimeExam: "13:30-14:00"
    },
    {
        Id: 3,
        SubjectName: "Đường lối cách mạng của ĐCS",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 25,
        DateExam: "04/02/2020 01:40",
        TimeExam: "14:00-15:00"
    },
    {
        Id: 4,
        SubjectName: "Cơ sở dữ liệu",
        SubjectCode: "INT3302",
        NumberCredit: 3,
        Place: "Kí túc xá",
        NumberStudent: 22,
        DateExam: "24/06/2020 01:40",
        TimeExam: "13:30-15:00"
    },
    {
        Id: 1,
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3304",
        NumberCredit: 3,
        Place: "Đại học ngoại ngữ",
        NumberStudent: 23,
        DateExam: "22/02/2020 01:40",
        TimeExam: "3:30-5:00"
    },
    {
        Id: 1,
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3304",
        NumberCredit: 3,
        Place: "Đại học ngoại ngữ",
        NumberStudent: 23,
        DateExam: "22/02/2020 01:40",
        TimeExam: "3:30-5:00"
    },
    {
        Id: 4,
        SubjectName: "Cơ sở dữ liệu",
        SubjectCode: "INT3302",
        NumberCredit: 3,
        Place: "Kí túc xá",
        NumberStudent: 22,
        DateExam: "24/06/2020 01:40",
        TimeExam: "13:30-15:00"
    },
    {
        Id: 1,
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3304",
        NumberCredit: 3,
        Place: "Đại học ngoại ngữ",
        NumberStudent: 23,
        DateExam: "22/02/2020 01:40",
        TimeExam: "3:30-5:00"
    },
    {
        Id: 2,
        SubjectName: "Đại số",
        SubjectCode: "INT33045",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 21,
        DateExam: "10/02/2020 01:40",
        TimeExam: "13:30-14:00"
    },
    {
        Id: 3,
        SubjectName: "Đường lối cách mạng của ĐCS",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 25,
        DateExam: "04/02/2020 01:40",
        TimeExam: "14:00-15:00"
    }
];


// Các lịch thi
var createExams2 = [
    {
        Id: 1,
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3304",
        NumberCredit: 3,
        Place: "Đại học ngoại ngữ",
        NumberStudent: 23,
        DateExam: "22/02/2020 01:40",
        TimeExam: "3:30-5:00"
    },
    {
        Id: 2,
        SubjectName: "Đại số",
        SubjectCode: "INT33045",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 21,
        DateExam: "10/02/2020 01:40",
        TimeExam: "13:30-14:00"
    },
    {
        Id: 3,
        SubjectName: "Đường lối cách mạng của ĐCS",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 25,
        DateExam: "04/02/2020 01:40",
        TimeExam: "14:00-15:00"
    },
    {
        Id: 3,
        SubjectName: "Đường lối cách mạng của ĐCS",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Place: "",
        NumberStudent: 25,
        DateExam: "04/02/2020 01:40",
        TimeExam: "14:00-15:00"
    }
];