import { Injectable, OnInit } from "@angular/core";
import { RedirectLoginResult, createAuth0Client } from "@auth0/auth0-spa-js";
import {
  from,
  Observable,
  throwError,
  BehaviorSubject,
  of,
  combineLatest,
} from "rxjs";
import { shareReplay, catchError, concatMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Auth0Client } from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  public auth0Client$: Observable<Auth0Client> = (
    from(
      createAuth0Client({
        domain: environment.authDomain,
        clientId: environment.authClientID,
        // redirect_uri: `${environment.appUrl}/member`
      })
    ) as Observable<Auth0Client>
  ).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError((err) => throwError(err))
  );

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  public isAuthenticated$: Observable<boolean> = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap((res) => (this.loggedIn = res))
  );
  public handleRedirectCallback$: Observable<RedirectLoginResult> =
    this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  public loggedIn: boolean | Auth0Client = null;

  constructor(private router: Router) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    // this.localAuthSetup();
    // Handle redirect from Auth0 login
    // this.handleAuthCallback();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser())),
      tap((user) => this.userProfileSubject$.next(user))
    );
  }

  public localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  public login(redirectPath: string = "/member") {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      console.log("%c LOGGED_AUTH_GUARD", "color: blue", client);
      // Call method to log in
      client.loginWithRedirect({
        // redirect_uri: `${environment.appUrl}/member`,
        appState: { target: redirectPath },
      });
    });
  }

  public handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes("code=") && params.includes("state=")) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap((cbRes) => {
          // Get and set target redirect route from callback results
          // targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/member';
          targetRoute = "/member";
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([this.getUser$(), this.isAuthenticated$]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  public logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        clientId: environment.authClientID,
        // openUrl: `${environment.appUrl}`
      });
    });
  }
}
