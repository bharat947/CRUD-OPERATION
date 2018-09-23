import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { 
  
   allUsers: User[];
   statusCode: number;
   requestProcessing = false;
   userIdToUpdate = null;
   processValidation = false;
  
   userForm = new FormGroup({
       name: new FormControl('', Validators.required),
       address: new FormControl('', Validators.required),
       email: new FormControl('', Validators.required),	
       mobile: new FormControl('', Validators.required),
       image: new FormControl('', Validators.required)		   
   });
  
   constructor(private userService: UserService) {
   }

   ngOnInit(): void {
	   this.getAllUsers();
   }   
  
   getAllUsers() {
        this.userService.getAllUsers()
		  .subscribe(
                data => this.allUsers = data,
                errorCode =>  this.statusCode = errorCode);   
   }
 
   onUserFormSubmit() {
	  this.processValidation = true;   
	  if (this.userForm.invalid) {
	       return; 
	  }   
	 
      this.preProcessConfigurations();
	  let name = this.userForm.get('name').value.trim();
      let address = this.userForm.get('address').value.trim();
      let email = this.userForm.get('email').value.trim();
      let mobile = this.userForm.get('mobile').value.trim();
      let image = this.userForm.get('image').value.trim();	  
	  if (this.userIdToUpdate === null) {  
	
	    let user= new User(null, name, address,email,mobile,image);	  
	    this.userService.createUser(user)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllUsers();	
					this.backToCreateUser();
			    },
		        errorCode => this.statusCode = errorCode);
	  } else {  
   	  
	    let user= new User(this.userIdToUpdate, name, address,email,mobile,image);	  
	    this.userService.updateUser(user)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllUsers();	
					this.backToCreateUser();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   
   loadUserToEdit(userId: string) {
      this.preProcessConfigurations();
      this.userService.getUserById(userId)
	      .subscribe(user => {
		            this.userIdToUpdate = user.userId;   
		            this.userForm.setValue({ name: user.name, address: user.address,email:user.email,mobile:user.mobile,image:user.image });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
  
   deleteUser(userId: string) {
      this.preProcessConfigurations();
      this.userService.deleteUserById(userId)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllUsers();	
				    this.backToCreateUser();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
 
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
  
   backToCreateUser() {
      this.userIdToUpdate = null;
      this.userForm.reset();	  
	  this.processValidation = false;
   }


  
}
    