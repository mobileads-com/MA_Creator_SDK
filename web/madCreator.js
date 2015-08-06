/*
* MobileAds Component Creator SDK - version 1.00.00
* Copyright (c) 2015, Ninjoe
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://en.wikipedia.org/wiki/MIT_License
* https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
*/
var madCreator = function () {

}

/* @NOTE @IMAGE Image Input use - Basically Im hacking our image update features, need to rewrite this into object  */
imageInit = false;
imageOptions = {};
imageCallback = {};
imageRemovedCallback = {};

/* Clean Preferences 
* Remove others not selected component's preference
* only the selected component's preferences will be save
*
* Basic structure - {component:'',data:{}}
* With components - {component:'comp_two',data:{'comp_one':{},'comp_two':{},'comp_three':{}}
* Cleaned         - {component:'comp_two',data:{'comp_two':{}}
*
* This method will be invoke during ad save - controller.js search for this method 
*/
var clearPreferences = function () {
    
    /* Checking to make sure existing ad able to save */
    if (preferences['tab-1'].componentContent[26].data == '') {
        return false;
    }
    
    /* @NOTE loop through each preferences */
    for (var i = 1; i <= preferences['tabs'].length; i++) {
        var data = preferences['tab-' + i].componentContent[26].data;

        /* Double checking to make sure existing ad able to save */
        if (data != '' && data != null && typeof data != 'undefined') {
            
            if (typeof data == 'string') {
                data = JSON.parse(decodeURIComponent(data));
            }

            var component = data.component;

            var t = data.data[component];
            data.data = {};
            data.data[component] = t;

            preferences['tab-' + i].componentContent[26].data = encodeURIComponent(JSON.stringify(data));
            
        }
    }
}

/* Set data to pref */
madCreator.prototype.setPref = function (target, value) {
    /* Component ID */
    var component = 26;
    
    /* Get component selected */
    var comp = document.querySelector('.plugablePanel[rel=' + 'tab' + globalvar.selectedTab.number + '] #plugablePanel-container').getAttribute('data-loaded');
    
    var data = preferences[globalvar.selectedTab.id].componentContent[component].data;

    data.data[comp][target] = value;
    
    preferences[globalvar.selectedTab.id].componentContent[component].data = data;
    
    console.log(preferences);
};


/* Set data to pref */
madCreator.prototype.setPrefStructure = function (value) {
    /* Component ID */
    var component = 26;
    
    /* Get component selected */
    var comp = document.querySelector('.plugablePanel[rel=' + 'tab' + globalvar.selectedTab.number + '] #plugablePanel-container').getAttribute('data-loaded');
    
    var data = preferences[globalvar.selectedTab.id].componentContent[component].data;
    
    data.data[comp] = value;
    
    preferences[globalvar.selectedTab.id].componentContent[component].data = data;
};

/* Load Css file */
madCreator.prototype.loadCss = function (file) {
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href  = file;
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);
}

/* Load Js file */
madCreator.prototype.loadJs = function (file, callback) {
	var script,r;
	r = false;
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = file;
	script.onload = script.onreadystatechange = function() {
		if ( !r && (!this.readyState || this.readyState == 'complete') ) {
		  r = true;
		  if(callback != undefined)
		    callback();
		}
	};
	document.getElementsByTagName('head')[0].appendChild(script);
}

/* Get data to pref */
madCreator.prototype.getPref = function (target) {
    var component = 26;
    
    /* Get component selected */
    var comp = document.querySelector('.plugablePanel[rel=' + 'tab' + globalvar.selectedTab.number + '] #plugablePanel-container').getAttribute('data-loaded');
    
    var data = preferences[globalvar.selectedTab.id].componentContent[component].data;

    return data.data[comp][target];
};

/*
* Create the div container for the input
* options - list of elements which will be append to the container
*/
madCreator.prototype.getInputBody = function (options) {
	var body = document.createElement('div');

	body.setAttribute('class','innerTinyDivision');

	for (var index in options) {
		body.appendChild(options[index]);
	}

	return body;
};

