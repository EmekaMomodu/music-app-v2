import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(input: any, sep = ', '): string {
        if (input && input.length) {
            return input.join(sep);
        }
        return input;
    }
}
