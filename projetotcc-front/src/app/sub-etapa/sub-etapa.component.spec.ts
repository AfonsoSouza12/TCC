import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEtapaComponent } from './sub-etapa.component';

describe('SubEtapaComponent', () => {
  let component: SubEtapaComponent;
  let fixture: ComponentFixture<SubEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
