import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidators} from 'ng2-validation';
import {mimeType} from '../../../session/signup/mime-type.validator';
import {UserService} from '../service/user.service';
import {isUndefined} from 'util';



const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  public form: FormGroup;
  imagePreview: string;
  id: number;
  hide = true;
  hide1 = true;
  constructor(private fb: FormBuilder,  private route: ActivatedRoute,private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    if (this.id != -1){
      this.userService.retriveUser(this.id).subscribe(
        response =>{
          console.log(response);
          this.imagePreview= response.imagePath;
          this.form.setValue({
            nom: response.nom,
            email:response.email,
            prenom:response.prenom,
            password:null,
            confirmPassword: null,
            image:response.imagePath
          });
        }
      );
    }
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      nom:new FormControl('', Validators.required),
      prenom:new FormControl('', Validators.required),
      password: password,
      confirmPassword: confirmPassword,
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(){
    if(this.id == -1){
      this.userService.addClient(this.form.value.nom,this.form.value.prenom, this.form.value.email, this.form.value.password, this.form.value.image);
    }
    else {

       if (isUndefined(this.form.value.image.type)){
         this.userService.updateClient(this.id,this.form.value.nom,this.form.value.prenom, this.form.value.email, this.form.value.password);
       }
       else {
         this.userService.updateClientImage(this.id,this.form.value.nom,this.form.value.prenom, this.form.value.email, this.form.value.password, this.form.value.image);
       }

    }
  }
}
