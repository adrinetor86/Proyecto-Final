import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  getMapasData() {
    return [
      {
        id: '1000',
        image: '../assets/mapas/Combine.webp',
      },
      {
        id: '1001',
        image: '../assets/mapas/Fringe.webp',
      },
      {
        id: '1002',
        image: '../assets/mapas/Nuk3town.webp',
      },
      {
        id: '1003',
        image: '../assets/mapas/Redwood.webp',
      },
      {
        id: '1004',
        image: '../assets/mapas/rupture.webp',
      }


      ]
  }



  // getProductsMini() {
  //   return Promise.resolve(this.getProductsData().slice(0, 5));
  // }
  //
  getMapassSmall() {
    return Promise.resolve(this.getMapasData().slice(0, 10));
  }
  //
  // getProducts() {
  //   return Promise.resolve(this.getProductsData());
  // }
  //
  // getProductsWithOrdersSmall() {
  //   return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  // }
  //
  // getProductsWithOrders() {
  //   return Promise.resolve(this.getProductsWithOrdersData());
  // }
}
