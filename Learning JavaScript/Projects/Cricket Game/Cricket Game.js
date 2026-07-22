let scoreStr=localStorage.getItem('Score') ;
let score;
resetScore(scoreStr);
function resetScore(scoreStr){
    score=scoreStr?JSON.parse(scoreStr):{
        win:0,
        lost:0,
        tie:0,     
        };
    score.displayScore=function(){
        return `Won: ${score.win}; Lost: ${score.lost}; Tied: ${score.tie}`;
        };
    showResult();
    }


function generateComputerChoice(){
    // To pick a random number and decide Computer's choice
    let randomNumber=Math.random()*3;
    if(randomNumber<=1){
        return'Bat';
        }
    else if(randomNumber<=2){
        return'Ball';
        }
    else{
        return'Stump';
        }
        }
        

function getResult(userMove,computerMove){
    console.log(`User: "${userMove}", Computer: "${computerMove}"`);
    if(userMove===computerMove) {
        score.tie++;
        return `It's a tie`;
        }

    if(userMove==='Bat'){
        if(computerMove==='Ball'){
                score.win++;
                return 'User won!';
                }
        else if(computerMove==='Stump'){
                score.lost++;
                return 'Computer won!';
                }
        }
    else if(userMove==='Ball'){
        if(computerMove==='Stump'){
                score.win++;
                return 'User won!';
                }
        else if(computerMove==='Bat'){
                score.lost++;
                return 'Computer won!';
                }
        }
    else if(userMove==='Stump'){
        if(computerMove==='Bat'){
                score.win++;
                return 'User won!';
                }
        else if(computerMove==='Ball'){
                score.lost++;
                return 'Computer won!';
                }
        }
    }


function showResult(userMove,computerMove,result){
    localStorage.setItem('Score',JSON.stringify(score));

    document.querySelector('#user-move').innerText=userMove? `You have picked ${userMove}`: '';

    document.querySelector('#computer-move').innerText=computerMove? `Computer has picked ${computerMove}`: '';

    document.querySelector('#result').innerText=result||'';

    document.querySelector('#score').innerText=`${score.displayScore()}`;
    }
    