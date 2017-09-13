/*
proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“原编程（meta programming）”,即对编程语言进行编程
proxy可以理解成，在目标对象之前架设一层“拦截”，外景对该对象的访问，都必须先通过这层拦截，因此提供了一种机制
可以对外界的访问进行过滤和改写。proxy这个词的原意是代理，用在这里表示由他来“代理”某些操作，可以解释为“代理器”
*/

/*var obj = new Proxy({}, {
	get:function(target, key, receiver){
		//console.log(`getting ${key}!`)
		return Reflect.get(target, key, receiver);
	},
	set:function(target, key, value, receiver){
		//console.log(`setting ${key}!`)
		return Reflect.set(target, key, value, receiver);
	}
});*/

/*
上面代码对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为。这里暂时先不解释具体语法
，只看运行结果。对设置了拦截行为的对象obj去读写他的属性，
*/

// obj.count =1;
// ++obj.count;
//console.log(obj)
//上面代码说明proxy实际上虫灾overload了点运算符，即用自己的定义覆盖了语言的原始定义

//var proxy = new Proxy(target, handler);
/*
proxy对象的所有用法，都是上面这种形式，不同的知识handler参数的写法。其中
new Proxy()表示生成一个proxy实例，target参数表示索要拦截的目标对象，handler参数是个对象，用来定制
拦截行为

*/

// var proxy = new Proxy({}, {
// 	get:function(target, prorerty){
// 		return 35;
// 	}
// })

//console.log(proxy.time)
//console.log(proxy.name)
//console.log(proxy.title)

// var target = {}
// var handler = {}
// var proxy1 = new Proxy(target, handler);
// proxy1.a = 'b';
//console.log(target)
//console.log(proxy1)

// var object = {proxy:new Proxy(target, handler)}
// var proxy2 = new Proxy({}, {
// 	get:function(target, property){
// 		return 35;
// 	}
// })
// let obj1 = Object.create(proxy2)
//console.log(obj1.time)

var handler = {
	get:function(target, name){
		if(name==='prototype'){
			return Object.prototype;
		}
		return 'Hello, ' + name;
	},
	apply:function(target, thisBinding, args){
		return args[0];
	},
	construct:function(target, args){
		return {value:args[1]}
	}
}

var fproxy = new Proxy(function(x,y){
	return x + y
}, handler)

//console.log(fproxy(1,2))
//console.log(new fproxy(1,2))
//console.log(fproxy.prototype === Object.prototype)
//console.log(fproxy.foo)

/*
1.get(target,propKey,receiver) 
拦截对象属性的读取，比如proxy.foo和proxy['foo']
最后一个参数receiver是一个对象，可选
2.set(target,propKey,value,receiver)
拦截对象属性的设置，比如proxy.foo = v或者proxy['foo'] = v返回一个布尔值
3.has(target,propKey)
拦截propKey in proxy 的操作，返回一个布尔值
4.deleteProperty(target,propKey)
拦截delete proxy[propKey]的操作，返回一个布尔值
5.ownKeys(target)
拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbol(proxy)、Object.keys()返回一个数组
该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性
6.getOwnPropertyDescriptor(target,propKey)
拦截了Object.getOwnPropertyDescriptor(proxy,propKey)返回属性的描述对象
7.defineProperty(target,propKey,propDesc)
拦截Object.defineProperty(proxy,propKey,propDesc)、Object.defineProperties(proxy,propDescs)返回布尔值
8.preventExtensions(target)
拦截Object.preventEtensions(proxy)返回一个布尔值
9.getPrototypeOf(target)
拦截Object.getPrototypeOf(proxy)返回一个对象
10,isExtensible(target)
拦截Object.isExtensible(proxy)返回一个布尔值
11.setPrototypeOf(target, proto)
拦截Object.setPrototypeOf(proxy,proto)返回一个布尔值
12.apply(target,object,args)
拦截Proxy实例作为函数调用的操作、比如proxy(...args)、proxy.call(object,...args)、proxy.apply




*/

var person = {
	name:'张三'
}

var proxy3 = new Proxy(person, {
	get:function(target, property){
		if(property in target){
			return target[property]
		}else{
			throw new ReferenceError('Property \"' + property + '\" does not exist. ')
		}
	}
})

//console.log(proxy3.name)
//console.log(proxy3.age)


