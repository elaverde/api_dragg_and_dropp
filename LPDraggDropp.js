//autor Edilson Laverde Molina 22/05/14 20:06
//version 1.2
var moveswin=0;	
var movesfail=0;
var finish=function(){
moveswin=0;	
movesfail=0;
		for (var i=1 ; i<=aciertos; i++){
			if (datos[i][4]=='none'){
			return 'none';
			}
			if (datos[i][4]=='win'){
				moveswin+=1;
			}
			else{
				movesfail+=1;
			}
		}
		if (moveswin==aciertos){
			return 'win';
		}
		else{
			return 'oushh'
		}	
}
function LPDraggDropp(w, f) {
    this.win = w
    this.fail = f
}
var LPDraggDroppRestar=function(){
	for (var i=1 ; i<=DraggDropp[0].n_element; i++){
	$(datos[i][0]).attr("data-top", datos[i][2]);
	$(datos[i][0]).attr("data-left", datos[i][3]);
		    $(datos[i][0]).animate( {
                        top:    datos[i][2],
                        left:   datos[i][3]
            });
	datos[i][4]='none';	
	}
}
var dragg_LP = function(id){
	$(id).draggable({ 
	cursor: "move",
	opacity: 0.7,
	revert: true 
	});
}
var dropp_LP = function(id){
$(id).droppable({	
			drop: function( event, ui ) { 
			         var idc="#"+$(this).attr("id");				 
					 if (idc ==datos[relations["#"+$(ui.draggable).attr("id")]][1])
					 {
					 datos[relations["#"+$(ui.draggable).attr("id")]][4]='win';
			         }
				     else
					 {
				     datos[relations["#"+$(ui.draggable).attr("id")]][4]='osuhh'; 
					 }
					 $(ui.draggable).draggable( "option", "revert", "invalid" );
					 eval(DraggDropp[0].onwinmove);
					 ui.draggable.animate( {
                        top:     $( this ).position().top,
                        left:     $( this ).position().left
                     });	 
			        var eventodragdrop=finish();
			        console.log(moveswin);
					if (eventodragdrop=='win'){
					eval(DraggDropp[0].onwingame);
					}
					if (eventodragdrop=='oushh'){
					console.log(movesfail);
					LPDraggDroppRestar();
					eval(DraggDropp[0].onfailgame);					
					}		 
			}
});
}
jQuery.LPDraggDropp = function (args){
	DraggDropp = jQuery.extend({
	},args);	
}
//configurador juego
var datos = new Array([]);
var relations=new Array();
var aciertos=0;
		jQuery.configuration=function(){
		aciertos=DraggDropp[0].n_element	
		$("#"+DraggDropp[0].containerstar).droppable({	
					drop: function( event, ui ) { 
			    	var dni=relations["#"+$(ui.draggable).attr("id")];
					$(ui.draggable).draggable( "option", "revert", "invalid" );
					datos[relations["#"+$(ui.draggable).attr("id")]][4]='none';
					ui.draggable.animate( {
								top:     datos[dni][2],
								left:    datos[dni][3]
					});
					}
		});
		for (var i=1 ; i<=DraggDropp[0].n_element; i++){
			datos[i]=new Array(5)
			datos[i][0]='#'+DraggDropp[i].id_dragg;
			datos[i][1]='#'+DraggDropp[i].id_dropp;
			
			datos[i][2]=$("#"+DraggDropp[i].id_dragg).position().top;
			datos[i][3]=$("#"+DraggDropp[i].id_dragg).position().left;	
			console.log("y" +datos[i][2]+"x"+datos[i][3] )
			datos[i][4]='none';	
			dragg_LP(datos[i][0]);
			dropp_LP(datos[i][1]);
			relations[datos[i][0]]=i;
		}
}

