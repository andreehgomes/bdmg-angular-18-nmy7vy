import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from './hello.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { TesteTecnicoComponent } from '../teste-tecnico/feature/teste-tecnico/teste-tecnico.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelloComponent, MatExpansionModule, TesteTecnicoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BDMG Teste Frontend';
  panelOpenState: boolean = true;
  @Input() name!: string;
}
