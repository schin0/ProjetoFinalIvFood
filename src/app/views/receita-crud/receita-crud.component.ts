/*
Imports necessários para a aplicação:
*/
import { EditarComponent } from './../editar/editar.component';
import { MatDialog } from '@angular/material/dialog';
import { ReceitaService } from './../../components/receita/receita.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receita-crud',
  templateUrl: './receita-crud.component.html',
  styleUrls: ['./receita-crud.component.scss']
})
export class ReceitaCrudComponent implements OnInit {

  //Crimos uma array vazio para inserirmos as receitas que pegaremos do banco de dados
  receitas: Array<any> = [];

  constructor(
    //declaramos no constructor todos os itens que usaremos nas funções:
    private receitaService: ReceitaService,
    //Serviço criado para diversas funções
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    //Assim que acessarmos o componente ele rodará a função showReceitas()
    this.showReceitas();
  }

  //Função para mostrar as receitas na tela do usuário: 
  showReceitas() {
    //Pegamos a função do service e colocamos um subscribe, ou seja,
    //ele vai receber as receitas e mostrar
    this.receitaService.mostrarReceitas().subscribe(receitas => {
      //Declaramos o array em vazio para que ele não duplique as receitas 
      this.receitas = [];
      //Criamos um forEach para cada receita recebida
      receitas.forEach(receita => {
        //ele irá dar um push no array com os seguintes dados:
        this.receitas.push({
          //Dentro de array receitas, teremos o id e infos
          id: receita.payload.doc.id,
          //o id será a criação do id daquela receita (receita of receitas)
          infos: receita.payload.doc.data() as any
          //o infos será toda as informações que possuímos naquele documento, nesse caso,
          //todas as propriedades que criamos no form para o preenchimento do usuário
        })
      })
    })
  }

  //Função para excluirmos a receita: (recebe como parâmetro o id da receita)
  excluirReceita(idReceita: string) {
    this.receitaService.excluir(idReceita)
    //importa a função de excluir do nosso serviço
    this.receitaService.msgSalvou('Receita excluída')
    //mostra uma mensagem após excluirmos
  }

  //Função que abre o componente de editar (recebe como parâmetro aquela receita que o usuário
  //clicou em específico)
  openDialog(receita: any) {
    this.dialog.open(EditarComponent, {
      width: '80%',
      data: {
        //Variável que criamos para acessarmos os dados da receita, para assim,
        //acessarmos as propriedades da mesma
        //Recebe como valor aquela receita em específico
        dadosReceita: receita
      }
    });
  }
}
