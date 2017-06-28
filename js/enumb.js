(function( $ ) {

    $.fn.enumb = function(options) {

        var $inputNumber = this;
        generateStructure();
        var $inputWrapper = $inputNumber.parent();
        var $inputMinus = $inputWrapper.find('.number_minus');
        var $inputPlus = $inputWrapper.find('.number_plus');
        var step = parseFloat($inputNumber.attr("step")) || 1;
        var numberOfDecimals = getNumberOfDecimals(step);

        $inputMinus.click(function () {
            substract($(this));
        });

        $inputPlus.click(function () {
            add($(this));
        })


        /* SUBSTRACT */
        function substract(inputMinus) {
            setOldValue(inputMinus.parent().find('input'));
            inputMinus.parent().find('input').val(Number((parseFloat(inputMinus.parent().find('input').val()) - step).toFixed(numberOfDecimals))).change();
        }

        /* ADD */
        function add(inputPlus) {
            setOldValue(inputPlus.parent().find('input'));
            inputPlus.parent().find('input').val(Number((parseFloat(inputPlus.parent().find('input').val()) + step).toFixed(numberOfDecimals))).change();
        }



        /* ON INPUT NUMBER CHANGE */
        $inputNumber.change(function (e) {
            e.preventDefault();
            var minVal = parseFloat($(this).attr('min'));
            var maxVal = parseFloat($(this).attr('max'));
            var currentValue = parseFloat($(this).val());
            if(currentValue < minVal){
                backToOldValue($(this), false, minVal, maxVal);
            }else if(currentValue > maxVal){
                backToOldValue($(this), true, minVal, maxVal);
            }
            if (options !== undefined && options.onChanged !== undefined) {
                options.onChanged($(this), currentValue, minVal, maxVal);
            }

        })



        /* SET OLD VALUE */
        function setOldValue(elementNumber) {
            elementNumber.attr('data-old-value',  elementNumber.val());
        }



        /* BACK TO OLD VALUE */
        function backToOldValue(elementNumber, maxExceed, minVal, maxVal) {
            elementNumber.val(elementNumber.attr('data-old-value'));
            var currentValue = parseFloat(elementNumber.val());
            if(maxExceed != true){
                if (options !== undefined && options.onMinExceed !== undefined) {
                    options.onMinExceed(elementNumber, currentValue, minVal, maxVal);
                }
            }else{
                if (options !== undefined && options.onMaxExceed !== undefined) {
                    options.onMaxExceed(elementNumber, currentValue, minVal, maxVal);
                }
            }
        }



        /* GENERATE INPUT NUMBER STRUCTURE */
        function generateStructure() {
            $inputNumber.wrap('<div class="number_wrap"></div>');
            $inputNumber.parent().append('<button class="number_minus" type="button">-</button><button class="number_plus" type="button">+</button>');
        }


        /* GET NUMBER OF DECIMALS */
        function getNumberOfDecimals(stepValue) {
            return (stepValue.toString().split('.')[1] || []).length;
        }



        /* INPUT VALUES */
        $inputNumber.keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });



        return this;

    };

}( jQuery ));
