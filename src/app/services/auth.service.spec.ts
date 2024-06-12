import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificar que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loggedIn value', () => {
    service.setLoggedIn(true);
    expect(sessionStorage.getItem('isLoggedIn')).toBe('true');
  });

  it('should get user data', () => {
    const mockUserData = { email: 'test@test.com', password: 'password' };
    sessionStorage.setItem('userData', JSON.stringify(mockUserData));
    expect(service.getUserData()).toEqual(mockUserData);
  });

  it('should clear user data', () => {
    const mockUserData = { email: 'test@test.com', password: 'password' };
    sessionStorage.setItem('userData', JSON.stringify(mockUserData));
    service.clearUserData();
    expect(service.getUserData()).toBeNull();
  });

  it('should login', () => {
    const mockUser = { email: 'test@test.com', password: 'password' };
    const mockResponse = { success: true };

    service.login(mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost/api.php/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register', () => {
    const mockUser = { email: 'test@test.com', username: 'test', password: 'password' };
    const mockResponse = { success: true };

    service.register(mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost/api.php/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});