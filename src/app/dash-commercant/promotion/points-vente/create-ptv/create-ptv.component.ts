import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PtvService} from '../ptv.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import swal from 'sweetalert2';


class Ptv {
    _id: string;
    Nom: string;
    Priority: number;
    ID_commercant: number;

}
@Component({
  selector: 'app-create-ptv',
  templateUrl: './create-ptv.component.html',
  styleUrls: ['./create-ptv.component.scss']
})
export class CreatePtvComponent implements OnInit {
    pays:any[];
    angForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private ptv: PtvService , public dialog: MatDialog) {
        this.createForm();
    }

    createForm() {
        this.angForm = this.fb.group({

            Nom: ['', Validators.required],
            Priority: ['', Validators.required],
        });
    }

    openDialog(): void {
        swal.fire({
            title: 'Erreur',
            text: 'Vous devez remplir tous les champs  pour continuer',
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#64638f',
            cancelButtonColor: '#9795cf',

            confirmButtonText: 'ok'
        });
    }

    addPtv() {
        if (this.angForm.valid) {
            const id = sessionStorage.getItem('commercantId');
            console.log(id);
            this.ptv.addPtv(this.angForm.value.Nom , this.angForm.value.Priority, id);
        } else {
            this.openDialog();
        }
    }

    ngOnInit() {

    }
}

