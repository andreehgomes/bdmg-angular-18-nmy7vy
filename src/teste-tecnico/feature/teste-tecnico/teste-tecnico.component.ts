import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { TesteTecnicoService } from '../../service/teste-tecnico.service';
import { CepModel } from '../../model/cep-model';

@Component({
  selector: 'teste-tecnico',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './teste-tecnico.component.html',
  styleUrl: './teste-tecnico.component.css'
})
export class TesteTecnicoComponent implements OnInit {
  @ViewChild("formDirective") private formDirective!: NgForm;

  formGroupEndereco = new FormGroup({
    cep: new FormControl("", [Validators.required]),
    logradouro: new FormControl("", [Validators.required]),
    complemento: new FormControl("", [Validators.required]),
    unidade: new FormControl("", [Validators.required]),
    bairro: new FormControl("", [Validators.required]),
    localidade: new FormControl("", [Validators.required]),
    uf: new FormControl("", [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
    estado: new FormControl("", [Validators.required]),
    regiao: new FormControl("", [Validators.required]),
    gia: new FormControl("", [Validators.required]),
    ddd: new FormControl("", [Validators.required]),
    ibge: new FormControl({ value: "", disabled: true }),
    siafi: new FormControl({ value: "", disabled: true }),
  });

  constructor(private _testeTecnicoService: TesteTecnicoService) { }

  ngOnInit(): void {
    this.formGroupEndereco.controls['cep'].valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(x => {
        if(!!this.formGroupEndereco.controls['cep'].value){
          this.onKeyCep(this.formGroupEndereco.controls['cep'].value);
        }
      })
  }

  onKeyCep(value: string) {
    this._testeTecnicoService.consultaCep(value).subscribe({
      next: (res) => {
        this.buildForm(res);
      }
    })
  }

  buildForm(value: CepModel) {
    this.formGroupEndereco.controls["cep"].setValue(value.cep);
    this.formGroupEndereco.controls["logradouro"].setValue(value.logradouro);
    this.formGroupEndereco.controls["complemento"].setValue(value.complemento);
    this.formGroupEndereco.controls["unidade"].setValue(value.unidade);
    this.formGroupEndereco.controls["bairro"].setValue(value.bairro);
    this.formGroupEndereco.controls["localidade"].setValue(value.localidade);
    this.formGroupEndereco.controls["uf"].setValue(value.uf);
    this.formGroupEndereco.controls["estado"].setValue(value.estado);
    this.formGroupEndereco.controls["regiao"].setValue(value.regiao);
    this.formGroupEndereco.controls["ibge"].setValue(value.ibge);
    this.formGroupEndereco.controls["gia"].setValue(value.gia);
    this.formGroupEndereco.controls["ddd"].setValue(value.ddd);
    this.formGroupEndereco.controls["siafi"].setValue(value.siafi);
  }

  onSubmit() {
    const { cep, complemento, bairro, ddd, estado, gia, ibge, localidade, logradouro, regiao, siafi, uf, unidade } = this.formGroupEndereco.controls;
    const endereco: CepModel = {
       bairro: bairro.value ? bairro.value : "",
       cep: cep.value ? cep.value : "",
       complemento: complemento.value ? complemento.value : "",
       ddd: ddd.value ? ddd.value : "",
       estado: estado.value ? estado.value : "",
       gia: gia.value ? gia.value : "",
       ibge: ibge.value ? ibge.value : "",
       localidade: localidade.value ? localidade.value : "",
       logradouro: logradouro.value ? logradouro.value : "",
       regiao: regiao.value ? regiao.value : "",
       siafi: siafi.value ? siafi.value : "",
       uf: uf.value ? uf.value : "",
       unidade: unidade.value ? unidade.value : ""
    }
    this._testeTecnicoService.salvarCep(endereco).subscribe({
      next: (res) => {
        if(res) this.zerarForm();
      }
    })
  }

  zerarForm(){
    this.formDirective.resetForm();
  }

}
