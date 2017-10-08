import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RobinhoodDataService} from "./services/RobinhoodDataService";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AllPositionComponent} from "./components/allPosition/all-position.component";
import { AppRoutingModule } from './app-routing.module';
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {WatchTileComponent} from "./components/watchTile/watch-tile.component";
import { ChartsModule } from 'ng2-charts';
import {ChartComponent} from "./components/chart/chart.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home.component";
import {StockTileComponent} from "./components/stockTile/stock-tile.component";

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      AllPositionComponent,
      StockTileComponent,
      WatchListComponent,
      WatchTileComponent,
      ChartComponent,
      LoginComponent

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
