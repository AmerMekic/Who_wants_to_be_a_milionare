const dugmePocetak = document.getElementById('start-bt')
const dugmeSljedece = document.getElementById('next-bt')
const dugmeRestart = document.getElementById('restart-bt')
const dugmePolaPola = document.getElementById('half-half')
const dugmePublika = document.getElementById('audience')
const dugmeOdustani = document.getElementById('odustani-bt')
const dugmePravila = document.getElementById('pravila-bt')
const dugmeProjekat = document.getElementById('projekat-bt')
const audiences = document.getElementById('audiences').getElementsByClassName('audience')
const pitanje = document.getElementById('pitanje')
const bodovi = document.getElementById('bodovi')
const naslov = document.getElementById('naslov')
const novac = [0,100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000] 
var brojac = 0
var osvojeno = 0
var randD 
dugmePolaPola.addEventListener('click', ()=>{
  dugmePolaPola.classList.add('hide')
  var a
  for (let i = 0; i < 4; i++){
    if(parseInt(answers[i].innerHTML) == odgovori[brojac]){
      a = i
    }    
  }
  let b = randomBroj(0, 3)
  while(b==a){
    b = randomBroj(0, 3)
  }
  let c = randomBroj(0, 3)
  while(c==a || c == b){
    c = randomBroj(0,3)
  }
  answers[b].innerHTML = ""
  answers[c].innerHTML = ""
})
dugmePublika.addEventListener('click', ()=>{
  dugmePublika.classList.add('hide')
  var a
  var b = 0
  var c = 0
  var d = 0
  var e = 0
  for (let i = 0; i < 4; i++){
    if(parseInt(answers[i].innerHTML) == odgovori[brojac]){
      a = i
    }    
  }
  for (let i = 0; i < 4; i++){
    if (i==0 && answers[i].innerHTML != ""){
      if(i == a){
        audiences[i].classList.remove('hide')
        b = randomBroj(35, 100)
        audiences[i].innerHTML = "A: " +b +" %"
      }
      else{
        audiences[i].classList.remove('hide')
        b = randomBroj(10, 30)
        audiences[i].innerHTML = "A: " +b +" %"
      }
    }
    else if (i==1 && answers[i].innerHTML != ""){
      if(i == a){
        audiences[i].classList.remove('hide')
        c = randomBroj(35,100) - b
        audiences[i].innerHTML = "B: " +c +" %"
      }
      else{
        audiences[i].classList.remove('hide')
        c = randomBroj(10, 30) 
        audiences[i].innerHTML = "B: " +c +" %"
        
      }
    }
    else if (i==2 && answers[i].innerHTML != ""){
      if(i == a){
        audiences[i].classList.remove('hide')
        d = randomBroj(35, 100) - b - c
        audiences[i].innerHTML = "C: " +d +" %"
      }
      else{
        audiences[i].classList.remove('hide')
        d = randomBroj(10, 30) 
        audiences[i].innerHTML = "C: " +d +" %"
      }
    }
    else if (i==3 && answers[i].innerHTML != ""){
      audiences[i].classList.remove('hide')
      e = 100 - b - c- d
      audiences[i].innerHTML = "D: " +e +" %"
    }
  }
})
dugmePocetak.addEventListener('click', pocetakIgre)
dugmeSljedece.addEventListener('click', sljedecePitanje)
dugmeRestart.addEventListener('click', () =>{
  alert("Osvojili ste " +osvojeno+ " KM")
  location.reload()
})
dugmePravila.addEventListener('click', ()=>{
  window.location.href = "pravila.html"
})
dugmeProjekat.addEventListener('click', ()=>{
  window.location.href = "projekat.html"
})
dugmeOdustani.addEventListener('click', () =>{
  alert("Osvojili ste " +novac[brojac]+ " KM. Hvala na igranju.")
  location.reload()
})
const questionContainerElement = document.getElementById('question-container')
const answerContainerElement = document.getElementById('ans-bt')
const questionElement = document.getElementById('question')
var answers = answerContainerElement.getElementsByClassName('bt')
answerContainerElement.addEventListener("click", izaberiOdgovor)
function izaberiOdgovor(e){

  let odgovor = e.target
  if(odgovor.tagName != "BUTTON"){return}
  highlight(odgovor)

}
function highlight(btn){
  if(selectedbtn){
    return
  }
  selectedbtn = btn
  console.log(selectedbtn)
  if(parseInt(selectedbtn.innerHTML) == parseInt(randD)){
    selectedbtn.classList.add('right')
    tacanOdgovor()
  }
  else{
    selectedbtn.classList.add('wrong')
    pogresanOdgovor()
  }
}