/*
* title - string
* input - []
*/
madCreator.prototype.getPanel = function (options) {
    
    var container = document.createElement('div');
    var closeBtn = document.createElement('div');
    var header = document.createElement('div');
    var title = document.createElement('div');
    var drag = document.createElement('div');
    var content = document.createElement('div');
    
    container.className = 'pluggable-popupPanel propertiesPanel ui-draggable ' + options.class;
    //container.setAttribute('rel', globalvar.selectedTab.id);
    container.setAttribute('style', 'width: 289px; top: 628px; right: 10px; z-index: 100; overflow: visible; left: 388px; display: none;');
    closeBtn.className = 'panelCloseBtn pluggable-lgClosebtn';
    //closeBtn.setAttribute('rel', globalvar.selectedTab.id);
    
    header.setAttribute('style', 'height:30px;background-color:#f3f1f2;border:1px solid #b8b4b5;border-bottom:0px;');
    title.setAttribute('style', 'float:left;padding:8px 10px 0px 19px;font-weight:bold;');
    title.innerHTML = options.title;
    drag.className = 'elementsPro_dragme allIcons proPanel_dragMeIcon';
    drag.title = ' Drag &amp; relocate ';
    
    content.setAttribute('style', 'width:247px;overflow: hidden; float: left; border:1px #b8b4b5 solid;padding-right:0px;padding:10px 20px 10px 20px;');
    
     
    var input = options.input;
	for (var i = 0; i < input.length; i++) {
		content.appendChild(input[i]);
	}
    
    header.appendChild(title);
    header.appendChild(drag);
    container.appendChild(closeBtn);
    container.appendChild(header);
    container.appendChild(content);
    
    
    document.getElementById('content').appendChild(container);
    $(".pluggable-popupPanel").draggable({ containment: "#content", handle: ".elementsPro_dragme" });
    $(".pluggable-lgClosebtn").click(function() { // the black arrow icon
        $('.pluggable-popupPanel').hide();
    });

    return container;
};

/*
* Create the div section for the inputs
* title (optional) - {title:''}
* input - [], list of elements which will be append to the container
* expandable (optional) - {'content':''}
*/
madCreator.prototype.section = function (options) {
    console.log(options);
    var body = document.createElement('div');
    body.setAttribute('class','innerSection');
    
    var section = document.createElement('div');
    section.setAttribute('class','section');
    
    if (typeof options.title != 'undefined') {
        /* Create title element */
		var title = this.getInputTitle(options.title);
        
        /* icon */
        var icon = document.createElement('img');
        icon.src = '/images/icons/arrow-down.svg';
        icon.className = 'sectionTitleIcon';
        
        /* title div */
        var titleDiv = document.createElement('div');
        titleDiv.className = 'sectionTitle';
        titleDiv.appendChild(title);
        titleDiv.appendChild(icon);
        
		body.appendChild(titleDiv);

        
        /* Expandable Section */
        if(typeof options.expandable != 'undefined') {
            section.style.display = 'none';
            if(typeof options.content != 'undefined' && options.content == 'show') {
                section.style.display = 'none';
            }
            /* On click event on title to expand and close */
            titleDiv.addEventListener('click', function (e) {
                //var section = e.target.nextSibling;
                $(this).next().slideToggle();
                //section.style.display = section.style.display == 'none' ? 'block' : 'none';
            });
        }
	}

    var input = options.input;
	for (var i = 0; i < input.length; i++) {
		section.appendChild(input[i]);
	}
    body.appendChild(section);

	return body;
};

