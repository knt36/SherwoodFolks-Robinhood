

import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'watch-tile',
    templateUrl : './watch-tile.component.html',
    styleUrls: ['./watch-tile.component.css']
})


export class WatchTileComponent implements OnInit{

    @Input('watch') watch: any;

    color: string;
    watchBtn: string;

    ngOnInit() {
        this.color = this.watch.status == 'up'? 'green' : 'red';
        this.watchBtn = this.watch.group == 'watch' ? 'glyphicon-remove' : 'glyphicon-plus';


    }
}
