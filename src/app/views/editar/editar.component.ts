/*
Imports necessários para a aplicação:
*/
import { ReceitaService } from './../../components/receita/receita.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  /*
  Array que guarda as receitas criadas
  */
  receitas: Array<any> = [];

  // FormGroup e FormControl
  //Crio uma variável qualquer (formEnviar) que recebe a criação de um FormGroup:
  formEnviar = new FormGroup({
    //Dentro desse FormGroup colocamos as propriedades que possuímos, ou seja,
    //todas as propriedades declaradas no html do componente:
    nameReceita: new FormControl(this.receita.dadosReceita.infos.nameReceita, Validators.required),
    //criamos a propriedade e passamos um valor de um novo FormControl, que recebe os seguintes valores:
    //1 - acessamos os valores do html por meio do item criado pelo ngFor (*receita* of receitas -> this.receita.dados...)
    //2 - temos que passar o caminho exatao até a propriedade requerida
    //3 - passamos o Validators para declarar o preenchimento da propriedade como obrigatório
    descricao: new FormControl(this.receita.dadosReceita.infos.descricao, Validators.required),
    ingredientes: new FormControl(this.receita.dadosReceita.infos.ingredientes, Validators.required),
    preparo: new FormControl(this.receita.dadosReceita.infos.preparo, Validators.required),
    autor: new FormControl(this.receita.dadosReceita.infos.autor, Validators.required),
    //*obs: o nome da propriedade deve ser igual a propriedade "name" do input ou textarea
  })

  constructor(
    //declaramos no constructor todos os itens que usaremos nas funções:
    public dialogRef: MatDialogRef<EditarComponent>,
    //componente do Material(para abrir)
    private fb: FormBuilder,
    //FormBuilder para o FormGroup
    @Inject(MAT_DIALOG_DATA) public receita: any,
    //Injetamos o MatDialogData chamando de receita
    private firestore: AngularFirestore,
    //Angular Firestore
    private receitaService: ReceitaService
    //Serviço criado para diversas funções
  ) { }

  ngOnInit(): void {
    //Sempre que iniciarmos esse componente será rodado o código (dentro do NgOnInit)
    console.log('id dessa receita:', this.receita.dadosReceita.id)
    //Esse log nos retorna o id daquela receita que abrirmos especificamente

  }

  editarReceita() {
    //Nessa função importamos a função do Service criado com o 
    //*this.service.funcaoDoService
    this.receitaService.editarReceita(this.receita.dadosReceita.id, this.formEnviar.value);
    //como parâmetro(definido no service), passamos o id da receita em 
    //específico e pegamos os valores inseridos no formGroup(linha 23)
    this.receitaService.msgSalvou('Receita editada')
    this.dialogRef.close();
    //função que fecha o modal após enviarmos os novos valores do form
  }
}