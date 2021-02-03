let lastN=[]
let parent = document.getElementById('myApp')

class Field extends React.Component {
    render() {
        return <span id="dropZone" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>{this.props.letter}</span>
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
            //console.log("correct");
            event.target.style.color = "#bfcb81";
            setTimeout(function(){
                onCorrect();
                event.target.style.color = "#40c5f2"}, 1000);
        } else {
            //console.log("incorrect");
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
                newWord.push(<Field letter={this.props.letter} onDragOver={this.allowDrop} onDrop={(event)=>this.handleDrop(event, this.props.letter, this.props.onCorrect)}/>)
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
        return <span id={this.props.id} draggable={true} onDragStart={this.props.onDragStart} onTouchEnd= {this.props.onTouchEnd}>{this.props.choice}</span>
    };
};

class Choices extends React.Component{
    handleDrag(event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    handleTouchEnd(event, letter, onCorrect){
        event.preventDefault();
        let container = document.getElementById("dropZone");
        let containerXmin = container.getBoundingClientRect().x;
        let containerXmax = container.getBoundingClientRect().right;
        let containerYmin = container.getBoundingClientRect().y;
        let containerYmax = container.getBoundingClientRect().bottom;
        letter = letter || "";
        let touch = event.changedTouches[0];
        let touchX = touch.clientX;
        let touchY = touch.clientY;
        //console.log(touchX > containerXmin && touchX < containerXmax && touchY > containerYmin && touchY<containerYmax);
        if (touchX > containerXmin && touchX < containerXmax && touchY > containerYmin && touchY < containerYmax){
            //console.log(touchX, touchY);
            container.innerHTML = event.target.innerHTML;
            if (letter.toUpperCase() == container.innerText){
                //console.log("correct");
                container.style.color = "#bfcb81";
                setTimeout(function(){
                    onCorrect();
                    container.style.color = "#40c5f2"}, 1000);
            } else {
                //console.log("incorrect");
                container.style.color = "#e17b89";
            };
        };
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
            <Choice onDragStart={this.handleDrag} onTouchEnd={(event)=>this.handleTouchEnd(event, this.props.letter, this.props.onCorrect)} choice={choices[0]} id="choice1"/> &nbsp; 
            <Choice onDragStart={this.handleDrag} onTouchEnd={(event)=>this.handleTouchEnd(event, this.props.letter, this.props.onCorrect)} choice={choices[1]} id="choice2"/> &nbsp;
            <Choice onDragStart={this.handleDrag} onTouchEnd={(event)=>this.handleTouchEnd(event, this.props.letter, this.props.onCorrect)} choice={choices[2]} id="choice3"/> &nbsp;
            <Choice onDragStart={this.handleDrag} onTouchEnd={(event)=>this.handleTouchEnd(event, this.props.letter, this.props.onCorrect)} choice={choices[3]} id="choice4"/> &nbsp;
            <Choice onDragStart={this.handleDrag} onTouchEnd={(event)=>this.handleTouchEnd(event, this.props.letter, this.props.onCorrect)} choice={choices[4]} id="choice5"/> &nbsp;
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
                <Choices letter={this.state.main.letter} onCorrect={this.newQuiz}/>
                <Word className="item" word={this.state.main.word} letter={this.state.main.letter} onCorrect={this.newQuiz}/>
            </div>
        </div>
        );
    };
};

ReactDOM.render(<Quiz />, parent);