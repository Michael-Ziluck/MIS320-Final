import { OnInit } from "@angular/core";
import { Path } from "../constants/path.constant";
import { TitleService } from "../service/title.service";
import { Router } from "@angular/router";
import { GuardHandlerService } from "../guard/guard-handler.service";
import { Key } from "../constants/key.constant";

export abstract class BaseDefaultPageComponent implements OnInit {
    loginPath: string;

    protected constructor(titleService: TitleService,
                          private _router: Router,
                          private _guardHandlerService: GuardHandlerService) {
        titleService.setTitle(this.getPageName());
    }

    ngOnInit() {
        this.loginPath = Path.LOGIN;
        if (this._router.url === '/') {
            this._guardHandlerService.forceLoginRedirect();
        } else if (this._router.url === '/403' && localStorage.getItem(Key.BEARER_TOKEN)) {
            this._router.navigate(['/admin/dashboard']);
        }
    }

    abstract getPageName(): string;
}
