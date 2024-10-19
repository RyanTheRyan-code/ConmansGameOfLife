conditions = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
];

function DoSomething(that) {
    console.log("Wow");
    that.innerHTML =  ">.<";
}

function genCond(that) {
    let i = Math.floor(Math.random() * 10);
    console.log(i);
    that.innerHTML = conditions[i];
    console.log(conditions[i]);
}