/*
* Create element for title 
* options - {'title':''} the title text and optionals of attributes for the title
* tooltip (optional) - {'title':'','tooltip':{'title':'','desc':''}}
*/
madCreator.prototype.getInputTitle = function (options) {
	var title = document.createElement('span');

	for (var index in options) {
		if (index != 'title' && index != 'tooltip') {
			title.setAttribute(index, options[index]);
		}
	}

    title.innerHTML = options.title;
    
    /* tooltip */
    if (typeof options.tooltip != 'undefined') {
        var tooltip = document.createElement('img');
        tooltip.src = '/images/qmark.png';
        tooltip.className = 'tooltipsIcon';
        tooltip.setAttribute('rel', options.tooltip.title);
        tooltip.setAttribute('rel', options.tooltip.desc);

        title.appendChild(tooltip);
    }
    
    
	return title;
};

/*
* Create title title 
* options - {title:''}
*/
madCreator.prototype.getTitle = function (options) {
    var title = this.getInputTitle(options.title);

	var body = this.getInputBody({
		title : title
	});

	return body;
};

/*
* Create input tag 
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {type:''} - type is required, and optional id, class, rel etc
* event (optional) -  {type:'', callback: function(){}}
* setPref (optional) - {type:'',target:''}
*/
madCreator.prototype.getInput 	= function (options) {
	
    var _this = this;
    
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('input');

	for (var index in options.input) {
		input.setAttribute(index, options.input[index]);
	}
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);
    
    /* Add Event Listener */
    if (typeof options.event == 'object' && options.event != '') {
        input.addEventListener(options.event.type, options.event.callback);
    }
    
    /* Add event to set pref */
    if (typeof options.setPref == 'object') {
        input.addEventListener(options.setPref.type, function (e) {
            _this.setPref(options.setPref.target, e.target.value);
        });
    }
    
    /* Create body element */
	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Create textarea tag
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {} - optional value, id, class, rel etc
* event (optional) -  {type:'', callback: function(){}}
* setPref (optional) - {type:'',target:''}
*/
madCreator.prototype.getTextArea = function (options) {
	
    var _this = this; 
    
    /* Create title */
	var title = this.getInputTitle(options.title);
	
    var input = document.createElement('textarea');

    /* Add attr to textarea tag */
	for (var index in options.input) {
		input.setAttribute(index, options.input[index]);
	}
    
    /* Insert default value */
    if (typeof options.input.value != 'undefined' && options.input.value != '') {
        input.innerHTML = options.input.value;
    }
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);
    
    /* Add Event Listener */
    if (typeof options.event == 'object') {
        input.addEventListener(options.event.type, options.event.callback);
    }

    /* Add event to set pref */
    if (typeof options.setPref == 'object') {
        input.addEventListener(options.setPref.type, function (e) {
            _this.setPref(options.setPref.target, e.target.value);
        });
    }
    
	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Create button
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {} - optional id, class, rel etc
* event (optional) -  {type:'', callback: function(){}}
*/
madCreator.prototype.getButton 	= function (options) {
	
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('div');

	for (var index in options.input) {
		input.setAttribute(index, options.input[index]);
	}
    
    /* Button required class for styling */
    input.className += ' ad_creator_sub_btn';
    
    if (typeof options.input.value != 'undefined' && options.input.value != '') {
        input.innerHTML = options.input.value;
    }
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);

    /* Add Event Listener */
    if (typeof options.event == 'object') {
        input.addEventListener(options.event.type, options.event.callback);
    }
    
	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Create drop down
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {options : []} - options is required, and optional id, class, rel etc
*        options (required) - each array consists of {value:'',text:''}
* event (optional) -  {type:'', callback: function(){}}
* setPref (optional) - {type:'',target:''}
*/
madCreator.prototype.getSelect 	= function (options) {
	
    var _this = this;
    
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('select');

	for (var index in options.input) {
		if(index != 'options') {
			input.setAttribute(index, options.input[index]);
		}
	}

	var opts = options.input.options;
	for (var index in opts) {
		var opt = document.createElement('option');
		opt.value = opts[index].value;
		opt.text = opts[index].text;

        if (typeof options.input.value != 'undefined' && options.input.value == opts[index].value) {
            opt.selected = true;
        }
        
		input.appendChild(opt);
	}
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);
    input.className += 'dropDownMenucus';

    /* Add Event Listener */
    if (typeof options.event == 'object') {
        input.addEventListener(options.event.type, options.event.callback);
    }
    
    /* Add event to set pref */
    if (typeof options.setPref == 'object') {
        input.addEventListener(options.setPref.type, function (e) {
            _this.setPref(options.setPref.target, e.target.value);
        });
    }
    
	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Create Checkboxes
