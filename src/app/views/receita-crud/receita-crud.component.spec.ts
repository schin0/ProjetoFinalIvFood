import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaCrudComponent } from './receita-crud.component';

describe('ReceitaCrudComponent', () => {
  let component: ReceitaCrudComponent;
  let fixture: ComponentFixture<ReceitaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceitaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
