;(function($){
    $.extend($.fn, {
        vgoPlugin1: function(option){
            var root = this; //将当前应用对象存入root

            var isok = false; //控制表单提交的开关

            var pwd1; //密码存储
            var defaults = {
                //图片路径
                img_error: "img/error.gif",
                img_success: "img/success.gif",
                oSubmit: '',
                happy:function(){},
                //提示信息
                tips_success: '', //验证成功时的提示信息，默认为空
                tips_required: '不能为空',
                tips_email: '邮箱地址格式有误',
                tips_num: '请填写数字',
                tips_chinese: '请填写中文',
                tips_mobile: '手机号码格式有误',
                tips_idcard: '身份证号码格式有误',
                tips_pwdequal: '两次密码不一致',

                //正则
                reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i,  //验证邮箱
                reg_num: /^\d+$/,                                  //验证数字
                reg_chinese: /^[\u4E00-\u9FA5]+$/,                 //验证中文
                reg_mobile: /^1[3458]{1}[0-9]{9}$/,                //验证手机
                reg_idcard: /^\d{14}\d{3}?\w$/                     //验证身份证
            };
            var opts = $.extend({},defaults , option);//注意这里顺序option在前面
            
            root.find('input').each(function () {
                $(this).blur(function () {
                    isok = true;
                    var _validate = $(this).attr("check"); //获取check属性的值
                    if (_validate) {
                        $(this).addClass('error');
                        var arr = _validate.split(' '); //用空格将其拆分成数组
                        for (var i = 0; i < arr.length; i++) {
                            //逐个进行验证，不通过跳出返回false,通过则继续
                            if (!check($(this), arr[i], $(this).val())){  
                                isok = false;
                                return false;
                            }else{
                                continue;
                            }
                                                       
                        }                                              
                    }            
                })
            })

            function _onSubmit(){                                  
                 root.find('input').each(function () {
                    isok = true;                                    
                    var _validate = $(this).attr("check"); //获取check属性的值
                    if (_validate) {
                        $(this).addClass('error');
                        var arr = _validate.split(' '); //用空格将其拆分成数组
                        for (var i = 0; i < arr.length; i++) {
                            //逐个进行验证，不通过跳出返回false,通过则继续
                            if (!check($(this), arr[i], $(this).val())){  
                                isok = false;
                                return ;
                            }                                                                                
                        }                                                                        
                    }            
            })
                 if(isok){
                    opts.happy.call(root);
                 }

            }

            if(!opts.oSubmit.length <= 0){
                $(opts.oSubmit).on('click',function(){
                    _onSubmit();
                    return isok;
                })
            }else{
                return false;
            } 
            


             var check = function (obj, _match, _val) {
　　　　　　　//根据验证情况，显示相应提示信息，返回相应的值
                switch (_match) {
                    case 'required':
                        return _val ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_required, false);
                    case 'email':
                        return chk(_val, defaults.reg_email) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_email, false);
                    case 'num':
                        return chk(_val, defaults.reg_num) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_num, false);
                    case 'chinese':
                        return chk(_val, defaults.reg_chinese) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_chinese, false);
                    case 'mobile':
                        return chk(_val, defaults.reg_mobile) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_mobile, false);
                    case 'idcard':
                        return chk(_val, defaults.reg_idcard) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_idcard, false);
                    case 'pwd1':
                        pwd1 = _val; //实时获取存储pwd1值
                        return true;
                    case 'pwd2':
                        return pwdEqual(_val, pwd1) ? showMsg(obj, defaults.tips_success, true) : showMsg(obj, defaults.tips_pwdequal, false);
                    default:
                        return true;
                }
            }

            //判断两次密码是否一致(返回bool值)
            var pwdEqual = function(val1, val2) {
                return val1 == val2 ? true : false;
            }


        //正则匹配(返回bool值)
            var chk = function (str, reg) {
                return reg.test(str);
            }

        //显示信息
            var showMsg = function (obj, msg, mark) {             
                //$(obj).next("#errormsg").remove();//先清除
                //var _html = "<span id='errormsg' style='font-size:13px;color:gray;background:url(" + defaults.img_error + ") no-repeat 0 -1px;padding-left:20px;margin-left:5px;'>" + msg + "</span>";
                if (!mark){
                    alert(msg);
                    $(obj).removeClass().addClass('error');                                  
                }else{
                    $(obj).removeClass(); 
                }
                return mark;
            }
     //zheli xie  
           //return isok;
           
          
        }
    })
})(Zepto);




 //$("#box").vgoPlugin1({color:'#369'});