var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

/* Calculando IMCs */
pacientes = document.getElementsByClassName("paciente");

function validaPeso(peso) {
	return (peso > 0 && peso < 1000);
}

function validaAltura(altura) {
	return (altura > 0 && altura < 3);
}

function CalculaIMC(peso, altura) {
	var imc = 0;
	
	var pesoValido = validaPeso(peso);
	var alturaValida = validaAltura(altura);

	if (pesoValido && alturaValida) {
		imc = (peso / altura**2).toFixed(2);
	} else {
		if(!pesoValido && !alturaValida) { 
			imc = "Peso e altura inválidos."; 
		} else {
			if (!pesoValido) { imc = "Peso inválido."; }
			if (!alturaValida) { imc = "Altura Inválida"; }
		}
	}

	return imc;
}

function FormataLinha(linha) {
	tdImc = linha.querySelector(".info-imc");

	if (isNaN(tdImc.textContent)) {	
		linha.classList.add('paciente-invalido'); 
	}
}

for (paciente of pacientes) {
	var tdPeso = paciente.querySelector(".info-peso");
	var tdAltura = paciente.querySelector(".info-altura");
	var tdImc = paciente.querySelector(".info-imc");

	var peso = parseFloat(tdPeso.innerText);
	var altura = parseFloat(tdAltura.innerText);

	tdImc.textContent = CalculaIMC(peso, altura);
	FormataLinha(paciente);
}
