import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPaginationComponent } from './competition-pagination.component';

describe('CompetitionPaginationComponent', () => {
  let component: CompetitionPaginationComponent;
  let fixture: ComponentFixture<CompetitionPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionPaginationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
