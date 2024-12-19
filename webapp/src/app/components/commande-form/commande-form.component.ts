import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommandeService } from '../../services/commande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { Commande } from '../../types/commande';

@Component({
  selector: 'app-commande-form',
  standalone: true, // Ajoutez cette ligne si vous utilisez Angular 14+
  imports: [FormsModule, MatInputModule, MatButtonModule, HeaderComponent],
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss'] // Corrigé de styleUrl à styleUrls
})
export class CommandeFormComponent implements OnInit {
  name_user!: string;
  name_produit!: string;
  date!: string;
  qantite!: number;
  mgs!: string;

  commandeService = inject(CommandeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; 
    if (this.id) {
      this.isEdit = true;
      this.commandeService.getCommandeById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name_user = result.name_user;
        this.name_produit = result.name_produit;
        this.date = result.date;
        this.qantite = result.qantite;
        this.mgs = result.mgs;
      });
    }
  }

  add() {
    // Créez l'objet 'commande' avec les informations nécessaires
    const commande = {
        name_user: this.name_user,
        name_produit: this.name_produit,
        date: this.date,
        qantite: this.qantite,
        mgs: this.mgs
    };

    console.log(commande); // Affichage de l'objet pour vérifier sa structure

    // Passez les valeurs individuelles comme arguments à la méthode addCommande
    this.commandeService.addCommande(this.name_user, this.name_produit, this.date, this.qantite, this.mgs, commande).subscribe((result: any) => {
        alert("Commande added");
        this.router.navigateByUrl("/admin/commandes");
    });
}


update() {
  const commande: Partial<Commande> = {
      name_user: this.name_user,
      name_produit: this.name_produit,
      date: this.date,
      qantite: this.qantite,
      mgs: this.mgs
  };

  console.log(commande); // Affichage de l'objet pour vérifier sa structure

  // Passez tous les arguments nécessaires à la méthode updateCommande
  this.commandeService.updateCommande(this.id, this.name_user, this.name_produit, this.date, this.qantite, this.mgs, commande).subscribe((result: any) => {
      alert("Commande updated");
      this.router.navigateByUrl("/admin/commandes");
  });
}
}
