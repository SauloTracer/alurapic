/* Adicionando um paciente a lista */
//Adicionando event listener
var ulErros = document.querySelector("#erros");
var btnAdicionarPaciente = document.querySelector("#adicionar-paciente");
btnAdicionarPaciente.addEventListener("click", (event) => {
	event.preventDefault();
	
	//Recuperando dados
	var form = document.querySelector("#form-adiciona");
	var paciente = getFormData(form);

	var erros = validaPaciente(paciente);
	if(erros.length > 0) {
		mostraErros(erros);
		return;
	}
	
	adicionarPaciente(paciente);

	//Limpando o formulário
	form.reset();

});

function adicionarPaciente(data) {
	//Criando elementos
	trPaciente = createLine(data);

	//Adicionando nova linha a tabela de pacientes
	var tblPacientes = document.querySelector("#tabela-pacientes");
	tblPacientes.appendChild(trPaciente);

	//Formata a nova tr
	FormataLinha(trPaciente);
}

function getFormData(form) {
	var data = {
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value, 
		gordura: form.gordura.value,
		imc: CalculaIMC(form.peso.value, form.altura.value)
	};

	return data;
}

function createLine(data){
	var trPaciente = document.createElement("tr");
	trPaciente.classList.add("paciente");

	//Adicionando colunas a linha
	trPaciente.appendChild(createCell("info-nome", data.nome));
	trPaciente.appendChild(createCell("info-peso", data.peso));
	trPaciente.appendChild(createCell("info-altura", data.altura));
	trPaciente.appendChild(createCell("info-gordura", data.gordura));
	trPaciente.appendChild(createCell("info-imc", data.imc));

	return trPaciente;
}

function createCell(classe, valor) {
	var td = document.createElement("td");
	
	td.classList.add(classe);
	td.textContent = valor;

	return td;
}

function validaPaciente(paciente) {
	erros = [];
	ulErros.innerHTML = "";

	if (paciente.nome.length < 1) { erros.push("Informe o nome do paciente"); }
	if (!validaPeso(paciente.peso)) { erros.push("Peso inválido"); }
	if (!validaAltura(paciente.altura)) { erros.push("Altura inválida"); }
	if (paciente.gordura.length < 1) { erros.push("Informe a taxa de gordura corporal do paciente"); }
	if (isNaN(paciente.gordura)) { erros.push("A taxa de gordura corporal deve ter formato numérico"); }
	
	return erros;
}

function mostraErros(erros) {

	for(erro of erros) {
		var li = document.createElement("li");
		li.textContent = erro;
		ulErros.appendChild(li);
	}
	
	ulErros.focus();
}