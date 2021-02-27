import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { City } from '../models/city';
import { ValidationState } from '../models/Common/enum/validation-state.enum';
import { ValidationResult } from '../models/Common/validation-result';
import { GroupedFaculty } from '../models/grouped-faculty';
import { Speciality } from '../models/speciality';
import { Specialization } from '../models/specialization';
import { CreateStudent } from '../models/Student/create-student';
import { University } from '../models/university';
import { CityService } from './city.service';
import { DynamicNotificationService } from './dynamic-notification.service';
import { FacultyService } from './faculty.service';
import { SpecialityService } from './speciality.service';
import { SpecializationService } from './specialization.service';
import { UniversityService } from './university.service';

@Injectable({
  providedIn: 'root'
})
export class FilterDataFacadeService {

  public universityOptions : University[];
  public facultiesOptions: GroupedFaculty[] = [];
  public specialityOptions: Speciality[] = [];
  public specializationOptions: Specialization[] = [];
  public cityOptions: City[] = []; 
  public student : CreateStudent;

  constructor(
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private dynamicNotification: DynamicNotificationService,
    private specialityService: SpecialityService,
    private specializationService : SpecializationService,
    private cityService : CityService

  ) {
    this.student = new CreateStudent();
  }
  
    // #region load data
    public loadUniversityByCity(idCity: number, form: FormGroup){
      (this.universityService.get(idCity)).subscribe((response: University[]) => {
        if(response.length != 0){
          this.universityOptions = response; 
          form.controls['university'].setValue(this.universityOptions[0]);
          this.loadFacultyByUniversity(this.universityOptions[0].id);
          this.student.universityId = this.universityOptions[0].id;
        }  
        else{
          form.controls['university'].reset();
          form.controls['faculties'].reset();
          form.controls['speciality'].reset();
          form.controls['specialization'].reset();
          this.universityOptions = [];
          this.specialityOptions = [];
          this.specializationOptions = [];
          this.facultiesOptions = [];

          let result = new ValidationResult();
          result.message = "Для даного міста збираються дані.";
          result.status = ValidationState.Warning;
          this.dynamicNotification.validationMessage(result);
        }   
        return response;   
      });
    }

    public loadCity(form: FormGroup){ 
      this.cityService.get().subscribe(response => {
        this.cityOptions = response;
        form.controls['city'].setValue(this.cityOptions[0]);
      });
    }

    public  loadFacultyByUniversity(idUniversity: number){ 
      this.facultyService.get(idUniversity).subscribe(response =>{
        this.facultiesOptions = response;
      });
    }

    public loadSpecialityByFaculty(idFaculty: number){ 
      this.specialityService.get(idFaculty).subscribe(response =>{
        this.specialityOptions = response;
      });
    }

    public loadSpecializationBySpeciality(idSpeciality: number){ 
      this.specializationService.get(idSpeciality).subscribe(response =>{
        this.specializationOptions = response;
      });
    }
    //#endregion

    //#region  select handler
    citySelectedFromMap(idCity : number, form: FormGroup){
      form.controls['university'].reset();
      form.controls['faculties'].reset();
      form.controls['speciality'].reset();
      form.controls['specialization'].reset();
      this.loadUniversityByCity(idCity, form); 
    }

    citySelected(evt: any, form: FormGroup){
      this.citySelectedFromMap(evt.source.value.id, form);
    }

    universitySelected(evt: any, form: FormGroup){
      if (evt.source.selected) {
        form.controls['speciality'].reset();
        form.controls['specialization'].reset();
        this.loadFacultyByUniversity(evt.source.value.id);
        this.student.universityId = evt.source.value.id;
      }
    }

    facultySelected(evt: any, form: FormGroup){
      if (evt.source.selected) {
        form.controls['specialization'].reset();
        this.loadSpecialityByFaculty(evt.source.value.id);
        this.student.facultyId = evt.source.value.id;
      }   
    }

    specialitySelected(evt: any){
      if (evt.source.selected) {
        this.loadSpecializationBySpeciality(evt.source.value.specialityByFacultyId); 
        this.student.specialityByFacultyId = evt.source.value.specialityByFacultyId;
      }
    }

    specializationSelected(evt: any){
      if (evt.source.selected) {
        this.student.specializationId = evt.source.value.id; 
      }
    }
    //#endregion
}