* title (optional) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {'checkboxes':[]} - each array contains {text:'',value :''} - class, id, rel etc are optionals 
* event (optional) -  {type:'', callback: function(){}} 
* setPref (optional) - {type:'',target:''}
*/
madCreator.prototype.getCheckboxes = function (options) {

    var _this = this; 
    
	var checkboxes = [];

	if (typeof options.title != 'undefined') {
        /* Create title element */
		var title = this.getInputTitle(options.title);
		checkboxes.push(title);
	}
	
	var check = options.input.checkboxes;
	for (var index in check) {
		
        /* Create checbox container */
		var checkboxContainer = document.createElement('div');
		var checkbox = document.createElement('input');
        
		for (var i in check[index]) {
			if (check[index][i] != 'text') {
				checkbox.setAttribute(i, check[index][i]);
			}
		}

		checkbox.setAttribute('type','checkbox');
        /* add tab to rel */
        checkbox.setAttribute('rel', globalvar.selectedTab.id);
        
        var array = options.input.value;
        if (typeof array != 'undefined' && array.indexOf(check[index].value) > -1) {
            checkbox.setAttribute('checked', true);
        }
        
        /* Add Event Listener */
        if (typeof options.event == 'object') {
            checkbox.addEventListener(options.event.type, options.event.callback);
        }
        
        /* Add event to set pref */
        if (typeof options.setPref == 'object') {
            checkbox.addEventListener(options.setPref.type, function (e) {
                
                var checked = e.target.checked;
                var array = _this.getPref(options.setPref.target);
                
                if(typeof array != 'object') {
                    array = [];
                }
                
                var exists = array.indexOf(e.target.value);
                    
                if (checked && exists == -1) {
                    array.push(e.target.value);
                } else if (!checked && exists > -1) {
                    array.splice(exists, 1);
                }
                
                _this.setPref(options.setPref.target, array);
                
            });
        }

		checkboxContainer.appendChild(checkbox);

		/* Checkbox text */
		var text = document.createElement('span');
		text.innerHTML = check[index].text;

		checkboxContainer.appendChild(text);

		checkboxes.push(checkboxContainer);
	}

	var body = this.getInputBody(checkboxes);

	return body;
};

/*
* Create Radio buttons
* title (optional) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {'radio':[]} - each array contains {text:'',value :'',name:''} - class, id, rel etc are optionals 
* event (optional) -  {type:'', callback: function(){}} 
* setPref (optional) - {type:'',target:''}
*/
madCreator.prototype.getRadios 	= function (options) {

    var _this = this;
    
	var radios = [];

	if (typeof options.title != 'undefined') {
        /* Create title element */
		var title = this.getInputTitle(options.title);
		radios.push(title);
	}
	
	var check = options.input.radio;
	for (var index in check) {
		
        /* Create radio container */
		var radioContainer = document.createElement('div');
		var radio = document.createElement('input');

		for (var i in check[index]) {
			if (check[index][i] != 'text') {
				radio.setAttribute(i, check[index][i]);
			}
		}

		radio.setAttribute('type','radio');
        /* add tab to rel */
        radio.setAttribute('rel', globalvar.selectedTab.id);
        
        /* Check radio */
        if (typeof options.input.value != 'undefined' && options.input.value == check[index].value) {
            radio.setAttribute('checked', true);
        }

        /* Add Event Listener */
        if (typeof options.event == 'object') {
            radio.addEventListener(options.event.type, options.event.callback);
        }
        
        /* Add event to set pref */
        if (typeof options.setPref == 'object') {
            radio.addEventListener(options.setPref.type, function (e) {
                _this.setPref(options.setPref.target, e.target.value);
            });
        }
        
		radioContainer.appendChild(radio);

		/* Checkbox text */
		var text = document.createElement('span');
		text.innerHTML = check[index].text;

		radioContainer.appendChild(text);

		radios.push(radioContainer);
	}

	var body = this.getInputBody(radios);

	return body;
};

