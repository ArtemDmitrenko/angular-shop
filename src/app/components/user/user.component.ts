import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUserData: any;
  errorText: string;
  isLoaded: boolean = false;
  title: string = 'profile';

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.storageService.getUser();
    const { id, token } = currentUser;
    this.userService.getUserData(id, token).subscribe({
      next: (data) => {
        this.currentUserData = data;
        this.isLoaded = true;
      },
      error: (err) => {
        if (err.error) {
          this.errorText = JSON.parse(err.error).message;
        } else {
          this.errorText = 'Error with status: ' + err.status;
        }
        alert(this.errorText);
      },
    });
  }
}
