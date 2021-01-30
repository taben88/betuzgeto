let lastN=[]

let parent = document.getElementById('myApp')

const alphabet = ["a", "á",
    "b",
    "c", "cs",
    "d", "dz", "dzs",
    "e", "é",
    "f",
    "g", "gy",
    "h",
    "i", "í",
    "j",
    "k",
    "l", "ly",
    "m",
    "n", "ny",
    "o", "ó", "ö", "ő",
    "p",
    "q",
    "r",
    "s", "sz",
    "t", "ty",
    "u", "ú", "ü", "ű",
    "v",
    "w",
    "x",
    "y",
    "z", "zs"
];

const words = [
    { letter: 'a', word: 'autó', index: 0 },
    { letter: 'á', word: 'sárkány', index: 1 },
    { letter: 'b', word: 'baba', index: 0 },
    { letter: 'c', word: 'maci', index: 2 },
    { letter: 'cs', word: 'csörgő', index: 0 },
    { letter: 'd', word: 'dínó', index: 0 },
    { letter: 'dz', word: 'dz', index: 0 },
    { letter: 'dzs', word: 'dzs', index: 0 },
    { letter: 'e', word: 'gördeszka', index: 4 },
    { letter: 'é', word: 'építőkocka', index: 0 },
    { letter: 'f', word: 'fényképező', index: 0 },
    { letter: 'g', word: 'gördeszka', index: 0 },
    { letter: 'gy', word: 'gyík', index: 0 },
    { letter: 'h', word: 'helikopter', index: 0 },
    { letter: 'i', word: 'nyuszi', index: 5 },
    { letter: 'í', word: 'síp', index: 1 },
    { letter: 'j', word: 'jojó', index: 0 },
    { letter: 'k', word: 'katona', index: 0 },
    { letter: 'l', word: 'labda', index: 0 },
    { letter: 'ly', word: 'üveggolyó', index: 2 },
    { letter: 'm', word: 'maci', index: 0 },
    { letter: 'n', word: 'fonal', index: 2 },
    { letter: 'ny', word: 'nyuszi', index: 0 },
    { letter: 'o', word: 'katona', index: 3 },
    { letter: 'ó', word: 'szélforgó', index: 8 },
    { letter: 'ö', word: 'gördeszka', index: 1 },
    { letter: 'ő', word: 'repülő', index: 5 },
    { letter: 'p', word: 'fényképező', index: 6 },
    { letter: 'q', word: 'q', index: 0 },
    { letter: 'r', word: 'robot', index: 0 },
    { letter: 's', word: 'sárkány', index: 0 },
    { letter: 'sz', word: 'számítógép', index: 0 },
    { letter: 't', word: 'táska', index: 0 },
    { letter: 'ty', word: 'tyúk', index: 0 },
    { letter: 'u', word: 'ugrókötél', index: 0 },
    { letter: 'ú', word: 'tyúk', index: 2 },
    { letter: 'ü', word: 'üveggolyó', index: 0 },
    { letter: 'ű', word: 'űrhajó', index: 0 },
    { letter: 'v', word: 'vonat', index: 0 },
    { letter: 'w', word: 'w', index: 0 },
    { letter: 'x', word: 'xilofon', index: 0 },
    { letter: 'y', word: 'y', index: 0 },
    { letter: 'z', word: 'zebra', index: 0 },
    { letter: 'zs', word: 'zsiráf', index: 0 }
];

class Field extends React.Component {
    render() {
        return <span id="field" onTouchEnd={this.props.onTouchEnd} onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>{this.props.letter}</span>
    }
};

class Word extends React.Component{
    handleDrop(event, letter, onCorrect) {
        letter = letter || "";
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        let child = document.getElementById(data);
        event.target.innerText=child.innerText;
        if (letter.toUpperCase() == event.target.innerText){
            console.log("correct");
            event.target.style.color = "#bfcb81";
            setTimeout(function(){
                onCorrect();
                event.target.style.color = "#40c5f2"}, 1000);
        } else {
            console.log("incorrect");
            event.target.style.color = "#e17b89";
        };
    };
    
    allowDrop(event) {
        event.preventDefault();
    };

    render(){
        let word = (this.props.word).replace(this.props.letter, "_");
        let newWord = [];
        for (let i of word){
            if (i == "_"){
                newWord.push(<Field letter={this.props.letter} onTouchEnd={this.handleTouchEnd} onDragOver={this.allowDrop} onDrop={(event)=>this.handleDrop(event, this.props.letter, this.props.onCorrect)}/>)
            } else {
                newWord.push(i)
            };
        };
        word = newWord
        return <div id="word">{word}</div>
    }
};

class Choice extends React.Component{
    render(){
        return <span id={this.props.id} draggable={true} onDragStart={this.props.onDragStart}>{this.props.choice}</span>
    };
};

class Choices extends React.Component{
    handleDrag(event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    render(){
        let choices = [this.props.letter];
        let tempAlphabet = [];
        for (let i of alphabet) {
            if (i !== this.props.letter) {
                tempAlphabet.push(i);
            };
        };
        //console.clear();
        for (let index = 0; index < 4; index) {
            let randIndex = Math.floor(Math.random() * tempAlphabet.length);
            let randLetter = tempAlphabet[randIndex];
            if (!(choices.includes(randLetter))) {
                //console.log(randIndex, randLetter);
                choices.push(randLetter);
                index++;
            } else {
                continue
            };
        };
        for (let i = choices.length-1; i > -1; i--) {
            let j = Math.floor(Math.random() * 5);
            [choices[i], choices[j]] = [choices[j], choices[i]];
        };
        //console.log(choices);
    return <div id="choices">
            <Choice onDragStart={this.handleDrag} choice={choices[0]} id="choice1"/> &nbsp; 
            <Choice onDragStart={this.handleDrag} choice={choices[1]} id="choice2"/> &nbsp;
            <Choice onDragStart={this.handleDrag} choice={choices[2]} id="choice3"/> &nbsp;
            <Choice onDragStart={this.handleDrag} choice={choices[3]} id="choice4"/> &nbsp;
            <Choice onDragStart={this.handleDrag} choice={choices[4]} id="choice5"/> &nbsp;
        </div>
    };
};

class Quiz extends React.Component {
    pickRandom = () => {
        let randWordIndex = Math.floor(Math.random() * words.length);
        let randWord = words[randWordIndex];
        //console.log(randWord);
        while(lastN.includes(randWord)){
            randWordIndex = Math.floor(Math.random() * words.length);
            randWord = words[randWordIndex];
            //console.log(randWord);
        };
        if (lastN.length<5){
            lastN.unshift(randWord);
        } else {
            lastN.pop();
            lastN.unshift(randWord);
        };
        //console.log(lastN);
        return randWord;
    };
    state = {
        main: this.pickRandom()
    };
    newQuiz = () => {
        this.setState(
            { main: this.pickRandom() }
        )
    };
    render() {
        return (<div id="main" className="container horizontal">
            <div id="picture" className="container horizontal">
                <img src={"assets/"+this.state.main.word + ".png" || null} alt={this.state.main.word}></img>
            </div>
            <div id="quiz" className="container vertical">
                <Choices letter={this.state.main.letter} />
                <Word className="item" word={this.state.main.word} letter={this.state.main.letter} onCorrect={this.newQuiz}/>
            </div>
        </div>
        );
    };
};

ReactDOM.render(<Quiz />, parent);