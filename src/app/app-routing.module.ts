import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home.component';
import {AllPositionComponent} from "./components/positions/positions.component";
import {WatchListComponent} from "./components/watchList/watch-list.component";
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import {ContactComponent} from "./components/contact/contact.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'overview', component: OverviewComponent },
      { path: 'positions', component: AllPositionComponent },
      { path: 'watchList', component: WatchListComponent},
      { path: 'contact', component: ContactComponent}
    ]},
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
