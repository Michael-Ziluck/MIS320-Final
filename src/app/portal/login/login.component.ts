import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthGuard } from "../../shared/guard/auth.guard";
import { AuthRequest } from "../../shared/model/auth-request.model";
import { AuthResponse } from "../../shared/model/auth-response.model";
import { TitleService } from "../../shared/service/title.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Key } from "app/shared/constants/key.constant";
import { AuthenticationService } from "../authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    authRequest: AuthRequest;

    private expectedTarget: string;

    private subscriptions: Subscription[] = [];

    constructor(
        private authGuard: AuthGuard<AuthRequest, AuthResponse>,
        private titleService: TitleService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService
    ) {
        this.titleService.setTitle('Login');
        this.subscriptions.push(this.activatedRoute.queryParams.subscribe(params => {
            this.expectedTarget = params[Key.TARGET];
        }));
    }

    login() {
        this.authService.clearLoginStorage();
        this.authRequest.username = this.authRequest.username.toLowerCase();
        this.authService.login(this.authRequest, this.expectedTarget);
    }

    ngOnInit() {
        this.authRequest = new AuthRequest();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(value => value.unsubscribe());
        this.subscriptions = null;
        this.authRequest = null;
        this.expectedTarget = null;
    }
}
