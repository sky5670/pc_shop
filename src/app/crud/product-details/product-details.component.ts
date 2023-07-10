import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  //@ts-ignore
  productDetails: Product;
  constructor(private crudService: CRUDService,
              private activateRoute: ActivatedRoute){}
  ngOnInit(): void{
    let productId = '';
    if(this.activateRoute.snapshot.params['productId']){
      productId = this.activateRoute.snapshot.params['productId'];
      console.log('productId', productId);
      if(productId !== ''){
        this.loadProductDetails(productId);
      }
    }
  }

  loadProductDetails(productId: any){
    this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productDetails = res;
  });
}
}
