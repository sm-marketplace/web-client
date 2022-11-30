import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
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

    const value = {
      ...this.form.value,
      file, wei
    }
    
    console.log({value});

    this.mpService.createAsset(
      value.file.name, wei.toString() 
    ).subscribe(
      (res: any) => console.log("New Item: ", res)
    );
  }
}
