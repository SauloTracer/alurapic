var btnImportar = document.querySelector("#importar-paciente");
btnImportar.addEventListener("click", function(){
	console.log("Importar pacientes");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");
	xhr.addEventListener("load", function(){
		var msgErro = document.querySelector("#erro-import");
		msgErro.classList.add("invisivel");
		if (xhr.status == 200){
			var dataSet = JSON.parse(xhr.responseText);
			dataSet.forEach( function(paciente) {
				adicionarPaciente(paciente);
			});
		} else {
			msgErro.classList.remove("invisivel");
			console.log("Erro: ", xhr.status);
			console.log(xhr.responseText);
		}
	});
	xhr.send();
});