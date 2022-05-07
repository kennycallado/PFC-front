import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from './models/table';
import { Booking } from './models/booking';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  tables!: Table[]
  table!: Table

  constructor(private apiSrv: ApiService) { }

  onDateChange(event: Event) {
    this.date = (<HTMLInputElement>event.target).value
    this.apiSrv.getAvailability(this.date).subscribe(response => {
      this.tables = response;
    })
  }

  onSubmit(form: NgForm, close: HTMLElement) {
    /* validación formulario */
    if (!this.table.id) {
      return
    }

    if (form.value.people > this.table.max_people || form.value.people < this.table.min_people) {
      window.alert("Debe especificar un número correcto de comensales.")
      return
    }

    if (!form.value.username) {
      window.alert("Debe especificar un nombre para la reserva.")
      return
    }

    /* prepara los datos */
    let booking: Booking = {
      tables_id: this.table.id,
      username: form.value.username,
      people: form.value.people,
      date_book: this.date
    }

    /* enviar reserva */
    this.apiSrv.sendBooking(booking).subscribe(res => {
      /* mostrar confirmación */
      window.alert("Su reserva ha sido procesada.\n\tReserva número: " + res.id + " \n\nGracias")
      /* cerrar modal */
      close.click();

      /* actualizar disponibilidad */
      this.tables = []

      this.apiSrv.getAvailability(this.date).subscribe(res => {
        // /* no está detectando los cambios... */
        // this.changeDetectorRef.detectChanges()
        this.tables = res
      })
    })

  }

  completeDialog(selected: Table) {
    this.table = selected
  }

  ngOnInit(): void {
    this.apiSrv.getAvailability(this.date).subscribe(response => {
      this.tables = response
    })
  }
}
