import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {map} from "rxjs/operators";
import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private httpClient: HttpClient) { }

  loadProducts(){
    const url = environment.API_EndPoint + 'http://localhost/web_api/view.php/view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  createProduct(data: any): Observable<Response>{
    
    const url = environment.API_EndPoint + 'http://localhost/web_api/create.php';
    return this.httpClient.post<Response>(url, data).pipe(map(data => data));
  }

  loadProductInfo(productId: any): Observable<Product>{
    const url = environment.API_EndPoint + 'http://localhost/web_api/view_one.php?id=' + productId;
    return this.httpClient.get<Product>(url).pipe(map(data => data));
  }

  updateProductDetails(data: any): Observable<Response>{
    const url = environment.API_EndPoint + 'http://localhost/web_api/update.php';
    return this.httpClient.post<Response>(url, data).pipe(map(data => data));
  }

  deleteProduct(productId: any): Observable<Response>{
    const url = environment.API_EndPoint + 'http://localhost/web_api/delete.php?id='+productId;
    return this.httpClient.get<Response>(url).pipe(map(data => data));
  }

}