/*
* Create File Button
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - {} - optional id, class, rel etc
* event (optional) -  {type:'', callback: function(){}}
*/
madCreator.prototype.getFile 	= function (options) {
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('input');

	for (var index in options.input) {
		input.setAttribute(index, options.input[index]);
	}

	input.setAttribute('type','file');
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);
    
    /* Add Event Listener */
    if (typeof options.event == 'object') {
        input.addEventListener(options.event.type, options.event.callback);
    }
    
	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Create Custom Div innerHTML with the input provided
* title (required) - {title:''} - title is required, and optional id, class, rel etc 
* input (required) - string
*/
madCreator.prototype.getCustom 	= function (options) {
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('div');

	input.innerHTML = options.input;
    
    /* add tab to rel */
    input.setAttribute('rel', globalvar.selectedTab.id);

	var body = this.getInputBody({
		title : title,
		input : input
	});

	return body;
};

/*
* Get divider 
*/
madCreator.prototype.getDivider = function () {
	
	var input = document.createElement('div');

    input.setAttribute('class','innerTinyDivision');
    input.setAttribute('style','border-bottom:1px solid #CCCACB;');
    
	return input;
};

/*
*
* name - string, unique name for each image purpose
* tab - this.tab, pass the this.tab 
* addCallback - callback when image selected 
* removeCallback - callback when image removed
* src (optional) - default image url
* setPref (optional) - {target:''}
*/
madCreator.prototype.getImages 	= function (options) {
    
    var _this = this;
    
    var target = options.name;
    
    /* Callback when selected image */
    imageCallback[options.name + globalvar.selectedTab.id] = options.addCallback;
    /* Callback when removed image */
    imageRemovedCallback[options.name + globalvar.selectedTab.id] = options.removeCallback;
    imageOptions[options.name + globalvar.selectedTab.id] = options;
    
    var temp = 
        '<form enctype="multipart/formdata" id="gallery-slideshow-form-endingImage" class="gallery-slideshow-form-endingImage" name="gallery-slideshow-form-endingImage" action="api/image_upload" method="post"> \
            <input type="hidden" name="width" class="imgwidth"> \
            <input type="hidden" name="height" class="imgheight"> \
            <div class="browse endingImage_image_upload"> \
                <div class="ad_creator_sub_btn file_upload_btn" rel="plugable-' + target + ';' + globalvar.selectedTab.id.replace('-','') + '"> Upload Image </div> \
            </div> \
            <div style="float:left;margin-top: 1px;"> \
                <img src="/images/qmark.png" class="tooltipsIcon" rel=" Upload Image " rel2=" Click here to upload images into this tab. <br> We only support <b style=\'color:#D45739\'> .JPG (Best Compatibility) </b> , .GIF, .PNG and .BMP file format. </br> Maximum size is 50KB per image. "> \
            </div> \
            <div class="loader-image"><img src="/images/image-upload-ajax-loader.gif"> Uploading image... </div> \
        </form> \
        <div class="uploaded-images-endingImage" rel="' + target + '" style="width:100%; margin-top:20px;"></div> \
        <div class="multiple-file-upload-msg"></div>';
    
    /* Create title element */
	var title = this.getInputTitle(options.title);
	var input = document.createElement('div');

	input.innerHTML = temp;

    /* Create body element */
	var body = this.getInputBody({
		title : title,
		input : input
	});
    
    /**************************** Events *************************************/

    /* Events on add images */
    if (!imageInit) {
        
        /* Used to check event added for once only, to prevent multiple event added */
        imageInit = true;
        
        /* @NOTE @IMAGE Event on submit selected image - hack the ad selected files event */
        $('.add_images_button').on('click', function (e) {
            
            var totalSelected = $('#gallery_container .selected').length;
            var fileNameArray = new Array();
            var fileNameCroppedArray = new Array();
            var rel = $(this).attr("rel").split(";")[0];
            var type = rel.split('-')[0];
            var target = rel.replace('plugable-','');
            var options = imageOptions[target + globalvar.selectedTab.id];

            /* Show thumbnail below upload button */
            var showImage = function () {

                var currentTab = globalvar.selectedTab.number;
                var currentTabId = globalvar.selectedTab.id;

                $('.second-panel-tab-' + currentTab + ' .uploaded-images-endingImage[rel='+target+']').html('');

                $.each(fileNameArray, function(index, eachUploadedFileName) {
                    var src = eachUploadedFileName;

                    $("#each-uploaded-image-ui").tmpl([{
                        tabid : currentTabId.replace('-', ''),
                        src : src,
                        filename : src.substr(src.lastIndexOf('/') + 1),
                        original : src.replace("thumbnail/",""),
                        cropped : fileNameCroppedArray[index], // let the cropped version to be original first since user has not cropped it yet.
                        x1 : 0,
                        x2 : 0,
                        y1 : 0,
                        y2 : 0
                    }]).appendTo($('.second-panel-tab-' + currentTab + ' .uploaded-images-endingImage[rel='+target+']'));

                    var uploadedImg = $('img[src="' + src + '"]');
                    /* END: placing image to element */

                    //-----------no addition cropping request------------
                    $(uploadedImg).attr({
                        'src' : src + '?refresh=' + rand(10000, 999999),
                        'cropped' : fileNameCroppedArray[index],
                        'x1' : 0,
                        'x2' : 0,
                        'y1' : 0,
                        'y2' : 0,
                        'selectionWidth' : $('#tab' + currentTab + ' .slider').width(),
                        'selectionHeight' : $('#tab' + currentTab + ' .slider').height()
                    }).load(function() {
                        $(this).css("padding-top", (40 - $(this).height() / 2) + "px");
                        $(this).parent().css("background-image", "url(''");
                    });

                    /* @NOTE @IMAGE Change the class name from delete to deletes, this is to remove the original event on delete and replace with little custom */
                    $('.second-panel-tab-' + currentTab + ' .uploaded-images-endingImage[rel='+target+'] .each-uploaded-image .actions .delete').addClass('deletes').removeClass('delete').attr('rel',target);

                    /* Set preference */
                    if (typeof options.setPref == 'object') {
                        _this.setPref(options.setPref.target, encodeURIComponent(fileNameCroppedArray[index]));
                    }
                    
                    /* Image Added Callback */
                    imageCallback[target + globalvar.selectedTab.id](fileNameCroppedArray[index]);
                }); 
            };

            /* Check type is plugable */
            if (type == 'plugable') {
                /* Allowed to select only 1 image */
                if(totalSelected == 1){
                    fileNameArray.push($('#gallery_container .selected').eq(0).find('img').attr('src'));
                    fileNameCroppedArray.push($('#gallery_container .selected').eq(0).find('img').attr('cropped'));


                    showImage();
                    $.fancybox.close( true );
                }else if(totalSelected > 1){
                    alert("You can only select up to maximum 1 image");
                }else{
                    alert("Please select a image.");
                }
            }
        });
    }
    
    /* @NOTE @IMAGE add remove image event - hack the delete image event */
    $(document.body).on('click', '.each-uploaded-image .actions .deletes', function(e) {
        e.stopPropagation();
        var parentObj = $(this);
        var elem = $(this).closest('.item');
        var target = $(this).attr("rel");
        var options = imageOptions[target + globalvar.selectedTab.id];
        
        $.confirm({
            'title' : 'Delete Confirmation',
            'message' : 'You are about to delete this image. <br />It cannot be restored at a later time! Continue?',
            'buttons' : {
                'Yes' : {
                    'class' : 'blue',
                    'action' : function() {

                        elem.slideUp();

                        /* Close */
                        $(parentObj).parent().parent().remove();

                        /* Set preference */
                        if (typeof options.setPref == 'object') {
                            _this.setPref(options.setPref.target, '');
                        }

                        /* Image Remoed Callback */
                        imageRemovedCallback[target + globalvar.selectedTab.id]();
                    }
                },
                'No' : {
                    'class' : 'gray',
                    'action' : function() {
                    }
                }
            }
        });
    });
    
    /**************************** /Events *************************************/
    
    /* Load the default image if there's any */
    if (typeof options.src != 'undefined' && options.src != '') {
        var img = decodeURIComponent(options.src);
        $('.second-panel-tab-' +   options.tab.replace('tab-','') + ' .uploaded-images-endingImage[rel="' + target + '"]').ready(function () {
            $("#each-uploaded-image-ui").tmpl([{
                tabid : options.tab.replace('-',''),
                src : img,
                filename : img.substr(img.lastIndexOf('/') + 1),
                original : img.replace("thumbnail/",""),
                cropped : img,
                x1 : 0,
                x2 : 0,
                y1 : 0,
                y2 : 0
            }]).appendTo($('.second-panel-tab-' +   options.tab.replace('tab-','') + ' .uploaded-images-endingImage[rel="' + target + '"]'));
            
            /* @NOTE @IMAGE Change the class name from delete to deletes, this is to remove the original event on delete and replace with little custom */
            $('.second-panel-tab-' +   options.tab.replace('tab-','') + ' .uploaded-images-endingImage[rel='+target+'] .each-uploaded-image .actions .delete').addClass('deletes').removeClass('delete').attr('rel',target);
            
            /* Callback */
            options.addCallback(img);
            
        });
    }
    
	return body;
};


