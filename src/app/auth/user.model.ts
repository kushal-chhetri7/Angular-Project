export class User {
  constructor(
    public email : string,
    public id : string,
    private _token: string,
    private _tokenExpirationDate: Date )
  {}


  get token(){  //is getter function but you cna access it like a property. i.e user.token

    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate ){
      return null
    }
    return this._token


  }
}
