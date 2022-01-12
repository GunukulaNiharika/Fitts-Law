var distance = []
var target_width = []
var time = []
var x=[], y=[], r=[];
var total = 30;
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

var svgNS = "http://www.w3.org/2000/svg";

var screen_w,screen_h;
screen_w=self.innerWidth;
screen_h=self.innerHeight;  
    console.log(screen_w);
    console.log(screen_h);
    svg.setAttribute("width",screen_w);
    svg.setAttribute("height",screen_h);
    document.getElementById("simulator").style.width=`${screen_w}px`;
    document.getElementById("simulator").style.height=`${screen_h}px`;
    // document.getElementById("simulator").style.backgroundColor = "#";

for( var i=0;i<total; i++){
    const px =(Math.random()* ((screen_w-5)-5) +5);
    const py =(Math.random()* ((screen_h-5)-5) +5);
    const rad = (Math.random()* (50-5) +5);
    //console.)
    x.push(px);
    y.push(py);
    r.push(rad);
}
function target_distance(mx,my,x,y){
 return Math.sqrt(Math.pow(x-mx,2)+ Math.pow(y-my,2));
}
function circle(count,mx,my){
    var cx=x[count];
    var cy=y[count];
    var rad=r[count];
    target_width.push(2*rad);
    distance.push(target_distance(mx,my,cx,cy));
    var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle
    myCircle.setAttributeNS(null,"id","mycircle");
    myCircle.setAttributeNS(null,"cx",cx);
    myCircle.setAttributeNS(null,"cy",cy);
    myCircle.setAttributeNS(null,"r",rad);
    myCircle.setAttributeNS(null,"fill",'#' + (Math.random().toString(16) + "000000").substring(2,8));
    myCircle.setAttributeNS(null,"stroke","black");
    myCircle.setAttributeNS(null,"style","display:block");
    svg.appendChild(myCircle);
    document.getElementById("simulator").appendChild(svg);
    
    return {cx,cy,rad};
}
function mousePosition(event) {
     var Mx = event.clientX;
     var My = event.clientY;
    //  console.log("Points");
    // console.log(Mx);
    // console.log(My);
    return {Mx, My};
  }
  function pointInCircle(x, y, cx, cy, radius) {
    
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
  }
  const oneSecond = async () => new Promise((res, _) => setTimeout(res, 500));

 async function startgame(event){
    var count=0;
    document.getElementById("start").style.display="none";
    document.getElementById("heading").style.display="none";
    start=new Date().getTime()/1000;
    var CurrentPoint= mousePosition(event);
    var Mx=CurrentPoint.Mx, My=CurrentPoint.My;
    var  circleValues= circle(count, Mx, My);
    var cx=circleValues.cx, cy=circleValues.cy, r=circleValues.rad;
    //count++;
    
    while(true){
     
      await oneSecond();
     
      document.getElementById("mycircle").addEventListener("mousedown",async function(e){  
        console.log("func");
         //var {Nx, Ny}=mousePosition(e); 
         var NewPoints=mousePosition(e);
         Mx= NewPoints.Mx;
         My=NewPoints.My;
        // console.log("New");
        // console.log(Nx);
        // console.log(Ny);
        //console.log(mousePosition(e));
        var click=pointInCircle(Mx,My,cx,cy,r);
       // console.log(click );
        
        // console.log("center");
        // console.log(cx);
        // console.log(cy);
        if(click){
          document.getElementById("mycircle").remove();
          //await oneSecond();
          t=new Date().getTime()/1000;
          time.push(t-start);
          start=t;
          count++;
          console.log(count);
          if(count<total){
          var circleValues=circle(count, Mx, My);
          cx=circleValues.cx, cy=circleValues.cy, r=circleValues.rad;
          }
          else{
            document.getElementById("graph").style.display="block";
          }
        }
      });
      if(count==total-1){
        break;
      } 
    }
  }
function send(){
  var arrays=[ time, distance, target_width, screen_w, total ];
sessionStorage.setItem("arrays", JSON.stringify(arrays));

}
 