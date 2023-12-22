import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCompetitionComponent } from './member-competition.component';

describe('MemberCompetitionComponent', () => {
  let component: MemberCompetitionComponent;
  let fixture: ComponentFixture<MemberCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberCompetitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
