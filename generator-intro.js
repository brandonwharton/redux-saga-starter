// generator function
// * means it's a generator function
function* myFirstGenerator() {
    // yield is the "pause" keyword, it returns what is yielded and can be
    // picked up from there later
    yield 10;
    let name = 'dane';
    yield name;

    yield `My name is ${name} and my number is 10`;
    yield {};
    yield [1, 2, 3];


    // saga
    // yield getRequest
    // yield sendToRedux
}

const lister = myFirstGenerator();
const lister2 = myFirstGenerator();

console.log(lister.next());
console.log(lister.next());

console.log(lister2.next());
console.log(lister.next());
console.log(lister.next());
console.log(lister.next());
console.log(lister.next());



function* getSwitch() {
    while(true) {
        yield 'on';
        yield 'off';
    }
}

const lightSwitch = getSwitch();

console.log(lightSwitch.next());
console.log(lightSwitch.next());
console.log(lightSwitch.next());
console.log(lightSwitch.next());
console.log(lightSwitch.next());
console.log(lightSwitch.next());


