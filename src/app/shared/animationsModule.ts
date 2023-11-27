import { animate, state, style, transition, trigger } from "@angular/animations";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    imports: [
        BrowserAnimationsModule
    ],
    exports: [
        BrowserAnimationsModule
    ]
})
export class animationsModule { }

export const slide = trigger('slide', [
    state('open', style({
        transform: 'scaleX(100%)'
    })),
    state('closed', style({
        transform: 'scaleX(0)'
    })),
    transition('open <=> closed', animate('300ms ease'))
]);

export const pop = trigger('pop', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scaleY(0)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'scaleY(1)' }))
    ]),
    transition(':leave', [
      animate('300ms ease-out', style({ opacity: 0, transform: 'scaleY(0)' }))
    ])
  ])