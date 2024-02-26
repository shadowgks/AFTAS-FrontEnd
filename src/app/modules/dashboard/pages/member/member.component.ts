import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MemberHeaderComponent } from '../../components/member/member-header/member-header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../shared/models/api-response';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { Member } from '../../../../shared/models/member/member';
import { MemberService } from '../../../../core/services/member.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Role } from 'src/app/shared/models/role';
import { switchMember } from 'src/app/shared/models/member/switch-member';


@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    standalone: true,
    imports: [
        MemberHeaderComponent,
        AngularSvgIconModule,
        CommonModule,
        FormsModule,
        NgFor
    ],
})

export class MemberComponent implements OnInit {
    memberState$!: Observable<{ appState: string, appData?: ApiResponse<Member> }>;

    constructor(private memberService: MemberService) { }

    //select and input-search
    selectedIdentity?: string;
    searchTerm = '';
    appState!: string;

    roles!: ApiResponse<Role[]>;
    selectedRoleIds: { [memberId: string]: any | null } = {};
    selectedIsEnabled: { [memberId: string]: any | null } = {};

    member!: string;
    isWorking!: boolean;

    ngOnInit(): void {
        this.getMember();
        this.getRoles();
    }

    public getMember() {
        this.memberState$ = this.memberService.getMembers().pipe(
            map((response: ApiResponse<Member>) => {
                for (let index = 0; index < response.result.length; index++) {
                    this.selectedRoleIds[response.result[index].identityNumber] = response.result[index].role[0].name;
                    this.selectedIsEnabled[response.result[index].identityNumber] = response.result[index].isWorking;
                }    
                return ({ appState: "app_loaded", appData: response });
            }),
            startWith({ appState: "app_loading" }),
            catchError((error: HttpErrorResponse) => of({ appState: "app_error", error })),
        )
    }

    public getRoles() {
        this.memberService.getRoles().subscribe(
            (res: ApiResponse<Role[]>) => {
                this.roles = res;                  
            }
        )
    }

    public updateUserRoleIsEnabled(memberCode: string) {
        const selectedRoleOrIsEnabled: switchMember = {
            roleType: this.selectedRoleIds[memberCode],
            isWorking: this.selectedIsEnabled[memberCode] == true ? false : true,
        }        

        console.log(selectedRoleOrIsEnabled);
        

        this.memberService.switchMember(memberCode, selectedRoleOrIsEnabled).subscribe(
            (res: ApiResponse<String>) => {
                this.getMember();

                //// sweet alert
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
                    title: res.message
                })
            },
        )
    }

    public saveMember(addForm: NgForm) {
        this.memberService.saveMember(addForm.value).subscribe(
            (response: ApiResponse<Member>) => {
                console.log(response);
                this.getMember();

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
                if (httpError.error.errorsValidation) {
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
                        title: 'You must be validate data!'
                    })
                    for (const keyError of Object.keys(httpError.error.errorsValidation)) {
                        addForm.controls[keyError].setErrors({ "validationError": httpError.error.errorsValidation[keyError] })
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
                        icon: 'error',
                        title: httpError.error.error
                    })
                }
            }
        )
    }

    public searchMembers() {
        if (this.searchTerm == '') {
            this.getMember();
        } else {
            this.memberState$ = this.memberService.searchMembers(this.searchTerm).pipe(
                map((response: ApiResponse<Member>) => {
                    console.log(response);
                    return ({ appState: "app_loaded", appData: response });
                }),
                startWith({ appState: "app_loading" }),
                catchError((error: HttpErrorResponse) => of({ appState: "app_error", error })),
            )
        }
    }

}
