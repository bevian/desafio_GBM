$( document ).ready(function() {
   
    $('#btnBusca').on('click', function(){
        abre();
    });

    $('#btnSalva').on('click', function(){
        salva();
    });
});

function abre(){
    $.ajax
    ({
      type: "GET",
      url: "https://api.tot.apigbmtech.com/api/selective-process/wagons?authorization=67c9d5c3887b64c33671bb25f681753a",
      dataType: 'json',
      success: function (res){
        //JSON
        var html = "";
        for(var i = 0; i<res.length;i++){
            //Monta o html
            html+= "<tr>";
            html+= "<td>";
            html+= res[i].plate;
            html+= "</td>";
            html+= "<td>";
            html+= res[i].railroad;
            html+= "</td>";
            html+= "<td>";
            html+= res[i].product;
            html+= "</td>";
            html+= "<td>";
            html+= res[i].downloadStartTime;
            html+= "</td>";
            html+= "<td>";
            html+= res[i].downloadEndTime;
            html+= "</td>";
            html+= "<td>";
            html+= res[i].weight;
            html+= "</td>";
            html+= "</tr>";

        }

        //Popula
        $("#bodytable").append(html);
        $("#dataTableInfo").show();

      }
    });

    //Pega a observação
    $.ajax
    ({
      type: "GET",
      url: "https://api.tot.apigbmtech.com/api/selective-process/observation?authorization=67c9d5c3887b64c33671bb25f681753a",
      dataType: 'json',
      success: function (res){
         $("#inputObs").val(res[0].observation)

      }
    });

}

function salva(){
    var obs = $("#inputObs").val();
    $.ajax
    ({
      type: "PUT",
      url: "https://api.tot.apigbmtech.com/api/selective-process/observation?authorization=67c9d5c3887b64c33671bb25f681753a",
      data: "description="+obs,
      success: function (res){
        alert("salvo");
        }
    });
}