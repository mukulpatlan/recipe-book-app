import firebase from 'firebase';

export class AuthService{
	signUp(email: string, pass: string){
		return firebase.auth().createUserWithEmailAndPassword(email, pass);
	}

	signIn(email: string, pass: string){
		return firebase.auth().signInWithEmailAndPassword(email, pass);
	}

	logout(){
		firebase.auth().signOut();
	}

	getActiveUser(){
		return firebase.auth().currentUser;
	}
}