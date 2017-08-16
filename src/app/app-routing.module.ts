import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home.component';
import {AllPositionComponent} from "./components/allPosition/all-position.component";
import {WatchListComponent} from "./components/watchList/watch-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'position', component: AllPositionComponent },
  { path: 'watchList', component: WatchListComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
