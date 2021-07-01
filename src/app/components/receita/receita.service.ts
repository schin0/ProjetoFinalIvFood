//Criamos um serviço para criarmos funções que usaremos em diversos componentes, não 
//havendo necessidade de criarmos a mesma função em todos os componentes.


/*
Imports necessários para a aplicação:
*/
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Receita } from './receita.model';

@Injectable({
  providedIn: 'root'
})

export class ReceitaService {

  //var criada em branco para gerarmos o id da receita:
  idReceita: string = '';

  constructor(
    //declaramos no constructor todos os itens que usaremos nas funções:
    private snackBar: MatSnackBar,
    //componente do Material para mostrarmos uma mensagem de ação com a receita:
    private firestore: AngularFirestore
    //AngularFirestore
  ) { }

  msgSalvou(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  //Função que cria a receita: (recebe a interface de Receita como parâmetro)
  criarReceita(receita: Receita) {
    //ela entra no firestore(banco de dados), especificamente na coleção "receitas",
    //e por fim, adiciona a receita recebida entre parâmetro(add(receitaNoParâmetro)):
    return this.firestore.collection('receitas').add(receita)
  }

  //Função que edita a receita: (recebe o id da receita em específico, recebe a receita em específico)
  editarReceita(idReceita: string, receita: any) {
    //ela entra na coleção receitas, especificamente no Id daquela receita(doc(idReceita))
    //e dá um update na coleção daquela receita(uptade(receitaEmEspecifico))
    return this.firestore.collection('receitas').doc(idReceita).update(receita);
  }

  //Função para gerar o id da receita:
  gerarId() {
    //ela entra na coleção receitas, pega as receitas com o get(),
    //dá um subscribe quando houver qualquer ação(querySnapshot),
    //e cria um forEach, ou seja, toda vez que ele pegar alguma receita do bando de dados
    //ele criará um novo id
    return this.firestore.collection('receitas').get().subscribe((querySnapshot) => {
      querySnapshot.forEach(docRef => {
        //criamos uma const e colocamos o .id no final para a criação
        const id = docRef.id;
        //depois retornamos o id
        return id;
      })
    })
  }

  //Função para pegarmos as receitas da coleção receitas toda vez que houver um ato(snapshotChanges())
  mostrarReceitas() {
    return this.firestore.collection('receitas').snapshotChanges();
  }

  //Função para excluirmos a receita em específico: (id da receita em parâmetro)
  excluir(idReceita: string) {
    //acessamos a coleção, depois o id da receita em específico(doc(idReceita))
    //e deletamos do banco de dados (delete())
    return this.firestore.collection('receitas').doc(idReceita).delete()
  }
}