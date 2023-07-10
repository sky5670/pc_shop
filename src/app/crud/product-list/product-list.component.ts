import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { CRUDService } from '../services/crud.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  columnDefs: ColDef[] = [
    { field: 'p_name', headerName: 'Product Name', sortable: true,headerClass: 'header-cell' },
    { field: 'p_description', headerName: 'Product Description', sortable: true,headerClass: 'header-cell' },
    { field: 'p_price', headerName: 'Product Price', sortable: true,headerClass: 'header-cell', cellRenderer: this.priceCellRender.bind(this) },
    
    {
    field: '',
    headerName: 'Actions',
    headerClass: 'header-cell',
    width: 300 ,
    cellRenderer: this.actionRenderer.bind(this)
  }
];

rowData: any = [];
gridOptions = {
  rowHeight: 50
}

productList: any = [];
productListSubscribe: any;
constructor(private crudService: CRUDService,
  private router:Router){}
  ngOnInit(): void{
    this.getProductList();
  }

  getProductList(){
    this.productListSubscribe = this.crudService.loadProducts().subscribe(res => {
      this.productList = res;
      this.rowData = res;
      console.log('res',res);
    })
  }

  actionRenderer(params: any){
    let div = document.createElement('div');

    let htmlCode = '<button type="button" Class="btn btn-success">View</button>\n' +
    '<button type="button" Class="btn btn-danger">Delete</button>\n' +
    '<button type="button" Class="btn btn-warning">Edit</button>'
    div.innerHTML = htmlCode;
    
    let viewButton = div.querySelector('.btn-success');
    // @ts-ignore
    viewButton.addEventListener('click',()=>{
      console.log('view clicked');
      this.viewProductDetails(params);
    });

    let editButton = div.querySelector('.btn-warning');
    // @ts-ignore
    editButton.addEventListener('click',()=>{
      console.log('view clicked');
      this.editProductDetails(params);
    });
    
    let deleteButton = div.querySelector('.btn-danger');
    // @ts-ignore
    deleteButton.addEventListener('click',()=>{
      console.log('view clicked');
      this.deleteProductDetails(params);
    });

    return div;
  }

  viewProductDetails(params: any){
    console.log('params', params);
    this.router.navigate(['./crud/view-product-details/' + params.data.p_id]);
  }

  editProductDetails(params: any){
    this.router.navigate(['./crud/update-product/' + params.data.p_id]);
  }

  deleteProductDetails(params: any){
    const that = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.crudService.deleteProduct(params.data.p_id).subscribe((res: any) => {
          if(res.result === 'success'){
            this.getProductList();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        });
      }
    })
  }

  priceCellRender(params: any){
    return '$' + params.data.p_price;
  }
}
