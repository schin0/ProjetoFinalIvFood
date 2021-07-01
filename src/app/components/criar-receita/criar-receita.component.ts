import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';
import { isNgTemplate } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-criar-receita',
  templateUrl: './criar-receita.component.html',
  styleUrls: ['./criar-receita.component.scss']
})

export class CriarReceitaComponent implements OnInit {

  receitas: any;

  constructor(public dialog: MatDialog,
    private bancoDados: AngularFireDatabase) {
    this.receitas = this.bancoDados.list('receitas').snapshotChanges().pipe(map(
      receitas => {
        return receitas.map(receita => {
          return Object.assign({ idReceita: receita.payload.key }, receita.payload.val())
        })
      }
    ))
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bancoDados.list('receitas').push(result);
      }
    });
  }
}
