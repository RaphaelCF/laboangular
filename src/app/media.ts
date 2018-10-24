export class Media {
  id: number;
  title: string;
  auteur: string;
	_links:{
		preview:
			{ href: string; }
		"kpk:large":
			{ href: string; }
	}
  _embedded:{
    metadata:[{
      id:string;
      value:string;
    }]
  }
}
