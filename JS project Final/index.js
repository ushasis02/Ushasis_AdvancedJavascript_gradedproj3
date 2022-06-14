var arraystr = ["Spread love everywhere you go. Let no one ever come to you without leaving happier. -Mother Teresa",
                "When you reach the end of your rope, tie a knot in it and hang on. -Franklin D. Roosevelt",
                "Always remember that you are absolutely unique. Just like everyone else. -Margaret Mead",
                "Don't judge each day by the harvest you reap but by the seeds that you plant. -Robert Louis Stevenson",
                "The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
                "Tell me and I forget. Teach me and I remember. Involve me and I learn. -Benjamin Franklin",
                "The best and most beautiful things in the world cannot be seen or even touched, they must be felt with the heart. -Helen Keller",
                "It is during our darkest moments that we must focus to see the light. -Aristotle",
                "Whoever is happy will make others happy too. -Anne Frank",
                "Do not go where the path may lead, go instead where there is no path and leave a trail. -Ralph Waldo Emerson"];

const clickelement = document.getElementById("input");
const displaystr = document.getElementById("textdisplay");
const displaytime = document.getElementById("disp2");
const displayerr = document.getElementById("disp1");
const displayacc = document.getElementById("disp3");
const startpoint = document.getElementById("DisplayArea1");
const endpoint = document.getElementById("ButtonArea");
var status;

class Game{
    status = false;    
    
    constructor(){
        console.log('Game Started');
    }

    start() {
        clickelement.addEventListener('click', (evt)=> { 
            evt.preventDefault(); 
            clickelement.innerText='start typing here....';
            clickelement.style = "pointer-events:none;";
            this.status=true;
            this.bindlisteners();            
        });
    }

    reset(){
        console.log('restarted game');
        this.status = true;
        clickelement.innerText='start typing here....';
        this.bindlisteners();
    }

    bindlisteners(){
        let typestring = arraystr[Math.floor(Math.random()*10)];
        displaystr.innerText=typestring;
                 
        let timeleft = 60;
        var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                game.status=false;
                endframe();
                }
            displaytime.innerText = timeleft+"s";
            timeleft -= 1;
        }, 1000);

        var inputstring ='';
        let error=0;
        let accuracy = 100;
        let index=0;
        let charcnt =0;
        let wrdcnt =0;
   
        document.addEventListener('keypress',function(event){
            if(game.status && index<typestring.length) {
                inputstring+=event.key;
                if(event.key !== typestring[index])
                    error++;
                clickelement.innerText=inputstring;
                index++;
                displayerr.innerText= error;
                displayacc.innerText = Math.floor((inputstring.length - error)/typestring.length*100);
            }
            charcnt = inputstring.length;
            wrdcnt = countwords (inputstring);
            
            function countwords (str){
                const arr = str.split(' ');
                return arr.filter(word => word !== '').length;
            }
        });
        
        function endframe (){   
            document.addEventListener('keypress', (event)=>{event.preventDefault(); });
            let charcard = document.createElement('div');
            charcard.setAttribute('class', 'displaybtn');
            
            let charcardp = document.createElement('p');
            charcardp.setAttribute('class', 'minhead');
            charcardp.innerText='CPM';

            let charcardd = document.createElement('p');
            charcardd.setAttribute('id', 'disp4');
            charcardd.innerText = charcnt;

            charcard.appendChild(charcardp);
            charcard.appendChild(charcardd);

            let wordcard = document.createElement('div');
            wordcard.setAttribute('class', 'displaybtn');

            let wordcardp = document.createElement('p');
            wordcardp.setAttribute('class', 'minhead');
            wordcardp.innerText='WPM';

            let wordcardd = document.createElement('p');
            wordcardd.setAttribute('id', 'disp5');
            wordcardd.innerText = wrdcnt;

            wordcard.appendChild(wordcardp);
            wordcard.appendChild(wordcardd);

            startpoint.appendChild(wordcard);
            startpoint.appendChild(charcard);
            
            displaystr.innerText='Click on restart to start a new game';
            
            let restart = document.createElement('button');
            restart.setAttribute('id', 'btn');
            restart.innerText='Restart'; 
            endpoint.appendChild(restart);
            let btnelement=document.getElementById("btn");
            btnelement.addEventListener('click', ()=>{
                btnelement.style.display='none';
                wordcard.style.display='none';
                charcard.style.display='none';
                startpoint.removeChild(wordcard);
                startpoint.removeChild(charcard);
                endpoint.removeChild(restart);           
                game.reset(); });
        }
    }
}

const game = new Game();
game.start();


