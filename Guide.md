# Getting Started

MobileAds Ad Creator SDK is built around Javascript Object. In order to use the SDK, you will first need to create a new instance of our object and assign it to a variable. 

```javascript
this.sdk = new madCreator ();
```

So after creating the new instance, you are able to access the methods in the object to create all the input, textarea, select etc HTML element.

## Index 

- [HTML Input Text](#html-input-text)
- [HTML Textarea](#html-textarea)
- [HTML Select](#html-select)
- [HTML Checkboxes](#html-checkboxes)
- [HTML Radio](#html-radio)
- [HTML DOM Element](#html-dom-element)
- [HTML Divider](#html-divider)
- [HTML Section](#html-section)
- [Set Data Structure](#set-data-structure)
- [Set Data To SDL](#set-data-to-sdk)
- [Retrieve Data From SDK](#retrieve-data-from-sdk)
- [Load Js](#load-js)
- [Load Css](#load-css)

## HTML Input Text

![MobileAds Creator Input Text](http://i.imgur.com/EpLEQvT.png)

To create the input above, you will have to call the **getInput** method.

#### Basic Usage

```javascript
var input = this.sdk.getInput ({
    ‘title’ : {
        ‘title’ : ‘Input Text’
    },
    ‘input’ : {
        ‘type’ : ‘text’
    }
});
```

With additional attributes

```javascript
var input = this.sdk.getInput ({
    ‘title’ : {
        ‘title’ : ‘Input Text’,
        ‘class’ : ‘title-class’,
    ‘id’ : ‘title-id’,
    ‘attr’ : ‘title’
    },
    ‘input’ : {
        ‘type’ : ‘text’,
        ‘class’ : ‘input-class’,
    ‘id’ : ‘input-id’,
    ‘attr’ : ‘input’
    }
});
```

The method will **return** the following HTML input element

```html
<div class="innerTinyDivision">
    <span class=”title-class” id=”title-id” attr=”title”>Input Text</span>
    <input type="text" class=”input-class” id=”input-id”>
</div>
```

#### Advance Usage

There are 2 optionals support you can use, and these are available for most of the others method as well, **event** and **setPref**. 

**event** 

This will be the event which can be set to the input itself, such as keyup, blur, enter etc, and it support a callback function on the event.

**setPref** 

Basically this will set the value into the SDK which will later be save into our database on an event type. Of course you can opt for another optional way to set the value into our SDK which we will cover later. Target is the variable to store the value in our SDK.

```javascript 
var input = this.sdk.getInput ({
    ‘title’ : {
        ‘title’ : ‘Input Text’
    },
    ‘input’ : {
        ‘type’ : ‘text’
    },
     'event' : {
        'type' : 'keyup',
        'callback' : function () {
            /* callback */
        }        
    },
    'setPref' : {
        'type' : 'blur',
        'target' : 'text'
    }
});
```

## HTML Textarea

![MobileAds Creator Textarea](http://i.imgur.com/hRDCnyZ.png)

The method to create HTML textarea is **getTextArea**.

#### Basic Usage 

```javascript
var input = this.sdk.getTextArea ({
    ‘title’ : {
        ‘title’ : ‘Textarea Title’
    },
        ‘input’ : {
        ‘type’ : ‘text’
    }
});
```

With additional attributes

```javascript
var input = this.sdk.getTextArea ({
    ‘title’ : {
        ‘title’ : ‘Textarea Title’
        ‘class’ : ‘title-class’,
        ‘id’ : ‘title-id’,
        ‘attr’ : ‘title’
    },
    ‘input’ : {
        ‘class’ : ‘textarea-class’,
        ‘id’ : ‘textarea-id’,
        ‘attr’ : ‘textarea’
    }
});
```

The method will **return** the following HTML textarea element

```html
<div class="innerTinyDivision">
    <span>Textarea Title</span>
    <textarea value="" class="js-textarea" rel="tab-2"></textarea>
</div>
```

#### Advance Usage

**event** 

This will be the event which can be set to the input itself, such as keyup, blur, enter etc, and it support a callback function on the event.

**setPref** 

Basically this will set the value into the SDK which will later be save into our database on an event type. Of course you can opt for another optional way to set the value into our SDK which we will cover later. Target is the variable to store the value in our SDK.

```javascript
var input = this.sdk.getTextArea ({
    ‘title’ : {
        ‘title’ : ‘Textarea Title’
    },
    ‘input’ : {
        ‘type’ : ‘text’
    }, 'event' : {
        'type' : 'keyup',
        'callback' : function () {
            console.log($(this).val());
        }        
    },
    'setPref' : {
        'type' : 'blur',
        'target' : 'text'
    }
});
```

## HTML Select

![MobileAds Creator Select](http://i.imgur.com/Y3XxiAs.png)

#### Basic Usage

All the value parameters are optional.

```javascript
var input = this.sdk.getSelect ({
    ‘title’ : {
        ‘title’ : ‘Select’
    },
    ‘input’ : {
        ‘value’ : ‘val 1’,
        ‘options’ : [
            {‘text’:‘opt 1’, ‘value’:‘val 1’},
            {‘text’:‘opt 1’, ‘value’:‘val 1’}
        ]
    }
});
```

With additional attributes

```javascript
 var input = generator.getSelect ({
‘title’ : {
	‘title’ : ‘Select’,
‘class’ : ‘title-class’,
‘id’ : ‘title-id’,
‘attr’ : ‘title’
},
‘input’ : {
‘value’ : ‘opt 1’,
‘options’ : [
	{‘text’:‘opt 1’, ‘value’:‘val 1’,’class’:‘className’},
	{‘text’:‘opt 1’, ‘value’:‘val 1’,‘class’:‘className’}
],
‘class’ : ‘select-class’,
‘id’ : ‘select-id’,
‘attr’ : ‘select’
}
});
```

The method will **return** the following HTML input element

```html
<div class="innerTinyDivision">
    <span>Select</span>
    <textarea value="" class="js-textarea" rel="tab-2"></textarea>
    <select value="radio 1" rel="tab-1" class="dropDownMenucus">
        <option value="val 1">opt 1</option>
        <option value="val 2">opt 2</option>
    </select>
</div>
```

#### Advance Usage

**events**

_Type_ is the event type such as click, change etc. _callback_ is the function to trigger on event trigger

**setPref** 

_Type_ is the event to trigger save data, and _target_ is the variable name to store the value.

```javascript
var input = this.sdk.getSelect ({
    ‘title’ : {
        ‘title’ : ‘Select’
    },
    ‘input’ : {
        ‘value’ : ‘opt 1’,
        ‘options’ : [
            {‘text’:‘opt 1’, ‘value’:‘val 1’},
            {‘text’:‘opt 1’, ‘value’:‘val 1’}
        ]
    }, 'event' : {
        'type' : 'change',
        'callback' : function () {
            console.log($(this).val());
        }        
    },
    'setPref' : {
        'type' : 'change',
        'target' : 'select'
    }
});
```

## HTML Checkboxes

![MobileAds Creator Checkboxes](http://i.imgur.com/xPh4UDR.png)

#### Basic Usage

The value is optional, it is to checked the checkboxes by default. Title is an optional property in checkboxes. 

```javascript
var input = this.sdk.getCheckboxes ({
    ‘input’ : {
        ‘value’ : [‘one’],
        ‘checkboxes’ : [
            {‘text’:‘selection one’, ‘value’:‘one’},
            {‘text’:‘selection two’, ‘value’:‘two’}
        ]
    }
});
```

With additional attributes

```javascript
var input = this.sdk.getCheckboxes ({
    ‘title’ : {
        ‘title’ : Checkboxes,
        ‘class’ : ‘title-class’,
        ‘id’ : ‘title-id’,
        ‘attr’ : ‘title’
    },
    ‘input’ : {
        ‘value’ : [‘one’],
        ‘checkboxes’ : [
            {‘‘text’:‘selection one’, ‘value’:‘one’,’class’:‘className’},
            {‘text’:‘selection two’, ‘value’:‘two’,‘class’:‘className’}
        ]
    }
});
```

The method will **return** the following HTML input element

```html
<div class="innerTinyDivision">
    <div>
        <input text=" selection one" value="one" type="checkbox">
        <span> selection one</span>
    </div>
    <div>
        <input text=" selection two" value="two" type="checkbox">
        <span> selection one</span>
    </div>
</div>	
```

#### Advance Usage

To set data and add events

```javascript
var input = this.sdk.getCheckboxes ({
    ‘input’ : {
        ‘value’ : [‘one’],
        ‘checkboxes’ : [
            {‘text’:‘selection one’, ‘value’:‘one’},
            {‘text’:‘selection two’, ‘value’:‘two’}
        ]
    }, 'event' : {
        'type' : click,
        'callback' : function () {
            console.log($(this).val());
        }        
    },
    'setPref' : {
        'type' : click,
        'target' : checkboxes
    }
});
```

## HTML Radio

![MobileAds Creator Radio](http://i.imgur.com/zFpjkAg.png)

#### Basic Usage

```javascript
var input = this.sdk.getRadios ({
    ‘input’ : {
        ‘value’ : ‘one’,
        ‘radio’ : [
            {‘text’:radio one’, ‘value’:‘one’, ‘name’:‘name’},
            {‘text’:‘radio two’, ‘value’:‘two’, ‘name’:‘name’}
        ]
    }
});
```

With additional attributes

```javascript
var input = this.sdk.getRadios ({
    ‘title’ : {
        ‘title’ : ’Radio’,
        ‘class’ : ‘title-class’,
        ‘id’ : ‘title-id’,
        ‘attr’ : ‘title’
    },
    ‘input’ : {
        ‘value’ : ‘one’,
        ‘checkboxes’ : [
            {‘text’:radio one’, ‘value’:‘one’, ‘name’:‘name’},
            {‘text’:‘radio two’, ‘value’:‘two’, ‘name’:‘name’}
        ]
    }
});
```

The method will **return** the following HTML input element

```html
<div class="innerTinyDivision">
    <div>
        <input text=" selection one" value="one" type="radio" name="name">
        <span> radio one</span>
    </div>
    <div>
        <input text=" selection two" value="two" type="radio" name="name">
        <span> radio one</span>
    </div>
</div>	
```

#### Advance Usage

To set data and add events

```javascript
var input = this.sdk.getRadios ({
    ‘input’ : {
        ‘value’ : ‘one’,
        ‘radio’ : [
            {‘text’:radio one’, ‘value’:‘one’, ‘name’:‘name’},
            {‘text’:‘radio two’, ‘value’:‘two’, ‘name’:‘name’}
        ]
    }, 'event' : {
        'type' : click,
        'callback' : function () {
            console.log($(this).val());
        }        
    },
    'setPref' : {
        'type' : click,
        'target' : radio
    }
});
```

## HTML DOM Element

If there’s any HTML element which you seek, and we don’t support,  you are able to create using our **getCustom** method. When you are using this method, please let me know the purpose, because we would like to get feedbacks and improve in our SDK.

```javascript
var input = this.sdk.getCustom ({
    ‘title’ : {
        ‘title’ : ’Custom’,
    },
    ‘input’ : ‘Custom can be anything from text, to html tag <input type="text" value="HTML Input"/> and many more.’
});
```
For **getCustom**, we doesn’t support any events or set data, so you will need to prepare the event listener yourself, and set data using our **setPref** method which will be introduce below.

## HTML Image Gallery

This feature allowed users to upload images, and able to select image from a list of updated images. 

![MobileAds Creator Image Gallery Button](http://i.imgur.com/97bvHs4.png)

Image Gallery 

![MobileAds Creator Image Gallery](http://i.imgur.com/lgPBCG8.png)

```javascript
var input = this.sdk.getCustom ({
    ‘title’ : {
        ‘title’ : ‘Image  Title’,
    },
    ‘name’ : ‘image’,
    ‘src’ : ‘http://www.exampla.com/default.jpg’,
    ‘tab’ : this.tab,
    ‘addCallback’ : function () {},
    ‘removeCallback’ : function () {},
    ‘setPref’ : ‘one’,
});
```

**src** 

Default image url to be loaded if any

**tab** 

Please follow back the sample, we are suppose to pass you this.tab to your object.

**addCallback**

Function addCallback will be trigger when user selected an image fron the image gallery.

**removeCallback**

Function removeCallback will be trigger when user deleted the selected image

**setPref** 

Data will be set to the variable name given with the selected image url


## HTML Divider 

This is a simple line to visually divide upper content from the lower content such as

![MobileAds Creator Divider](http://i.imgur.com/MaYVQwJ.png)

```javascript
var divider = this.sdk.getDivider ();

```

## HTML Section

Place HTML element in section.

**Expandable Section**

![MobileAds Creator Expandable Section](http://i.imgur.com/27QdJ9d.png)

**Unexpandable Section**

![MobileAds Creator Unexpandable Section](http://i.imgur.com/O5Uxg6O.png)

**Without Section (for comparison)**

![MobileAds Creator Without Section](http://i.imgur.com/4K6syD6.png)

#### Usage 

**Expandable Section**

Input contains an array of **HTML DOM element**, while expandable content show is to show the content by default.

```javascript
var section = this.sdk.section ({
    ‘title’ : {
        ‘title’ : ‘Section’,
    },
    ’input’ : [text, textarea, select],
    ‘expandable’ : {
        ‘content’ : ‘show’,
    },
});
```

**Unexpandable Section**

Unexpandable section, need only the input.

```javascript
var section = this.sdk.section ({
    ’input’ : [text, textarea, select],
});
```

## Set Data Structure

You will have to set your data structure to our SDK, so when you are trying to set individual data into each property in won’t causes any error. Data structure will have to be **json object** such as the following

```javascript
this.data = {‘text’ : ‘’ , ‘textarea’ : ‘’ , ‘select’ : ‘’}

this.sdk.setPrefStructure (this.data);
```

## Set Data to SDK

To set data into SDK, you can set using the following method. Just pass in the property and value.

```javascript
this.sdk.setPref (‘target’,’value’);
```

## Retrieve Data from SDK

To retrieve data from SDK, please use the following method

```javascript
this.inputValue = this.sdk.getPref (‘target’);
```

## Load Js

To load Js file, with an optional callback function allowed 

```javascript
this.sdk.loadJs('https://code.jquery.com/jquery-1.11.3.min.js', function () {
    /* callback */
});
```

## Load Css

```javascript
this.sdk.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
```

## Questions? Feedbacks?

Please feel free to contact **Ninjoe** @ **_ninjoe@mobileads.com_** or **_joequah1@gmail.com_** or **_joequah1_** in Skype