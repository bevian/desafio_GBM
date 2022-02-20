$( document ).ready(function() {
   
    $('#btnBusca').on('click', function(){
        abre();
    });

    $('#btnSalva').on('click', function(){
        salva();
    });
});

function abre(){

  let resApi;
  let sojaRumo = 0;
  let milhoRumo = 0;
  let sojaMRS = 0;
  let milhoMRS = 0;
  let sojaVLI = 0;
  let milhoVLI = 0;
    $.ajax
    ({
      type: "GET",
      url: "https://api.tot.apigbmtech.com/api/selective-process/wagons?authorization=67c9d5c3887b64c33671bb25f681753a",
      dataType: 'json',
      success: function (res){
        resApi = res;
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
 
            //Auxiliar pesos
            if(res[i].railroad=="RUMO" && res[i].product=="Soja"){
              sojaRumo = sojaRumo + parseFloat(res[i].weight);
            }
            if(res[i].railroad=="RUMO" && res[i].product=="Milho"){
              milhoRumo = milhoRumo + parseFloat(res[i].weight);
            }
            if(res[i].railroad=="MRS" && res[i].product=="Soja"){
              sojaMRS = sojaMRS + parseFloat(res[i].weight);
            }
            if(res[i].railroad=="MRS" && res[i].product=="Milho"){
              milhoMRS = milhoMRS + parseFloat(res[i].weight);
            }
            if(res[i].railroad=="VLI" && res[i].product=="Soja"){
              sojaVLI = sojaVLI + parseFloat(res[i].weight);
            }
            if(res[i].railroad=="VLI" && res[i].product=="Milho"){
              milhoVLI = milhoVLI + parseFloat(res[i].weight);
            }
          

        }

        //Popula
        $("#bodytable").append(html);
        $("#dataTableInfo").show();

        //Monta o resumo
        document.getElementById("soRumo").innerText = sojaRumo;
        document.getElementById("soMRS").innerText = sojaMRS;
        document.getElementById("soVLI").innerText = sojaVLI;
        document.getElementById("sT").innerText = sojaVLI + sojaRumo + sojaMRS;

        document.getElementById("mlRumo").innerText = milhoRumo;
        document.getElementById("mlMRS").innerText = milhoMRS;
        document.getElementById("mlVLI").innerText = milhoVLI;
        document.getElementById("mT").innerText = milhoMRS + milhoRumo + milhoVLI;

        document.getElementById("tRumo").innerText = milhoRumo + sojaRumo;
        document.getElementById("tMRS").innerText = milhoMRS + sojaMRS;
        document.getElementById("tVLI").innerText = milhoVLI + sojaVLI;
        document.getElementById("tt").innerText = (milhoRumo + sojaRumo) + (milhoMRS + sojaMRS) + (milhoVLI + sojaVLI);

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