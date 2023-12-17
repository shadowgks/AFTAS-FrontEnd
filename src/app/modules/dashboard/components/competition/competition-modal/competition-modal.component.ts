import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CompetitionService } from '../../../pages/competition/service/competition.service';
import { Competition } from '../../../pages/competition/interface/competition';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../pages/competition/interface/api-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competition-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-modal.component.html',
  styleUrl: './competition-modal.component.scss'
})
export class CompetitionModalComponent {

  constructor(private competitionService: CompetitionService) { }

  public onAddCompetition(addForm: NgForm) {
    this.competitionService.saveCompetition(addForm.value).subscribe(
      (response: ApiResponse<Competition>) => {
        console.log(response);

        // get btn close modal
        const btnClose = document.getElementById('closeModalAdd');
        btnClose?.click();

        // sweet alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: response.message
        })
      },
      (httpError: HttpErrorResponse) => {
        console.log(httpError.error);
        if (httpError.error.errorsValidation) {
          // Iterate through the error keys and update corresponding form controls
          for (const keyError of Object.keys(httpError.error.errorsValidation)) {
            if (addForm.controls[keyError]) {
              addForm.controls[keyError].setErrors({ 'validationError': httpError.error.errorsValidation[keyError] });
            }
          }
        }

        if (httpError.error.error) {
          // sweet alert
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: httpError.error.error
          })
        }
      }
    )
  }

}
