# Javascript Tricks & Jugards

## Executing JS Code genrated at runtime
This rarely used pattern is known as function constructor:
<div class="demo-container">
  <iframe src="../../vendor/demoit/index.html?state=../../pages/javascript-tricks/function-constructor.json" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>

## Cloning/Extending objects

A naive implementation:

```
function clone(source, destination) {
  for(var attr in source.prototype){ destination.prototype[attr] = source.prototype[attr];}
}
```

A little robust:
```
function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}
```

Extend as in Typescript:
```
let __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};
```

Usage:
```

```



Spread operator:

```
function clone(source, destination) {
  return {...source, ...destination };
}
```

Object.assing
```
function extend(source, destination) {
  return Object.assing({}, source, destination);
}
```

The jQuery library provides a function called extend which implements prototype inheritance in a robust fashion. It is about 50 lines long and deals with deep copies and null values. The underscore library porovides a similar implimentation.




## Interface or an Abstract class in Javascript

```
class IInterfaceName {
  constructor() {
    if(this.constructor.name === 'IInterfaceName') {
      throw new Error('IInterfaceName is designed to be abstract!');
    }
  }

  requiredFunction() {
    throw new Error('requiredFunction needs to be implemented');
  }
}
```

VSCode Snippet code:
```
	"abstract class": {
		"prefix": "abs-js",
		"body": [
			"class ${1:AbstractClassName} {",
			"  constructor() {",
			"    if(this.constructor.name === '${1:AbstractClassName}') {",
			"      throw new Error('${1:AbstractClassName} is designed to be abstract!');",
			"    }",
			"  }",
			"}"
		],
		"description": "Abstract class in Javascript"
	},
```

## Extend Error class

```
class SpecialError extends Error {
  constructor(name) {
    let msg = `${name} some special error message here.`
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SpecialError);
    }
  }
}

//usage:
throw new SpecialError('test');
```

## Simple Enum in Javascript
```
let enumSize = Object.freeze({
  large: "large",
  medium: "medium",
  small: "small"
});

//usage
console.log(enumSize.large);
```