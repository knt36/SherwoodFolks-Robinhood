import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HomeComponent} from "./components/home.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AllPositionComponent} from "./components/positions/positions.component";
import { AppRoutingModule } from './app-routing.module';
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {WatchTileComponent} from "./components/watchTile/watch-tile.component";
import { ChartsModule } from 'ng2-charts';
import {ChartComponent} from "./components/chart/chart.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {RobinhoodService} from "./services/RobinhoodService";
import {AppComponent} from "./app.component";
import {StockTileComponent} from "./components/stockTile/stock-tile.component";
import {LoginComponent} from "./components/login/login.component";
import {BsDropdownModule} from "ngx-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {TopBarComponent} from "./components/topBar/top-bar.component";

@NgModule({
  declarations: [
      OverviewComponent,
      AppComponent,
      HomeComponent,
      AllPositionComponent,
      StockTileComponent,
      WatchListComponent,
      WatchTileComponent,
      ChartComponent,
      LoginComponent,
      TopBarComponent

  ],
  imports: [
      BsDropdownModule.forRoot(),
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      ChartsModule,
      HttpModule
  ],
  providers: [RobinhoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
