class Animal {
    constructor(sound) {
        this.sound = sound;
    }

    speak(msg) {
        return msg.replace(/ /g, ` ${this.sound} `) + ` ${this.sound}`
    }
}

class Lion extends Animal {
    constructor(sound) {
        super(sound);
    }
}

class Tiger extends Animal {
    constructor(sound) {
        super(sound);
    }
}

const lion = new Lion('roar');
console.log(lion.speak("I'm a lion"));

const tiger = new Tiger('grr');
console.log(lion.speak("Lions suck"));