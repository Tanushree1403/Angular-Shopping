import {ProductService} from './product.service';
import {ProductListResolved} from './product';

import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ProductListResolver implements Resolve<ProductListResolved>{
    constructor(private productService: ProductService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<ProductListResolved> {
        
        return this.productService.getProducts().pipe(
            map(product=>({
                product:product
            })),
            catchError(
                error=>{
                    const message= `Retrieval error ${error}`;
                    console.error(message);
                    return of({product: null, error: message});
                }
            )
        )
    }

}