var tabela = document.querySelector("#tabela-pacientes");
tabela.addEventListener("dblclick", (event) => {
	event.target.parentNode.classList.add("fadeOutHalfSecond");
	setTimeout(()=>{
		event.target.parentNode.remove(); //Closure!
	}, 500); 
});
