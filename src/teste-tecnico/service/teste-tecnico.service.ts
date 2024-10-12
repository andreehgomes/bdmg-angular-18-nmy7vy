import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CepModel } from '../model/cep-model';

@Injectable({
  providedIn: 'root'
})
export class TesteTecnicoService {

  private API = "https://viacep.com.br/ws/{{cep}}/json/"

  constructor(private http: HttpClient) { }

  consultaCep(cep: string): Observable<CepModel>{
    return this.http.get<CepModel>(this.API.replace("{{cep}}", `${cep}`))
  }

  salvarCep(cep: CepModel): Observable<string> {
    localStorage.setItem("CEP", JSON.stringify(cep));
    return of("ok");
  }

}
