import {Component} from '@angular/core';
import {AuthRequest} from "../../../model/auth-request.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    authRequest: AuthRequest = {
        email: '',
        password: ''
    }

    constructor(private spinnerService: SpinnerService,
                private toastService: ToastService,
                private authService: AuthService,
                private router: Router,) {
    }

    login() {
        this.spinnerService.show();
        this.authService.login(this.authRequest).subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data) {
                        this.spinnerService.hide();
                        this.router.navigate(['welcome'])
                            .then(() => {
                                window.location.reload();
                            });
                    } else {
                        this.spinnerService.hide();
                        this.toastService.showError(response.message);
                    }
                },
                error: (error) => {
                    this.spinnerService.hide();
                    console.error("error::: " + JSON.stringify(error));
                    this.toastService.showError(error.error?.message || error.message);
                }
            }
        );

    }

}
