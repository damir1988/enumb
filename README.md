# enumb
 Enumber is a simple jquery plugin that serves as an HTML input[type="number"] element replacement.
 
 # usage
 1. Include enumb.min.js file after jQuery
```javascript
<script src="js/enumb.min.js"></script>
```
2. Init enumb plugin
```html
<input type="text" min="1" max="10" value="1" step="1" class="input_number" />
```
```javascript
$('.input_number').enumb();
```

# callbacks
```javascript
$('.input_number').enumb({
    onMinExceed: function (elem, currentValue, minVal, maxVal) {
        // When current value is smaller than min attr
        console.log('Min exceed', elem, currentValue, minVal, maxVal);
    },
    onMaxExceed: function (elem, currentValue, minVal, maxVal) {
        // When current value is larger than max attr
        console.log('Max exceed', elem, currentValue, minVal, maxVal);
    },
    onChanged: function (elem, currentValue, minVal, maxVal) {
        // Value changed - do something
        console.log('number changed', elem, currentValue, minVal, maxVal);
    }
});
```
 
