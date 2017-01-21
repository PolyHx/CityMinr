import { Component, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'control',
    templateUrl: './control.template.html'
})
export class ControlComponent {

    @Input("id") id: string;
    @Input("name") name: string;
    @Input("class") class: string;
    @Input("selected") selected: Boolean;

    @Output() value:Boolean;


    constructor() {
    }
}