function createArray(...elements){
	let handler = {
		get(target, propKey, receiver){
			let index = Number(propKey);
			if(index<0){
				propKey = String(target.length + index);
			}
			return Reflect.get(target, propKey, receiver)
		}
	}

	let target = []
	target.push(...elements);
	return new Proxy(target, handler)
}

let arr6 = createArray('a', 'b', 'c');
//console.log(arr6[-1]);

var pipe = (function(){
	return function(value){
		var funcStack = [];
		var oproxy = new Proxy({},{
			get:function(pipeObject, fnName){
				if(fnName === 'get'){
					return funcStack.reduce(function(val,fn){
						return fn(val);
					},value)
				}
				funcStack.push(window[fnName])
				//console.log(funcStack)
				return oproxy;
			}
		})
		
		return oproxy;
	}
}())

var double = n => n * 2;//6
var pow = n => n * n;//36  42  
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
//console.log(pipe(3).double.pow.reverseInt.get)

var numbers = [65, 44, 12, 4];
 
function getSum(total, num) {
	debugger
    return total + num;
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum);
}


const dom = new Proxy({},{
	get(target, property){
		return function(attrs={}, ...children){
			//console.log(children)
			const el = document.createElement(property);
			//属性添加
			for(let prop of Object.keys(attrs)){
				el.setAttribute(prop, attrs[prop]);
			}

			for(let child of children){
				if(typeof child === 'string'){
					child = document.createTextNode(child)
				}
				el.appendChild(child)
			}
			return el;
		}
	}
})

const el = dom.div({},
	dom.a({href:'//example.com'}, 'Mark'),
	dom.ul({},
		dom.li({}, 'The web'),
		dom.li({}, 'Food'),
		dom.li({}, '...actually that\'s it')
	)
)

document.body.appendChild(el)

const target = Object.defineProperties({}, {
	foo:{
		value:123,
		writable:false,
		configurable:false
	}
})

const handler1 = {
	get(target, propKey){
		return 'abc'
	}
}

//const proxy = new Proxy(target, handler1)
//proxy.foo


//set
let validator = {
	set:function(obj, prop, value){
		if(prop === 'age'){
			if(!Number.isInteger(value)){
				throw new TypeError('The age is not integer')
			}
			if(value > 200){
				throw new RangeError('The age seems invalid')//invalid 无效
			}
		}
		obj[prop] = value;
	}
}

let person2 = new Proxy({}, validator);


//内部属性
var handler3 = {
	get(target, key){
		console.log(target)
		console.log(key)
		invariant(key, 'get');
		return target[key];
	},
	set(target, key, value){
		invariant(key, 'set');
		target[key] = value;
		return true
	}
}

function invariant(key, action){
	if(key[0] === '_'){
		throw new Error(`Invalid attempt to ${action} private "${key}" property`)
	}
}

var target4 = {}
var proxy4 = new Proxy(target4, handler3);
//proxy4._prop = 3

//proxy apply
// var handler5 = {
// 	apply(target, ctx, args){
// 		return Reflect.apply(...arguments)
// 	}
// }

var target5 = function(){
	console.log('target5')
	return 'I am the target'
}
var handler5 = {
	apply:function(){
		return 'I am the proxy'
	}
}

var p = new Proxy(target5, handler5);
//console.log(p())

var twice = {
	apply(target, ctx, args){
		return Reflect.apply(...arguments) * 2;
	}
}

function sum(left, right){
	return left + right;
}

var proxy6 = new Proxy(sum, twice)
// console.log(proxy6(1,2))
// console.log(proxy6.call(null,5,6))
// console.log(proxy6.apply(null,[7,8]))
// console.log(Reflect.apply(proxy6, null, [9, 10]))


//has 判断是否有某个属性是这个方法生效
var handler6 = {
	has(target, key){
		if(key[0] === '_'){
			return false;
		}
		return key in target;
	}
}

var target6 = {_prop:'foo', prop:'foo'}
var proxy6 = new Proxy(target6, handler6)
//console.log('_prop' in proxy6);

let stu1 = {name:'张三', score:59}
let stu2 = {name:'李四', score:99}

let handler7 = {
	has(target, prop){
		if(prop == 'score' && target[prop] < 60){
			console.log(`${target.name} 不及格`)
			return false;
		}
		return prop in target;
	}
}

let oproxy1 = new Proxy(stu1, handler7)
let oproxy2 = new Proxy(stu2, handler7)
// console.log('score' in oproxy1)
// console.log('score' in oproxy2)

