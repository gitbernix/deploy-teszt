import { compileNgModule } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NameListComponent } from './name-list/name-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    @ViewChild('saveBtn') saveBtn!: ElementRef<HTMLButtonElement>;
    @ViewChild('nameList') nameListChild!: NameListComponent;
    constructor() {}

    ngOnInit(): void {}

    viewChildExample() {
        console.log(this.saveBtn.nativeElement);
        this.saveBtn.nativeElement.setAttribute(
            'style',
            'color:red;font-size: 3rem'
        );
    }

    add() {
        this.nameListChild.addUser('Test', 'FromParent');
    }
}
