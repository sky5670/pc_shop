import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  //@ts-ignore
  productForm: FormGroup;
  productId: any;
  buttonText = 'Create Product';
  constructor(private crudService: CRUDService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activateRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.createProductForm();
    let productId = '';
    if(this.activateRoute.snapshot.params['productId']){
      productId = this.activateRoute.snapshot.params['productId'];
      console.log('productId', productId);
      if(productId !== ''){
        this.loadProductDetails(productId);
      }
    }
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10)])]
    });
  }

  createProduct(values: any, isUpdate: any){
    console.log(values);
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if(this.productId){
      //para actualizar
      formData.append('id', this.productId);
      //formData.append('description', this.productId);
      //formData.append('price', this.productId);
      this.crudService.updateProductDetails(formData).subscribe((res: any) => {
        if(res.result === 'success'){
          //this.router.navigate(['/crud/product-list']);
          this.navigateTo('/crud/product-list');
        }
      });
    }else{
      this.crudService.createProduct(formData).subscribe((res: any) => {
        if(res.result === 'success'){
          //this.router.navigate(['/crud/product-list']);
          this.navigateTo('/crud/product-list');
        }

      })
    }
  }


  loadProductDetails(productId: any){
      this.buttonText = 'Update Product';
      this.crudService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['name'].setValue(res.p_name);
      this.productForm.controls['description'].setValue(res.p_description);
      this.productForm.controls['price'].setValue(res.p_price);
      this.productId = res.p_id;
    });
  }

  navigateTo(route: any){
    this.router.navigate([route]);
  }
}
