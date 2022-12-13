import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderByPipe} from "./pipes/order-by-pipe";
import {CapitalizePipe} from "./pipes/capitalize.pipe";
import {LoadingSpinnerComponent} from "./spinner/loading-spinner/loading-spinner.component";
import {SpinnerOverlayComponent} from "./spinner/spinner-overlay/spinner-overlay.component";
import {JoinPipe} from "./pipes/array-to-cs-string.pipe";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        SpinnerOverlayComponent,
        OrderByPipe,
        CapitalizePipe,
        JoinPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        LoadingSpinnerComponent,
        SpinnerOverlayComponent,
        CommonModule,
        OrderByPipe,
        CapitalizePipe,
        JoinPipe
    ],
    entryComponents: [SpinnerOverlayComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UtilModule {
}
