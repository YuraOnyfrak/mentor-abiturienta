import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {map, tap, concatMap} from 'rxjs/operators';
import {ThemePalette} from '@angular/material/core';
import {UniversityService} from '../shared/services/university.service'
import {University} from '../shared/models/university'
import * as jQuery from 'jquery';
import { GroupedFaculty } from '../shared/models/grouped-faculty';
import { FacultyService } from '../shared/services/faculty.service';
import { SpecialityService } from '../shared/services/speciality.service';
import { SpecializationService } from '../shared/services/specialization.service';
import { Speciality } from '../shared/models/speciality';
import { Specialization } from '../shared/models/specialization';
import { CreateStudent } from '../shared/models/Student/create-student';
import { StudentService } from '../shared/services/student.service';
import {Router} from "@angular/router";
import { SharedService } from '../shared/services/shared.service';
import { DynamicNotificationService } from '../shared/services/dynamic-notification.service';
import { CityService } from '../shared/services/city.service';
import { City } from '../shared/models/city';
import { ValidationResult } from '../shared/models/Common/validation-result';
import { ValidationState } from '../shared/models/Common/enum/validation-state.enum';
import { Student } from '../shared/models/Student/student';


declare var jQuery: jQuery;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor
  (
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private dynamicNotification: DynamicNotificationService,
    private specialityService: SpecialityService,
    private specializationService : SpecializationService,
    private cityService : CityService,
    private studentService : StudentService,
    private router: Router  ){}

 form: FormGroup = this.formBuilder.group({
    city : '',
    university: new FormControl(),
    faculties: '',
    speciality: '',
    specialization: '',
    name : ['', [ Validators.required]],
    lastname:'',
    course: [1, [Validators.min(1), Validators.max(6)]],
    telegram : '',
    //instagram:['', [ Validators.required, Validators.minLength(3)]],
    canHelp : false
  });

  color: ThemePalette = 'primary';
  checked = false;
  disabled = false;

  public regionName : number;
  public universityOptions : University[];
  //filteredUniversityOptions: Observable<University[]>;

  public facultiesOptions: GroupedFaculty[] = [];
  //filteredFacultiesOptions : Observable<GroupedFaculty[]>;

  public specialityOptions: Speciality[] = [];
  //filteredSpecialityOptions: Observable<Speciality[]>;

  public specializationOptions: Specialization[] = [];
  //filteredSpecializationOptions: Observable<Specialization[]>;
  
  public cityOptions: City[] = [];
  //filteredCityOptions: Observable<City[]>;

  public student : CreateStudent;
  

  ngOnInit() { 
    this.student = new CreateStudent();
    this.studentService.get()
      .pipe(
        map((response : Student)=>{          

          this.form.controls['name'].setValue(response.firstname);
          this.form.controls['lastname'].setValue(response.lastname);
          this.form.controls['telegram'].setValue(response.username);
          this.form.controls['course'].setValue(response.course);
          this.form.controls['canHelp'].setValue(response.canHelp);
          
          if(!response.isNewUser)
          {
            this.student.universityId = response.universityId;
            this.student.facultyId = response.facultyId;
            this.student.specializationId = response.specializationId;
            this.student.specialityByFacultyId = response.specialityByFacultyId;
            this.student.course = response.course;
            this.student.canHelp = response.canHelp;
            this.student.name = response.firstname;

            this.cityService.get().pipe(
              tap((cities: City[]) =>{
                this.cityOptions = cities;
                this.form.controls['city'].setValue(this.cityOptions.find(s=>s.id == response.cityId));
              }),
              concatMap(() => {
                return  this.universityService.get(response.cityId);
              }),
              tap((universities : University[]) =>{
                this.universityOptions = universities;
                this.form.controls['university'].setValue(
                  this.universityOptions.find(s=>s.id === response.universityId));
              }),              
              concatMap(() => {
                return this.facultyService.get(response.universityId);
              }),
              tap((faculties: GroupedFaculty[]) => {
                if(response.facultyId){                  
                  this.facultiesOptions = faculties;
                  this.form.controls['faculties'].setValue(
                   this.facultiesOptions.filter(s=>s.faculties.find(s=>s.id == response.facultyId))[0].faculties[0]);
                } 
              }),
              concatMap(() => {                
                return this.specialityService.get(response.facultyId);
              }),
              tap((specialities: Speciality[]) =>{
                if(response.specialityByFacultyId){               
                    this.specialityOptions = specialities;
                    this.form.controls['speciality'].setValue(
                      this.specialityOptions.find(s=>s.specialityByFacultyId === response.specialityByFacultyId));
                }
              }),
              concatMap(() => {
                return this.specializationService.get(response.specialityByFacultyId);
              }),
              tap((specializations : Specialization[]) => {
                if(response.specializationId){
                  this.specializationOptions = specializations;
                  this.form.controls['specialization'].setValue(
                    this.specializationOptions.find(s=>s.id === response.specializationId));
                }
              })
            )
            .subscribe()
          }    
          else{
            this.loadCity(); 
            this.loadUniversityByCity(1);
          }      
        })).subscribe();
        

    // this.sharedService.sharedRelegramResponse.subscribe(
     //      (response : TelegramResponse) => {
    //         // this.form.controls['name'].setValue(response.first_name);
    //         // this.form.controls['lastname'].setValue(response.Last_name);
      //       this.form.controls['telegram'].setValue(response.username);           
    //});

     //if(this.form.controls['telegram'].value === '' || this.form.controls['telegram'].value == undefined) 
      // this.router.navigate(['/']);
  }

  submit(){    
    this.student.name = this.form.controls['name'].value;
    this.student.lastname = this.form.controls['lastname'].value;
    this.student.course = this.form.controls['course'].value;
    this.student.telegram = this.form.controls['telegram'].value;
    //this.student.instagram = this.form.controls['instagram'].value;
    this.student.canHelp = this.form.controls['canHelp'].value;
    // letters, numbers, periods and underscores.
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach(key => {
        const errorsControl = this.form.controls[key].errors;
        if(errorsControl != null){
          Object.keys(errorsControl).forEach(
            error =>{
              this.dynamicNotification.invalidFormMessagePop(key, error);
            })
        }
      });

      return;
    }
    this.studentService.post(this.student).subscribe(() => 
      { 
        this.router.navigate(['/thank-you']);
      },
      () => {
      this.router.navigate(['/thank-you']);}
    );
  }

 // #region load data
  private loadUniversityByCity(idCity: number){
    (this.universityService.get(idCity)).subscribe((response: University[]) => {
      if(response.length != 0){
        this.universityOptions = response; 
        this.form.controls['university'].setValue(this.universityOptions[0]);
        this.loadFacultyByUniversity(this.universityOptions[0].id);
        this.student.universityId = this.universityOptions[0].id;
      }  
      else{
        this.form.controls['university'].reset();
        this.form.controls['faculties'].reset();
        this.form.controls['speciality'].reset();
        this.form.controls['specialization'].reset();
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

  private loadCity(){ 
    this.cityService.get().subscribe(response => {
      this.cityOptions = response;
      this.form.controls['city'].setValue(this.cityOptions[0]);
    });
  }

  private  loadFacultyByUniversity(idUniversity: number){ 
    this.facultyService.get(idUniversity).subscribe(response =>{
      this.facultiesOptions = response;
    });
  }

  private loadSpecialityByFaculty(idFaculty: number){ 
     this.specialityService.get(idFaculty).subscribe(response =>{
      this.specialityOptions = response;
     });
  }

  private loadSpecializationBySpeciality(idSpeciality: number){ 
     this.specializationService.get(idSpeciality).subscribe(response =>{
      this.specializationOptions = response;
     });
  }
  //#endregion

  //#region  select handler
  citySelectedFromMap(idCity : number){
    this.form.controls['university'].reset();
    this.form.controls['faculties'].reset();
    this.form.controls['speciality'].reset();
    this.form.controls['specialization'].reset();
    this.loadUniversityByCity(idCity);
  }

  citySelected(evt: any){
    this.citySelectedFromMap(evt.source.value.id);
  }

  universitySelected(evt: any){
    if (evt.source.selected) {
      this.form.controls['speciality'].reset();
      this.form.controls['specialization'].reset();
      this.loadFacultyByUniversity(evt.source.value.id);
      this.student.universityId = evt.source.value.id;
    }
  }

  facultySelected(evt: any){
    if (evt.source.selected) {
      this.form.controls['specialization'].reset();
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