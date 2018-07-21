import { Component } from '@angular/core';
import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../shared/data-storage.service';
import { HttpEvent } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
    public authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: HttpEvent<Object>) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

}