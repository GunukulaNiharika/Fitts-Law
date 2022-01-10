
//   var arrays=[ time, distance, target_width, screen_w, total ];
  var arrays =JSON.parse( sessionStorage.getItem("arrays")); 
    //var ID=[];
    // for(var i=0;i<total;i++){
    //   ID.push(Math.log2(2*(distance[i])/target_width[i]));
    // }

    //Graph
    document.getElementById("myChart").style.width=`${arrays[3]*0.5}px`;
    new Chart("myChart", {
      type: "line",
      data: {
        labels: arrays[2],
        datasets: [{ 
          data: arrays[0],
          borderColor: "violet",
          fill: false
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{
            gridLines:{
             display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Selection Time',
              fontColor:'brown',
              fontStyle: 'bold',
              fontSize: '15'
            }
          }],
          xAxes: [{
            gridLines:{
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Diameter of Target',
              fontColor:'brown',
              fontStyle: 'bold',
              fontSize: '15'
            }
          }]
        }
      }
    });

    //Table
    var values = [];
    var serial=[];
    for (var i=0;i< arrays[4];i++){
      serial.push(i+1);
    }
    values.push(serial);
    values.push(arrays[0]);
    values.push(arrays[1]);
    values.push(arrays[2]);

    var myTableDiv = document.getElementById("Table");  
    var table = document.createElement("TABLE");
    table.setAttributeNS(null,"id","finaltable");
    table.border = '1';
    var tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);
    var trh = document.createElement("TR");
    tableBody.appendChild(trh);
    var tablehead=["S.No", "Selection Time", "Target Distance", "Target Width"];
    for(var i=0;i<4 ;i++){
      var td=document.createElement('TH');
      td.appendChild(document.createTextNode(`${tablehead[i]}`));
      trh.appendChild(td);
    }

    for(var i=0;i<arrays[4];i++){
      var tr = document.createElement("TR");
    tableBody.appendChild(tr);
    for(var j=0;j<4 ;j++){
      var td=document.createElement('TD');
      td.appendChild(document.createTextNode(values[j][i]));
      tr.appendChild(td);
    }
    }
    myTableDiv.appendChild(table);