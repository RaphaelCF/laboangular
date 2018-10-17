export class Eventmain {
  Identity: number;
  Title: string;
  IDCustomer: number;
  IDPhysicalCustomer: number;
  IDCompanie: number;
  IDUser: number;
	Reference: string;
  Commentary: string;
  StartDate: string;
  EndDate: string;
  NbPeople: number;
  CreationDate: string;
  MainDate: string;
  IDStatus: number;
  Free1: string;
  Free2: string;
  List1: number;
  IDExternal: number;
  IdAdmin: number;
  EventList : [{
    IDCompanie: number;
    IDUser: number;
    StartDate: string;
    EndDate: string;
    NbPeople: number;
    OptionDate: string;
    IDStatus: number;
    List1: number;
    IDExternal: number;
    IdAdmin: number;
    PlaceList : [{
      Identity: number;
    }]
  }]
}
