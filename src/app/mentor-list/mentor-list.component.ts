import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { GroupedFaculty } from '../shared/models/grouped-faculty';
import { Speciality } from '../shared/models/speciality';
import { Specialization } from '../shared/models/specialization';
import { City } from '../shared/models/city';
import { University } from '../shared/models/university';
import { CreateStudent, Mentor } from '../shared/models/Student/create-student';
import { FilterDataFacadeService } from '../shared/services/filter-data-facade.service';

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private filterDataFacadeService: FilterDataFacadeService    ) { }

  ngOnInit() {
    let mentor =new Mentor();
    mentor.name = "Олійник Юрій";
    mentor.canHelp = true;
    mentor.course = 5;
    mentor.speciality = "121 Інженeрія програмного забезпечення";
    mentor.telegram = "@yura";
    mentor.university = "КПІ";      
    this.mentors.push(mentor);   
    
    this.filterDataFacadeService.loadCity(this.form); 
    this.filterDataFacadeService.loadUniversityByCity(1,this.form);
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
  
  public get student() : CreateStudent {
    return this.filterDataFacadeService.student;
  }
  public set student(value : CreateStudent) {
    this.filterDataFacadeService.student = value;
  }

  public get cityOptions() : City[] {
    return this.filterDataFacadeService.cityOptions;
  }
  public set cityOptions(value : City[]) {
    this.filterDataFacadeService.cityOptions = value;
  }

  public get specializationOptions() : Specialization[] {
    return this.filterDataFacadeService.specializationOptions;
  }
  public set specializationOptions(value : Specialization[]) {
    this.filterDataFacadeService.specializationOptions = value;
  }  

  public get specialityOptions() : Speciality[] {
    return this.filterDataFacadeService.specialityOptions;
  }
  public set specialityOptions(value : Speciality[]) {
    this.filterDataFacadeService.specialityOptions = value;
  }

  public get facultiesOptions() : GroupedFaculty[] {
    return this.filterDataFacadeService.facultiesOptions;
  }
  public set facultiesOptions(value : GroupedFaculty[]) {
    this.filterDataFacadeService.facultiesOptions = value;
  }

  public get universityOptions() : University[] {
    return this.filterDataFacadeService.universityOptions;
  }
  public set universityOptions(value : University[]) {
    this.filterDataFacadeService.universityOptions = value;
  }

  public mentors: Mentor[] = new Array();

  public submit(): void {
    console.log(this.student);
    
  }

  //#region  select handler
  citySelectedFromMap(idCity: number){
    this.filterDataFacadeService.citySelectedFromMap(idCity, this.form);
  }

  citySelected(evt: any){
    this.filterDataFacadeService.citySelectedFromMap(evt.value.id, this.form);
  }

  universitySelected(evt: any){
    this.filterDataFacadeService.universitySelected(evt, this.form);
  }

  facultySelected(evt: any){
    this.filterDataFacadeService.facultySelected(evt, this.form);   
  }

  specialitySelected(evt: any){
    this.filterDataFacadeService.specialitySelected(evt);  
  }

  specializationSelected(evt: any){
    this.filterDataFacadeService.specializationSelected(evt);
  }
  //#endregion
  
}
