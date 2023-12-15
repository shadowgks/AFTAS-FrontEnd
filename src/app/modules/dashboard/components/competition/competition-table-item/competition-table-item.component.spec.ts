import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionTableItemComponent } from './competition-table-item.component';

describe('CompetitionTableItemComponent', () => {
  let component: CompetitionTableItemComponent;
  let fixture: ComponentFixture<CompetitionTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionTableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
