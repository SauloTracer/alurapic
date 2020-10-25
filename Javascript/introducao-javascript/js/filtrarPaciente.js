var tabela = document.querySelector("#tabela-pacientes");
var txtFiltro = document.querySelector("#busca-paciente");

txtFiltro.addEventListener("input", function() { 
	var pacientes = document.querySelectorAll(".paciente");
	pacientes.forEach( function(paciente) {
		if (txtFiltro.value == "") {
			paciente.classList.remove("invisivel");
		} else {
			var nome = paciente.querySelector(".info-nome").textContent;
			var regExp = new RegExp(txtFiltro.value, "i")
			if(regExp.test(nome)) {
				paciente.classList.remove("invisivel");
			} else {
				paciente.classList.add("invisivel");
			}
		}
	});
});