// for(let a in oproxy1){
// 	console.log(oproxy1[a])
// }
// console.log(oproxy1)
// for(let b in oproxy2){
// 	console.log(oproxy2[b])
// }


//construct() 用于拦截new命令
var handler8 = {
	construct(target, args, newTarget){
		return new target(...args)
	}
}

var p1 = new Proxy(function(){}, {
	construct:function(target,args){
		console.log('called: ' + args.join(','))
		return {value:args[0] * 10}
	}
})

//console.log((new p1([1,2,3,4,5])).value)

//deleteProperty()
var handler9 = {
	deleteProperty(target, key){
		invariant(key, 'delete')
		return true
	}
}

function invariant(key, action){
	if(key[0] === "_"){
		throw new Error(`Invalid attempt to ${action} private "${key}" property`)
	}
}


var target9 = {_prop:'foo'}
var proxy9 = new Proxy(target9, handler9);
//console.log(delete proxy9._prop);

var handler10 = {
	defineProperty(target, key, descriptor){
		return false;
	}
}

var target10 = {}
var proxy10 = new Proxy(target10, handler10)
proxy10.foo1 = 'bar'

//getOwnPropertyDescriptor()
var handler11 = {
	getOwnPropertyDescriptor(target, key){
		if(key[0] === '_'){
			return;
		}
		return Object.getOwnPropertyDescriptor(target, key)
	}
}

var target11 = {_foo:'bar', baz:'tar'}
var proxy11 = new Proxy(target11, handler11)
//console.log(Object.getOwnPropertyDescriptor(proxy11, 'wat'))
//console.log(Object.getOwnPropertyDescriptor(proxy11, '_foo'))
//console.log(Object.getOwnPropertyDescriptor(proxy11, 'baz'))

//getPrototypeOf()
/*
Object.prototype.__proto__
Object.prototype.isPrototyeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof
*/

var proto = {aaa:111}
var p12 = new Proxy({}, {
	getPrototypeOf(target){
		return proto;
	}
})

//console.log(Object.getPrototypeOf(p12))

//isExtensible() //判断一个对象是否可扩展

var p13 = new Proxy({}, {
	isExtensible:function(target){
		console.log('called')
		return true;
	}
})
//console.log(Object.isExtensible(p13))

var p14 = new Proxy({}, {
	isExtensible:function(target){
		return false;
	}
})
//console.log(Object.isExtensible(p14))

//ownKeys() 方法用来拦截对象自身属性的读取操作。
/*
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.keys()
*/
let target12 = {
	a:1,
	b:2,
	c:3
}

let handler12 = {
	ownKeys(target){
		return ['a'];
	}
}

let proxy12 = new Proxy(target12, handler12)
//console.log(Object.keys(proxy12))

let target13 = {
	_bar:'foo',
	_prop:'bar',
	prop:'baz'
}

let handler13 = {
	ownKeys(target){
		return Reflect.ownKeys(target).filter(key => key[0] !== '_')
	}
}

let proxy13 = new Proxy(target13, handler13)
for(let key of Object.keys(proxy13)){
	//console.log(target13[key])
}

let target14 = {
	a:1,
	b:2,
	c:3,
	[Symbol.for('secret')]:'4'
}

Object.defineProperty(target14, 'key', {
	enumerable:false,
	configurable:true,
	writable:true,
	value:'static'
})

let handler14 = {
	ownKeys(target){
		console.log(target)
		return ['a', 'd', Symbol.for('secret'), 'key'];
	}
}

let proxy14 = new Proxy(target14, handler14);
//console.log(Object.keys(proxy14))

var p15 = new Proxy({}, {
	ownKeys:function(target){
		return ['a', 'b', 'c']
	}
})

//console.log(Object.getOwnPropertyNames(p15))

//setPrototypeOf  用来拦截Object.setPrototypeOf方法

var handler16 = {
	setPrototypeOf(target, proto){
		throw new Error('Changing the prototype is forbidden')
	}
}
var proto16 = {}
var target16 = function(){}
var proxy16 = new Proxy(target16, handler16);
//console.log(Object.setPrototypeOf(proxy16, proto16))

//Proxy.revocable() 方法返回一个可取消的proxy实例
let target17 = {}
let handler17 = {}

let {proxy, revoke} = Proxy.revocable(target17, handler17)
//console.log(proxy)
//console.log(revoke)
//proxy.foo = 123;
//console.log(proxy.foo);
//revoke();
//proxy.foo








