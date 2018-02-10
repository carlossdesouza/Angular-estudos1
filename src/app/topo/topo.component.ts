import { Component } from '@angular/core'
import { Pessoa } from '../model/pessoa.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})

export class TopoComponent{
  public titulo:string  = 'Título da Aplicação'
  public image:string  = '/assets/user.png'

  public pessoa = new Pessoa('Carlos', 'Souza', new Date(), "Masculino",null, null);
}