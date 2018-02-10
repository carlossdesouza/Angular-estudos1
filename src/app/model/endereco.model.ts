export class Endereco{
  constructor(
    public logradouro:string,
    public numero:number,
    public complemento:string,
    public cep:string,
    public bairro:string,
    public estado:string,
    public uf:string
  ){}
}