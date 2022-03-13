import { HttpClient } from '@angular/common/http';
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
				{ label: "Mouse", link: "mouse" },
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
	categories = ["Human", "Mouse", "Rat"];
	toxicants = ["Lead (Pb)", "MethylMercury (MeHg)"];
	filters = [];
	filterType: any;
	activeFilters = [];
	psuedoData: any[];
	refrenceTable: any[];
	baseUrl = "http://localhost:3000/";
	URL_LABEL = {
		"Category": "species",
		"Toxicant": "toxicants"
	}

	constructor(private http: HttpClient) { }

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
		let isToxicant = suffix == "Toxicant";
		this.filters = isToxicant ? this.categories : this.toxicants;
		this.activeFilters = JSON.parse(JSON.stringify(this.filters));
		let getUrl = () => {
			let tempLabel = label.toLowerCase();
			if (isToxicant) {
				tempLabel = label.split("(")[1].replace(")", "");
			}
			return this.baseUrl + this.URL_LABEL[suffix] + "/" + tempLabel;
		}
		this.refrenceTable = [];
		this.http.get(getUrl()).subscribe(res => {
			console.log(res);
			// Append type column
			Object.keys(res).forEach(prop => {
				let table = res[prop];
				table.forEach(obj => obj["Type"] = prop[0].toUpperCase() + prop.slice(1));
				this.refrenceTable.push(...table);
			})
		}, err => {
			console.log(err);
			this.dataSource = new MatTableDataSource([]);
			this.isTableView = true;
		}, () => {
			this.psuedoData = this.refrenceTable;
			this.displayedColumns = Object.keys(this.psuedoData[0]);
			this.dataSource = new MatTableDataSource(this.psuedoData);
			this.isTableView = true;
		});
	}

	applyFilter(filter: string) {
		console.log("clicked on ", filter);
		let index = this.activeFilters.indexOf(filter);
		index >= 0 ? this.activeFilters.splice(index, 1) : this.activeFilters.push(filter);
		let arr = this.psuedoData.filter(data =>
			this.activeFilters.includes(data["Type"])
		);
		this.dataSource = new MatTableDataSource(arr);
	}

}
