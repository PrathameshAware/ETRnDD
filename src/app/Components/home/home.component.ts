import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	cards = [
		{
			title: "Species Categories",
			suffix: "Category",
			icon: "groups",
			description: `This is some description for current category. This is some description for current category. 
			This is some description for current category. This is some description for current category.
			<br><br>Click on items below to know more:`,
			contents: [
				{ label: "Human", link: "human" },
				{ label: "Mice", link: "mice" },
				{ label: "Rat", link: "rat" }
			]
		},
		{
			title: "Environment Toxicants",
			suffix: "Toxicant",
			icon: "public",
			description: `This is some description for current category. This is some description for current category. 
			This is some description for current category. This is some description for current category.
			<br><br>Click on items below to know more:`,
			contents: [
				{ label: "Lead (Pb)", link: "lead" },
				{ label: "MethylMercury (MeHg)", link: "methyl-mercury" }
			]
		},
		{
			title: "Neurogenerative Disorders",
			suffix: "Disorder",
			icon: "psychology",
			description: `This is some description for current category. This is some description for current category. 
			This is some description for current category. This is some description for current category.
			<br><br>Click on items below to know more:`,
			contents: [
				{ label: "Autism", link: "autism" },
				{ label: "Alzymer's disease", link: "alzymer" },
				{ label: "Glioma", link: "glioma" },
				{ label: "Stroke", link: "stroke" },
				{ label: "Neuroblastoma", link: "neuroblastoma" },
				{ label: "Epilepsy", link: "epilepsy" },
				{ label: "Parkinson's disease", link: "parkinson" },
				{ label: "Dystonia", link: "dystonia" },
				{ label: "Others", link: "others" }
			]
		},
	];
	dataSource = new MatTableDataSource([{ Locus_Id: "1234", Gene_Symbol: "ABCD", Synonyms: "ACDC, ADPN, APM1, APM-1, GBP28, ACRP30, ADIPQTL1", Gene_Name: "adiponectin", Chromosome: "3", Category: "Human", Toxicant: "Lead" }]);
	sampleData = { Locus_Id: "1234", Gene_Symbol: "ABCD", Synonyms: "ACDC, ADPN, APM1, APM-1, GBP28, ACRP30, ADIPQTL1", Gene_Name: "adiponectin", Chromosome: "3", Category: "Human", Toxicant: "Lead" };
	displayedColumns = [];
	isTableView = false;
	tableTitle = "";
	categories = ["Human", "Mice", "Rat"];
	toxicants = ["Lead (Pb)", "MethylMercury (MeHg)"];
	filters = [];
	filterType: any;
	activeFilters = [];
	psuedoData: any[];
	refrenceTable: any[];
	constructor() { }

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.refrenceTable = [];
		let sample;
		for (let i = 0; i < 30; i++) {
			sample = JSON.parse(JSON.stringify(this.sampleData));
			sample.Category = this.categories[i % 3];
			sample.Toxicant = this.toxicants[i % 2];
			this.refrenceTable.push(sample);
		}
	}

	selectedTable(label: string, suffix: string) {
		this.tableTitle = label + " " + suffix;
		this.filterType = suffix === "Category" ? "Toxicant" : "Category";
		this.filters = suffix !== "Category" ? this.categories : this.toxicants;
		this.activeFilters = JSON.parse(JSON.stringify(this.filters));
		// data filtered
		this.psuedoData = this.refrenceTable.filter(data => data[suffix] === label);
		// this.psuedoData.forEach(data => delete data[suffix]);
		this.displayedColumns = Object.keys(this.psuedoData[0]);
		this.dataSource = new MatTableDataSource(this.psuedoData);
		this.isTableView = true;
	}

	applyFilter(filter: string) {
		console.log("clicked on ", filter);
		let index = this.activeFilters.indexOf(filter);
		index >= 0 ? this.activeFilters.splice(index, 1) : this.activeFilters.push(filter);
		let arr = this.psuedoData.filter(data =>
			this.activeFilters.includes(data[this.filterType])
		);
		this.dataSource = new MatTableDataSource(arr);
	}

}
