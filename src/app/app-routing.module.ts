 import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import {RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from './auth/signup/signup.component'
import { SigninComponent } from './auth/signin/signin.component'
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes =[
  { path: '',
    redirectTo: '/signin',
    // canActivate:[AuthGuard], 
    pathMatch: 'full',
    },
  { path: 'recipes',
    component: RecipesComponent,
    canActivate:[AuthGuard], 
    children: [{path:'', component: RecipeStartComponent},
              {path: 'new', component: RecipeEditComponent, canActivate:[AuthGuard] },
              {path: ':id', component: RecipeDetailComponent },
              {path: ':id/edit', component: RecipeEditComponent, canActivate:[AuthGuard] },
              ],
    },
  { path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate:[AuthGuard], 
    },  
  { path: 'signup',
    component: SignupComponent,
    },
  { path: 'signin',
    component: SigninComponent,
    },

  // { path: 'users',
  //   component: UsersComponent,
  //   children: [
  //       { path: ':id/:name',
  //       component: UserComponent,
  //       },
  //   ]
  //   }, 
  
//   { path: 'servers',
//     component: ServersComponent,
// //below would guard entire servers and children path. Below uses another method to protect just children.
//     // canActivate: [AuthGuard],
//     canActivateChild: [AuthGuard],
//     children: [
//       { path: ':id',
//       component: ServerComponent,
//       resolve: {server: ServerResolver},
//       },
//       { path: ':id/edit',
//       component: EditServerComponent,
//       canDeactivate: [CanDeactivateGuard],
//       },       
//       ]
//     },  
// // note that the ** redirects to a route. In this case that route is /not-found which is the 404 component. The ** route must be the last, so router can check every legit route first.
//       // { path:'not-found',
//       // component: PageNotFoundComponent,
//       // },       
//       { path:'not-found',
//       component: ErrorPageComponent,
//       data: {message: 'Cannot find that page'},
//       }, 
//       { path:'**',
//       redirectTo: '/not-found',
//       },  
]


@NgModule({
	imports:[
//modified to use hash configuration. Helps to keep cloud servers from looking at urls as server urls. Places a hash in front to stop the problem.
   // RouterModule.forRoot(appRoutes, {useHash: true})

		RouterModule.forRoot(appRoutes),
	],
	exports: [RouterModule]

})
export class AppRoutingModule{



}