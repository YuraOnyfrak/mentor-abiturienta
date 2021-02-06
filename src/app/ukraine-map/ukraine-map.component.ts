import { Component, OnInit,  EventEmitter, Output, Input, ElementRef} from '@angular/core';
import * as jQuery from 'jquery';

declare var jQuery: jQuery;

@Component({
  selector: 'app-ukraine-map',
  templateUrl: './ukraine-map.component.html',
  styleUrls: ['./ukraine-map.component.css']  
})
export class UkraineMapComponent implements OnInit {
	@Output() onChanged = new EventEmitter<number>();
	public selectedRegion : number;

    change(region: any) {
        this.onChanged.emit(region);
    }

	constructor(private elementRef : ElementRef) { }

	ngOnInit() {
		jQuery(document).ready(() => {
				jQuery('#ua').vectorMap(
				{
					map: 'ukraine',
					backgroundColor: 'white',
					borderColor: '#FF9900',
					borderOpacity: 0.60,
					borderWidth: 2,
					color: '#1076C8',
					hoverColor: '#0A4C82',
					selectedColor: '#FF9900',
					selectedRegions: ['1'],					
					onRegionClick: (element, code, region) =>
					{	
						this.change(code);
					}
				});
			});		
	}
}
