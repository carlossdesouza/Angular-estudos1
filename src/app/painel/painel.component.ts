import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Pessoa } from './../model/pessoa.model';
import { Endereco } from './../model/endereco.model';
import { Telefone } from './../model/telefone.model';
import { Estados } from './../model/estados.model';

//@Injectable()

declare var $:any;

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {
  pessoa:Pessoa
  telefone:Telefone
  endereco:Endereco

  listaDeUfs:Array<Estados> = Estados.estados()
  listaPessoas:Array<Pessoa> = [new Pessoa ('Carlos José','Santos de Souza',new Date(),'Masculino',new Endereco('a',12,'a','a','a',Estados.estados()[25].nome,'SP'),new Telefone('a','a'))]
  pessoaZoom:Pessoa = Pessoa.popular()
  //variavel responsável pela cor do button CSS e selecao do SUBMIT
  controleCssButton:boolean = true
  //variavel responsável pelo value do button
  valueButton:string = 'CRIAR REGISTRO'
  //variavel responsável pelo index da linha selecionada
  itemSelecionado:number
  //variavel responsável pela mensagem de SALVO!
  submetido:boolean = false
  //private http:HttpClient
  retornoDoCep:any
  constructor(private http:Http){
    
  }

  ngOnInit(){
  }

  public addDados(form:NgForm):void{
    this.listaPessoas.push(form.value)
    this.limparFormulario(form)
    this.isSubmetido(1)
    this.apagarMensagem(5000)
  }

  public exibirDados():Array<Pessoa>{
    return this.listaPessoas
  }

  public zoom(form:NgForm, index:number):void{
    this.pessoaZoom = this.listaPessoas[index]
    this.limparFormulario(form)
    this.isCreate(1)
    this.valorButton(0)
    
    $('.mini.modal')
    .modal('show');
  }

  public excluir(form:NgForm,index:number):void{
    this.listaPessoas.splice(index,1)
    this.valorButton(0)
    this.isCreate(1)
    this.limparFormulario(form)
  }

  public selecionar(form:NgForm, index:number):void{
    form.resetForm(this.listaPessoas[index])
    this.itemSelecionado = index
    this.valorButton(1)
    this.isCreate(0)

    $('#uf')
    .dropdown('set selected', this.listaPessoas[index].endereco.uf)

    $('#sexo')
    .dropdown('set selected', this.listaPessoas[index].sexo)
  }

  public atualizar(form:NgForm):void{
    this.listaPessoas[this.itemSelecionado] = form.value
    this.isCreate(1)
    this.limparFormulario(form)
    this.valorButton(0)
    this.isSubmetido(1)
    this.apagarMensagem(5000)
  }

  public buscarCep(form:NgForm):any{
    let cep = form.value.endereco.cep
    this.http.get(`http://api.postmon.com.br/v1/cep/${cep}`)
    .map(dados => dados.json())
    .subscribe(dados => this.popularCepview(form,dados))
  }

  public popularCepview(form:NgForm, dados:any){
    let pessoa:Pessoa = form.value
    let endereco:Endereco = dados
    
    pessoa.endereco.logradouro = endereco.logradouro
    pessoa.endereco.cep = endereco.cep
    pessoa.endereco.bairro = endereco.bairro
    pessoa.endereco.estado = Estados.estados().filter((item) => item.sigla==endereco.estado)[0].nome
    pessoa.endereco.uf = endereco.estado
    form.resetForm(pessoa)
    $('#uf')
    .dropdown('set selected', endereco.uf)
    console.log(dados)
  }

  public limparFormulario(form:NgForm):void{
    form.resetForm()
  }

  public valorButton(value:number):void{
    (value==0)?this.valueButton="CRIAR REGISTRO":this.valueButton="ATUALIZAR REGISTRO"
  }

  public isCreate(value:number):void{
    (value==0)?this.controleCssButton=false:this.controleCssButton=true
  }

  public isSubmetido(value:number):void{
    (value==1)?this.submetido=true:this.submetido=false
  }

    public apagarMensagem(tempo:number):void{
      setTimeout(()=>{
        this.submetido = false
      }, tempo);
    }

  public ativarConsole():void{
    let teste:Array<any> = Estados.estados()
    let retorno:any = teste.filter((item)=> item.sigla=="SP")
    
    console.log(teste.filter((item)=> item.sigla=="SP")[0].nome)
  }
}
