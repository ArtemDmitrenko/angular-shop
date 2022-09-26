import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { ContextService } from '../../services/context.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  isLoggedUser: boolean;
  constructor(
    private storageService: StorageService,
    private readonly contextService: ContextService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedUser = this.storageService.isLoggedIn();
    this.currentUser = this.storageService.getUser();
    this.contextService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedUser = isLoggedIn;
      this.currentUser = this.storageService.getUser();
    });
  }

  handleLogOutClick() {
    this.storageService.clean();
    this.contextService.setLogIn(false);
    this.router.navigate(['/']);
  }
}
