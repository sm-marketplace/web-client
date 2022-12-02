import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'primeng/fileupload';
import { catchError, of, tap } from 'rxjs';
import { MarketplaceService } from 'src/app/services/marketplace.service';
import { WalletService } from 'src/app/services/wallet.service';
import Web3 from 'web3';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: FileUpload;

  form!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private mpService: MarketplaceService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  
    this.form = this.fb.group({
      'name': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
      'price': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
      'description': [
        { value: '', disabled: false },
        [ Validators.required ]
      ],
    });
  }

  onSubmit() {
    const file: File = this.fileInput.files[0];
    const wei = Web3.utils.toWei(this.form.value.price);
    const { name, description } = this.form.value;

    this.mpService.createItem(
      file, { name, description }, wei.toString()
    ).pipe(
      catchError(
        (err) => {
          console.error(err);
          this.toastr.error("Ocurrio un error, intentelo más tarde");
          return of(undefined);
        }
      ),
      tap(ok => ok && this.router.navigate(['home']))
    ).subscribe();
  }
}
