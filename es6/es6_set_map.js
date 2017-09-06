//map和set数据结构

//set类似数组，但成员的值都是唯一的，没有重复的值，set本身是一个构造函数，用来生成set数据结构
const s = new Set();
[2,3,4,3,5,2,2].forEach(x => s.add(x));

//console.log(s);

for(let i of s){
	//console.log(i);
}

//set值不重复
const set = new Set([1,2,3,4,4])
//console.log([...set]);

const items = new Set([1,2,3,4,5,5,5,5])
//console.log(items);

function divs(){
	return [...document.querySelectorAll('div')]
}

const set1 = new Set(divs());
//console.log(set1)
//console.log(set1.size)

divs().forEach(div => set1.add(div))
//console.log(set1)

var arr = [1,2,3,4,5,6,75,4,3,2,2,1,1, '5', NaN, NaN, undefined, undefined];
//console.log([...new Set(arr)])

//set内部判读两个值是否不同，使用的算法叫做‘same-value equality’ 它类似于精确相等运算符（===），
//主要区别是NaN等于自身，而精确相等运算符任务NaN不等于自身

let set2 = new Set();   //set内部两个NaN是相等的

set2.add({});
set2.add({})
//console.log(set2.size)

//set的属性和方法
/*
set解构的实例有以下属性
Set.prototype.constructor:构造函数，默认就是set函数
Set.prototype.size：返回set实例的成员综述
set实例的方法分为两大类；操作方法（用于操作数据）和遍历方法（用于遍历成员）
四个操作方法
add(value)：添加某个值，返回set结构本身
delete(value) 删除某个值，返回一个布尔值，表示删除是否成功
has(value) 返回一个布尔值，表示该值是否为set函数
clear（）清除所有成员，没有返回值

*/

/*var s3 = new Set();
s3.add(1).add(2).add(2)
console.log(s3);
console.log(s3.size);
console.log(s3.has(1));
console.log(s3.has(2));
console.log(s3.has(3));

console.log(s3.delete(2))
console.log(s3.has(2));
console.log(s3);*/

const item = new Set([1,2,3,4,5]);
const array = Array.from(item);
//console.log(item);
//console.log(array);

/*
遍历操作
set解构的实例有四个遍历方法，可以用于遍历成员
keys()返回键名的遍历器
values()返回键值的遍历器
entries()返回键值对的遍历器
forEach()返回回调函数遍历每个成员

set的遍历顺序就是插值顺序。这个特性有时非常有用，比如用set保存一个回调函数列表，调用时就能保证按照添加顺序调用


*/
let set4 = new Set(['red', 'green', 'blue'])

for(let item of set4){
	//console.log(item)
}

let set5 = new Set([1,2,3]);
//set5.forEach((value,key) => console.log(value * 2))

//遍历的应用
let set6 = new Set(['red', 'green', 'blue'])
let arr1 = [...set6];
//console.log(arr1);


let arr2 = [3,5,2,2,5,5]
let unique = [...new Set(arr2)]
//console.log(unique);

let set7 = new Set([1,2,3])
set7 = new Set([...set7].map(x => x * 2))
console.log(set7);

let set8 = new Set([1,2,3,4,5])
set8 = new Set([...set8].filter(x => (x%2)==0));
//console.log((4%2)==0);




