import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the email channel as a copy button, not a link', () => {
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      'button[aria-label="Copy Email address"]'
    );

    expect(button).toBeTruthy();
    expect(button?.textContent).toContain(component.profile.email);
  });

  it('should open the dialog from the send button', () => {
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog');
    expect(dialog?.hasAttribute('open')).toBeFalse();

    component.openEmailDialog();
    fixture.detectChanges();

    expect(dialog?.hasAttribute('open')).toBeTrue();
  });
});
