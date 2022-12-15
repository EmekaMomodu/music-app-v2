import {Component} from '@angular/core';
import {AuthRequest} from "../../../model/auth-request.model";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    isInvalid = false;

    constructor(private spinnerService: SpinnerService,
                private toastService: ToastService,
                private authService: AuthService,
                private router: Router,) {
    }

    login(ngForm: NgForm) {
        console.log(JSON.stringify(ngForm.value));
        if (ngForm.invalid) {
            this.isInvalid = true;
            return;
        }
        const authRequest: AuthRequest = {
            email: ngForm.value.email,
            password: ngForm.value.password
        }
        this.spinnerService.show();
        this.authService.login(authRequest).subscribe({
                next: (response) => {
                    // console.log("response::: " + JSON.stringify(response));
                    if (response.success && response.data) {
                        this.spinnerService.hide();
                        // this.toastService.showSuccess(response.message);
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
