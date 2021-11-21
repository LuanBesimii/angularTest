import { Component, Input, } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector:'app-header',
    styles:['.mat-form-field-infix {width: none !important;}'],
    templateUrl:'./header.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent{
@Input() deviceXs: boolean;

constructor(private dataStorageService: DataStorageService,
            public authService: AuthService){
}

    onSaveData(){
        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    onFetchData(){
        this.dataStorageService.getRecipes();
    }

    onLogout(){
        this.authService.logout();
    }
}
