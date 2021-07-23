import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollToTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be calling Scroll method',fakeAsync(()=>{
    spyOn(component,'scrollToTop');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.scrollToTop).toHaveBeenCalled();
  }))
  it('should check on window scroll ',()=>{
    spyOn(component,'onWindowScroll');
    component.onWindowScroll();
    expect(component.onWindowScroll).toHaveBeenCalled()
  })
  it('should check on scroll to top ',()=>{
    spyOn(component,'scrollToTop');
    component.scrollToTop();
    expect(component.scrollToTop).toHaveBeenCalled()
  })
});
