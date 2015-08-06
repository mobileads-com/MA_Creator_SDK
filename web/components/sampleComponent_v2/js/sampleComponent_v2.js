/*
* Sample Component 1 
* 
* NJ
* 27/4/2015
*/
var sampleComponent_v2 = function (options) {
    
    /* Tab ID, preview content and Container */
    this.tab = options.tab;
	this.container = options.container;
    this.content = options.content;
    
    /* initialize component generator */
    this.generator = new madCreator();
    
    /* define the data structure if its empty */
    this.data = Object.keys(options.data).length != 0 ? options.data : {'text':'','textarea':'','select':'','image':'','image_2':''};
    
    /* @NOTE set structure to pref */
    this.generator.setPrefStructure(this.data);
    
    this.render();
}

sampleComponent_v2.prototype.render  = function () {
    
    /* used to replace this when it is not accessible in a function */
    var _this = this;
    
    /* Generate input text */
    var text = this.generator.getInput({
        'title' : {
            'title' : 'Input Text'
        },
        'input' : {
            'type' : 'text',
            'value' : this.data.text
        },
        'event' : {
            'type' : 'keyup',
            'callback' : function () {
                $('#sampleComponent').html('You are typing in input text now : <br>' + $(this).val());
                console.log($(this).val());
            }
        },
        'setPref' : {
            'type' : 'keyup',
            'target' : 'text'
        }
    });
    
    /* Generate textarea */
    var textarea = this.generator.getTextArea({
        'title' : {
            'title' : 'Input Text'
        },
        'input' : {
            'value' : this.data.textarea,
            'class' : 'js-textarea'
        },
        'event' : {
            'type' : 'keyup',
            'callback' : function () {
                $('#sampleComponent').html('You are typing in textarea now : <br>' + $(this).val());
                console.log($(this).val());
            }
        },
        'setPref' : {
            'type' : 'keyup',
            'target' : 'textarea'
        }
    });
    
    /* Generate button */
    var button = this.generator.getButton({
        'title' : {
            'title' : ''
        },
        'input' : {
            'value' : 'Click Me'
        },
        'event' : {
            'type' : 'click',
            'callback' : function () {
                $('#sampleComponent').html('You clicked on button, value ' + $(this).val());
                console.log($('.js-textarea[rel='+_this.tab+']').val());
            }
        }
    });
    
    /* Generate dropdown */
    var selects = this.generator.getSelect({
        'title' : {
			'title' 	: 'Select'
		},
		'input' : {
            'value' : this.data.radio,
			'options'	: [
				{text : 'opt 1', value : 'val 1'},
				{text : 'opt 2', value : 'val 2'}
			]
		},
        'event' : {
            'type' : 'change',
            'callback' : function () {
                $('#sampleComponent').html('You have selected option ' + $(this).val());
                console.log($(this).val());
            }
        },
        'setPref' : {
            'type' : 'change',
            'target' : 'select'
        }
    });

    var file = this.generator.getFile({
        'title' : {
            'title' : 'Upload File'
        },
        'input' : {},
        'event' : {
            'type' : 'change',
            'callback' : function () {
                
                $('#sampleComponent').html('You choosed file ' + $(this).val());
                
                /* Html5 file 
                * https://developer.mozilla.org/en/docs/Using_files_from_web_applications
                * https://scotch.io/tutorials/use-the-html5-file-api-to-work-with-files-locally-in-the-browser
                *
                * scotch.io provided a easy to understand description and examples
                * For more info, please refer to mozilla
                */
                console.log(this.files);
            }
        }
    });
    
    var custom = this.generator.getCustom({
        'title' : {
            'title' : 'Custom Box'
        },
        'input' : '<div id="custom-box" rel="' + this.tab + '" style="  background: lightgrey; width: 91%;height: 100%; padding: 10px;border: 1px solid grey;"></div>'
    });
    
    var image = this.generator.getImages({
        'title' : {
            'title' : 'Image'
        },
        'name' : 'image',
        'src' : this.data.image,
        'tab' : this.tab,
        'addCallback' : function (image) {
            $('#custom-box[rel=' + _this.tab + ']').append('<img src="' + image + '" id="custom-image-1" rel="' + _this.tab + '" style="max-width:100%;margin-bottom:5px;"/>');
        },
        'removeCallback' : function () {
            $('#custom-image-1[rel=' + _this.tab + ']').remove();
        },
        'setPref' : {
            'target' : 'image'
        }
    });
    
    var image_2 = this.generator.getImages({
        'title' : {
            'title' : 'Image_2'
        },
        'name' : 'image_2',
        'src' : this.data.image_2,
        'tab' : this.tab,
        'addCallback' : function (image) {
            $('#custom-box[rel=' + _this.tab + ']').append('<img src="' + image + '" rel="' + _this.tab + '" id="custom-image-2" style="max-width:100%;margin-bottom:5px;"/>');
        },
        'removeCallback' : function () {
            $('#custom-image-2[rel=' + _this.tab + ']').remove();
        },
        'setPref' : {
            'target' : 'image_2'
        }
    });
    
    var divider = this.generator.getDivider();
    
    this.container.append(image);
    this.container.append(image_2);
    this.container.append(custom);
    this.container.append(divider);
    this.container.append(text);
    this.container.append(textarea);
    this.container.append(button);
    this.container.append(divider);
    this.container.append(selects);
    this.container.append(divider);
    this.container.append(file);
    this.container.append(divider);
    
    /* Create your content */
    this.content.append('<div id="sampleComponent" style="background:white;width:100%;height:100%;"></div>');
}