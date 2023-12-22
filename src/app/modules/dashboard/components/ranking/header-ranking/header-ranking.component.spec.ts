import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRankingComponent } from './header-ranking.component';

describe('HeaderRankingComponent', () => {
  let component: HeaderRankingComponent;
  let fixture: ComponentFixture<HeaderRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