/*for(let i = 0; i < 4; i++){

  answers[i].addEventListener('click',() =>{
    if(parseInt(answers[i].innerHTML) == odgovori[brojac]){
      answers[i].classList.add('right')
      tacanOdgovor()
    }
    else{
      answers[i].classList.add('wrong')
      pogresanOdgovor()
    }
  })
}*/
var selectedbtn

function pocetakIgre(){
  var a = prompt("Unesite Vase ime: ")
  naslov.innerHTML = a
  questionContainerElement.classList.remove('hide')
  answerContainerElement.classList.remove('hide')
  dugmeOdustani.classList.remove('hide')
  dugmePocetak.classList.add('hide')
  dugmePravila.classList.add('hide')
  dugmeProjekat.classList.add('hide')
  document.getElementById('controls').classList.remove('flex-col')
  sljedecePitanje()
}

function tacanOdgovor(){
  brojac++
  dugmeSljedece.classList.remove('hide')

}

function pogresanOdgovor(){
  dugmeRestart.classList.remove('hide')
}

function sljedecePitanje(){
  if(brojac == 5 || brojac == 10){
    osvojeno = novac[brojac]
    alert("Imate sigurnih " +novac[brojac]+" KM osvojenih")
  }
  if(brojac == 15){
    alert("Cestitamoooo, postali ste milijunaaas")
    location.reload()
  }  
  pitanje.innerHTML = brojac+1 + "." + " " + "Pitanje za: " + novac[brojac+1] +"KM"
  bodovi.innerHTML = "Osvojen novac: " + novac[brojac] + "KM"
  for(let i = 0, length1 = answers.length; i < length1; i++){
    answers[i].classList.remove('right')
    answers[i].classList.remove('wrong')
    audiences[i].classList.add('hide')
  }
  questionElement.innerHTML = pitanja[brojac]
  var randA = randomBroj(odgovori[brojac] - 50, odgovori[brojac] + 50)
  var randB = randomBroj(odgovori[brojac] - 50, odgovori[brojac] + 50)
  while (randB == randA){
    randB = randomBroj(odgovori[brojac] - 50, odgovori[brojac] + 50)
  }
  var randC = randomBroj(odgovori[brojac] - 50, odgovori[brojac] + 50)
  while (randC == randA || randC == randB){
    randC = randomBroj(odgovori[brojac] - 50, odgovori[brojac] + 50)
  }
  randD = odgovori[brojac]
  var a = randomBroj(0,3)
  var b = randomBroj(0,3)
  while(b == a){
    b = randomBroj(0,3)
  }
  var c = randomBroj(0,3)
  while(c==a || c==b){
    c = randomBroj(0,3)
  }
  var d = randomBroj(0,3)
  while(d==a || d ==b || d == c){
    d = randomBroj(0,3)
  }
  for(let i = 0; i < 4; i++){
    if(a == i){
      answers[i].innerHTML = randA
    }
    else if(b == i){
      answers[i].innerHTML = randB
    }
    else if(c == i){
      answers[i].innerHTML = randC
    }
    else if(d == i){
      answers[i].innerHTML = randD
    }
  }
  dugmeSljedece.classList.add('hide')
  selectedbtn = null
  
}


function operacija(){
  let operacije = ["+" , "-", "*", "/"]
  let broj = Math.floor(Math.random()*4) 
  return operacije[broj]
}

//Kod preuzet sa https://www.w3schools.com/js/js_random.asp
function randomBroj(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var pitanja = []
var odgovori = []
for(let i = 0; i < 15; i++){
  let op = operacija();
  
  if(op == "+"){
    var broj1 = randomBroj((i+5)*10*(i+1), (i+10)*10*(i+1))
    var broj2 = randomBroj((i+5)*10*(i+1), (i+10)*10*(i+1))
    odgovor = broj1 + broj2
  }
  else if(op == "-"){
    var broj1 = randomBroj((i+8)*10*(i+1), (i+10)*10*(i+1))
    var broj2 = randomBroj((i+5)*5*(i+1), (i+10)*8*(i+1))
    odgovor = broj1 - broj2
  }
  else if(op == "*"){
    var broj1 = randomBroj(3*i+1, 5*i+2)
    var broj2 = randomBroj(3*i+1, 5*i+2)
    odgovor = broj1 * broj2
  }
  else if(op == "/"){
    var broj1 = randomBroj(10*(i+1)*i+20, 11*(i+5)*i+20)
    var broj2 = randomBroj(2*i+1, 3*i+5)
    while(broj1 % broj2 != 0){
      broj1 = randomBroj(10*(i+1)*i+20, 11*(i+5)*i+20)
      broj2 = randomBroj(2*i+1, 3*i+5)
    }
    odgovor = Math.floor(broj1 / broj2)
  }
  let pitanje = "Koliko je: " + broj1 + " " + op + " " +broj2
  pitanja.push(pitanje)
  odgovori.push(odgovor)
}




