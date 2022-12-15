import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SpinnerService} from "../../../util/spinner/spinner.service";
import {ToastService} from "../../../util/toast/toast.service";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth.service";
import {AuthRequest} from "../../../model/auth-request.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    isInvalid = false;

    isError = false;

    constructor(private spinnerService: SpinnerService,
                private toastService: ToastService,
                private userService: UserService,
                private authService: AuthService,
                private router: Router
                ) {
    }

    createUser(ngForm: NgForm) {
        console.log(JSON.stringify(ngForm.value));
        if (ngForm.invalid) {
            this.isInvalid = true;
            return;
        }
        this.spinnerService.show();
        this.userService.createUser(
            ngForm.value
        ).subscribe({
                next: (response) => {
                    if (response.success && response.data) {
                        // this.spinnerService.hide();
                        // this.toastService.showSuccess("Account Creation Successful");
                    } else {
                        this.isError = true;
                        this.spinnerService.hide();
                        this.toastService.showError(response.message);
                    }
                },
                error: (error) => {
                    this.spinnerService.hide();
                    console.error("error::: " + JSON.stringify(error));
                    this.toastService.showError(error.error?.message || error.message);
                },
            complete: () => {
                    if(!this.isError) {
                        const authRequest: AuthRequest = {
                            email: ngForm.value.email,
                            password: ngForm.value.password
                        }
                        this.authService.login(authRequest).subscribe({
                                next: (response) => {
                                    // console.log("response::: " + JSON.stringify(response));
                                    if (response.success && response.data) {
                                        this.spinnerService.hide();
                                        this.toastService.showSuccess(response.message);
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
                this.isError = false;

            }
            }
        );
    }
}
