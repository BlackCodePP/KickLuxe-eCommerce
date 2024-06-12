import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutCartComponent } from './checkout-cart.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('CheckoutCartComponent', () => {
  let component: CheckoutCartComponent;
  let fixture: ComponentFixture<CheckoutCartComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj(['getCart', 'getTotalPrice', 'clearCart', 'decreaseQuantity']);
    mockOrderService = jasmine.createSpyObj(['insertOrder']);
    mockAuthService = jasmine.createSpyObj(['getUserData']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCartComponent);
    component = fixture.componentInstance;
    mockCartService.getCart.and.returnValue(of([]));
    mockCartService.getTotalPrice.and.returnValue(0);
    mockAuthService.getUserData.and.returnValue({ id: 1 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle checkout correctly', () => {
  const cartItems = [{ 
    product: { 
      id: 1, 
      nombre: 'Test Product', 
      descripcion: 'Test Description', 
      precio: 100, 
      marca: 'Test Brand', 
      imagen: 'Test Image', 
      quantity: 1, 
      selectedTalla: 44 
    }, 
    quantity: 1 
  }];
  const totalPrice = 100;

  component.individualProducts = cartItems.map(item => item.product);
  component.totalFinalPrice = totalPrice;

  mockOrderService.insertOrder.and.returnValue(of({}));
  mockRouter.navigate.and.returnValue(Promise.resolve(true));

  component.onCheckout();

  expect(mockOrderService.insertOrder).toHaveBeenCalled();
  expect(mockCartService.clearCart).toHaveBeenCalled();
  expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
});
  
  it('should decrease quantity correctly', () => {
  const product = { 
    id: 1, 
    nombre: 'Test Product', 
    descripcion: 'Test Description', 
    precio: 100, 
    marca: 'Test Brand', 
    imagen: 'Test Image', 
    quantity: 1, 
    selectedTalla: 39 
  };
  const totalPrice = 100;

  mockCartService.getTotalPrice.and.returnValue(totalPrice);

  component.decreaseQuantity(product);

  expect(mockCartService.decreaseQuantity).toHaveBeenCalledWith(product);
  expect(component.totalFinalPrice).toEqual(totalPrice);
 });
});