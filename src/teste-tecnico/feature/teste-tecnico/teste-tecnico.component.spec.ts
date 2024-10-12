import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTecnicoComponent } from './teste-tecnico.component';

describe('TesteTecnicoComponent', () => {
  let component: TesteTecnicoComponent;
  let fixture: ComponentFixture<TesteTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesteTecnicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TesteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
