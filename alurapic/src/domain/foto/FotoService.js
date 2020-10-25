export default class FotoService {
	constructor(resource) {
		this._resource = resource('v1/fotos{/id}');
	}

	lista() {
		return this._resource.query()
		.then(
			data => data.json(), 
			err => {
				console.log(err);
				throw new Error("Não foi possível acessar as fotos.");
			}
		);
	}

	cadastra(foto) {
		if (foto._id) {
			return this._resource.update({id: foto._id}, foto);
		} else {
			return this._resource.save(foto);
		}
	}

	apaga(id) {
		return this._resource.delete({id})
		.then(null, err => {
			console.log(err);
			throw new Error("Não foi possível remover a foto. Tente novamente mais tarde.");
		});
	}

	busca(id) {
		return this._resource.get({id})
		.then(
			data => data.json(),
			err => {
				console.log(err);
				throw new Error("Não foi possível buscar a foto. Tente novamente mais tarde.");
			}
		);
	}
}