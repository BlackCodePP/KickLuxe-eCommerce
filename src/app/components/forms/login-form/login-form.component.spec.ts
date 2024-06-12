import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { LoginFormComponent } from './login-form.component';
import { of } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['login', 'setLoggedIn']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockCartService = jasmine.createSpyObj(['loadCart']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in when form is valid', () => {
    const response = { data: { email: 'test@test.com', password: 'password' } };
    mockAuthService.login.and.returnValue(of(response));

    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password');
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith(response.data);
    expect(mockAuthService.setLoggedIn).toHaveBeenCalledWith(true);
    expect(mockCartService.loadCart).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});