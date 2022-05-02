export class Employee {
  constructor(_id = "", name = "", otherNames = "", firtsLastName = "", secondLastName = "", country = "", documentType = "", document = "", email = "", admissionDate="" ,
  area="" ,status=true, createdAt="") {
    this._id = _id;
    this.name = name;
    this.otherNames = otherNames;
    this.firtsLastName = firtsLastName;
    this.secondLastName = secondLastName;
    this.country = country;
    this.documentType = documentType;
    this.document = document;
    this.email = email;
    this.admissionDate = admissionDate;
    this.area = area;
    this.status = status;
    this.createdAt = createdAt;
  }

  _id: string;
  name: string;
  otherNames: string;
  firtsLastName: string;
  secondLastName: string;
  country: string;
  documentType: string;
  document: string;
  email: string;
  admissionDate: string;
  area: string;
  status: boolean;
  createdAt: string;
}
