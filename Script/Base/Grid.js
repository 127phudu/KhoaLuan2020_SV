// Lớp dùng để render ra các table
class Grid{
    // Hàm khởi tạo, lúc đầu tuyền id grid
    constructor(gridId){
        this.grid = $(gridId);
        this.columns = this.grid.find(".column");
        this.useCheckBox = this.grid.attr("useCheckBox");
        this.useIndex = this.grid.attr("useIndex");
        this.useDelete = this.grid.attr("useDelete");

        this.render();
        this. initEvent();
    }

    // Hàm dùng để render ra table
    render(){
        let tableWrapper = $("<div class='table-responsive'></div>"),
            table = $("<table class='table'></table>");

        table.append(this.renderHeader());
        tableWrapper.append(table);
        this.grid.html("");
        this.grid.append(tableWrapper);
    }

    // Hàm dùng để render ra tiêu đề bảng
    renderHeader(){
        let grid = this,
            header = $("<thead class='thead-custom'></thead>"),
            row = $("<tr></tr>");

        this.columns.each(function(){
            let dataType = $(this).attr("dataType") || "String",
                element = $("<th></th>").text($(this).text());

            element = grid.addClassFormat(element, dataType);
            row.append(element);
        });

        // Kiểm tra xem có dùng cột số thứ tự không
        if(this.useIndex){
            row.prepend("<th class='text-align-right'>STT</th>");
        }

        // Kiểm tra xem có dùng checkbox không
        if(this.useCheckBox){
            row.prepend("<th></th>");
        }
        // Kiểm tra xem có dùng icon xóa không
        if(this.useDelete){
            row.append("<th></th>");
        }

        header.append(row);
        return header;
    }

    // Hàm dùng để load dữ liệu cho bảng
    loadData(data){
        let grid = this;
        
        if(data){
            let body = $("<tbody></tbody>");
            
            data.forEach(record => {
                body.append(grid.renderBody(record));
            });

            this.grid.find("tbody").remove();
            this.grid.find(".table").append(body);
            // Đánh lại số thứ tự
            this.setIndex();
        }
        this.loadDataComplete();
    }

    // Hàm dùng để render body của bảng
    renderBody(data){
        let grid = this,
            row = $("<tr></tr>");

        this.columns.each(function(){
            let setField = $(this).attr("setField"),
                dataType = $(this).attr("dataType") || "String",
                enumName = $(this).attr("enumName") || "",
                value = grid.getTextValue(dataType, enumName, data[setField]),
                element = $("<td></td>").text(value);

            element = grid.addClassFormat(element, dataType);
            row.append(element);
        });

        // Kiểm tra xem có dùng cột số thứ tự không
        if(this.useIndex){
            row.prepend("<td class='text-align-right index'></td>");
        }
        // Kiểm tra xem có dùng checkbox không
        if(this.useCheckBox){
            if(data.Checked){
                row.prepend("<td><span class='checkbox checked'></span></td>");
                row.addClass("row-focus");
            }else{
                row.prepend("<td><span class='checkbox unchecked'></span></td>");
            }
        }
        // Nếu không được phép sửa
        if(data.Disable){
            row.addClass("rowNotEdit");
        }
        // Kiểm tra xem có dùng icon xóa không
        if(this.useDelete){
            row.append("<td title='Xóa'><span class='glyphicon glyphicon-trash'></span></td>");
        }
        // Set giá trị cho từng row
        row.data("value",data);

        return row;
    }

    // Hàm dùng để format dữ liệu trước khi hiển thị
    getTextValue(dataType, enumName, value){
        if(value){
            switch(dataType){
                case "DateTime":
                    value = value.substr(0,10);
                    break;
                case "Enum":
                    value = Enum[enumName][value];
                    break;
            }
        }

        return value;
    }
    
    // Hàm dùng để đánh số thứ tự
    setIndex(){
        this.grid.find(".index").each(function(index){
            $(this).text(index+1);
        });

        // Thay đổi background các dòng chẵn
        this.grid.find("tr:odd").addClass("table-row-even");
    }
    
    // Hàm dùng để format dữ liệu
    addClassFormat(element, dataType){
        switch(dataType){
            case 'Number':
                element.addClass("text-align-right");
                break;
            case 'DateTime':
                element.addClass("text-align-center");
                break;
        }

        return element;
    }
    
    // Hàm lấy giá trị các bản ghi đang được chọn
    getSelection(){
        let data = [];
        this.grid.find(".row-focus").each(function(){
            let item = $(this).data("value");
            data.push(item);
        });

        return data;
    }

    // Hàm lấy tất cả các bản ghi
    getAllRecord(){
        let data = [];
        this.grid.find("tbody tr").each(function(){
            let item = $(this).data("value");
            data.push(item);
        });

        return data;
    }

    // Khởi tạo các sự kiện
    initEvent(){
        let me = this;
       
        // Sự kiện khi click vào check box ở body
        me.grid.on("click","td .checkbox",function(){
            let className = $(this).attr("class");

            if(className.indexOf("unchecked") != -1){
                $(this).attr("class","checkbox checked");
                $(this).parents("tr").addClass("row-focus");
                let dataRow = $(this).parents("tr").data("value");
                me.submitRow(dataRow);
            }
        });

        // Sự kiện khi click vào icon xóa
        me.grid.on("click","td .glyphicon-trash",function(){
            $(this).parents("tr").remove();
        });
    }

    // Hàm chạy khi load data xong
    loadDataComplete(){}

    // Hàm xử lý khi chọn lịch thi
    submitRow(dataRow){}
}