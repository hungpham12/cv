function Validator(options){

    var selectorrule = {};
    function validate(inputElement,rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage ;
        var rules = selectorrule[rule.selector];

        for (var i=0 ; i<rules.length ;++i){
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
             if (errorMessage){
                errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid')
             }else{   
                 errorElement.innerText = '';
                 inputElement.parentElement.classList.remove('invalid')       

                    }     
        return !errorMessage                     
    }
    
    var formElement = document.querySelector(options.form);
    console.log(formElement)
    if (formElement){
        formElement.onclick = ()=>{
           
        }
        var submitBtn = document.querySelector('button')
        var infoList;
       console.log(submitBtn);
        submitBtn.onclick = function(e){
            e.preventDefault()
            var check = true;
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                check = validate(inputElement,rule);
                
            });
            
            if(check){
                document.querySelector('.modal').style.display = 'none'
                var enableInputs = formElement.querySelectorAll('[name]')
                 
                infoList = Array.from(enableInputs).reduce((value, input)=>{
                    value[input.name] = input.value;
                    return value;
                },{});
                renderInfo('.resume_wrapper',infoList)
                download(infoList)
                console.log(infoList)
            }

            
        }
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorrule[rule.selector])){
                selectorrule[rule.selector].push(rule.test);

            } else{
                selectorrule[rule.selector] = [rule.test];
            }
            



            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement,rule);
                   
                }
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
            
        });
    }
}

Validator.isRequired = function(selector, message){
    return {
        selector: selector,
        test : function(value){
                var regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/ ;
                return regex.test(value) ? undefined  : message ||' Please enter the correct format '
        }
    };
}
Validator.isEmail = function(selector ,message){
    return {
        selector: selector,
        test : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value) ? undefined  : message || ' Please enter the correct format'
        }
    };
} 

Validator.isFullname= function(selector,min){
    return {
        selector: selector,
        test : function(value){
                return value.trim() ? undefined : ' Please enter this field'
            
        }
    };
}

Validator.isUsername= function(selector,min){
    return {
        selector: selector,
        test : function(value){
           
                return value.trim() ? undefined : ' Please enter this field'
            
            
        }
    };
}

Validator.isAddress= function(selector,min){
    return {
        selector: selector,
        test : function(value){
           
                return value.trim() ? undefined : ' Please enter this field'
            
            
        }
    };
}

Validator.isAppliedposition= function(selector,min){
    return {
        selector: selector,
        test : function(value){
           
                return value.trim() ? undefined : ' Please enter this field'
            
            
        }
    };
}

function hiddenDiv (btnHidden,groupHidden){
    var btn = document.querySelector(btnHidden);
    
    var group = document.querySelector(groupHidden);
    btn.onclick = () =>{
      group.style.display = 'none'
    }
  }

function displayDiv (classBtn,classDisplay){
    var btn = document.querySelector(classBtn);
    var divGroup = document.querySelector(classDisplay);
    btn.onclick = () =>{
        divGroup.style.display = 'flex';
    }
}
   

   function renderInfo (cvgroup, infoList){
    
    var cvSelector = document.querySelector(cvgroup);

    if(cvSelector){
        // Lưu lại các thẻ có atribute name 
        var inputs = cvSelector.querySelectorAll('[name]')
        console.log(inputs);
        for(var input of inputs){
            input.innerHTML = infoList[input.getAttribute('name')]
        }
    }
}

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');


imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

file.addEventListener('change', function(){

    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); 

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);

    }
});