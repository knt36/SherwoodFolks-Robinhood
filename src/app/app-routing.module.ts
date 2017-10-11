import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home.component';
import {AllPositionComponent} from "./components/allPosition/all-position.component";
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'allPosition', component: AllPositionComponent },
      { path: 'watchList', component: WatchListComponent}
      ]},
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
