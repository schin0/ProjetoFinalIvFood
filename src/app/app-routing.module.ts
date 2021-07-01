import { CriarReceitaComponent } from './components/criar-receita/criar-receita.component';
import { ReceitaCrudComponent } from './views/receita-crud/receita-crud.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'consulta',
  component: ReceitaCrudComponent
},
{
  path: 'criar',
  component: CriarReceitaComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
