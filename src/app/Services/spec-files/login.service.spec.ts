import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { LoginService } from '../login.service';

describe('LoginService', () => {
  let service: LoginService;
  let invite:any;
  let httpTestingController: HttpTestingController;
  let baseurl="http://localhost:8080/";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(LoginService);
  });
  invite={
    email:"abc@gmail.com",
    password:"abcd@1021"
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should call POST API to login employee", () => {
    service.checkUser(invite).subscribe();
   
    let req = httpTestingController.expectOne({ method: "POST", url: baseurl+'login' });
    expect(req.request.body).toEqual(invite);
  });
});