/*
var container = document.getElementById('container');

	var generator = new madCreator();

	var input = generator.getInput({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : {
			type	: 'text',
			name	: 'input-name',
			id 		: 'input-id',
			class 	: 'input-class'
		}
	});

	var textarea = generator.getTextArea({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : {
			type	: 'text',
			name	: 'input-name',
			id 		: 'input-id',
			class 	: 'input-class'
		}
	});

	var select = generator.getSelect({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : {
			type	: 'text',
			name	: 'input-name',
			id 		: 'input-id',
			class 	: 'input-class',
			options	: [
				{text : 'opt 1', value : 'val 1'},
				{text : 'opt 2', value : 'val 2'}
			]
		}
	});

	var checkboxes = generator.getCheckboxes({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : [
			{text : 'chk 1', value : 'val 1', class : 'chk-class-1'},
			{text : 'chk 2', value : 'val 2', class : 'chk-class-2'}
		]
	});

	var checkboxes2 = generator.getCheckboxes({
		input : [
			{text : 'chk 1', value : 'val 1', class : 'chk-class-1'},
			{text : 'chk 2', value : 'val 2', class : 'chk-class-2'}
		]
	});

	var radios = generator.getRadios({
		title : {
			title 	: 'Radio Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : [
			{text : 'radio 1', value : 'val 1', class : 'radio-class-1', name : 'radio', checked : true},
			{text : 'radio 2', value : 'val 2', class : 'radio-class-2', name : 'radio'}
		]
	});

	var file = generator.getInput({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : {
			type	: 'file',
			name	: 'input-name',
			id 		: 'input-id',
			class 	: 'input-class'
		}
	});

	var custom = generator.getCustom({
		title : {
			title 	: 'Input Title',
			id 		: 'title-id',
			class	: 'title-class'
		},
		input : 'Hello Testing <input type="text"/><input type="checkbox"/><input type="radio"/>'
	});

	container.appendChild(input);
	container.appendChild(textarea);
	container.appendChild(select);
	container.appendChild(checkboxes);
	container.appendChild(checkboxes2);
	container.appendChild(radios);
	container.appendChild(file);
	container.appendChild(custom);
*/