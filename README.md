# MA_Creator_SDK
MobileAds Component Creator SDK



# Requirement

There are a few requirements to follow in order to build the component for MobileAds. 

## MobileAds

Firstly, you will have to understand our basic ad templates. Our ad is made up of up to maximum 4 tabs. So each tabs can contain the same component. So when you are building the creator, please note that the tab #ID is important to differentiate which tab you are in.

![MobileAds 320x250 Template](http://i.imgur.com/TTpHewO.png)

## Directory Structure

Second will be the structure, please refer to the below diagram

![Directory Structure](http://i.imgur.com/FnbD76q.png)

You will need to have the main.js, this main.js will be your main javascript file, and this will be the only which will be loaded in our MobileAds. 

Any additional javascript and/or css files need to be loaded using our SDK method which will be shown later.

## Object Oriented Programming

The main.js has to be coded in object-oriented programming.

```javascript
var Person = function (firstName) {
    this.firstName = firstName;
};

Person.prototype.sayHello = function() {
    console.log("Hello, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");

// call the Person sayHello method.
person1.sayHello(); // logs "Hello, I'm Alice"
person2.sayHello(); // logs "Hello, I'm Bob"
```
For more information, please refer to [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Custom_objects)

# Setup

## Object 

Create an object, which accept a json format variable. In this variable, it will contains all the necessary data.

Following are the basic object you need to start creating the MobileAds Component Creator Panel.

```javascript
var myComponent = function (options) {

	/* initialize SDK */ 
    this.sdk = new madCreator ();

    /* tab identifier */ 
    this.tab = options.tab;

    /* input container */
    this.container = options.container;

    /* ad preview container */
    this.content = options.content;

     /* define the data structure if its empty */
    this.data = Object.keys(options.data).length != 0 ? options.data : {‘text’ : ‘’ , ‘textarea’ : ‘’ , ‘select’ : ‘’};

    /* set data structure to SDK */
    this.sdk.setPrefStructure (this.data);
} 
```

The first script in the object is to initialize our SDK, so you can start using using any method in the SDK.

```javascript
/* initialize SDK */ 
this.sdk = new madCreator();
```

Tab identifier, is used to differentitated the tab which you are in. This is to make sure that we stored the correct data in the correct tab. 

```javascript
/* tab identifier */ 
this.tab = options.tab;
```

Container is where you should render the creator panel HTML Dom element at. More bout rendering will be shown below.

```javascript
/* input container */
this.container = options.container;
```

Content is the container to preview your content, whether onload or on event change on all the HTML input element. So if you have any content to show, this is where you will render in. 

```javascript
/* ad preview container */
this.content = options.content;
```

Set your data or declare a new json format data. Data has to be in json format, and the data is to stored every single data or input for the component.

```javascript
/* define the data structure if its empty */
this.data = Object.keys(options.data).length != 0 ? options.data : {‘text’ : ‘’ , ‘textarea’ : ‘’ , ‘select’ : ‘’};
```

After setting your data, remember to update into SDK.

```javascript 
/* set data structure to SDK */
this.sdk.setPrefStructure (this.data);
```

This conslude the basic setup for the object, every single line is important. Do not miss out any one of them.

## Rendering 

We will set up the function for rendering first.

```javascript
var myComponent = function (options) {

	...
	.
	...
	
    this.render ();
} 

myComponent.prototype.render = function (options) {
    /* rendering */
} 
```
Next we will try with generating a simple HTML input text.

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

After generating the input text, we will have to append it to our container

```javascript
/* append the HTML input element into the container */
this.container.append(input);
```

The above two scripts should be done in function render.

To render the creative in the preview container 

```javascript
this.content.append('Any thing in here');
```
or with the component plugin

```javascript
new componentPlugin({
    container : this.content
});
```

To load Js file, with an optional callback function allowed 

```javascript
this.sdk.loadJs('https://code.jquery.com/jquery-1.11.3.min.js', function () {
    /* callback */
});
```
    
To load Css file
    
```javascript
this.sdk.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
```

And this conclude the basic knowledge in creating MobileAds Component Creator. 

## How To Test?

[Creator Test Page](http://panel.mobileads.com/)

![MobileAds Creator Test Page](http://i.imgur.com/h4TOwg4.png)

1. Host your file in anywhere you like
2. Paste your url link in the first input
3. Input your component app name
4. Input your data structue to test, default data
5. Run

## Questions? Feedbacks?

Please feel free to contact **Ninjoe** @ **_ninjoe@mobileads.com_** or **_joequah1@gmail.com_** or **_joequah1_** in Skype
