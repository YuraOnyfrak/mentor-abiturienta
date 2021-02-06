import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GroupedFaculty } from '../shared/models/grouped-faculty';
import { Speciality } from '../shared/models/speciality';
import { Specialization } from '../shared/models/specialization';
import { City } from '../shared/models/city';
import { University } from '../shared/models/university';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
import { StudentService } from '../shared/services/student.service';
import { SpecializationService } from '../shared/services/specialization.service';
import { SpecialityService } from '../shared/services/speciality.service';
import { FacultyService } from '../shared/services/faculty.service';
import { DynamicNotificationService } from '../shared/services/dynamic-notification.service';
import { UniversityService } from '../shared/services/university.service';
import { CityService } from '../shared/services/city.service';
import { CreateStudent, Mentor } from '../shared/models/Student/create-student';
import { ValidationResult } from '../shared/models/Common/validation-result';
import { ValidationState } from '../shared/models/Common/enum/validation-state.enum';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private dynamicNotification: DynamicNotificationService,
    private specialityService: SpecialityService,
    private specializationService : SpecializationService,
    private cityService : CityService,
    private studentService : StudentService,
    private router: Router,
    private sharedService: SharedService
    ) { }

  ngOnInit() {
    let mentor =new Mentor();
    mentor.name = "Олійник Юрій";
    mentor.canHelp = true;
    mentor.course =5;
    mentor.speciality = "121 Інженeрія програмного забезпечення";
    mentor.telegram = "@yura";
    mentor.university = "КПІ";      
    this.mentors.push(mentor);

    this.student = new CreateStudent();
    
    this.loadCity(); 
    this.loadUniversityByCity(1);
  }
  
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
  public student : CreateStudent;

  public mentors: Mentor[] = new Array();



  

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
