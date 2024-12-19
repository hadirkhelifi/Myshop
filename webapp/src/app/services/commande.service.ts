import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Commande } from '../types/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  http = inject(HttpClient);

  constructor() { }

  // Récupérer toutes les commandes
  getCommandes() {
    return this.http.get<Commande[]>("http://localhost:3000/commande");
  }

  // Récupérer une commande par ID
  getCommandeById(id: string) {
    return this.http.get<Commande>('http://localhost:3000/commande/' + id);
  }

  // Ajouter une nouvelle commande
  addCommande(name_user: string, name_produit: string, date: string, qantite: number, mgs: string, commande: Commande) {
    return this.http.post('http://localhost:3000/commande', commande);
  }

  // Mettre à jour une commande par ID
  updateCommande(id: string, name_user: string, name_produit: string, date: string, qantite: number, mgs: string, commande: Partial<Commande>) {
    return this.http.put(`http://localhost:3000/commande/${id}`, commande);
  }

  // Supprimer une commande par ID
  deleteCommandeById(id: string) {
    return this.http.delete('http://localhost:3000/commande/' + id);
  }
}
