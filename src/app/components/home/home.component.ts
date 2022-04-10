import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { HomeService } from "../../services/home.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	//Variables
	user_form: FormGroup;
	submitted: boolean = false;
	show_table: boolean = false;

  	constructor(
  		private formBuilder: FormBuilder, 
  		private spinner: NgxSpinnerService, 
  		private homeService: HomeService,
  		private toastr: ToastrService
  		) { }

	ngOnInit(): void {
		// user Form decalration
		this.user_form = this.formBuilder.group({
            number_of_balls: ['', [ Validators.required, Validators.pattern("^[0-9]*$")] ],
            balls_drawn: ['', [ Validators.required, Validators.pattern("^[0-9]*$")] ]
        });

	}

	submitForm(){
		this.submitted = true;

        // stop here if form is invalid
        if (this.user_form.invalid) {
            return;
        }

        this.spinner.show();
        this.show_table = false;
        this.homeService.getResults(this.user_form.value)
	    .subscribe(
	    	data => {
	    		this.homeService.results = data['data'];
	    		this.show_table = true;
	    		this.toastr.success('Results Fetched Successfully!', 'Success!');
	    		this.spinner.hide();
	    	},

	    	error => {
				this.toastr.error('Something Went Wrong, Try Again!', 'Error!');
				this.spinner.hide();
	    	}
	    );

	}

	onReset() {
        this.submitted = false;
        this.show_table = false;
        this.user_form.reset();
    }

	get f() { return this.user_form.controls; }

}
