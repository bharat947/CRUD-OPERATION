import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user';

@Injectable()
export class UserService {
    
    allUsersUrl = "http://localhost:8080/user/all-users";
	userUrl = "http://localhost:8080/user/user";

	constructor(private http:Http) { 
	}

    getAllUsers(): Observable<User[]> {
        return this.http.get(this.allUsersUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	
    createUser(user: User):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.userUrl, user, options)
               .map(success => success.status)
               .catch(this.handleError);
    }

    getUserById(userId: string): Observable<User> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', userId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.get(this.userUrl, options)
			   .map(this.extractData)
			   .catch(this.handleError);
    }	

    updateUser(user: User):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.userUrl, user, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
   	
    deleteUserById(userId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let cpParams = new URLSearchParams();
		cpParams.set('id', userId);			
		let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
		return this.http.delete(this.userUrl, options)
			   .map(success => success.status)
			   .catch(this.handleError);
    }		
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
	}
	

	
}