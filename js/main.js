class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //Dit wordt 1x uitgevoerd wanneer "new" wordt gebruikt.
    constructor(newName, newHTMLElement,newScore){
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.onclick = this.onCookieClicked;
        this.score = newScore;
    }

    onCookieClicked = () =>{
        this.score.onCookieClicked(this.factor);
    }
}

class Score{
    score;
    name = "";
    htmlElement = undefined;

    constructor(newScore, newName, newHTMLElement){
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newHTMLElement;
        this.htmlElement.innerText = newScore;
    }

    onCookieClicked(factorFromCookie){
        this.score  = this.score + factorFromCookie;
        this.htmlElement.innerText = this.score;
    }

    subtractScore(){
        this.score = this.score - 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClicked(){
        setInterval( () => {
            this.score = this.score + 500;
            this.htmlElement.innerText = this.score;
        }, 10000)
    }
}

class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    bought = false;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onMultiplierClicked;
    }

    onMultiplierClicked = () => {
        if(this.bought === false){
            this.bought = true;
            // remove 100 points from score
            this.cookie.score.subtractScore();
            this.cookie.factor = this.factor;
        }
      
    }
}

class AutoScore {
    htmlElement = undefined;
    score = undefined;
    bought = false;

    constructor(htmlElement, score){
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClicked;
    }

    onAutoScoreClicked = () => {
        if(this.bought === false){
            this.bought = true;
            this.score.subtractScore();
            this.score.onAutoScoreClicked();
        }
    }
}

const score = new Score(555, "Default Score", document.getElementById("js--score"));
const cookie = new Cookie("Default Cookie", document.getElementById("js--cookie"), score);
const jeroen = new Multiplier(document.getElementById("js--multiplier"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"),score);
console.log(auto.score);
