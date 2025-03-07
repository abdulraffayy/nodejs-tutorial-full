var a = 5
var b = 11
var c = 13

console.log(a + b + c );

// name printing in nodejs 
const name = 'rafay'
console.log(name)


const data = "dajhsjbfvdvdmfd"
console.log(typeof data)


// array 
const cars =  ["ai", "rafay", "ahmed", "maliks"]
console.log(cars[0, 2])


// mow we added the array push method 

const arraysthing =  ["ai", "rafay", "ahmed", "maliks"]
console.log(arraysthing.push("tesla"))
console.log(arraysthing)


// for loop 


var hour = 5

if(hour < 12) {
    console.log("we are not allowed to")
}

else{
    console.log("we are allowed")
}


// for loop 
var count = 10 

for (var i =  1; i<= count; i++){
    console.log(i)
}



// objected Function 

const person = {
    name: 'Rafay',
    age: 22,
    jobs: 'MERN Stack Developer',
    hobbies: ['reading', 'painting', 'cooking']
};


console.log(person)
console.log(person.age)
console.log(person.hobbies)



// filter function 

const age = [32, 33, 44, 17, 40]
const resut = age.filter(checkAge)

function checkAge (age) {
return age >=18
}


console.log(resut);



