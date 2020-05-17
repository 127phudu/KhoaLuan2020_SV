// Form 
class BaseForm{
    // Hàm khởi tạo
    constructor(idForm, width, height){
        this.form = $(idForm);
       
        this.setSizeForm(width, height);
        this.initEvent();
    }

    // Khởi tạo các sự kiện
    initEvent(){
        this.form.draggable();

        this.form.find(".btn-save").off("click");
        this.form.find(".btn-cancel").off("click");
        
        this.form.find(".btn-save").on("click",this.save.bind(this));
        this.form.find(".btn-cancel").on("click",this.close.bind(this));
        this.form.find("input").blur(this.checkStatusInput); 
        this.form.find("input").keyup(this.checkStatusInput); 
    }

    // Kiểm tra xem đã đúng validate chưa
    checkStatusInput(){
        let value = $(this).val(),
            require = $(this).attr("Require");

        if(value.trim() == "" && require){
            $(this).parent().addClass("error-validate");
            $(this).attr("title", "Dữ liệu không được để trống!");
        }else{
            $(this).parent().removeClass("error-validate");
        }
    }
    
    // Validate trước khi save
    validateForm(){
        let me = this,
            isValid = me.validateFormRequire(); // Validate các trường require

            if(isValid){
                isValid = me.validateCustom(); // Validate tùy màn hình khác
            }

        return isValid;
    }

    // Validate form trước khi lưu
    validateFormRequire(){
        let isValid = true;

        this.form.find("input[Require]").each(function(){
            let value = $(this).val();

            if(value.trim() == ""){
                $(this).parent().addClass("error-validate");
                $(this).attr("title", "Dữ liệu không được để trống!");
                isValid = false;
            }else{
                $(this).parent().removeClass("error-validate");
            }
        });

        return isValid;
    }

    // Validate các phần tử khác
    validateCustom(){
        let me = this,
            isValid = true;

        // Duyệt từng phần tử
        this.form.find("input").each(function(){
            let value = $(this).val(),
                setField = $(this).attr("SetField");

            if(value){
                let resultCheck = me.validateItem(value, setField);

                if(!resultCheck.isValid){
                    $(this).parent().addClass("error-validate");
                    $(this).attr("title", resultCheck.tooltip);
                    isValid = false;
                }else{
                    $(this).parent().removeClass("error-validate");
                }
            }
        });

        return isValid;
    }

    // Validate từng phần tử
    validateItem(value, setField){
       return {isValid: true};
    }

    // Hiển thị thông báo cất thành công
    showMessageSuccess(customMessage){
        let message = customMessage || "Cất dữ liệu thành công!";

        $("#success-alert strong").text(message);

        $("#success-alert").fadeTo(1500, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    }

    // Đóng form
    close(){
        this.resetFormData();
        $(".wrapper-form").hide();
    }
    
    // Thiết lập chiều rộng, chiều cao form
    setSizeForm(width, height){
        this.form.width(width);
        this.form.height(height);
    }

    // Lấy dữ liệu cả form
    submitData(){
        let form = this;
        let data = {};

        this.form.find("[SetField]").each(function(){
            let setField = $(this).attr("SetField");

                data[setField] = $(this).val();
        });

        return data;
    }

    // Xóa dữ liệu form
    resetFormData(){
        this.form.find("[SetField]").each(function(){
            $(this).val("");
        });
        this.form.find(".error-validate").removeClass("error-validate");
    }

    save(){}
}