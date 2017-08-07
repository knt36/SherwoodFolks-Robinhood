import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home.component";
import {RobinhoodDataService} from "./services/RobinhoodDataService";
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MainComponent} from "./components/main/main.component";
import {AllPositionComponent} from "./components/allPosition/all-position.component";
import { AppRoutingModule }     from './app-routing.module';
import {PositionTileComponent} from "./components/positionTile/position-tile.component";
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {WatchTileComponent} from "./components/watchTile/watch-tile.component";
import { ChartsModule } from 'ng2-charts';
import {ChartComponent} from "./components/chart/chart.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    AllPositionComponent,
    PositionTileComponent,
    WatchListComponent,
    WatchTileComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [RobinhoodDataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
