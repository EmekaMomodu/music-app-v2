import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
    toasts: any[] = [];

    delay = 5000;

    showInfo(message: string) {
        this.show(message, {
            classname: 'bg-primary text-light',
            delay: this.delay,
            header: 'INFO !'
        });
    }

    showSuccess(message: string) {
        this.show(message, {
            classname: 'bg-success text-light',
            delay: this.delay,
            header: 'SUCCESS !'
        });
    }

    showError(message: string) {
        this.show(message, {
            classname: 'bg-danger text-light',
            delay: this.delay,
            header: 'Oops !'
        });
    }

    show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
        this.toasts.push({ textOrTpl, ...options });
    }

    remove(toast: any) {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    clear() {
        this.toasts.splice(0, this.toasts.length);
    }
}
