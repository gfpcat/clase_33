const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope, rope2, rope3;
var fruit_con;

var bg_img;
var food;
var homero_img;
var homero;
var button, button2, button3;
var espera, festeja, ouch;
var ballon;
var mute_bot;

var bk_song, cut_sound, sad_sound, eating_sound, air; 

var canW, canH;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('png-clipart-homer-simpson-donuts-the-simpsons-tapped-out-bart-simpson-coffee-and-doughnuts-bart-simpson-cartoon-magenta.png');
  espera = loadAnimation("homero1.png","homero2.png");
  festeja= loadAnimation("festeja1.png","festeja2.png")
  ouch = loadAnimation ("homero1.png", "festeja1.png");

  bk_song= loadSound('sound1.mp3');
  sad_sound= loadSound('sad.wav');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');


  espera.playing = true;
  festeja.playing= true;
  festeja.looping = true;
  ouch.playing = true;
  ouch.looping = true; 
}

function setup() 
{var isMobile = /iPhone|iPad|iPod|Adroid/i.test(navigator.userAgent);
if(isMobile){
  canW= displayWidth;
  canH=displayHeight
createCanvas(displayWidth,displayHeight);
}else{
  canW=windowWidth;
  canH=windowHeight;
  createCanvas(windowWidth,windowHeight);
}
  
  frameRate(80);
  bk_song.play();
  bk_song.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;


  button = createImg("cut_button.png");
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("cut_button.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("cut_button.png");
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  mute_bot = createImg("mute.png");
  mute_bot.position(450,20);
  mute_bot.size(50,50);
  mute_bot.mouseClicked(mute);

 
  espera.frameDelay = 20;
  festeja.frameDelay=20;
  ouch.frameDelay=20;
  homero = createSprite(170,canH - 80,100,100);
  homero.scale = 0.6;

  homero.addAnimation('esperando',espera);
  homero.addAnimation('festejando', festeja);
  homero.addAnimation("enojado", ouch);
  homero.changeAnimation('esperando');

  ballon = createImg("balloon.png");
  ballon.position(10,250);
  ballon.size(150,100);
  ballon.mouseClicked(airblow);

  
  ground = new Ground(200,canH,600,20);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,canW / 2, canH/2, canW+80,canH);

  rope.show();
  rope2.show();
  rope3.show();
  push();
  imageMode(CENTER);

  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  Engine.update(engine);
  ground.show();
  if(collide(fruit,homero)==true){
    homero.changeAnimation('festejando');
    eating_sound.play();
  }

  if(collide(fruit,ground.body)==true){
    homero.changeAnimation('enojado');
    sad_sound.play();
    bk_song.stop(); 
  }

  drawSprites();

 
   
}
  function drop(){
    cut_sound.play();
    rope.break();
    fruit_con.detach();
    fruit_con = null;
  }
  function drop2(){
    cut_sound.play();
    rope2.break();
    fruit_con2.detach();
    fruit_con = null;
  }
  function drop3(){
    cut_sound.play();
    rope3.break();
    fruit_con3.detach();
    fruit_con = null;
  }
  function collide(body,sprite){
    if(body != null){
      var d = dist ( body.position.x, body.position.y, sprite.position.x, sprite.position.y);
      if (d <= 80){
        World.remove(engine.world,fruit);
        fruit = null;
        return true; 
      }
      else {
        return false;
      }
    }
  }

  function airblow(){
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
    air.play();

  }

  function mute(){
    if (bk_song.isPlaying()){
      bk_song.stop();
    }
    else {
      bk_song.play();
    }
  }