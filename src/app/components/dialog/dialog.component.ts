import { FormControl } from '@angular/forms';
/*
Imports necessários para a aplicação:
*/

import { AngularFirestore } from '@angular/fire/firestore';
import { ReceitaService } from './../receita/receita.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {

  // FormGroup e FormControl
  //Crio uma variável qualquer (formCriar) que recebe a criação de um FormGroup:
  formCriar = new FormGroup({
    //Criamos as propriedades que colocamos no html do form,
    //sendo o mesmo nome qe a propriedade *name* do input
    nameReceita: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    ingredientes: new FormControl('', Validators.required),
    preparo: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //componente do Material(para abrir), entre <> passamos o componente que queremos abrir
    @Inject(MAT_DIALOG_DATA) public receita: any,
    //Injetamos o MatDialogData chamando de receita
    private receitaService: ReceitaService
    //Serviço criado para diversas funções
  ) {
  }

  ngOnInit(): void {
  }

  criarReceita() {
    this.receitaService.criarReceita(this.formCriar.value);
    //Entramos na função criarReceita do nosso Serviço e enviamos como parâmetro o valor do formulário (linha 22)
    this.receitaService.msgSalvou('Receita criada')
    //Passamos como parâmetro da função de mensagem para alertar o usuário que a receita foi criada
    this.dialogRef.close();
    //Fechamos o dialogRef (componente que abrimos)
    this.formCriar.reset()
    //Resetamos os valores do form caso o usuário queira inserir outra receita
  }
}