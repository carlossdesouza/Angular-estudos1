import { Endereco } from './endereco.model'
import { Telefone } from './telefone.model'

export class Pessoa{
  constructor(
		public nome:string,
		public sobrenome:string,
		public idade:Date,
		public sexo:string,
		public endereco:Endereco,
		public telefone:Telefone
	){}

	static popular():Pessoa{
		return new Pessoa(
			null,
			null,
			null,
			null,
			new Endereco(
				null,
				null,
				null,
				null,
				null,
				null,
				null
			),
			new Telefone(
				null,
				null
			)
		)
	}
}